# callbackForm
# Простая форма отправки сообщений 
## для моего друга дизайнера, который любит велосипеды.

Пока есть две ветки
  + master
  + more_easy

### Ветка master содержит более заморочнный способ.
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
        formOne._url = 'http://your.domain/callback.php';
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
        formTwo._url = 'http://your.domain/callback.php';
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
 + buttonStatusbarClose<br/> 
 <br/> 
 Пример (убрал классы для облечения текста, вся разметка есть на сайте по ссылке выше):
 <br/> 
```
 
 <div id="f2-overlayer"></div>
 <div id="f2-window">
     <button id="f2-buttonClose">Закрыть</button>
     <div>
         <form id="f2-form">
             <div id="f2-statusbar">
                 <div>
                     <p id="f2-statusbarText">Тут будет ответ</p>
                     <a id="f2-buttonStatusbarClose" href="javascript:void(0)">Скрыть уведомление</a>
                 </div>
             </div>
 
             <h5>Заявка на что-то</h5>
             <p>Кратко расскажем о том, что произойдёт после того, как вы отправите форму.</p>
 
             <input id="f2-name" name="name" type="text">
 
             <label for="f2-phone">Телефон*:</label>
             <input id="f2-phone" name="phone" type="text">
 
             <button id="f2-buttonSend">Отправить</button>
         </form>
     </div>
 </div>
 <button id="f2-buttonShow">Открыть форму</button>
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