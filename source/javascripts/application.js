$(function() {

  $("input.default").superNumber();

  $("input.single_digits").superNumber({
    min: 1,
    max: 9,
    loop: true
  });

  $("input.money").superNumber({
    scale: 2,
    step: 0.05,
    formatInput: function(val) {
      return val.replace("$", "");
    },
    formatOutput: function(val) {
      return "$" + val;
    }
  });

  $("input.hours").superNumber({
    min: 1,
    max: 12,
    loop: true
  });

  $("input.minutes").superNumber({
    min: 0,
    max: 59,
    precision: 2,
    loop: true
  });

});
