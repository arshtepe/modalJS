##Features
* Cross browser compatibility
* Without additional libraries
* Easy usage
* Css3 animation
* Easy settings animation

## Browsers Support
* Chrome +
* Firefox + 
* Opera +
* Internet Explorer 9 + 


```javascript
var modal = new ModalJS({
  window: win,// Link on HTMLElement
  opt_closeButtonCls: "close-button",//Close button element class
  opt_isOverlayClickHide: true,// if true when click on overlay, window will close
  opt_notUseAnimate: true // if true animation does not use 
 });
 
 modal.show(); //show window
 modal.hide(); // hide window 
 modal.on( "showed",function () { // bind on modal events
 // this == modal
 } ) ;
 
 modal.off( "showed", /*opt_Handler*/ )//remove event handler
 modal.setWindow( /*modal window HTMLEelement*/ );
 modal.destroy( /*opt_removeWindow*/ )// destroyed all handlers and links on HTML elements, if opt_removeWindow = true, removed HTMLElemenet window.
 modal.destroyWindow (/*opt_removeWindow*/);// removed all links on window element, if opt_removeWindow = true, removed HTMLElemenet window.
 //Устанавливает начальную позицию окна при анимирование, по умолчанию с верху по центру за приделами экран
 modal.setStartAnimationPosition = function() { // Set start position window  before start animation, default at the top at the center outside screen  
  this.window.style.top = -this.window.clientHeight + "px"; //default value
 };
 
 
// Set end position for window ( place  in what window will move ), default screen center
 modal.setEndAnimationPostition = function ( ) { //default function
  var win = this.window,
      top = ( window.innerHeight - win.offsetHeight ) / 2,
      left = ( window.innerWidth - win.offsetWidth ) / 2;

  win.style.top = top + "px";
  win.style.left = left + "px";
 };

 ```
 
 
