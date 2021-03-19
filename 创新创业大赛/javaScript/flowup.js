var dgPull = dgPull || {};

(function ($) {
    $(document).ready(function () {
        $(window).scroll(dgPull.scrollFn);
    });
})(jQuery);

(function ($) {
    $.fn.flowUp = function (e, options) {
        var settings = $.extend({
            // Default
            translateY: 150,
            duration: .8,
            externalCSS: false
        }, options);

        $(e).addClass('pullup-element');
        $(e).each(function (i, el) {
            var el = $(el);
            if (el.visible(true)) {
                el.addClass("already-visible");
            }
            else {
                el.addClass('opaque');
            }
        });
        if (!settings.externalCSS) {
            $("head").append('<style>.come-in{opacity: 1; -ie-transform:translateY(' + settings.translateY + 'px);-webkit-transform:translateY(' + settings.translateY + 'px);transform:translateY(' + settings.translateY + 'px);-webkit-animation:come-in ' + settings.duration + 's ease forwards;animation:come-in ' + settings.duration + 's ease forwards}.come-in:nth-child(odd){-webkit-animation-duration:' + settings.duration + 's;animation-duration:' + settings.duration + 's}.already-visible{opacity: 1;-ie-transform:translateY(0);-webkit-transform:translateY(0);transform:translateY(0);-webkit-animation:none;animation:none}@-webkit-keyframes come-in{to{-ie-transform:translateY(0);-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes come-in{to{-ie-transform:translateY(0);-webkit-transform:translateY(0);transform:translateY(0)}} .opaque { opacity: 0; }</style>');
        }
        return this;
    };

    $.fn.visible = function (partial) {
        var $t = $(this),
            $w = $(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
    };

}(jQuery));

dgPull.scrollFn = function () {
    jQuery(".pullup-element").each(function (i, el) {
        var el = jQuery(el);
        if (el.visible(true)) {
            el.addClass("come-in");
            el.removeClass("opaque");
        }
    });
}