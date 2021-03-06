


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

        if( !modal._transition )
            done();

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

    it( "show without animate", function ( done ) {

        var win = modal.window;

        modal.params.useAnimate = false;
        modal.show();
        setTimeout( function () {

            var rect =  win.getBoundingClientRect(),
                top = Math.round( ( window.innerHeight - win.offsetHeight ) / 2  ),
                left = Math.round( (window.innerWidth - win.offsetWidth) / 2 );

            expect ( top ).toBe( Math.round( rect.top ) );
            expect ( left ).toBe( Math.round( rect.left ) );
            modal.destroy( true );
            done();

        }, 0 );

    } );

    it ( "hide window", function () {
        modal.show();
        modal.hide();
        expect( modal.overlay.clientHeight ).toBe( 0 );
        expect( modal.window.clientHeight ).toBe( 0 );
        modal.destroy( true );
    } );

    it ( "Overlay click hide", function () {

        modal.show();
        modal.params.opt_isOverlayClickHide = true;
        modal.overlay.click();
        expect( modal.overlay.clientHeight ).toBe( 0 );
        expect( modal.window.clientHeight ).toBe( 0 );
        modal.destroy( true );
    } );



    it ( "CloseButton click hide", function () {

        modal.show();
        modal.params.opt_closeButtonCls = "close-button";
        modal.setWindow( modal.window );
        modal.window.querySelector( ".close-button").click();

        expect( modal.overlay.clientHeight ).toBe( 0 );
        expect( modal.window.clientHeight ).toBe( 0 );
        modal.destroy( true );
    } );



});

