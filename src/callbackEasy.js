jQuery.noConflict();
var $ = jQuery;
function CallBackForm(idForm) {
    this._id = idForm;
    this.url = '';
    this.form = idForm + '-form';
    this.delay = 5000;
    this.formName = 'form';
    this.windowName = 'window';
    this.controlName = 'name';
    this.statusbarName = 'statusbar';
    this.overlayerName = 'overlayer';
    this.buttonSendName = 'buttonSend';
    this.buttonShowName = 'buttonShow';
    this.buttonCloseName = 'buttonClose';
    this.statusbarTextName = 'statusbarText';
    this.buttonStatusbarCloseName = 'buttonStatusbarClose';

    this.setElement(idForm, this.formName);
    this.setElement(idForm, this.windowName);
    this.setElement(idForm, this.controlName);
    this.setElement(idForm, this.statusbarName);
    this.setElement(idForm, this.overlayerName);
    this.setElement(idForm, this.buttonSendName);
    this.setElement(idForm, this.buttonShowName);
    this.setElement(idForm, this.buttonCloseName);
    this.setElement(idForm, this.statusbarTextName);
    this.setElement(idForm, this.buttonStatusbarCloseName);

    this.initShow();
    this.initClose();
    this.initCloseStatusBar();
    this.initSubmit();
}
CallBackForm.prototype.setElement = function (id, name) {
    id = id + "-" + name;
    if (document.getElementById(id)) {
        this[name] = document.getElementById(id);
        this[name].id = id;
    } else {
        console.log('error init ' + name);
        this[name] = '';
        this[name].id = '';
    }
}
CallBackForm.prototype.initShow = function () {
    var self = this;
    this[this.buttonShowName].onclick = function () {

        $("#" + self[self.overlayerName].id).fadeIn(500);
        $("#" + self[self.windowName].id).fadeIn(500);
    };

};
CallBackForm.prototype.initClose = function () {
    var self = this;
    this[this.buttonCloseName].onclick = function () {
        $("#" + self[self.overlayerName].id).fadeOut(500);
        $("#" + self[self.windowName].id).fadeOut(500);

    };
};
CallBackForm.prototype.initCloseStatusBar = function () {
    var self = this;
    this[this.buttonStatusbarCloseName].onclick = function () {
        self.hideStatusbar();
    };
};
CallBackForm.prototype.showStatusbar = function (idStatusBar) {
    $("#" + idStatusBar).fadeIn(300);
};
CallBackForm.prototype.hideStatusbar = function () {
    $("#" + this[this.statusbarName].id).fadeOut(300);
};
CallBackForm.prototype.setUrl = function (url) {
    this.url = url;
};
CallBackForm.prototype.initSubmit = function () {
    var self = this;
    this[this.buttonSendName].onclick = function () {
        var control = self[self.controlName].value;
        var data = $('#' + self[self.formName].id).serialize();
        if (control === '') {
            $.ajax({
                url: self.url,
                type: "POST",
                data: data,
                dataType: "json",
            }).done(function (json) {
                //Если хочешь тут можно обрабатывать коды ошибок
                switch (json.code) {
                    case "404":
                        break;
                    case "200":
                        break;
                    default:
                        break;
                }
                //
                self[self.statusbarTextName].innerHTML = json.response;
                self.showStatusbar(self[self.statusbarName].id);
                function hideStatusbar() {
                    $("#" + self[self.statusbarName].id).fadeOut(300);
                }

                setTimeout(hideStatusbar, self.delay);
            }).fail(function (xhr, status, errorThrown) {
                console.log("Error: " + errorThrown);
                console.log("Status: " + status);
                console.dir(xhr);
            })

            event.preventDefault();
        }
        event.preventDefault();
        return false;
    }
}
