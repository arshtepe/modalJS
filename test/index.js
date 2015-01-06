


describe("ModalWindow Object", function() {

    var modal,
        id,
        modalElement = document.getElementById( "modal-window" );

    beforeEach( function ( ) {

        var win = document.body.appendChild( modalElement.cloneNode(true) );

        id = win.id = Math.random();

        modal = new ModalJS ( {
            window: win
        } );

    } );


    it( "destroy", function() {
        modal.destroy();
        expect( modal.overlay ) .toBeUndefined();
    });


    it( "destroy with WindowElement", function() {
        modal.destroy( true );
        expect( modal.window ) .toBeUndefined();
        expect ( document.getElementById( id ) ) .toBeNull();
    });



    it( "show window", function ( done ) {

        var win = modal.window;
        modal.params.opt_notUseAnimate = true;

        modal.on( "showed", function () {
            var rect =  win.getBoundingClientRect(),
                top = Math.round( ( window.innerHeight - win.offsetHeight ) / 2  ),
                left = Math.round( (window.innerWidth - win.offsetWidth) / 2 );

            expect ( top ).toBe( Math.round( rect.top ) );
            expect ( left ).toBe( Math.round( rect.left ) );
            modal.destroy( true );
            done();
        } );

        modal.show();

    } );

    it ( "hide window", function () {
        modal.show();
        modal.hide();
        expect( modal.overlay.clientHeight ).toBe( 0 );
        expect( modal.window.clientHeight ).toBe( 0 );
        modal.destroy( true );
    } );


});

