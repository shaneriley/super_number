$ = jQuery


sn =
  init: ->
    @$el = $("#test_input")

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
  deepEqual(sn.init().superNumber().hide().show(), sn.$el)

test "controls appear on focus", ->
  $el = sn.init().superNumber()
  $el.focus()
  $el.data("superNumber").controls.$increment.shouldBe(":visible")
  $el.data("superNumber").controls.$decrement.shouldBe(":visible")

test "controls disappear on blur", ->
  $el = sn.init().superNumber()
  $el.focus().blur()
  $el.data("superNumber").controls.$increment.shouldBe(":hidden")
  $el.data("superNumber").controls.$decrement.shouldBe(":hidden")

# test "controls disappear on outside click"
# test "controls don't disappear when clicked on"
# test "increment button increments"
# test "decrement button decrements"
#
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
