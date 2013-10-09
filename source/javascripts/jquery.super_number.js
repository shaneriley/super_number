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
    detectDataAttributes: function(attrs) {
      var s = this;
      $.each(attrs, function(k, v) {
        s[v] = s.$el.data(v) != undefined ? s.$el.data(v) : s[v];
      });
    },
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
    formatOutput: function(val) { return val; },
    formatInput: function(val) { return val; },
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
    changeValue: function(e) {
      e.preventDefault();
      var $e = $(this),
          s = $e.data(super_number.name),
          multiple = s.scale != 0 ? Math.pow(10, s.scale) : 1,
          v = Math.round(multiple * s.formatInput(s.$el.val()) * multiple) / multiple,
          step  = multiple * s.step,
          mod = v % step,
          val_up = v + (mod ? (step - mod) : step),
          val_down = v - (mod ? mod : step),
          new_val;
      if (!$.isNumeric(v)) {
        s.$el.val(s.formatOutput(s.setPrecision(s.setScale(0)))).change();
        return;
      };
      if ($e.is(s.$el)) {
        if (mod && s.force_step) {
          new_val = ((val_up - v) < (v - val_down)) ? val_up : val_down;
        } else {
          new_val = v;
        }
      } else {
        var dir = $e.hasClass("increment"),
            step_val = dir ? val_up : val_down,
            calc_val = v + step * (dir ? 1 : -1);
        mod = Math.round((calc_val % step) * multiple) / multiple;
        new_val = mod ? step_val : calc_val;
      }
      new_val = new_val / multiple;
      if (new_val > s.max || new_val < s.min) {
        var is_max = new_val > s.max;
        s.$el.trigger(s.name + "." + (is_max ? "max" : "min") + "Reached");
        if (!s.loop) {
          new_val = is_max ? s.max : s.min;
        }
        else {
          new_val = is_max ? s.min : s.max;
        }
      }
      new_val = s.setPrecision(s.setScale(new_val));
      s.$el.val(s.formatOutput(new_val)).change();
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
      s.detectDataAttributes(["max", "min", "step", "precision", "scale"]);
      s.createElements();
      s.$el.on("keydown." + s.name + ".keyup", s.keyup);
      s.$el.closest("." + s.container["class"]).on("mouseup." + s.name + ".click", "a", s.changeValue)
        .on("mousedown." + s.name + ", click." + s.name, "a", false);
      s.hide_on_blur && s.$el.on("focus." + s.name + ".toggle, blur." + s.name + ".toggle", s.toggle);
      s.force_step && s.$el.on("blur." + s.name, s.changeValue);
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
      force_step: true,
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
