$(function ($) {
    var tid;
    function refreshRem() {
        var width = window.innerWidth  ;
        var height = window.innerHeight ;
        var widthImgPC = 1161;
        var heightImgPC = 1695;
        var widthImgSection = width * 0.38;
        var heightImgSection = height;
        
        if (width > 1000) {
            var font = width / 10;
            $('html').css('font-size', font + 'px');
            var img = $('.two img.pc-show');


            if (widthImgSection / heightImgSection > widthImgPC / heightImgPC) {
                img.css('width','100%');
                img.css('height','auto');
            } else {
                img.css('width','auto');
                img.css('height','100%');

            }
        } else if (width <= 1000 && width > 700) {
            var rem = width * 100 / 1024 / 1.4;
            $('html').css('font-size', rem + 'px');

        } else {
            var rem = width * 100 / 1024;
            $('html').css('font-size', rem + 'px');
        }
        if (ie < 10 && document.body.clientWidth > 1000) {
            // logos height for ie 9 -
            var logoHeight = $('img.pc-show.logo-1')[0].offsetHeight;
            $('.logos').css('height', logoHeight + 'px');
            //alert(document.body.clientHeight);
        }
    }

    refreshRem();

    if (window.addEventListener) {
        window.addEventListener("resize", function () {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }, false);
        window.addEventListener("pageshow", function (e) {
            if (e.persisted) { // 浏览器后退的时候重新计算
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        }, false);
    } else {
        window.attachEvent("resize", function () {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        });
        window.attachEvent("pageshow", function (e) {
            if (e.persisted) { // 浏览器后退的时候重新计算
                clearTimeout(tid);
                tid = setTimeout(refreshRem, 300);
            }
        });
    }
    
});