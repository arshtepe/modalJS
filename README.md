Wiki
====
<a href="https://github.com/cyberua/modalJS/wiki/modalJs---English-Documentation">English documentation</a><br>
<a href="https://github.com/cyberua/modalJS/wiki/modalJS---%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B0%D1%8F-%D0%B4%D0%BE%D0%BA%D1%83%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F">Русская документация</a>

#modalJS - English Documentation
It is small cross-browser script for modal/popup windows. Demo http://jsfiddle.net/8evMH/7/

##Features
 * Cross browser compatibility
 * Without additional libraries
 * Easy usage
 * Css 3 animation
 * Easy settings animation

## Browsers Support
 * Chrome +
 * Firefox + 
 * Opera +
 * Internet Explorer 9 + (for support ie 8, need include "ie8.support.min.js")

####Include example
``` HTML
<!--[if IE 8]>
<style>
 .modal-overlay {
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=70);
  }
</style>
<script src="ie8.support.min.js"> </script>
<![endif]-->
```

##Demo

### Example
http://jsfiddle.net/pee3V/10/
####Example of how to set up the animation
http://jsfiddle.net/8evMH/8/

##modalJS API Documentation

##Parameters
 * <b>window</b> (optional) - link on window {Element}, need set window before call <b>show</b>, otherwise will be error;
 * <b>NotUseAnimate</b> (optional) -  If need switch off animation set true.
 * <b>closeButtonCls</b> (optional) - class name for close button

```javascript

var modal = new ModalJS({
    window: document.getElementById('modal-window'),
    NotUseAnimate: true,
    closeButtonCls: "class"
    
});
```

###Methods

####show  ()
without parameters
####close ()
without parameters
####destroy(removeWindow)
Removes event handlers and remove overlay from dom, also clears variables.
If parameter "removeWindow" removes modal window from dom.
####setWindow(window) 
  Sets active window for show.
  
###Events
####onopen
Before show window
####onсlose
Before close window
####onopened
After opening window, but ignores css3 animation. <a href="#editing-css3-animation">Example how handle transitionend </a>
####onсlosed
After closing window, but ignores css3 animation. <a href="#editing-css3-animation">Example how handle transitionend </a>

###Function handler
####setAnimationPosition
Sets start position for window.

## How to Use

```HTML 
<link type="text/css" rel="stylesheet" href="path_to_folder/modal-default.css">
<script src="path_to_folder/modal.version.min.js"></script>
```
For support IE 8
```HTML
<link type="text/css" rel="stylesheet" href="path_to_folder/modal-default.css">
<script src="path_to_folder/ie8.support.min.js"></script>
<script src="path_to_folder/modal.version.min.js"></script>
```

### Example handling transitionend

http://jsfiddle.net/9Djr5/2/
```javascript
var modal = new ModalJS({
    window: document.getElementById('modal-window'),
});

modal.onopen = function () {
  transitionend(this.window, function () {
    console.log("window shown");
  });
};

modal.show()// show window

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

### Editing css3 animation

http://jsfiddle.net/qyG9K/2/
```javascript
//....

modal.setAnimationPosition = function () {
  var body = document.body;
  this.window.style.opacity = 0;
  this.window.style.top = body.clientHeight + this.window.clientHeight + "px"; // move from bottom
}

modal.onopened = function () {
  this.window.style.opacity = 1;
}

```
Need change <b>transition</b> in modal-default.css, from left on required value
```CSS 
    transition: .7s ease-in ;
   -o-transition: .7s ease-in;
   -moz-transition: .7s ease-in;
   -webkit-transition:  .7s ease-in;

```

## Author

Artem Shtepenko @cyberua

## License

modalJS is licensed under the MIT License (see LICENSE for details).

#modalJS - Russian Documentation

Маленький кроссбраузерный скрипт для всплывающих/модальных окон, без использования дополнительных библиотек. http://jsfiddle.net/8evMH/7/
##Features

 * Кроссбраузерность
 * Отсутствие зависимотей от библеотек
 * Легкость в использование
 * Поддержка css3 анимации(если браузер поддерживает)
 * Удобная настройка анимации

## Browsers Support
 * Chrome +
 * Firefox + 
 * Opera +
 * Internet Explorer 9 + (for support ie 8, need include "ie8.support.min.js")

####Include example
``` HTML
<!--[if IE 8]>
<style>
 .modal-overlay {
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=70);
  }
</style>
<script src="ie8.support.min.js"> </script>
<![endif]-->
```

##Demo

###Базовое демо 
http://jsfiddle.net/pee3V/10/
####Демо с изменением анимации 
http://jsfiddle.net/8evMH/8/

##modalJS API Documentation

##Параметры
 * <b>window</b> - ссылка на элемент модального окна, если не передать ссылку на окно в конструктор его неходимо установить перед вызовом show, иначе будет ошибка.
 * <b>NotUseAnimate</b> (Не обязательный) - использование анимации по умолчанию ("падение" с верху) (по умолчанию true).
 * <b>closeButtonCls</b> (Не обязательный) - класс элемента при клике на который окно должно убератся 

```javascript

var modal = new ModalJS({
    window: document.getElementById('modal-window'),
    NotUseAnimate: true,
    closeButtonCls: "class"
});
```

###Методы

####show ()
  Отображает установленное окно (не принимает параметров)
####close ()
  Скрывает установленное окно (не принимает параметров)
####destroy(removeWindow)
Удаляет обработчики событий также удаляет overaly из DOM.
Если параметр "removeWindow" true, то окно (свойство window) удаляеться из DOM.
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
####setAnimationPosition
Если нужно изменить начальное положение положение окна перед отображением, необходимо переопределить эту функцию.

## How to Use

```HTML 
<link type="text/css" rel="stylesheet" href="path_to_folder/modal-default.css">
<script src="path_to_folder/modal.version.min.js"></script>
```
Для поддержки IE 8
```HTML
<link type="text/css" rel="stylesheet" href="path_to_folder/modal-default.css">
<script src="path_to_folder/ie8.support.min.js"></script>
<script src="path_to_folder/modal.version.min.js"></script>
```

### Пример отображения окна с обработкой окончания анимации

http://jsfiddle.net/9Djr5/2/
```javascript
var modal = new ModalJS({
    window: document.getElementById('modal-window'),
});

modal.onopen = function () {
  transitionend(this.window, function () {
    console.log("window shown");
  });
};

modal.show()// show window

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

http://jsfiddle.net/qyG9K/2/
```javascript
//....

modal.setAnimationPosition = function () {
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

## Author

Artem Shtepenko @cyberua

## License

modalJS is licensed under the MIT License (see LICENSE for details).
