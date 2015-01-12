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