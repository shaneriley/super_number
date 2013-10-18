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
    step: 5,
    loop: true
  }).on("superNumber.maxReached", function() {
    $("input.hours").trigger("superNumber.increment");
  }).on("superNumber.minReached", function() {
    $("input.hours").trigger("superNumber.decrement");
  });

  var numbers = {
    $el: $("#numbers"),
    number_of_doom: "94143243431512659321054872390486828512913474876027671959234602385829583047250165232525929692572765536436346272718401201264314754632945012784726484107562234789626728592858295347502772262646456217613984829519475412398501",
    getRange: function(min, max) {
      return Math.round(min + Math.random() * (max - min));
    },
    init: function() {
      for(var i=0; i<this.number_of_doom.length; i++) {
        var $span = $("<span />");
        $span.text(this.number_of_doom[this.getRange(0, this.number_of_doom.length-1)]);
        $span.css({
          "-webkit-animation": "pulse " + this.getRange(3, 60) + "s infinite linear"
        });
        this.$el.append($span);
      }
    }
  };

  numbers.init();

});
