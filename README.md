# jQuery superNumber v1.3.0

A tiny plugin that adds spinner-like controls to text inputs. Licensed under GPL 2.0 [http://www.gnu.org/licenses/gpl-2.0.html](http://www.gnu.org/licenses/gpl-2.0.html)

## Usage

To initialize with all defaults, grab your inputs with jQuery and call `.superNumber` on them.
Your input will have controls and a container added to it that will look like
this by default:

```html
<div class="super_number">
  <input type="text" />
  <a class="increment" href="#">+</a>
  <a class="decrement" href="#">-</a>
</div>
```

## Events

To increment or decrement a super_number input, just fire `increment.superNumber` or `decrement.superNumber` on the input, e.g.

```javascript
$('input').trigger('increment.superNumber');
```

When superNumber reaches either end of a defined range, it fires `maxReached.superNumber` and `minReached.superNumber` on the input. This in conjunction with the above events makes it easy for inputs to work together (for example, coupling hour and minute fields).

Positioning of the anchor controls is now left to CSS or outside scripting as of v1.2.5.

## Options

Technically, everything is overridable, right down to the initializer method,
but the options you're likely to override are:

```javascript
{
  dataAttributes: [
    "max", "min", "step",
    "precision", "scale"
  ],                                 // Data attributes that will be mapped to take the place of native number input attributes
  name: "superNumber",               // Name used for the plugin method
  max: undefined,                    // Max value for input
  min: undefined,                    // Min value for input
  step: 1,                           // Amount to change value by
  force_step: true,                  // Conform to element step amount when input blurred
  loop: false,                       // Exceeding min/max loops to opposite end
  precision: 0,                      // Number of integer places
  scale: 0,                          // Number of decimal places
  inteval_delay: 200,                // Time in milliseconds to wait before change fired on mousedown
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

Two custom events can be bound to the input and triggered when the min or max
values are reached. To bind these, use the plugin name with namespaces of
`minReached` and `maxReached`.

```javascript
$(".super_input").on("superNumber.maxReached", function() {
  $(this).next(".notice").text("Maxed out!");
});
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
