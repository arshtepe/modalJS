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

    var cls = "modal-window-animate";


    var transition = {

        getSupported: function ( ) {

            var val = this.supportedVal;

            if ( val )
                return val;

            var t,
                el = document.createElement( 'fakeelement' ),
                transitions = {
                    'OTransition':'oTransitionEnd',
                    'MozTransition':'transitionend',
                    'WebkitTransition':'webkitTransitionEnd'
                };

            for( t in transitions ){
                if( el.style[t] !== undefined ){
                    return this.supportedVal = transitions[t];
                }
            }

            if( el.style [ 'transition' ] !== undefined ) {
            	return this.supportedVal = 'transitionend';
            }

            return false;
        },

        end: function ( elem,  callback ) {

            var event = this.getSupported();

            if( !event ) {
                callback();
                return false;
            }

            elem.addEventListener ( event, function handler() {
                elem.removeEventListener ( event, handler );
                callback();
            } );
        }
    };
    
    /**
    * Basic modal object
    *
    * @param {!Object} params
    * @param {HTMLElement} window - link on modal window HTMLElement
    * @param {Boolean} [useAnimate=true] - if false, modal window not used animation
    * @param {string=} opt_closeButtonCls - Close button element class
    * @param {boolean=} opt_isOverlayClickHide=false] - if true when click on overlay, window will close
    */
    function Modal( params ) {

        var self = this, id;

        this._handlers = {};

        this._transition = transition;

        this.params = params = params || {};

        params.useAnimate = true;

        if ( params.window !== undefined ) {

            this.setWindow( params.window );
        };

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

    Modal.prototype.VERSION = [ 1, 0, 5 ];


    Modal.prototype.on = function ( event, handler ) {

        if( !this._handlers [ event ] )
            this._handlers [ event ] = [];

        this._handlers [ event ].push( handler );

    };

    Modal.prototype.off = function ( event, handler ) {

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


    Modal.prototype.emit = function ( event ) {

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

    /**
    * Seted window start position, before animation
    */

    Modal.prototype.setStartAnimationPosition = function() {
        this.window.style.top = -this.window.clientHeight + "px";
    };

    /**
    * Seted window end position, for animation
    */

    Modal.prototype.setEndAnimationPostition = function ( ) {

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

    Modal.prototype.setWindow = function ( modalWindow ) {

        if( !isHTMLElement( modalWindow ))
            throw "Incorrect parameter 'window', expected Element";

        this.destroyWindow();

        if ( this.params.opt_closeButtonCls !== undefined ) {
            hideHadnler ( this, modalWindow );
        }


        this.window = modalWindow;
        modalWindow.style.display = "none";
        modalWindow.style.position = 'fixed';
        modalWindow.style.zIndex = '100000';

        return this;
    };

 

    function hideHadnler ( ctx, newWindow ) {

        if ( ctx.window !== undefined ) {
            removeHideHandler ( ctx );
        }

        ctx._windowHandler = function( e ) {
            onClickHide.call ( newWindow, e, ctx );
        };

        newWindow.addEventListener ( "click", ctx._windowHandler, false );
    };

	function onClickHide ( e, ctx ) {

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

    function removeHideHandler ( ctx ) {
        if( ctx && ctx.window )
            ctx.window.removeEventListener ( "click", ctx._windowHandler );
    };


    Modal.prototype.show = function( )  {

        if( this.isOpen ||
            !isHTMLElement ( this.window ) ) return;

        this.emit( "show" );

        this.overlay.style.display = "block";
        this.window.style.display = "block";
        this.setStartAnimationPosition();
        showAnimateWin( this );

        if( typeof transition == "undefined" ||
            !this.params.useAnimate ||
            !transition.getSupported() ) {

            this.emit( "showed" );
        }

        else {
            transition.end( this.window, function ( ) {
                this.emit ( "showed");
            }.bind( this ) );
        }

        return this.isOpen = true;
    };


    Modal.prototype.hide = function() {

        if( !this.isOpen ||
            !isHTMLElement ( this.window ) ) return;

        this.emit( "hide" );

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

    Modal.prototype.destroyWindow = function( removeWindowElement ) {

        this.hide();
        removeHideHandler ( this );

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


    Modal.prototype.destroy = function( removeWindowElement ) {

        window.removeEventListener( "resize", this._resizeHandler);
        this.overlay.removeEventListener( "click", this._hideHandler);
        this.destroyWindow( removeWindowElement );
        this.off( "show" );
        this.off( "hide" );

        remove( this.overlay );
        this.overlay = undefined;
    };



    function showAnimateWin( modal ) {

        modal.setEndAnimationPostition();

        if( modal.params.useAnimate ){
            addClass( modal.window , cls );
        }
    };


    function remove( elem ) {
        return elem.parentNode.removeChild( elem );
    }

    function isHTMLElement(elem) {
        return ( typeof elem=== "object" ) &&
            ( elem.nodeType === 1 ) && ( typeof elem.style === "object" ) &&
            ( typeof elem.ownerDocument ==="object" );
    }


    function addOverlay( modal ) {
        var overlay = document.createElement( "div" );

        overlay.className = "modal-overlay";
        modal._hideHandler = function() {

            if ( modal.params.opt_isOverlayClickHide ) {
               return modal.hide();
            }

        };

        overlay.addEventListener( "click", modal._hideHandler, false );
        modal.overlay = document.body.appendChild( overlay );
    }



    function addClass( elem, cls ) {
        var classes = elem.className.trim().split(" ");

        for( var i = classes.length; i; i-- ) {
            if( classes[i] == cls )  return;
        }

        classes.push( cls );
        elem.className = classes.join(" ");
    };

    function removeClass( el, cls ) {

        var classes = el.className.trim().split(' ');

        for ( var i = 0; i < classes.length; i++ ) {
            if ( classes[i] == cls ) classes.splice( i--, 1);
        }

        el.className = classes.join(' ');

    };

    function hasClass( el, cls ) {

        var classes = el.className.trim().split(' ');

        for (var i = 0; i < classes.length; i++ ) {
            if ( classes[i] == cls ) 
                return true;
        }

        return false;
    }


 window.ModalJS = Modal;

}());