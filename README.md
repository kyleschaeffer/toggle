# What is Toggle?
Toggle is a lightweight JavaScript module that provides simple toggle interaction functionality using the accessible `[aria-expanded](https://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded)` HTML attribute. Toggle has no dependencies, and can be easily implemented into any workflow or framework.

# Getting Started
The easiest way to start using Toggle is to import via [npm](https://www.npmjs.com/):

```sh
npm install toggle-js --save-dev
```

Once installed, use Toggle in your scripts:

```javascript
import Toggle from 'toggle-js'

let toggle = new Toggle()
```

Alternatively, you may [download the minified script](https://raw.githubusercontent.com/oldrivercreative/toggle/master/dist/toggle.js) and add it to your solution manually.

## Creating Toggles
Once installed, create Toggle instances using `new Toggle()`:

```javascript
let toggle = new Toggle()
```

## Toggling
Once created, toggle **targets** (by default any element with a class of `toggle`) gain an `aria-expanded` attribute, indicating the **expanded** state (`true` or `false`). Adjacent toggle **buttons** (by default any `<button>`) will toggle the expanded state when clicked.

## Presentation
Toggle alters the `aria-expanded` attribute of the toggle target and may add or remove CSS class names from toggle targets, buttons, and parents. You are responsible for handling these states in your stylesheet. The easiest way to enable toggling is to make a simple addition to your stylesheet:

```css
\[aria-expanded="false"\] {
  display: none;
}
```

# Configuration
You may pass in a configuration object when instantiating new Toggles. All configuration options are fully documented in [options.js](https://github.com/oldrivercreative/toggle/blob/master/src/options.js). A summary of these configuration options is listed below:

```javascript
let toggle = new Toggle({
  blur: false,
  blurFilter: '.toggle, .toggle *, button, button *',
  buttonClass: 'toggle-btn',
  buttonClassExpanded: 'toggle-btn-active',
  buttonContent: '<span>Toggle</span>',
  buttonSelector: 'button',
  createButtons: false,
  parentClass: 'toggle-parent',
  parentClassExpanded: 'toggle-parent-active',
  scoped: true,
  single: false,
  singleSibling: false,
  targetClass: 'toggle-target',
  targetClassExpanded: 'toggle-target-active',
  targetSelector: '.toggle'
})
```
