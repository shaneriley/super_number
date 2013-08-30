$ = jQuery

sn =
  init: (val) ->
    @$el = $("#test_input").val(val);
    @
  fire: ->
    @$el.superNumber()
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
  sn.data.controls.$increment.trigger("mouseup")
  $el.shouldHaveValue("1")

test "decrement button decrements by 1 when clicked", ->
  $el = sn.init(0).fire().focus()
  sn.data.controls.$decrement.trigger("mouseup")
  $el.shouldHaveValue("-1")

test "treat blank input as 0", ->
  $el = sn.init().fire().focus()
  sn.data.controls.$increment.trigger("mouseup")
  $el.shouldHaveValue("1")

# module "Options"
#
# test "specify minimum value"
# test "specify maximum value"
# test "specify step value"
# test "step value reverts to step increment if non-step value is entered manually"
# test "specify scale (minimum number of digits)"
# test "disable hide on blur"
# test "add decimal precision"
# test "disable loop"
# test "specify custom controls"
# test "specify custom container"
