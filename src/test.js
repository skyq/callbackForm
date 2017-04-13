$(".form--a").submit(function () {
    var control = $(".form--a input[name='name']").val();

    var phone = $(".form--a input[name='phone']").val();
    var email = $(".form--a input[name='email']").val();
    var text = $(".form--a textarea[name='text']").val();

    if (phone !== '' && control == '') {
        $.post('/files/lab_files/feedback_sample.php', {
            'phone': phone,
            'email': email,
            'text': text
        }, function (data) {
            if (data == 1) {
                show_statusbar();
                $('.form__send-statusbar').attr('sendstatus', '1');
                $('p.form__send-status').text(okText);
                setTimeout(hide_statusbar, delay);
                setTimeout(hide_popup, delay);
            } else {

                if (data == 3) {
                    show_statusbar();
                    $('.form__send-statusbar').attr('sendstatus', '2');
                    $('p.form__send-status').text(doubleErrorText);
                    setTimeout(hide_statusbar, delay);
                    setTimeout(hide_popup, delay);
                } else {
                    show_statusbar();
                    $('.form__send-statusbar').attr('sendstatus', '3');
                    $('p.form__send-status').text(errorText);
                    setTimeout(hide_statusbar, delay);
                }

            }
        });
        return false;
    } else {
        // show_statusbar();
        // $('.form__send-statusbar').attr('sendstatus', '4');
        // $('p.form__send-status').text(phoneErrorText);
        // setTimeout(hide_statusbar, delay);
        // return false;
    }
});