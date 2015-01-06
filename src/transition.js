
//#set transition
var transition = {

    getSupported: function ( ) {

        var val = this.supportedVal;

        if ( val )
            return val;

        var t,
            el = document.createElement('fakeelement'),
            transitions = {
                'transition':'transitionend',
                'OTransition':'oTransitionEnd',
                'MozTransition':'transitionend',
                'WebkitTransition':'webkitTransitionEnd'
            };

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return this.supportedVal = transitions[t];
            }
        }

        return false;
    },

    end: function ( elem,  callback ) {

        var event = this.getSupported();

        if( !event ) {
//            setTimeout( callback
            callback();
            return false;
        }

        elem.addEventListener ( event, function handler() {
            elem.removeEventListener ( event, handler );
            callback();
        } );
    }
};