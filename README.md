#modalJS - Russian Documentation

Маленький кроссбраузерный скрипт для всплывающих/модальных окон, без использования дополнительных библиотек. Demo http://jsfiddle.net/CyBer_UA/pee3V/2/
##Features

 * Кроссбраузерность
 * Отсутствие зависимотей от библеотек
 * Легкость в использование
 * Поддержка css3 анимации(если браузер поддерживает)
 * Удобная настройка анимации

##Demo

###Базовое демо 
http://jsfiddle.net/CyBer_UA/pee3V/2/
####Демо с изменением анимации 
http://jsfiddle.net/CyBer_UA/8evMH/2/

##modalJS API Documentation

###Методы

####Show ()
  Отображает установленное окно (не принимает параметров)
####Close ()
  Скрывает установленное окно (не принимает параметров)<br>
####setWindow(window) 
  Устанавлиает активное окно, принимает в качества параметра Element, если переданный обьект не являеться Element обьектом будет вызвано исключение с к текстом "It is incorrect parameter 'window', expected HTMLElement"

###События
####onopen
Срабатывает перед открытием окна.
####onсlose
Срабатывает перед закрытием окна.
####onopened
Срабатывает после открытием окна, анимация не учитываеться, для обработки конца анимации нужно повесить обработчик на событие <b>transitionend</b>.
####onсlosed
Срабатывает после закрытия окна, анимация не учитываеться, для обработки конца анимации нужно повесить обработчик на событие <b>transitionend</b>.


###Функция обработчик
####setStartAnimationPosition
Если нужно изменить начальное положение положение окна перед отображением, необходимо переопределить эту функцию.

## Usage

### Пример отображения окна с обработкой оканчания анимации

http://jsfiddle.net/CyBer_UA/HSV4E/1/
```javascript
var modal = new ModalJS({
    window: document.getElementById('modal-window'),
});

modal.onopen = function () {
  transitionend(this.window, function () {
    console.log("window shown");
  });
};

modal.Show()// show window

function transitionend(elem, callback) {
    elem.addEventListener("transitionend", onEnd);
    elem.addEventListener("webkitTransitionEnd", onEnd);
    elem.addEventListener("mozTransitionEnd", onEnd);
    elem.addEventListener("msTransitionEnd", onEnd);

    function onEnd(e) {
        callback.apply(this, arguments);
        this.removeEventListener(e.type, onEnd);
    }

}
```

### Управление анимацией отображения

http://jsfiddle.net/CyBer_UA/NyYZE/1/
```javascript
//....

modal.setStartAnimationPosition = function () {
  var body = document.body;
  this.window.style.opacity = 0;
  this.window.style.top = body.clientHeight + this.window.clientHeight + "px"; // move from bottom
}

modal.onopened = function () {
  this.window.style.opacity = 1;
}

```
По умолчанию анимируеться только свойство top, поэтому нужно установить так же анимирования для свойства opacity, либо использовать all - анимирование всех свойств (используеться по умолчанию).
Изменения в modal-default.css
```CSS 
    transition: .7s ease-in;
   -o-transition: .7s ease-in;
   -moz-transition: .7s ease-in;
   -webkit-transition:  .7s ease-in;

```

