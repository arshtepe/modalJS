function eventEmitter() {
    this._handlers = [];
};

eventEmitter.prototype = {
    on: function(event) {
        event = event.toLowerCase();
        var handlers = this._handlers[event] || [];

        this._handlers[event] = handlers.concat(handlers.slice.call(arguments, 1));

        return this;
    },
    off: function( event, handler ) {
        event =  event.toLowerCase();
        var handlers =  this._handlers[event];

        if(!handlers) return;

        if(!handler)
            delete this._handlers[ event ];

        for(var i = 0; i < handlers.length; i++) {
            if( handlers[i] == handler ) {

                handlers.splice(i, 1);
                return this;
            }
        }

        return this;
    },

    emit: function( event, context ) {
        event = event.toLowerCase();

        var handlers =  this._handlers[event],
            args = arguments,
            self = this;

        if( !this._handlers[event] ) return;

        (function callFnc( i ) {
            try {
                for(; i < handlers.length; i++) {

                    handlers[i].apply( context || null, [].slice.call( args, 2 ));
                }
            } catch (err) {
                self.emit("error", self, err, handlers[i], event );

                if(++i < handlers.length)
                    callFnc( i )
            }
        }( 0 ));

        return this;
    },

    getHandlers: function( event ) {
        var handlers = this._handlers[event.toLowerCase()];
        return handlers  || [];
    }
};