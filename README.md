# callbackForm
# Простая форма отправки сообщений 
## для моего друга дизайнера, который любит велосипеды.

Пока есть две ветки
  + master
  + more_easy

### Ветка master содержит более заморочнный способ.<br/> 
Форма создается в js коде.<br/>
В index.html добавим:
```
<div id="formOne"></div>
<div id="formTwo"></div>
```
В js:
```
 $(function () {

        var formOne = new f('formOne');
        formOne._url = 'http://note.skyq.ru/callback.php';
        formOne.iButtonShow.lang = 'Открыть форму';
        formOne.iFormDescription.lang = 'Кратко расскажем о том, что произойдёт после того, как вы отправите форму.';

        formOne.init();
        var email = formOne.addField();
        email.name = "email";
        email.class.push = 'form__input--text';
        email.textLabel = 'Электропочта:';
        formOne.setField(email);
        var text = formOne.addField();
        text.name = "text";
        text.class.push = 'form__input--textarea';
        text.textLabel = 'Здесь можно высказаться:';
        text.row = "10";
        text.cols = "30";
        formOne.setField(text);
        formOne.end();

        var formTwo = new f('formTwo');
        formTwo._url = 'http://note.skyq.ru/callback.php';
        formTwo.init();
        var submit = formTwo.addSubmitButton();
        submit.value = 'Отправить на сервак';
        formTwo.end(submit);
 }
```
Все. На месте formOne и formTwo появяться скрытые формы по макету как 
[nikolaywerner lab](http://nikolaywerner.ru/entry/prostaya-forma-obratnoy-svyazi)

### Ветка more_easy проще. <br/>
Тут мы создаем в html тот вид формы, что мы хотим и лишь только раставляем id обязательным элемента
 + form
 + window
 + control
 + statusbar
 + overlayer
 + buttonSend
 + buttonShow
 + buttonClose
 + statusbarText
 + buttonStatusbarClose
 <br/> <br/> 
 Пример:
 ```
 <div id="f2-overlayer" class="popup-overlayer"></div>
 <div id="f2-window" class="popup-window popup-window--form popup-window--a">
     <button id="f2-buttonClose" class="button button--close-popup">Закрыть</button>
     <div class="form-wr">
         <form id="f2-form" class="form form--a">
             <div id="f2-statusbar" class="form__send-statusbar" sendstatus="1">
                 <div class="form__send-statusbar-text-wr">
                     <p id="f2-statusbarText" class="form__send-status">Мы получили вашу заявку и бла-бла. Хотя нет, это просто рыба для
                         разработки.</p>
                     <a id="f2-buttonStatusbarClose" href="javascript:void(0)" class="form__close-send-statusbar">Скрыть уведомление</a>
                 </div>
             </div>
 
             <h5 class="form__header">Заявка на что-то</h5>
             <p class="form__description">Кратко расскажем о том, что произойдёт после того, как вы отправите форму.</p>
 
             <input id="f2-name" name="name" type="text" class="form__input form__input--hidden">
 
             <label class="form__label" for="f2-phone">Телефон*:</label>
             <input id="f2-phone" name="phone" type="text" class="form__input form__input--text">
 
             <button id="f2-buttonSend" class="form__input form__input--submit">Отправить</button>
         </form>
     </div>
 </div>
 <button id="f2-buttonShow" class="button button--sample-form">Открыть форму</button>
 ```
 В js:
```
var f2 = new CallBackForm('f2');
f2.setUrl('http://your.domain/callback.php');
```
Если нужно задать другой id элементу (например не f2-overlayer а f2-overHayer) то:
```
var f2 = new CallBackForm('f2');
f2.setUrl('http://your.domain/callback.php');
f2.overlayerId = 'overHayer';
f2.setElement("f2",f2.overlayerId);
```
 




