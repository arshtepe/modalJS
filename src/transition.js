
    //#set transition
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
    