import { TYPOGRAPHY } from "../constants/tailwind";
import plugin from "tailwindcss/plugin";


export const typographyPlugin = plugin(function ({ addComponents }) {
  const generateTypographyClasses = (data) => {
    return Object.entries(data).reduce((classes, [key, value]) => {
      const {
        fontSize,
        lineHeight,
        letterSpacing,
        fontWeight,
        fontStyle,
        responsive,
      } = value;

      const removeUndefined = (obj) =>
        Object.fromEntries(
          Object.entries(obj).filter(([, v]) => v !== undefined),
        );

      classes[`.text-${key}`] = removeUndefined({
        fontSize,
        lineHeight,
        letterSpacing,
        fontWeight,
        ...(fontStyle && { fontStyle }),
      });

      if (responsive) {
        Object.entries(responsive).forEach(([breakpoint, responsiveStyles]) => {
          classes[`.text-${key}`][`@screen ${breakpoint}`] = responsiveStyles;
        });
      }

      return classes;
    }, {});
  };
  addComponents(generateTypographyClasses(TYPOGRAPHY));
});

// const typographyPlugin = function (options, pluginOptions = {}) {
//   const { addComponents, config } = options;

//   const { respectImportant = true } = pluginOptions;
//   const important = config("important");
//   const screens = config("theme.screens");

//   const setImportant = (value) =>
//     respectImportant && important && value != null
//       ? `${value} !important`
//       : value;

//   const generateTypographyClasses = () => {
//     const components = [];

//     Object.entries(TYPOGRAPHY).forEach(([key, value]) => {
//       const { fontSize, lineHeight, responsive } = value;

//       components.push({
//         [`.text-${key}`]: {
//           fontSize: setImportant(fontSize),
//           lineHeight: setImportant(lineHeight),
//         },
//       });

//       if (responsive) {
//         Object.entries(responsive).forEach(([screen, styles]) => {
//           components.push({
//             [`@screen ${screen}`]: {
//               [`.text-${key}`]: Object.fromEntries(
//                 Object.entries(styles).map(([k, v]) => [k, setImportant(v)]),
//               ),
//             },
//           });
//         });
//       }
//     });

//     addComponents(components, { respectImportant });
//   };

//   generateTypographyClasses();
// };

// const gridPlugin = tailwindBootstrap({
//   containerMaxWidths: CONTAINER_WIDTH,
//   gridGutterWidth: "1.875rem",
// });

export const gridPlugin = function (options, pluginOptions = {}) {
  // Settings and default values
  const { addComponents, config } = options;

  const {
    gridColumns = 12,
    gridGutterWidth = "2rem",
    gridGutters = { 0: 0 },
    generateContainer = true,
    containerMaxWidths = {},
    rtl = false,
    respectImportant = true,
  } = pluginOptions;

  const screens = config("theme.screens");
  const important = config("important");

  const screenKeys = Object.keys(screens);
  const columns = Array.from(Array(gridColumns), (_, index) => index + 1);
  const rowColsSteps = columns.slice(0, Math.floor(gridColumns / 2));

  // Function to handle `!important` rule
  const setImportant = (value) =>
    respectImportant && important && value != null
      ? `${value} !important`
      : value;

  const generateContainerClasses = () => {
    if (generateContainer) {
      addComponents(
        [
          {
            ".container, .container-fluid": {
              width: setImportant("100%"),
              marginRight: setImportant("auto"),
              marginLeft: setImportant("auto"),
              paddingRight: setImportant(
                `var(--bs-gutter-x, calc(${gridGutterWidth} / 2))`,
              ),
              paddingLeft: setImportant(
                `var(--bs-gutter-x, calc(${gridGutterWidth} / 2))`,
              ),
            },
          },
          ...screenKeys.map((name) => ({
            [`@screen ${name}`]: {
              ".container": {
                maxWidth: setImportant(
                  containerMaxWidths[name] || screens[name],
                ),
              },
            },
          })),
        ],
        { respectImportant },
      );
    }
  };

  const generateRowClasses = () => {
    addComponents(
      [
        {
          ".row": {
            "--bs-gutter-x": gridGutterWidth,
            "--bs-gutter-y": 0,
            display: "flex",
            flexWrap: "wrap",
            marginTop: "calc(var(--bs-gutter-y) * -1)",
            marginRight: "calc(var(--bs-gutter-x) / -8)",
            marginLeft: "calc(var(--bs-gutter-x) / -8)",
            "& > *": {
              boxSizing: "border-box",
              flexShrink: 0,
              width: "100%",
              maxWidth: "100%",
              paddingRight: "calc(var(--bs-gutter-x) / 8)",
              paddingLeft: "calc(var(--bs-gutter-x) / 8)",
              marginTop: "var(--bs-gutter-y)",
            },
          },
        },
        {
          "@screen lg": {
            ".row": {
              marginRight: "calc(var(--bs-gutter-x) / -2)",
              marginLeft: "calc(var(--bs-gutter-x) / -2)",
              "& > *": {
                paddingRight: "calc(var(--bs-gutter-x) / 2)",
                paddingLeft: "calc(var(--bs-gutter-x) / 2)",
              },
            },
          },
        },
      ],
      { respectImportant },
    );
  };

  const generateColumnClasses = () => {
    addComponents(
      [
        {
          ".col": {
            flex: "1 0 0%",
          },
          ".row-cols-auto": {
            "& > *": {
              flex: "0 0 auto",
              width: "auto",
            },
          },
        },
        ...rowColsSteps.map((rowCol) => ({
          [`.row-cols-${rowCol}`]: {
            "& > *": {
              flex: "0 0 auto",
              width: `${100 / rowCol}%`,
            },
          },
        })),
        {
          ".col-auto": {
            flex: "0 0 auto",
            width: "auto",
          },
        },
        ...columns.map((size) => ({
          [`.col-${size}`]: {
            flex: "0 0 auto",
            width: `${(100 / gridColumns) * size}%`,
          },
        })),
      ],
      { respectImportant },
    );
  };

  const generateOffsetClasses = () => {
    addComponents(
      [
        ...[0, ...columns.slice(0, -1)].map((size) => {
          const margin = `${(100 / gridColumns) * size}%`;
          return rtl
            ? {
                [`[dir="ltr"] .offset-${size}`]: { marginLeft: margin },
                [`[dir="rtl"] .offset-${size}`]: { marginRight: margin },
              }
            : {
                [`.offset-${size}`]: { marginLeft: margin },
              };
        }),
      ],
      { respectImportant },
    );
  };

  const generateGutterClasses = () => {
    if (Object.keys(gridGutters).length) {
      addComponents(
        Object.entries(gridGutters).map(([key, value]) => ({
          [`.g-${key}, .gx-${key}`]: {
            "--bs-gutter-x": value,
          },
          [`.g-${key}, .gy-${key}`]: {
            "--bs-gutter-y": value,
          },
        })),
        { respectImportant },
      );
    }
  };

  const generateOrderClasses = () => {
    addComponents(
      [
        {
          ".order-first": { order: "-1" },
          ".order-last": { order: gridColumns + 1 },
        },
        ...[0, ...columns].map((size) => ({
          [`.order-${size}`]: { order: `${size}` },
        })),
      ],
      { respectImportant },
    );
  };

  generateContainerClasses();
  generateRowClasses();
  generateColumnClasses();
  generateOffsetClasses();
  generateGutterClasses();
  generateOrderClasses();
};

