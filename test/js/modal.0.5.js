//chrome +
//firefox +
//opera +
// ie9+ (для поддержки ие 8, подключить перед скриптом скрипт "ie8.support.js")
(function() {
    "use strict";
 /**
 * Создаем объект управления модальным окном
 *
 * @param {!Object} params
 * @param {HTMLElement} window - ссылка на элемент модального окна
 * @param {bool} NotUseAnimate - использование анимации по умолчанию ("падение" с верху) (по умолчанию true).
 */
 function modal(params) {
     var self = this, id;

     this.params = params;
     this.setWindow(params.window);

     addOverlay(this);

     window.addEventListener("resize", function () {
         if(!self.isOpen) return;
         id && clearTimeout(id);

         id = setTimeout(function () {
             self._showAnimateWin();
         }, 10);
     }, false);
 };

 modal.prototype.setStartAnimationPosition = function() {
     this.window.style.top = -this.window.clientHeight + "px";
 }


 /**
 * @param {Element} window - ссылка на модальное окно
 *
 */

 modal.prototype.setWindow = function (window) {
     if(!isHTMLElement(window))
        throw "It is incorrect parameter 'window', expected HTMLElement";

     this.window = window;
     window.style.position = 'fixed';
     window.style.zIndex = '100000';
 };

 /**
 * @return {Bool} возвращает true если вызов был успешный, иначе undefined
 *
 */

 modal.prototype.Show = function()  {
    if(this.isOpen) return;

    var win = this.window;

    this._overlay.style.display = "block";

    win.style.display = "block";
    this.setStartAnimationPosition();
    this._showAnimateWin();

    return this.isOpen = true;
 };

 /**
 * @return {Bool} возвращает true если вызов был успешный, иначе undefined
 *
 */

 modal.prototype.Close = function() {
    if(!this.isOpen) return;

     this._overlay.style.display = "";

     this.window.style.display = "none";
     removeClass(this.window, "modal-window-animate");
     this.isOpen = false;

     return true;
 };


 modal.prototype._showAnimateWin = function () {
     var win = this.window;

     if(!this.params.NoUseAnimate){
         addClass(win, "modal-window-animate");
     }

     setTimeout(function () {
         var win_size = win.getBoundingClientRect(),
             top = (window.innerHeight - win_size.height) / 2,
             left = (window.innerWidth - win_size.width) / 2;

         win.style.top = top + "px";
         win.style.left = left + "px";
     }, 0)
 };

 function isHTMLElement(elem) {
     return (typeof elem==="object") &&
         (elem.nodeType===1) && (typeof elem.style === "object") &&
         (typeof elem.ownerDocument ==="object");
 }


 function addOverlay(modal) {
     var overlay = document.createElement("div");
     overlay.className = "modal-overlay";
     overlay.addEventListener("click", function () {

         if(!modal.onClose || modal.onClose.call(modal) !== false)
             return;

         modal.Close();
     }, false);
     modal._overlay = document.body.appendChild(overlay);
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