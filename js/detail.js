$(function ($) {
    var tid;
    function refreshRem() {
        var width = window.innerWidth;
        var height = window.innerHeight;

        if (width <= 1000 && width > 700) {
            var rem = width * 100 / 1024 / 1.4;
            $('html').css('font-size', rem + 'px');

        } else {
            var rem = width * 100 / 1024;
            $('html').css('font-size', rem + 'px');
        }

        // .panel 
        //font-size: 0.39rem;
        //margin-bottom: 0.28rem;

        //.content 
        //padding-bottom: 0.28rem;
        //padding-top: 0.28rem;

        //.panel-4 
        //font-size: 0.33rem;
        if (height / width < 1.7) {
        }
        else if (height / width >= 1.7 && height / width < 1.85) {
            $('.panel').css({
                'font-size': '0.32rem', 'margin-bottom': '0.15rem'
            });
            $('.panel .content').css({
                'padding-bottom': '0.15rem', 'padding-top': '0.15rem'
            });
            $('.panel.panel-4').css('font-size', '0.28rem');

        } else if (height / width >= 1.85 && height / width < 2) {
            $('.panel').css({
                'font-size': '0.36rem', 'margin-bottom': '0.2rem'
            });
            $('.panel .content').css({
                'padding-bottom': '0.2rem', 'padding-top': '0.2rem'
            });
            $('.panel.panel-4').css('font-size', '0.3rem');
        }
        else if (height / width >= 2) {
            $('.panel').css({
                'font-size': '0.39rem', 'margin-bottom': '0.28rem'
            });
            $('.panel .content').css({
                'padding-bottom': '0.28rem', 'padding-top': '0.28rem'
            });
            $('.panel.panel-4').css('font-size', '0.33rem');
        }
    }

    refreshRem();

    if (window.addEventListener) {
        window.addEventListener('resize', function () {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }, false);
        window.addEventListener('pageshow', function (e) {
            if (e.persisted) { // 浏览器后退的时候重新计算
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        }, false);
    } else {
        window.attachEvent('resize', function () {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        });
        window.attachEvent('pageshow', function (e) {
            if (e.persisted) { // 浏览器后退的时候重新计算
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        });
    }
    var startY;
    $('.section').on('touchstart', function (e) {
        if ($(e.target).hasClass('btn-arrow') ||
            $(e.target).hasClass('arrow')) {
            return;
        }
        e.preventDefault();
        startY = e.originalEvent.changedTouches[0].pageY;
    });
    $('.section').on('touchend', function (e) {
        if ($(e.target).hasClass('btn-arrow') ||
            $(e.target).hasClass('arrow')) {
            return;
        }
        e.preventDefault();
        var moveEndY = e.originalEvent.changedTouches[0].pageY;
        var Y = moveEndY - startY;
        var id = $('body').attr('data-active');
        if (Y > 100 && id > 1 ) {
            goto(Number(id) - 1);
        }
        else if (Y < -100  && id < 3) {
            goto(Number(id) + 1);
        }
    });

});
function goto(id) {
    $('.section').hide();
    $('#section-' + id).show();
    $('body').attr('data-active', id);
};
