/*
 * Name: altai_count
 * Title: Altai Count
 * Description: Set maximum characters and display remaining.
 *
 */

// jQuery
var jQuery;

(function($, window, document) {
  return $.fn.extend({
    altaiCount: function(options) {
      // Variables
      var action, current, log, settings;
      var object = $(this);

      // Default settings
      settings = {
        maxCharacters: 140,
        klass: ".altai-characters",
        tagline: "characters remaining.",
        debug: false
      };
      settings = $.extend(settings, options);

      // Log
      log = function(message) {
        if (settings.debug) {
          if (typeof ((console === "undefined") && (console === null))) {
            return console.log(message);
          } else {
            return undefined;
          }
        } else {
          return undefined;
        }
      };

      // Current state
      current = function() {
        var currentLength, currentTotal, maxLength;
        maxLength = settings.maxCharacters;
        currentLength = object.val().length;
        currentTotal = maxLength - currentLength;
        $(settings.klass).text(currentTotal + " " + settings.tagline);
        if (currentTotal <= 0) {
          $(settings.klass ).addClass("alert");
          return;
        }
      };

      // Action
      action = function() {
        object.each(function() {
          $(this).on("change keyup paste", function() {
            var length, total, maxLength;
            maxLength = settings.maxCharacters;
            length = $(this).val().length;
            total = maxLength - length;
            $(settings.klass).text(total + " " + settings.tagline);
            $(this).attr("maxlength", maxLength);
            if (total <= 0) {
              return $(settings.klass).addClass("alert");
            } else {
              return $(settings.klass).removeClass("alert");
            }
          });
        });
      };

      // If object found run actions
      if (object.length > 0) {
        return this.each(function() {
          current();
          action();
          log("Altai Count Activated");
        });
      }
    }
  });
})(jQuery, window, document);
