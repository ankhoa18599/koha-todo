# Project Folder Structure

root/
├── src/
│ ├── components/
│ │ ├── atoms/
│ │ │ ├── Button/
│ │ │ ├── Input/
│ │ │ ├── Icon/
│ │ │ └── Typography/
│ │ ├── molecules/
│ │ │ ├── SearchBar/
│ │ │ ├── FormField/
│ │ │ └── Card/
│ │ ├── organisms/
│ │ │ ├── Header/
│ │ │ ├── Footer/
│ │ │ └── ProductList/
│ │ ├── templates/
│ │ │ ├── HomePage/
│ │ │ └── ProductPage/
│ │ └── pages/
│ │ ├── Home/
│ │ └── Product/
│ ├── utils/
│ ├── styles/
│ │ ├── globals.scss
│ │ └── variables.scss
│ ├── lib/
│ ├── config/
│ ├── constants/
│ ├── hooks/
│ └── app/
│ ├── layout.js
│ └── page.js
├── public/
│ ├── images/
│ └── fonts/
├── .storybook/
│ ├── main.js
│ └── preview.js
├── jsconfig.json
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json

## Key Directories and Files

### src/

Contains all source code for the application

#### components/

Organized using Atomic Design principles:

- **atoms/**: Smallest, indivisible components (e.g., Button, Input)
- **molecules/**: Simple combinations of atoms (e.g., SearchBar, FormField)
- **organisms/**: Complex UI components (e.g., Header, Footer)
- **templates/**: Page structures without specific content
- **pages/**: Specific instances of templates with real content

#### utils/

Utility functions and helper methods

#### styles/

Global styles and SCSS variables

#### lib/

Library code or third-party integrations

#### config/

Configuration files for the application

#### constants/

Constant values used across the app

#### hooks/

Custom React hooks

#### app/

Next.js 14 App Router files (layout.js, page.js)

### public/

Static assets like images and fonts

### .storybook/

Storybook configuration files

### Configuration Files

- jsconfig.json: JavaScript configuration
- .eslintrc.json: ESLint configuration
- .prettierrc: Prettier configuration
- tailwind.config.js: Tailwind CSS configuration
- postcss.config.js: PostCSS configuration
- next.config.js: Next.js configuration
- package.json: Project dependencies and scripts

This structure combines Next.js 14 best practices with the Atomic Design methodology for component organization, promoting modularity, reusability, and scalability in your project.

## Component Structure: Atomic Design

Our project follows the Atomic Design methodology for organizing components. This approach breaks down the UI into five distinct levels: Atoms, Molecules, Organisms, Templates, and Pages.

## Atoms

The smallest, indivisible components:

- Button
- Input field
- Checkbox
- Radio button
- Toggle switch
- Icon
- Label
- Text (paragraph, heading)
- Image placeholder
- Badge
- Tag
- Tooltip
- Progress bar
- Spinner
- Divider
- Avatar
- Rating star
- Slider
- Color swatch
- Typography styles

## Molecules

Simple combinations of atoms:

- Search bar (input + button)
- Form field (label + input)
- Dropdown menu
- Pagination controls
- Breadcrumb navigation
- Card (image + title + description)
- Modal dialog
- Accordion item
- Tabs (tab headers + content)
- Stepper
- Date picker
- Time picker
- Rating component (multiple stars)
- Notification toast
- Chip (with delete option)
- Tooltip with icon
- Input with icon
- Progress bar with label
- Toggle button group
- Slider with input field

## Organisms

Complex UI components:

- Header (logo + navigation + search bar)
- Footer (links + social media icons + copyright)
- Navigation menu (multiple dropdown menus)
- Product card grid
- Blog post list
- Comment section
- User profile summary
- Dashboard widget
- Sidebar navigation
- File upload area
- Calendar component
- Data table with sorting and filtering
- Carousel/slider with navigation
- Multi-step form
- Search results list
- Social media feed
- Weather widget
- Shopping cart summary
- Newsletter subscription form
- Video player with controls

## Templates

Page structures without specific content:

- Homepage layout
- Blog post template
- Product detail page layout
- User dashboard layout
- E-commerce category page template
- Contact page layout
- About us page structure
- Portfolio gallery layout
- Landing page template
- News article layout
- User profile page template
- Search results page layout
- Checkout process layout
- Documentation page template
- Job listing page layout
- Event details page template
- Restaurant menu page layout
- Real estate listing template
- Travel itinerary page layout
- FAQ page structure

This structure allows for a modular, scalable, and maintainable design system that promotes consistency across our application.

## **File Naming and Structure Convention**

### Rule:

Use the `.jsx` extension **by default** for any file that returns a JSX component. Group all files related to a specific component together for better organization and maintainability.

### Example:

For a component named `BrandImage`, use the following structure:

```
/BrandImage/
├── BrandImage.jsx           # The main React component file
├── BrandImage.stories.jsx    # Storybook file for documenting and testing the component
├── BrandImage.test.jsx       # Test file for unit or integration tests
└── index.js                  # Optional re-export file for cleaner imports
```

#### Explanation:

1. **`BrandImage.jsx`:** Contains the React component code and JSX syntax.
2. **`BrandImage.stories.jsx`:** Used with Storybook to showcase and test the component in isolation.
3. **`BrandImage.test.jsx`:** Contains unit or integration tests for the component.
4. **`index.js`:** Re-exports the component to simplify imports elsewhere in the project.

#### Import Example:

If you include an `index.js`, you can import the component like this:

```javascript
import BrandImage from "./BrandImage";
```

---

This structure promotes modularity, scalability, and maintainability while ensuring consistency across your application.

<div style="text-align: center">⁂</div>
