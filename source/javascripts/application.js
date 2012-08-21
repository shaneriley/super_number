$(function() {
  $.fn.superNumber.defaults.min = 0;

  $("input.default").superNumber();

  $("input.step_5").superNumber({
    step: .6,
    max: 45,
    precision: 2,
    scale: 2,
    loop: true
  });
});
