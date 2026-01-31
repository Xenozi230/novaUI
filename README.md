# NovaUI

A lightweight, modern Web Components UI library — no frameworks required.

NovaUI provides customizable UI elements such as buttons, checkboxes ... 
It is lightweight, fast, and works everywhere.

## ⚖️ License

Nova UI is released under a dual license:

- **Non-Commercial License** – Free for personal, educational, or non-commercial projects.  
  See [`LICENSES/LICENSE-NONCOMMERCIAL.txt`](./LICENSES/NOCOMMERCIAL-LICENSE.md)

- **Commercial License** – Required for commercial use.   
  See [`LICENSES/LICENSE-COMMERCIAL.txt`](./LICENSES/COMMERCIAL-LICENSE.md)

## ✨ Available components

* `<nova-button>`
* `<nova-checkbox>`
* `<nova-card>`
* `<nova-toggle>`
* `<nova-loading>`
* `<nova-step>`
* `<nova-progressbar>`
* `<nova-radialprogress>`
* `<nova-input>`
* `<nova-badge>`
* `<nova-slider>`
* `<nova-radio>`
* `<nova-dropdown>`

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

### `<nova-progressbar>`
* `value` : Current progress value
* `max` : Maximum value (default: 100)
* `color` : Color of the filled progress bar
* `bg` : Background color of the bar
* `height` : Height of the bar
* `show-percent` : Displays the percentage below the bar
* `percent-color` : Color of the percentage text
### Example
```html
<nova-progressbar value="45" max="100" color="#6366f1" bg="#e5e7eb" height="15px" show-percent></nova-progressbar>
```
### `<nova-radialprogress>`
* `value` : Current progress value
* `max` : Maximum value (default: 100)
* `stroke` : Thickness of the progress stroke
* `color` : Color of the circular progress
* `bg` : Background track color
* `text-color`: Color of the percentage text
### Example
```html
<nova-radialprogress value="45" max="100" color="#6366f1" bg="#e5e7eb" stroke="12"></nova-radialprogress>
```
### `<nova-input>`
* `placeholder` : Text to display when the input is empty
* `value` : Current value of the field
* `type` : Input type Options: `text` , `password` , `email` , `number`
* `icon` : Icon placed to the left of the field
* `color` : Border and shadow color when in focus.
* `bg` : Background color of the field.
* `size` : Defines the input size Options: `small` , `medium` , `large` , `xlarge`
* `error` : Displays the field in error mode
* `disabled` : Disable the input
### Example
```html
<nova-input placeholder="Password" type="Password" size="small" color="red"></nova-input>
```
### `<nova-badge>`
* `label` : Text displayed inside the badge
* `icon` : Icon displayed inside the badge
* `color` : Color of the border
* `bg` : Background color of the badge
* `size` : Size of the badge. Options: `small` , `medium` , `large` , `xlarge`
* `rounded` : If present, makes the badge fully rounded
* `variant` : Style variant of the badge. Options: `solid` , `outline` , `ghost`
### Example
```html
<nova-badge label="New" variant="outline" size="small" icon="⭐"></nova-badge>
```
### `<nova-slider>`
* `min` : Minimum value of the slider (default: 0)
* `max` : Maximum value of the slider (default: 100)
* `value` : Current value of the slider
* `step` : Step increment/decrement (default: 1)
* `color` : Color of the slider thumb
* `track-color` : Color of the slider track
* `size` : Slider height size. Options: `small` , `medium` , `large` , `xlarge`
* `show-value` : Display the current value below the slider
* `disabled` : Disables the slider
### Example
```html
<nova-slider min="0" max="100" value="50" step="1" show-value></nova-slider>
```

### `<nova-dropdown>`
* `label` : Text displayed above the dropdown
* `value` : Currently selected value
* `color` : Accent color (focus border & active state)
* `text-color` : Color of the label text
* `size` : Dropdown height size. Options: `small` , `medium` , `large` , `xlarge`
* `disabled` : Disables the dropdown
### Example
```html
<nova-dropdown label="Select size" value="medium" color="#6366f1" text-color="#111827" size="medium">
  <option value="small">Small</option>
  <option value="medium">Medium</option>
  <option value="large">Large</option>
  <option value="xlarge">Extra Large</option>
</nova-dropdown>
```

### `<nova-radio>`
* `label` : Text displayed next to the radio button
* `name` : Radio group name (only one radio can be checked per name)
* `color` : Color of the active radio dot and border
* `text-color` : Color of the label text
* `size` : Radio button size. Options: `small` , `medium` , `large` , `xlarge`
* `disabled` : Disables the dropdown
* `checked` : Marks the radio as selected
### Example
```html
<nova-radio name="plan" label="Basic plan" color="#6366f1" text-color="#111827" size="medium" checked></nova-radio>
<nova-radio name="plan" label="Pro plan" color="#6366f1" size="medium"></nova-radio>
```