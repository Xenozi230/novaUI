# Changelog


## 0.3.2 (2025-12-23)
### Continuation of the component architecture refactoring
## NovaInput
###  Technical Changes
- Refactored component lifecycle to fully align with Nova UI standards
- `render()` is now called **only once** during `connectedCallback`
- Removed all `render()` calls from `attributeChangedCallback`
- Attribute changes now trigger **only `update()`**

### Structure
- Stable and persistent Shadow DOM structure
- Input element is created once and reused
- Label, helper text, and error elements are always present in the DOM
- Visibility handled via state logic instead of conditional rendering

### State Management
- Clear separation between:
  - internal state (`_value`, `_disabled`, `_error`)
  - external API (HTML attributes)
- Prevented attribute mutation loops during user input
- Internal value updates no longer re-trigger full component updates

### Interactions
- Smooth and lag-free typing experience
- Reliable `nova-change` event dispatch
- Disabled state fully blocks interaction

### Improvements
- Major performance improvement on input events
- Predictable behavior when controlled via JS or HTML
- Architecture fully consistent with other Nova UI form components


## NovaProgressBar
### Technical Changes
- Refactored rendering logic to avoid Shadow DOM rebuilds
- Progress updates now handled exclusively via `update()`
- Removed unnecessary DOM mutations on value changes

### Structure
- Fixed and persistent progress bar DOM
- Progress fill element reused for all updates
- CSS variables used for:
  - progress color
  - background color
  - height / size

### State Management
- Proper synchronization between:
  - `value`
  - `max`
  - computed percentage
- Internal calculations optimized for frequent updates

### Improvements
- Smoother progress animations
- Better performance for real-time progress updates
- Cleaner and more maintainable internal logic

## NovaRadialProgress

### Technical Changes
- Full refactor to follow Nova UI lifecycle architecture
- `render()` executed once during initialization
- Attribute changes now update SVG state without recreating elements

### Structure
- Stable SVG and DOM structure
- Circles (`bg` and `progress`) are persistent
- Percentage label always present and updated dynamically

### State Management
- Optimized percentage calculation and stroke updates
- No DOM rebuild during value changes
- CSS variables centralized for:
  - size
  - colors
  - stroke width
  - text color

### Improvements
- Significantly smoother radial updates
- Reduced layout and paint cost
- Reliable behavior for animated or real-time progress use cases

## NovaSlider

### Technical Changes
- Fixed critical performance issue causing severe lag on drag
- Removed `render()` calls from high-frequency events (`input`)
- Internal value updates no longer trigger attribute mutations

### Structure
- Slider DOM is now created once and kept stable
- Input range element reused throughout component lifecycle
- Value label visibility handled without DOM replacement

### State Management
- Clear distinction between:
  - internal slider state (dragging)
  - external attribute control
- Attribute updates no longer cause feedback loops

### Interactions
- Ultra-smooth drag experience
- Reliable `nova-change` event dispatch
- Disabled state correctly blocks interaction

### Improvements
- Massive performance boost during slider interaction
- No more input lag or stuttering
- Component now safe for real-time and animated use cases
- Fully aligned with Nova UI architectural rules



## 0.3.1 (2025-12-22)
###  Major Component Architecture Refactor
## NovaCard
###  Technical Changes
- Removed `render()` calls from `attributeChangedCallback`
- `render()` is now called **only once** in `connectedCallback`
- Introduced a clear lifecycle:
    - `render()` → DOM creation
    - `update()` → visual state updates

###  Structure
- Stable and persistent HTML structure
- `.title` element is always present in the DOM
- Title visibility is handled via logic instead of conditional rendering

### State Management
- Dynamic title updates without rebuilding the Shadow DOM
- Centralized handling of:
    - title alignment
    - title size
    - title color
    - card padding
    - background color

### Improvements
- Better performance (less Shadow DOM re-creation)
- Predictable behavior when attributes change
- Architecture aligned with all other Nova UI components
##  NovaCheckbox

### Technical Changes
- Fixed lifecycle method name:
- `attributesChangedCallback` → `attributeChangedCallback`
- Removed `render()` calls from attribute updates
- Centralized visual updates in `update()`

###  Structure
- Fixed and persistent HTML structure
- Clear separation between:
    - structure (`render`)
    - state logic (`attributeChangedCallback`)
    - visual updates (`update`)

###  Interactions
- Fixed click logic:
- clicks are ignored **only when disabled**
- Reliable toggle flow:
    - click → `checked` attribute update
    - `nova-change` event dispatched

### State Management
- Proper synchronization between:
- internal `_checked` state
- HTML `checked` attribute
- Immediate visual updates:
    - color
    - border
    - size
    - disabled state

###  Improvements
- Checkbox is now fully functional and clickable
- Consistent behavior whether controlled via JS or HTML
- Fully aligned with Nova UI component architecture

##  NovaButton

### Technical Changes
- Unified component architecture with other Nova UI components
- Clear separation of concerns:
    - `render()` → creates DOM structure
    - `update()` → updates visual state only
- Attribute handling centralized via `attributeChangedCallback`

### Structure
- Stable Shadow DOM structure
- Button element is created once and reused
- Uses CSS variables for dynamic color management

###  Attributes & State
- Fully reactive attributes:
    - `label`
    - `variant` (solid / outline / ghost)
    - `size`
    - `color`
    - `text-color`
    - `disabled`
    - `hover-animated`
    - `noclick-animated`
- Internal state always synchronized with HTML attributes

###  Interactions
- Custom `nova-click` event dispatched on valid clicks
- Disabled state fully blocks interaction and animations
- Optional hover and click animations controlled via attributes

###  Improvements
- Predictable and consistent behavior
- Better performance (no unnecessary re-renders)
- Architecture aligned with Nova UI standards
- Ready for large-scale usage and extensions

##  NovaBadge

### 🔧 Technical Changes
- Refactored to follow the Nova UI standard component structure
- Removed unnecessary DOM rebuilds on attribute changes
- Centralized visual updates in `update()`

###  Structure
- Minimal and stable Shadow DOM
- Badge content handled via attribute or slot (depending on implementation)
- Lightweight and performance-oriented design

###  Attributes & State
- Reactive attributes for:
    - text / label
    - color
    - background
    - size
    - variant (if applicable)
- Visual state updates instantly on attribute changes

###  Improvements
- Cleaner internal logic
- Easier customization and theming
- Consistent behavior with other Nova UI components
- Ideal for labels, status indicators, and counters


## 0.3.0 (2025-12-14)
### New Components
* Added `<nova-input>`: configurable text input with `placeholder`, `value`, `type`, `icon`, `color`, `bg`, `size`, `error`, and `disabled` attributes.
* Added `<nova-badge>`: badge component with `label`, `icon`, `color`, `bg`, `size`, `rounded`, and `variant` attributes.
* Added `<nova-slider>`: range slider with `min`, `max`, `value`, `step`, `color`, `track-color`, `size`, `disabled`, and `show-value` attributes.

## 0.2.0 (2025-12-07)
### New Components
* Added `<nova-progressbar>`: horizontal progress bar with `value`, `max`, `color`, `bg`, `height`, `show-percent`, and `percent-color` attributes.
* Added `<nova-radialprogress>`: circular progress indicator with `value`, `max`, `stroke`, `color`, `bg` and `text-color` attributes.

## 0.1.0 (2025-12-06)
### Features
* Initial project setup
* Added core components and basic architecture
* Implemented first working version of the main module
