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

 var cls = "modal-window-animate",
     idAttr = "modal-window-id";
 /**
 * Создаем объект управления модальным окном
 *
 * @param {!Object} params
 * @param {HTMLElement} window - ссылка на элемент модального окна
 * @param {bool} NotUseAnimate - использование анимации по умолчанию ("падение" с верху) (по умолчанию true).
 */
  function modal( params ) {

     var self = this, id;

     this.params = params = params || {};
     this._windowHandlers = { };

     if ( params.window !== undefined ) {

      this.setWindow( params.window );

     }

     addOverlay(this);

     this._resizeHandler = function (){
         if(!self.isOpen) return;
         id && clearTimeout(id);

         id = setTimeout(function () {
            showAnimateWin(self);
         }, 10 );
     };

     window.addEventListener( "resize", this._resizeHandler, false );
  };

  modal.prototype.setAnimationPosition = function() {
     this.window.style.top = -this.window.clientHeight + "px";
  }

 /**
 * @param {Element} window - ссылка на модальное окно
 *
 */

  modal.prototype.setWindow = function ( modalWindow ) {

     if( !isHTMLElement( modalWindow ))
       throw "Incorrect parameter 'window', expected Element";

     if ( this.params.closeButtonCls !== undefined ) {
       closeHadnler ( this, modalWindow );
     }
     

     this.window = modalWindow;
     modalWindow.style.position = 'fixed';
     modalWindow.style.zIndex = '100000';
     

     return this;
  };

 

  function closeHadnler ( ctx, newWindow ) {

    var id = Math.random ().toString( ).slice(2),
        handler, windowId;

    newWindow.setAttribute ( idAttr , id );

    if ( ctx.window !== undefined ) {

      removeCloseHandler ( ctx );
     }


     handler = ctx._windowHandlers [ id ] = function( e ) {
      onClickClose.call ( newWindow, e, ctx );
     }; 


     newWindow.addEventListener ( "click", handler );
  };

   function onClickClose ( e, ctx ) {

    var parent = e.target,
        cls = ctx.params.closeButtonCls;

    if ( hasClass ( parent, cls ) )  {
      ctx.hide ();
      return;
    }

    while ( ( parent = parent.parentNode ) !== this ) {
      
      if( hasClass ( parent, cls ) ) {
        ctx.hide ();
        return;
      }

    }

  };

  function removeCloseHandler ( ctx ) {
    
    var windowId, handler;

     windowId = ctx.window.getAttribute ( idAttr );
     handler = ctx._windowHandlers [ windowId ];
     ctx.window.removeEventListener ( "click", handler );
     delete ctx._windowHandlers[ windowId ];

  };


 /**
 * @return {Bool} возвращает true если вызов был успешный, иначе undefined
 *
 */

  modal.prototype.show = function()  {
    if( this.isOpen || 
        !isHTMLElement ( this.window )) return;

    this.onopen && this.onopen();

    this.overlay.style.display = "block";
    this.window.style.display = "block";
    this.setAnimationPosition();
    showAnimateWin( this );

    this.onopened && this.onopened();

    return this.isOpen = true;
  };

 /**
 * @return {Bool} возвращает true если вызов был успешный, иначе undefined
 *
 */

  modal.prototype.hide = function() {

    if( !this.isOpen || 
       !isHTMLElement ( this.window ) ) return;

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

  modal.prototype.destroy = function( removeWindow ) {

    this.hide();
    window.removeEventListener("resize", this._resizeHandler);
    this.overlay.removeEventListener("click", this._closeHandler);
    this.overlay = remove( this.overlay );
    removeCloseHandler ( ctx );

    if( removeWindow &&  isHTMLElement( this.window ) )
        this.window = remove( this.window);

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

  function hasClass(el, cls) {

   for (var c = el.className.split(' '),i=c.length-1; i>=0; i--) {
      if (c[i] == cls) return true;
    }

    return false;
 }

 window.ModalJS = modal;

}());