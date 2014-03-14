// IIFE to ensure safe use of $
(function( $ ) {

  // Create plugin
  $.fn.tooltips = function(el) {

    var $tooltip,
      $body = $('body'),
      $el;

    // Ensure chaining works
    return this.each(function(i, el) {

      $el = $(el).attr("data-tooltip", i);

      // Make DIV and append to page 
      var $tooltip = $('<div class="tooltip" data-tooltip="' + i + '">' + $el.attr('href') + '<div class="arrow"></div></div>').appendTo("body");

      // Position right away, so first appearance is smooth
      var linkPosition = $el.position();

      $tooltip.css({
        top: linkPosition.top - $tooltip.outerHeight() - 13,
        left: linkPosition.left - ($tooltip.width()/2)
      });

      $el
      // Mouseenter
      .click(function(event) {
        console.log('clicked!');
        event.preventDefault();

        $el = $(this);

        $tooltip = $('div[data-tooltip=' + $el.data('tooltip') + ']');
        // $tooltip = $('div.tooltip');

        // Reposition tooltip, in case of page movement e.g. screen resize                        
        var linkPosition = $el.position();
        console.log(linkPosition);
        console.log($tooltip.outerHeight());

        $tooltip.css({
          // top: 200
          top: linkPosition.top - $tooltip.outerHeight() + 300,
          // left: linkPosition.left - ($tooltip.width()/2)
        });

        // Adding class handles animation through CSS
        $tooltip.addClass("active");

        // Mouseleave
      });

      });

    }

})(jQuery);