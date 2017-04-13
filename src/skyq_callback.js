jQuery.noConflict();
var $ = jQuery;

function f(idForm) {
    this._id = idForm;
    this._url = '';
    this.delay = 5000;
    this.okText = 'Всё отлично. Письмо ушло.';
    this.errorText = 'Кажется форма сломалась. Скоро починю.';
    this.phoneErrorText = 'Ну хоть телефон укажи, чтобы форма отправилась';
    this.doubleErrorText = 'Второй раз форму отправляешь.';

}

f.prototype.ioverLayer = {
    class: ['popup-overlayer'],
    el: 'div',
    lang: ''
};
f.prototype.iWindow = {
    class: ['popup-window', 'popup-window--form', 'popup-window--a'],
    el: 'div',
    lang: ''
};
f.prototype.iButtonSubmit = {
    class: ['form__input', 'form__input--submit'],
    el: 'button',
    lang: 'Отправить'
};
f.prototype.iButtonShow = {
    class: ['button', 'button--sample-form'],
    el: 'button',
    lang: 'Показать форму'
};
f.prototype.iButtonClose = {
    class: ['button', 'button--close-popup'],
    el: 'button',
    lang: 'Закрыть'
};
f.prototype.iFormWr = {
    class: ['form-wr'],
    el: 'div',
    lang: ''
};
f.prototype.iFormStatusBar = {
    class: ['form__send-statusbar'],
    el: 'div',
    lang: '',
};
f.prototype.iFormStatusBarWr = {
    class: ['form__send-statusbar-text-wr'],
    el: 'div',
    lang: '',
};
f.prototype.iForm = {
    class: ['form', 'form--a'],
    el: 'form',
    lang: ''
};
f.prototype.iFormHeader = {
    class: ['form__header'],
    el: 'h5',
    lang: 'Заявка на что-то'
};
f.prototype.iFormDescription = {
    class: ['form__description'],
    el: 'p',
    lang: ''
};
f.prototype.field =
    {
        name: "",
        element: "input",
        type: "text",
        row: "",
        cols: "",
        placeholder: "",
        value: "",
        hideLabel: false,
        class: ['form__input'],
        classLabel: ['form__label'],
        textLabel: 'Телефон*:',
        elementLabel: 'label',
    }
;

f.prototype.init = function () {
    if (this._id !== '') {
        if (document.getElementById(this._id)) {
            this.setWriteLog(true);
            this.root = document.getElementById(this._id);
            this.root.classList.add("wr-popup");
            this.addTree();
            this.initShow();
            this.initClose();
            this.initCloseStatusBar();


        } else {
            this.writeLog('Error: On the form there is no necessary element.');
        }
    } else {
        this.writeLog('Error: You lost the name ID of the form.');
    }
}

f.prototype.addTree = function () {
    //Add overLayer
    this.addElement(this.ioverLayer, 'overLayer', 'root');
    //window
    this.addElement(this.iWindow, 'window', 'root');
    this.addWindowElements();
    //buttonShow
    this.addElement(this.iButtonShow, 'buttonShow', 'root', true);

};
f.prototype.addElement = function (info, name, root, after) {
    var element = document.createElement(info.el);
    element.innerHTML = info.lang;
    element.id = this[root].id + '_' + name;
    if (after === undefined) {
        this[name] = this[root].appendChild(element);
    } else {
        this[name] = this.insertAfter(element, this.root);
    }
    for (var key in info.class)
        this[name].classList.add(info.class[key]);
}
f.prototype.addWindowElements = function () {
    this.addElement(this.iFormStatusBar, 'statusBar', 'window');

    this.addElement(this.iFormStatusBarWr, 'statusBarWr', 'statusBar');
    this.addElement({class: ["form__send-status"], el: "p"}, 'statusBarP', 'statusBarWr');
    this.addElement({
        class: ["form__close-send-statusbar"],
        el: "a",
        lang: 'Скрыть уведомление'
    }, 'statusBarA', 'statusBarWr');
    this.statusBar.sendstatus = 1;
    this.statusBarA.href = "javascript:void(0)";

    this.addElement(this.iFormWr, 'formWr', 'window');
    this.addElement(this.iForm, 'form', 'formWr');
    this.addElement(this.iButtonClose, 'buttonClose', 'window');
    this.addElement(this.iFormHeader, 'form_header', 'form');
    this.addElement(this.iFormDescription, 'form_desc', 'form');
    this.addStandartFields();

};
f.prototype.addStandartFields = function () {

    var fName = this.addField();
    fName.__proto__ = this.field;
    fName.name = 'name';
    fName.hideLabel = true;
    fName.class.push = 'form__input--hidden';
    this.setField(fName);

    var fPhone = {};
    fPhone.__proto__ = this.field;
    fPhone.name = 'phone';
    fPhone.class.push = 'form__input--text';
    this.setField(fPhone);

    //
};
f.prototype.addField = function () {
    var newField = {};
    newField.__proto__ = this.field;
    return newField;
}
f.prototype.setField = function (field) {
    if (field.__proto__ !== this.field) {
        field.__proto__ = this.field;
    }
    if (!field.hideLabel) {
        var elementLabel = document.createElement(field.elementLabel);
        elementLabel.innerHTML = field.textLabel;
        elementLabel.htmlFor = this.form.id + "__" + field.name;
        for (var key in field.classLabel)
            elementLabel.classList.add(field.classLabel[key]);
        this.form.appendChild(elementLabel);
    }

    var element = document.createElement(field.element);
    element.placeholder = field.placeholder;
    element.id = this.form.id + "__" + field.name;
    element.type = field.type;
    element.name = field.name;
    element.value = field.value;
    for (var key in field.class)
        element.classList.add(field.class[key]);

    this.form.appendChild(element);
    this[field.name] = element;
};

f.prototype.end = function (submitButton) {
    this.addElement(this.iButtonSubmit, 'buttonSubmit', 'form');
    this.initSubmit();
}
f.prototype.addSubmitButton = function () {
    var submit = this.addField();
    submit.__proto__ = this.field;
    submit.hideLabel = true;
    submit.name = 'send';
    submit.value = 'Отправить';
    submit.type = 'submit';
    submit.class.push = 'form__input--submit';
    return submit;
}

f.prototype.initShow = function () {
    var self = this;
    this.buttonShow.onclick = function () {
        $("#" + self.root.id).fadeIn(500);
        $("#" + self.overLayer.id).fadeIn(500);
        $("#" + self.window.id).fadeIn(500);
    };
};
f.prototype.initSubmit = function () {
    var self = this;

    this.buttonSubmit.onclick = function () {
        var control = self.name.value;
        var phone = self.phone.value;
        var data = $('#' + self.form.id).serialize();
        if (phone !== '' && control == '') {
            $.ajax({
                url: self._url,
                type: "POST",
                data: data,
                dataType: "json",
            }).done(function (json) {
                switch (json.code) {
                    case "404":
                        console.log(json.response);
                        self.statusBarP.innerHTML = json.response;
                        self.showStatusbar();
                        function hideStatusbar() {
                            $("#" + self.statusBar.id).fadeOut(300);
                        }

                        setTimeout(hideStatusbar, self.delay);
                        break;
                    default:
                        break;
                }
            }).fail(function (xhr, status, errorThrown) {
//                alert( "Sorry, there was a problem!" );
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            })

            event.preventDefault();
        } else {
            self.showStatusbar();
            self.statusBarP.innerHTML = self.phoneErrorText;
            function hideStatusbar() {
                $("#" + self.statusBar.id).fadeOut(300);
            }

            setTimeout(hideStatusbar, self.delay);
        }
        return false;
    };
};
f.prototype.initCloseStatusBar = function () {
    var self = this;
    this.buttonClose.onclick = function () {
        $("#" + self.root.id).fadeOut(500);
        $("#" + self.overLayer.id).fadeOut(500);
        $("#" + self.window.id).fadeOut(500);

    };
};

f.prototype.initClose = function () {
    var self = this;
    this.statusBarA.onclick = function () {
        var statusBarId = self.statusBar.id;
        self.hideStatusbar(statusBarId);
    };
};
f.prototype.showStatusbar = function () {
    $("#" + this.statusBar.id).fadeIn(300);
};
f.prototype.hideStatusbar = function () {
    $("#" + this.statusBar.id).fadeOut(300);
};
f.prototype.setWriteLog = function (status) {
    this.log = status;
};
f.prototype.writeLog = function (text) {
    if (this.log) {
        console.log(text);
    }
};
f.prototype.insertAfter = function (elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}


