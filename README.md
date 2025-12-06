# NovaUI

A lightweight, modern Web Components UI library — no frameworks required.

NovaUI provides customizable UI elements such as buttons, checkboxes ... 
It is lightweight, fast, and works everywhere.

## ✨ Composants disponibles

* `<nova-button>`
* `<nova-checkbox>`
* `<nova-card>`
* `<nova-toggle>`


## 🛠️ Attributes

### `<nova-button>`

* `label` : Text inside the button
* `color` : Background color
* `text-color` : Text color
* `size` : One of: `small` , `medium` , `large` , `xlarge` , `xxlarge`
* `variant` : Different variant of the button `solid` , `outline` , `ghost`
* `hover-animated` : Enables hover animation
* `noclick-animated` : Disables click animation
* `disabled` : Disables the button
### Example
```html
<nova-button label="Click me" color="#6366f1"></nova-button>
```

### `<nova-checkbox>`

* `label` : Text next to the checkbox
* `checked` : Starts checked
* `color` : Check fill color
* `text-color` : Label text color
* `size` : One of: `small` , `medium` , `large` , `xlarge`
* (Coming Soon) `disabled` : Prevents interaction 
### Example
```html
<nova-checkbox label="Check me" color="#6366f1" text-color="#000" size="medium"></nova-checkbox>
```

### `<nova-card>`

* `title` : title of the card 
* `title-align` : One of: `left` , `center` , `right`
* `title-size` : Font-size for the title
* `title-color` : Text color of the title
* `background-color` : Card background color
### Example
```html
<nova-card title="My title" title-align="left">
  Card content
</nova-card>
```

### `<nova-toggle>`

* `label` : Text next to the toggle
* `checked` : Starts toggle on 
* `color` : Change toggle colors
* `text-color` : Label text color
* `size` : One of: `small` , `medium` , `large` , `xlarge`
* `disabled` : Prevents interaction 
### Example
```html
<nova-toggle label="Enable notifications" color="green" size="large" disabled></nova-toggle>
```

### `<nova-loading>`
* `variant` : Different variant of the loading `spinner` , `dots` 
* `thickness` : Thickness only for the spinner
* `speed` : Increases or decreases the speed of the spinner
* `size` : One of: `small` , `medium` , `large` , `xlarge`
* `color` : Change loading colors
### Example
```html
<nova-spinner variant="dots" color="red" speed="0.8s"></nova-spinner>
```

### `<nova-step>`

* `label` : Text displayed below the step circle
* `current` : Indicates the currently active step
* `size` : Size of all steps. Options: `small` , `medium` , `large` , `xlarge`
* `color` : Color of the active step. Applied to all steps
* `done-color` : Color of completed steps. Applied to all steps
* `text-color` : Color of the step labels. Applied to all steps
* `data-content` : Overrides the automatic step number with custom content inside the circle
### Example
```html
<nova-steps current="2" size="large" color="#f59e0b" done-color="#10b981" text-color="#111">
    <nova-step label="Step 1"></nova-step>
    <nova-step label="Step 2" data-content="✓"></nova-step>
    <nova-step label="Step 3"></nova-step>
</nova-steps>
```


## 🔨 Build System

NovaUI uses a small custom builder to merge all component files into a single output bundle.

```bash
node builder.js
```
### The script:
 - Reads all `.js` files from `/components`
 - Generates `dist/nova-ui.js`
 - Creates `/dist` automatically if missing

## 🧪 Development

### To add a new component:
  - Create a `.js` files in `/components`
  - Define your Web Component
  - Run :
  ```bash
  node builder.js
  ```
Your new component will be included in `dist/nova-ui.js`