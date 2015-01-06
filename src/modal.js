/* Artem Shtepenko https://github.com/cyberua/modalJS */

/*
support:
chrome +
firefox +
opera +
 ie9+
*/
(function() {
    "use strict";


    //#include transition.js

 var cls = "modal-window-animate";

 /**
 * Basic modal object
 *
 * @param {!Object} params
 * @param {HTMLElement} window - link on modal window HTMLElement
 * @param {bool} NotUseAnimate - if true, modal window not used animation
 */
    function modal( params ) {

        var self = this, id;

        this._handlers = {};


        this.params = params = params || {};

        if ( params.window !== undefined ) {

            this.setWindow( params.window );

        }

        addOverlay( this );

        this._resizeHandler = function (){

            if(!self.isOpen) return;

            id && clearTimeout(id);

             id = setTimeout(function () {
                showAnimateWin( self );
             }, 10 );
         };

        window.addEventListener( "resize", this._resizeHandler, false );
    };


    modal.prototype.on = function ( event, handler ) {

        if( !this._handlers [ event ] )
            this._handlers [ event ] = [];

        this._handlers [ event ].push( handler );

    };

    modal.prototype.off = function ( event, handler ) {

        var handlers =  this._handlers[ event ];

        if( !handlers )
            return;

        if( !handler )
            delete  this._handlers [ event ];

        for(var i = 0; i < _handlers.length; i++) {
            if( handlers[i] == handler ) {
                handlers.splice(i, 1);
                return;
            }
        };

    };


    modal.prototype.emit = function ( event ) {

        var self = this,
            handlers =  this._handlers[ event ],
            args = arguments;

        if( !handlers  )
            return;

        setTimeout( function () {
            handlers.forEach( function ( handler ) {
                handler.call( self, [].slice.call( args, 2 ) );
            } );
        }, 0 );
    };

    modal.prototype.setStartAnimationPosition = function() {
        this.window.style.top = -this.window.clientHeight + "px";
    };

    modal.prototype.setEndAnimationPostition = function ( ) {

        var win = this.window,
            top = ( window.innerHeight - win.offsetHeight ) / 2,
            left = ( window.innerWidth - win.offsetWidth ) / 2;

        win.style.top = top + "px";
        win.style.left = left + "px";
    };

 /**
 * @param {HTMLElement} window - window HTMLElement
 *
 */

    modal.prototype.setWindow = function ( modalWindow ) {

        if( !isHTMLElement( modalWindow ))
            throw "Incorrect parameter 'window', expected Element";

        this.destroyWindow();

        if ( this.params.opt_closeButtonCls !== undefined ) {
            closeHadnler ( this, modalWindow );
        }


        this.window = modalWindow;
        modalWindow.style.display = "none";
        modalWindow.style.position = 'fixed';
        modalWindow.style.zIndex = '100000';

        return this;
    };

 

    function closeHadnler ( ctx, newWindow ) {

        if ( ctx.window !== undefined ) {
            removeCloseHandler ( ctx );
        }

        ctx._windowHandler = function( e ) {
            onClickClose.call ( newWindow, e, ctx );
        };

        newWindow.addEventListener ( "click", ctx._windowHandler, false );
    };

    function onClickClose ( e, ctx ) {

        var parent = e.target,
            cls = ctx.params.opt_closeButtonCls;

        if ( hasClass ( parent, cls ) )
            return ctx.hide ();

        while ( parent  !== this ) {

          if( hasClass ( parent, cls ) ) {
            ctx.hide ();
            return;
          }

          parent = parent.parentNode;

        }

    };

    function removeCloseHandler ( ctx ) {
        if( ctx && ctx.window )
            ctx.window.removeEventListener ( "click", ctx._windowHandler );
    };


    modal.prototype.show = function( )  {

        if( this.isOpen ||
            !isHTMLElement ( this.window )) return;

        this.emit( "show" );

        this.overlay.style.display = "block";
        this.window.style.display = "block";
        this.setStartAnimationPosition();
        showAnimateWin( this );

        if( typeof transition == "undefined" ||
            this.params.opt_notUseAnimate ||
            !transition.getSupported() ) {

            this.emit( "showed", modal );
        }

        //#if transition
        else {
            transition.end( this.window, function ( ) {
                this.emit ( "showed", this );
            }.bind( this ) );
        }
        //#endif

        return this.isOpen = true;
    };


    modal.prototype.hide = function() {

        if( !this.isOpen ||
            !isHTMLElement ( this.window ) ) return;

        this.emit( "close", modal );

        this.overlay.style.display = "";
        this.window.style.display = "none";
        removeClass( this.window, cls );
        this.isOpen = false;

        return true;
    };

 /**
  * Destroyed window element
  * @param {Bool} -  if true, will remove modal window HTMLElement
  *
  * */

    modal.prototype.destroyWindow = function( removeWindowElement ) {

        this.hide();
        removeCloseHandler ( this );

        if( removeWindowElement === true
            &&  isHTMLElement( this.window ) )
            this.window = remove( this.window );

        this.window = undefined;
    };

    /**
     * Destroyed windowObject and all events and elements
     * @param {Bool} -  if true, will remove modal window HTMLElement
     *
     * */


    modal.prototype.destroy = function( removeWindowElement ) {

        window.removeEventListener( "resize", this._resizeHandler);
        this.overlay.removeEventListener( "click", this._closeHandler);
        this.destroyWindow( removeWindowElement );
        this.off( "open" );
        this.off( "close" );

        remove( this.overlay );
        this.overlay = undefined;
    };



    function showAnimateWin( modal ) {

        modal.setEndAnimationPostition();

        if( !modal.params.opt_notUseAnimate ){
            addClass( modal.window , cls );
        }
    };


    function remove( elem ) {
        return elem.parentNode.removeChild( elem );
    }

    function isHTMLElement(elem) {
        return (typeof elem=== "object" ) &&
            (elem.nodeType === 1) && (typeof elem.style === "object") &&
            (typeof elem.ownerDocument ==="object");
    }


    function addOverlay(modal) {
        var overlay = document.createElement("div");

        overlay.className = "modal-overlay";
        modal._closeHandler = function() {

            if ( modal.params.opt_isOverlayClickHide ) {
               return modal.hide();
            }

        };

        overlay.addEventListener("click", modal._closeHandler, false);
        modal.overlay = document.body.appendChild(overlay);
    }


    //#if noComments


//    function getSupportedTransform() {
//        var prefixes = 'transform WebkitTransform MozTransform OTransform msTransform'.split(' '),
//            elem = document.createElement('div');
//
//        for(var i = 0; i < prefixes.length; i++) {
//            if( elem.style[prefixes[i]] !== undefined ) {
//                return prefixes[i];
//            }
//        }
//        return false;
//    }

    //#endif

    //#include classFnc.js



 window.ModalJS = modal;

}());