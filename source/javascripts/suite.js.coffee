$ = jQuery

sn =
  up: (num) ->
    num ?= 1
    @data.controls.$increment.trigger("mouseup") while num--
  down: (num) ->
    num ?= 1
    @data.controls.$decrement.trigger("mouseup") while num--
  keydown: (k, msg, $el) ->
    $el ?= @$el
    if msg then ok true, "I press #{msg}"
    $e = $.Event('keydown.superNumber')
    $e.keyCode = $e.which = k
    $el.trigger($e)
  init: (val) ->
    @$el = $("#test_input").val(val);
    @
  fire: (opts) ->
    @$el.superNumber(opts)
    @data = @$el.data("superNumber")
    @$el

$.fn.shouldContain = (text) ->
  equal @.text(), text, "#{@.selector} should contain the text #{text}"
  @

$.fn.shouldHaveValue = (val) ->
  equal @.val(), val, "#{@.selector} should have a value of #{val}"
  @

$.fn.shouldBe = (attr) ->
  ok @.is(attr), "#{@.selector} should be #{attr}"
  @

QUnit.begin(sn.init)

test "it is chainable", ->
  deepEqual(sn.init().fire().hide().show(), sn.$el)

test "controls appear on focus", ->
  $el = sn.init().fire()
  $el.focus()
  sn.data.controls.$increment.shouldBe(":visible")
  sn.data.controls.$decrement.shouldBe(":visible")

test "controls disappear on blur", ->
  $el = sn.init().fire()
  $el.focus().blur()
  sn.data.controls.$increment.shouldBe(":hidden")
  sn.data.controls.$decrement.shouldBe(":hidden")
  $el.shouldHaveValue("0")

test "increment button increments by 1 when clicked", ->
  $el = sn.init(0).fire()
  sn.up()
  $el.shouldHaveValue("1")

test "decrement button decrements by 1 when clicked", ->
  $el = sn.init(0).fire()
  sn.down()
  $el.shouldHaveValue("-1")

test "treat blank input as 0", ->
  $el = sn.init().fire()
  $el.blur()
  $el.shouldHaveValue("0")
  sn.up()
  $el.shouldHaveValue("1")

test "convert non-numeric input gracefully to 0", ->
  $el = sn.init().fire()
  $el.val("Alfred Molina")
  sn.up()
  $el.shouldHaveValue("0")

module "Keyboard Support"

test "Up and down arrow should increment and decrement", ->
  $el = sn.init().fire()
  sn.keydown(38, "up arrow")
  $el.shouldHaveValue("1")
  sn.keydown(40, "down arrow")
  sn.keydown(40, "down arrow")
  $el.shouldHaveValue("-1")

module "Options"

test "specify minimum value", ->
  $el = sn.init(4).fire
    min: 2
  sn.down(3)
  $el.shouldHaveValue("2")

test "specify maximum value", ->
  $el = sn.init(4).fire
    max: 10
  sn.up(8)
  $el.shouldHaveValue("10")

test "specify step value", ->
  $el = sn.init(0).fire
    step: 5
  sn.up(3)
  $el.shouldHaveValue("15")

test "force value to conform to step on blur", ->
  $el = sn.init(3).fire
    step: 5
  $el.val("6").blur()
  $el.shouldHaveValue(5)
  $el.val("8").blur()
  $el.shouldHaveValue(10)

test "step value reverts to step increment if non-step value is entered manually", ->
  $el = sn.init(11).fire
    step: 5
  sn.up()
  $el.shouldHaveValue("15")
  $el.val("14")
  sn.down()
  $el.shouldHaveValue("10")

test "specify precision (min. digits preceding decimal)", ->
  $el = sn.init("005").fire
    precision: 3
  $el.shouldHaveValue("005")
  sn.up(50)
  $el.shouldHaveValue("055")
  sn.up(50)
  $el.shouldHaveValue("105")
  sn.down(110)
  $el.shouldHaveValue("-005")
  sn.down(90)
  $el.shouldHaveValue("-095")

test "specify scale (min. digits after decimal)", ->
  $el = sn.init("5.000").fire
    scale: 3
  $el.shouldHaveValue("5.000")
  sn.up(50)
  $el.shouldHaveValue("55.000")
  sn.down(110)
  $el.shouldHaveValue("-55.000")

test "specify decimal step value w/ precision and scale", ->
  $el = sn.init("07.95").fire
    precision: 2
    scale: 2
    step: 0.05
  $el.shouldHaveValue("07.95")
  sn.up()
  $el.shouldHaveValue("08.00")
  sn.down()
  $el.shouldHaveValue("07.95")
  sn.down(160)
  $el.shouldHaveValue("-00.05")

test "disable hide on blur", ->
  $el = sn.init().fire
    hide_on_blur: false
  $el.focus()
  sn.data.controls.$increment.shouldBe(":visible")
  $el.blur()
  sn.data.controls.$increment.shouldBe(":visible")

test "loop", ->
  $el = sn.init(4).fire
    min: -5
    max: 5
    loop: true
  sn.up(2)
  $el.shouldHaveValue(-5)
  sn.down(3)
  $el.shouldHaveValue(3)

test "loop with step when max & step don't match up", ->
  $el = sn.init(0).fire
    min: 0
    max: 59
    step: 5
    loop: true
  sn.down()
  $el.shouldHaveValue(55)
  sn.up(3)
  $el.shouldHaveValue(10)

test "snap to min or max if looping to bottom off-step", ->
  $el = sn.init(4).fire
    step: 5
    force_step: true
  sn.down()
  $el.shouldHaveValue(0)

test "disable forcing value to conform to step on blur", ->
  $el = sn.init(3).fire
    step: 5
    force_step: false
  $el.val("6").blur()
  $el.shouldHaveValue(6)

test "formatOutput and formatInput", ->
  $el = sn.init("$11.99").fire
    scale: 2
    formatOutput: (val) ->
      "$#{val}"
    formatInput: (val) ->
      val.replace("$", "")
  sn.up()
  $el.shouldHaveValue("$12.00")

test "increment and decrement events", ->
  $el = sn.init(2).fire()
  $el.trigger("increment.superNumber")
  $el.shouldHaveValue(3)
  $el.trigger("decrement.superNumber")
  $el.shouldHaveValue(2)

test "minReached and maxReached events", ->
  $el = sn.init(1).fire
    min: 0
    max: 2
  $message = $("<p />").addClass("message");
  $el.on("superNumber.maxReached", ->
    $message.text("Max Reached")
  )
  $el.on("superNumber.minReached", ->
    $message.text("Min Reached")
  )
  sn.up()
  $message.shouldContain("");
  sn.up()
  $message.shouldContain("Max Reached");
  sn.down(3)
  $message.shouldContain("Min Reached");
