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

* `title` : titre de la carte
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

*
*
*
*

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