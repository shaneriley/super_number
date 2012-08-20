$(function() {
  $.fn.superNumber.defaults.min = 0;

  $("input.default").superNumber();

  $("input.step_5").superNumber({
    step: 15,
    max: 45,
    precision: 2,
    loop: true
  });
});
