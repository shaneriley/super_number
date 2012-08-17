$(function() {
  $.fn.superNumber.defaults.min = 0;

  $("input.default").superNumber();

  $("input.step_5").superNumber({
    step: 5,
    max: 50
  });
});
