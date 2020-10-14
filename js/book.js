

var lang = $('body').hasClass('cn') ? 'cn' : 'en';
var dataIndustry = lang === 'cn' ?
    [{ id: 0, name: '食品及农产品' }, { id: 1, name: '消费品' },
    { id: 2, name: '医疗器械及医药保健' }, { id: 3, name: '技术装备' },
    { id: 4, name: '服务贸易' }, { id: 5, name: '其他' }]
    : [{ id: 0, name: 'Food and Agriculture' }, { id: 1, name: 'Consumer Goods' },
    { id: 2, name: 'Medical Equipment & Health Care' }, { id: 3, name: 'Intelligent & Information Technology' },
    { id: 4, name: 'Trade in Services' }, { id: 5, name: 'Others' }];

var toast = new Toast({ timeout: 3000 });

function setSearchSize() {
    $('#search-tips-industry').css('max-height', 1.5 * dataIndustry.length + 'rem');
}

var tipTimeout = null;
function showTips(txt) {
    var text = '<p>' + txt + '</p>';
    $('.searchtext').html(text);
    $('.searchtext').fadeIn();
    if (tipTimeout != null) {
        clearTimeout(tipTimeout);
    }
    tipTimeout = setTimeout(function() {
        $('.searchtext').fadeOut();
    }, 2000);
}

function addListData(data, id) {
    var html = '';
    for (var i = 0; i < data.length; i++) {
        html += '<li data-name="' + data[i].name + '">' + data[i].name + '</li>';
    }
    $(id).html(html);
}



function searchSubmit(username) {
    var t_realname = $("#realname").val();
    var t_postname = $("#postname").val();
    var t_company = $("#search-company").val();
    var t_industry = $("#search-industry").val();
    var t_email = $("#email").val();
    var t_mobile = $("#mobile").val();
    var t_others = $("#others").val();

    $.ajax({
        type: "POST",
        url: "/index.php/Api/Book/savebook",
        timeout: 30000,
        data: {
            name: username
            , realname: t_realname
            , postname: t_postname
            , company: t_company
            , industry: t_industry
            , email: t_email
            , mobile: t_mobile
            , others: t_others
        },
        dataType: "json",
        success: function (res) {
            if (res.code == 0) {
                var toast = new Toast({ timeout: 10000 });
                $('.modal').show();
                $('.form').hide();

                $("#realname").val("");
                $("#postname").val("");
                $("#search-company").val("");
                $("#search-industry").val("");
                $("#email").val("");
                $("#mobile").val("");
                $("#others").val("");

                //window.location.reload();
                return false;
            } else {
                toast.show(lang === 'cn' ? '提交错误！！' : 'submit err!!');
                return false;
            }
        },
        error: function (xhr, status, error) {
            //console.log(error);
        }
    });
}

function searchSubmit_____bak(username) {
    $.ajax({
        type: "POST",
        url: "/index.php/Api/Index/getUserDetail",
        timeout: 30000,
        data: {
            name: username
        },
        dataType: "json",
        success: function (res) {
            if (res.code == 102) {
                toast.show(lang === 'cn' ? '额外的客人' : 'Additional Guest')
                return false
            }
            if (res.code == 200) {
                if (res.data.is_pay == 1) {
                    $.ajax({
                        type: "POST",
                        url: "/index.php/Api/Index/signUp",
                        data: {
                            user_id: Number(res.data.id)
                        },
                        dataType: "json",
                        success: function (response) {
                            if (response.code == 200) {
                                $('#search-company').val('')
                                toast.show(lang === 'cn' ? '欢迎加入' : 'Welcome and Enjoy')
                            } else {
                                toast.show(lang === 'cn' ? '签到失败' : 'Check-in failure')
                            }
                        }
                    });
                } else {
                    toast.show(lang === 'cn' ? '请先支付' : 'Please pay first')
                }
            }
        },
        error: function (xhr, status, error) {
            //console.log(error)
        }
    });
}

//阻止冒泡事件
function stopBubble(e) {
    if (e && e.stopPropagation) {
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}

$(function () {

    addListData(dataIndustry, '#search-tips-industry');

    setSearchSize();
    $(window).resize(function () {
        setSearchSize();
    });

    $('#search-industry').click(function (e) {
        $($('#search-company').attr('data-list')).hide();
        $(this).hide();
        $($(this).attr('data-list')).show();
        if (ie < 8 && document.body.clientWidth > 1000) {
            $('#mmobile').hide();
            //$('#email').hide();
            //$('#special').hide();
        }
        stopBubble(e);
    });

    $('.submit').on('click', function () {
        if ($('#realname').val() == '' || $('#realname').val() == 'Name' || $('#realname').val() == '姓名' ) {
            toast.show(lang === 'cn' ? '请输入您的姓名' : 'Please enter your name.');
            return false;
        }
        if ($('#postname').val() == '' || $('#postname').val() == 'Title' || $('#postname').val() == '职务') {
            toast.show(lang === 'cn' ? '请输入您的职务' : 'Please enter your title.');
            return false;
        }
        var val = $('#search-company').val()
        if (val == '' || $('#search-company').val() == 'Organization' || $('#search-company').val() == '公司') {
            toast.show(lang === 'cn' ? '请输入您的公司' : 'Please enter your organization.');
            return false;
        }
        if ($('#search-industry').val() == '' || $('#search-industry').val() == 'Industry' || $('#search-industry').val() == '所属行业'  ) {
            toast.show(lang === 'cn' ? '请选择您的所属行业' : 'Please select your industry.');
            return false;
        }

        if ($('#email').val() == '' || $('#email').val() == 'E-mail' || $('#email').val() == '邮件') {
            toast.show(lang === 'cn' ? '请输入您的邮件' : 'Please enter your e-mail.');
            return false;
        }

        if (!isEmail($('#email').val())) {
            toast.show(lang === 'cn' ? '请输入您的正确格式邮箱' : 'Please enter your vaild e-mail.');
            return false;
        }
        if ($('#mobile').val() == '' || $('#mobile').val() == 'Mobile Number' || $('#mobile').val() == '手机号码') {
            toast.show(lang === 'cn' ? '请输入您的手机号码' : 'Please enter your mobile number.');
            return false;
        }

        searchSubmit(val);

    });

    function isEmail(str) {
        var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (re.test(str) != true) {
            return false;
        } else {
            return true;
        }
    }
    $('body').on('click', 'li', function () {
        if ($(this).hasClass('no-results')) {
            return false;
        } else {
            var val = $(this).attr('data-name');
            $($(this).parent('ul').attr('data-input')).val(val);

            if ($('#search-industry').val() === $('#search-industry').attr('placeholder')) {
                $('#search-industry').css('color', '#a9b582');
            } else {
                $('#search-industry').css('color', '#f4d884');
            }
        }
    });

    $('body').click(function () {
        if ($('.drop-tips').css('display') === 'block') {
            $('#search-industry').show();
            if (ie < 8 && document.body.clientWidth > 1000) {
                $('#mmobile').show();
                //$('#email').show();
                //$('#special').show();
            }
        }
        $('.search-tips').hide();
        $('.toast').hide();

    });

})

$(function ($) {
//IEVersion() < 10 && 
    if (ie < 10 && document.body.clientWidth > 1000) {
        var es = $('.input');
        for (var i = 0; i < es.length; i++) {
            var inputel = es[i].getElementsByTagName('input')[0];
            var placeholder = inputel.getAttribute('placeholder');
            inputel.value = placeholder;
            inputel.style.color = '#a9b582';
        }
        $('.search .input input').focus(function () {
            if ($(this).val() === $(this).attr('placeholder')) {
                $(this).val('');
                $(this).css('color', '#f4d884');
            }
        });
        $('.search .input input').focusout(function () {
            if ($(this).val() === '' || $(this).val() === $(this).attr('placeholder')) {
                $(this).val($(this).attr('placeholder'));
                $(this).css('color', '#a9b582');
            }
        });
    }
})