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
