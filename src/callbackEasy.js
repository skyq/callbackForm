jQuery.noConflict();
var $ = jQuery;
function CallBackForm(idForm) {
    this._id = idForm;
    this.url = '';
    this.form = idForm + '-form';
    this.delay = 5000;
    this.formId = 'form';
    this.windowId = 'window';
    this.controlId = 'name';
    this.statusbarId = 'statusbar';
    this.overlayerId = 'overlayer';
    this.buttonSendId = 'buttonSend';
    this.buttonShowId = 'buttonShow';
    this.buttonCloseId = 'buttonClose';
    this.statusbarTextId = 'statusbarText';
    this.buttonStatusbarCloseId = 'buttonStatusbarClose';

    this.setElement(idForm, this.formId);
    this.setElement(idForm, this.windowId);
    this.setElement(idForm, this.controlId);
    this.setElement(idForm, this.statusbarId);
    this.setElement(idForm, this.overlayerId);
    this.setElement(idForm, this.buttonSendId);
    this.setElement(idForm, this.buttonShowId);
    this.setElement(idForm, this.buttonCloseId);
    this.setElement(idForm, this.statusbarTextId);
    this.setElement(idForm, this.buttonStatusbarCloseId);

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
    this[this.buttonShowId].onclick = function () {

        $("#" + self[self.overlayerId].id).fadeIn(500);
        $("#" + self[self.windowId].id).fadeIn(500);
    };

};
CallBackForm.prototype.initClose = function () {
    var self = this;
    this[this.buttonCloseId].onclick = function () {
        $("#" + self[self.overlayerId].id).fadeOut(500);
        $("#" + self[self.windowId].id).fadeOut(500);

    };
};
CallBackForm.prototype.initCloseStatusBar = function () {
    var self = this;
    this[this.buttonStatusbarCloseId].onclick = function () {
        self.hideStatusbar();
    };
};
CallBackForm.prototype.showStatusbar = function (idStatusBar) {
    $("#" + idStatusBar).fadeIn(300);
};
CallBackForm.prototype.hideStatusbar = function () {
    $("#" + this[this.statusbarId].id).fadeOut(300);
};
CallBackForm.prototype.setUrl = function (url) {
    this.url = url;
};
CallBackForm.prototype.initSubmit = function () {
    var self = this;
    this[this.buttonSendId].onclick = function () {
        var control = self[self.controlId].value;
        var data = $('#' + self[self.formId].id).serialize();
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
                self[self.statusbarTextId].innerHTML = json.response;
                self.showStatusbar(self[self.statusbarId].id);
                function hideStatusbar() {
                    $("#" + self[self.statusbarId].id).fadeOut(300);
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
