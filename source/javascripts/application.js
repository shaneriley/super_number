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

  var clouds = {
    $el : $("#clouds"),
    tierCount: 4,
    cloudCount: 5,
    getRange: function(min, max) {
      return min + Math.random() * (max - min);
    },
    drawTier: function(num) {
      for (var i = 0; i < this.cloudCount; i++) {
        this.drawCloud(num);
      }
    },
    drawCloud: function(tier) {
      var $c = $("<div />", { "class": "cloud" }),
          last_y = 0,
          row_length = this.getRange(5, 15);
      for (var row = 0; row < this.getRange(2, 5); row++) {
        var last_x = this.getRange(50, 100) * row,
            y = row  * (tier * 0.7) * (100 * (1 - row * 0.2));
        for (var bulge = 0; bulge < row_length; bulge++) {
          var dims = this.getRange(150, 200) * (tier * 0.7) * (1 - row * 0.2);
          var $span = $("<span />");
          $span.css({
            width: dims,
            height: dims,
            left: last_x,
            bottom: y
          });
          last_x = last_x + this.getRange(0, dims * 0.5);
          $c.append($span);
        }
        row_length = row_length * 0.7;
      }
      var duration = this.getRange(60 * (tier + 1) * 0.8, 60 * (tier + 1) * 1.2),
          delay = this.getRange(-duration, 0);
      $c.css({
        opacity: 1 - (tier * 0.2),
        bottom: - $c.children().first().height() / 2,
        "-webkit-animation": "drift " + duration + "s " + delay + "s infinite"
      });
      this.$el.prepend($c);
    },
    draw: function() {
      for (var i = 0; i <= this.tierCount; i++) {
        this.drawTier(i);
      }
    }
  };

  clouds.draw();

});
