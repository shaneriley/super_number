# jQuery superNumber v1.2.0

A tiny plugin that adds spinner-like controls to text inputs. Licensed under GPL 2.0 [http://www.gnu.org/licenses/gpl-2.0.html](http://www.gnu.org/licenses/gpl-2.0.html)

## Usage

To initialize with all defaults, grab your inputs with jQuery and call `.superNumber` on them.
Your input will have controls and a container added to it that will look like
this:

```html
<div class="super_number">
  <input type="text" />
  <a class="increment" href="#">+</a>
  <a class="decrement" href="#">-</a>
</div>
```

## Options

Technically, everything is overridable, right down to the initializer method,
but the options you're likely to override are:

```javascript
{
  name: "superNumber",               // Name used for the plugin method
  max: undefined,                    // Max value for input
  min: undefined,                    // Min value for input
  step: 1,                           // Amount to change value by
  loop: false,                       // Exceeding min/max loops to opposite end
  precision: 0,                      // Number of integer places
  scale: 0,                          // Number of decimal places
  formatInput: function(val) {       // Callback to format before processing. Must return a number.
    return val;
  },
  formatOutput: function(val) {      // Callback to format value. Must return a number.
    return val;
  },
  controls: {
    $el: $("<a />", { href: "#" }),  // Element template to use for controls
    increment: "+",                  // Text for incrementer element
    decrement: "-"                   // Text for decrementer element
  },
  container: {
    element: "<div />",              // Element to contain controls and input
    "class": "super_number"          // Class to add to containing element
  },
  hide_on_blur: true                 // Hide controls when input loses focus
}
```

You can also call a teardown method on one or more elements by passing a string
of "destroy".

```javascript
$("input").superNumber("destroy");
```

To modify any aspect of the plugin after initialization, grab one or more
elements with jQuery and manipulate the data object stored as the plugin name
(defaults to "superNumber").

```javascript
$("input").superNumber();
$("input").eq(3).data("superNumber").max = 400;
```
