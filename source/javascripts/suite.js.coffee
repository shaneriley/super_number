$ = jQuery

sn =
  up: (num) ->
    num ?= 1
    @data.controls.$increment.trigger("mouseup") while num--
  down: (num) ->
    num ?= 1
    @data.controls.$decrement.trigger("mouseup") while num--
  init: (val) ->
    @$el = $("#test_input").val(val);
    @
  fire: (opts) ->
    @$el.superNumber(opts)
    @data = @$el.data("superNumber")
    @$el

$.fn.getTextArray = ->
  ($(@).map -> $(@).text()).get()

$.fn.shouldHaveValue = (val) ->
  equal @.val(), val, "#{@.selector} should have a value of #{val}"
  @

$.fn.shouldBe = (attr) ->
  ok @.is(attr), "#{@.selector} should be #{attr}"
  @

$.fn.shouldNotBe = (attr) ->
  ok !@.is(attr), "#{@.selector} should not be #{attr}"
  @

$.fn.shouldSay = (text) ->
  equal @.text(), text, "#{text} is displayed within #{@.selector}"
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

test "increment button increments by 1 when clicked", ->
  $el = sn.init(0).fire().focus()
  sn.up()
  $el.shouldHaveValue("1")

test "decrement button decrements by 1 when clicked", ->
  $el = sn.init(0).fire().focus()
  sn.down()
  $el.shouldHaveValue("-1")

test "treat blank input as 0", ->
  $el = sn.init().fire().focus()
  sn.up()
  $el.shouldHaveValue("1")

module "Options"

test "specify minimum value", ->
  $el = sn.init(4).fire(
    min: 2
  )
  sn.down(3)
  $el.shouldHaveValue("2")

test "specify minimum value", ->
  $el = sn.init(4).fire(
    max: 10
  )
  sn.up(8)
  $el.shouldHaveValue("10")

test "specify step value", ->
  $el = sn.init(0).fire(
    step: 5
  )
  sn.up(3)
  $el.shouldHaveValue("15")

test "step value reverts to step increment if non-step value is entered manually", ->
  $el = sn.init(11).fire(
    step: 5
  )
  sn.up()
  $el.shouldHaveValue("15")
  $el.val("14")
  sn.down()
  $el.shouldHaveValue("10")

test "specify precision (min. digits preceding decimal)", ->
  $el = sn.init("005").fire(
    precision: 3
  )
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
  $el = sn.init("5.000").fire(
    scale: 3
  )
  $el.shouldHaveValue("5.000")
  sn.up(50)
  $el.shouldHaveValue("55.000")
  sn.down(110)
  $el.shouldHaveValue("-55.000")

test "specify decimal step value w/ precision and scale", ->
  $el = sn.init("07.95").fire(
    precision: 2
    scale: 2
    step: 0.05
  )
  $el.shouldHaveValue("07.95")
  sn.up()
  $el.shouldHaveValue("08.00")
  sn.down()
  $el.shouldHaveValue("07.95")
  sn.down(160)
  $el.shouldHaveValue("-00.05")

# test "disable hide on blur"
# test "add decimal precision"
# test "disable loop"
# test "specify custom controls"
# test "specify custom container"
