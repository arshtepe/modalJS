/* Artem Shtepenko https://github.com/cyberua/modalJS */

/*
support:
chrome +
firefox +
opera +
 ie9+ (для поддержки ие 8, подключить перед скриптом скрипт "ie8.support.js")
*/
(function() {
    "use strict";

 var cls = "modal-window-animate";
 /**
 * Создаем объект управления модальным окном
 *
 * @param {!Object} params
 * @param {HTMLElement} window - ссылка на элемент модального окна
 * @param {bool} NotUseAnimate - использование анимации по умолчанию ("падение" с верху) (по умолчанию true).
 */
  function modal(params) {
     var self = this, id;

     this.params = params = params || {};
     params.window && this.setWindow(params.window);

     addOverlay(this);

     this._resizeHandler = function (){
         if(!self.isOpen) return;
         id && clearTimeout(id);

         id = setTimeout(function () {
            showAnimateWin(self);
         }, 10);
     };

     window.addEventListener("resize", this._resizeHandler, false);
  };

  modal.prototype.setAnimationPosition = function() {
     this.window.style.top = -this.window.clientHeight + "px";
  }

 /**
 * @param {Element} window - ссылка на модальное окно
 *
 */

  modal.prototype.setWindow = function (window) {
     if(!isHTMLElement(window))
       throw "Incorrect parameter 'window', expected Element";

     this.window = window;
     window.style.position = 'fixed';
     window.style.zIndex = '100000';

     return this;
  };

 /**
 * @return {Bool} возвращает true если вызов был успешный, иначе undefined
 *
 */

  modal.prototype.show = function()  {
    if(this.isOpen) return;

    this.onopen && this.onopen();

    this.overlay.style.display = "block";
    this.window.style.display = "block";
    this.setAnimationPosition();
    showAnimateWin(this);

    this.onopened && this.onopened();

    return this.isOpen = true;
  };

 /**
 * @return {Bool} возвращает true если вызов был успешный, иначе undefined
 *
 */

  modal.prototype.hide = function() {
    if(!this.isOpen) return;

     this.onclose && this.onclose();
     this.overlay.style.display = "";
     this.window.style.display = "none";
     removeClass(this.window, cls);
     this.isOpen = false;

     this.onclosed && this.onclosed();
     return true;
  };

 /**
  * @param {Bool} -  if true, will remove modal window
  *
  * */

  modal.prototype.destroy = function(removeWindow) {
    this.hide();
    window.removeEventListener("resize", this._resizeHandler);
    this.overlay.removeEventListener("click", this._closeHandler);
    this.overlay = remove(this.overlay);

    if(removeWindow && this.window)
        this.window = remove(this.window);

    function remove(elem) {
        elem.parentNode.removeChild(elem);
    };
  };

  function showAnimateWin(modal) {
    var win = modal.window,
        top = (window.innerHeight - win.offsetHeight) / 2,
        left = (window.innerWidth - win.offsetWidth) / 2;

    if(!modal.params.NoUseAnimate){
        addClass(win, cls);
    }

    setTimeout(function () {
        win.style.top = top + "px";
        win.style.left = left + "px";
    }, 0);
  };

  function isHTMLElement(elem) {
    return (typeof elem==="object") &&
        (elem.nodeType===1) && (typeof elem.style === "object") &&
        (typeof elem.ownerDocument ==="object");
  }


  function addOverlay(modal) {
     var overlay = document.createElement("div");

     overlay.className = "modal-overlay";
     modal._closeHandler = function() {
        if(!modal.onclose || modal.onclose.call(modal) !== false)
             return;

         modal.hide();
     };
     overlay.addEventListener("click", modal._closeHandler, false);
     modal.overlay = document.body.appendChild(overlay);
  }

  function addClass(elem, cls) {
    var classes = elem.className.split(" ");

    for(var i = classes.length; i; i--) {
        if(classes[i] == cls) return;
    }

    classes.push(cls);
    elem.className = classes.join(" ");
  };

  function removeClass(el, cls) {
    var c = el.className.split(' ');

    for (var i=0; i<c.length; i++) {
        if (c[i] == cls) c.splice(i--, 1);
    }

    el.className = c.join(' ');

  };

 window.ModalJS = modal;

}());