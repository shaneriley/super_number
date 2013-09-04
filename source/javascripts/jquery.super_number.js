/* jQuery superNumber version 1.1.1
 * (c) 2012 Shane Riley
 * Original source at https://github.com/shaneriley/super_number
 * Licensed under GPL 2.0 (http://www.gnu.org/licenses/gpl-2.0.html)
 * Source hosted at http://www.gnu.org/licenses/gpl-2.0.html
 */
(function($) {
  if (!$) { return; }

  var super_number = {
    name: "superNumber",
    createElements: function() {
      var s = this,
          container_opts = $.extend({}, s.container),
          $c;
      delete container_opts.element;
      s.$el.wrap($(s.container.element, container_opts));
      $c = s.$el.closest("." + container_opts["class"]);
      $.each(["in", "de"], function(i, v) {
        var c = v + "crement",
            $e = s.controls.$el.clone().text(s.controls[c]).data(super_number.name, s)
                  .addClass(c);
        s.hide_on_blur && $e.hide();
        s.controls["$" + c] = $e.appendTo($c);
      });
    },
    positionControls: function() {
      var s = this;
      s.controls.$increment.add(s.controls.$decrement)
        .css({
          left: (s.$el.closest("." + s.container["class"]).outerWidth() - s.controls.$increment.outerWidth()) / 2
        });
    },
    formatOutput: function(val) { return val; },
    setScale: function(val) {
      var s = this,
          multiple = +("1" + Array(s.scale + 1).join(0)),
          chopped = "" + Math.round((val * multiple)) / multiple;
      if (!/\./.test(chopped) && s.scale) { chopped += "."; }
      chopped = chopped.replace(/\d*$/, function($1) {
        return $1 + (s.scale - $1.length > 0 ? Array(s.scale - $1.length + 1).join("0") : "");
      });
      return chopped;
    },
    setPrecision: function(v) {
      var val = v.replace(/\-/, ""),
          neg = v.length == val.length ? "" : "-",
          whole_num = val.replace(/\..*/, ""),
          decimal = val.replace(/-?\d*\.?/, "");
      if (whole_num.length < this.precision) {
        whole_num = Array(this.precision - whole_num.length + 1).join("0") + whole_num;
      }
      return neg + whole_num + (decimal ? "." + decimal : "");
    },
    keyup: function(e) {
      if (e.which !== 38 && e.which !== 40) { return; }
      var s = $(this).data(super_number.name);
      s.controls["$" + (e.which === 38 ? "in" : "de") + "crement"].mouseup();
    },
    click: function(e) {
      e.preventDefault();
      var $e = $(this),
          increment = $e.hasClass("increment"),
          s = $e.data(super_number.name),
          multiple = s.scale != 0 ? Math.pow(10, s.scale) : 1,
          v = (s.$el.val() ? +s.$el.val() : 0) * multiple,
          change = (increment ? 1 : -1) * s.step * multiple,
          step = s.step * multiple,
          diff = v + change,
          mod = Math.round(((diff * multiple) % step) * multiple) / multiple;
      if (mod) {
        diff = increment ? diff - mod : diff + (step - mod);
      }
      diff = diff / multiple;
      if (diff > s.max || diff < s.min) {
        if (!s.loop) { return; }
        else {
          diff = diff > s.max ? s.min : s.max;
        }
      }
      diff = s.setPrecision(s.setScale(diff));
      s.$el.val(s.formatOutput(diff)).change();
    },
    toggle: function(e) {
      var $e = $(this),
          s = $e.data(super_number.name);
      s.controls.$increment.add(s.controls.$decrement).toggle(e.type === "focus");
    },
    destroy: function() {
      var $els = this;
      $els.each(function(i) {
        var s = $els.eq(i).data(super_number.name);
        $.each(["in", "de"], function(j, v) {
          s.controls["$" + v + "crement"].remove();
        });
        $els.unwrap("." + s.container["class"]).unbind("." + s.name).removeData(s.name);
      });
    },
    init: function() {
      var s = this;

      if (!s.$el.is(":input")) {
        $.error("jQuery." + s.name + ": one or more elements are not inputs and will not be initialized");
        return;
      }
      s.createElements();
      s.positionControls();
      s.$el.on("keydown." + s.name + ".keyup", s.keyup);
      s.$el.closest("." + s.container["class"]).on("mouseup." + s.name + ".click", "a", s.click)
        .on("mousedown." + s.name + ", click." + s.name, "a", false);
      s.hide_on_blur && s.$el.on("focus." + s.name + ".toggle, blur." + s.name + ".toggle", s.toggle);
    }
  };

  $.each([super_number], function(i, plugin) {
    $.fn[plugin.name] = function(opts) {
      var $els = this,
          method = $.isPlainObject(opts) || !opts ? "" : opts;
      if (method && plugin[method]) {
        plugin[method].apply($els, Array.prototype.slice.call(arguments, 1));
      }
      else if (!method) {
        $els.each(function(i) {
          var plugin_instance = $.extend(true, {
            $el: $els.eq(i)
          }, $.fn[plugin.name].defaults, plugin, opts);
          if (plugin_instance.$el.data(plugin.name)) { return; }
          plugin_instance.$el.data(plugin.name, plugin_instance);
          plugin_instance.init();
        });
      }
      else {
        $.error('Method ' +  method + ' does not exist on jQuery.' + plugin.name);
      }
      return $els;
    };

    $.fn[plugin.name].defaults = {
      max: undefined,
      min: undefined,
      step: 1,
      hide_on_blur: true,
      precision: 0,
      scale: 0,
      loop: false,
      controls: {
        $el: $("<a />", { href: "#" }),
        increment: "+",
        decrement: "-"
      },
      container: {
        element: "<div />",
        "class": "super_number"
      }
    };
  });
})(jQuery || undefined);
