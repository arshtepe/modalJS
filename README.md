##Demo
* http://jsfiddle.net/dyL78o6k/1/ - demo
* http://jsfiddle.net/dyL78o6k/ - animation change demo
* http://jsfiddle.net/dyL78o6k/3/ - animation change demo

##Installation
```HTML
<link href="path_to/modal-default.css" rel="stylesheet" type="text/css">
<script src="path_to/modal.min.js"></script>
```

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
  useAnimate: false// if false animation does not use (default true)
 });
 
 modal.show(); //show window
 modal.hide(); // hide window
 // Events: show, showed, hide
 modal.on( "showed",function () { // bind on modal events
 // this == modal
 } ) ;
 
 modal.off( "showed", /*opt_Handler*/ )//remove event handler
 modal.setWindow( /*modal window HTMLEelement*/ );
 modal.destroy( /*opt_removeWindow*/ )// destroyed all handlers and links on HTML elements, if opt_removeWindow = true, removed HTMLElemenet window.
 modal.destroyWindow (/*opt_removeWindow*/);// removed all links on window element, if opt_removeWindow = true, removed HTMLElemenet window.

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
 
 
##Animation change example

http://jsfiddle.net/dyL78o6k/

```javascript
 modal.setStartAnimationPosition = function() {
   this.window.style.top = 0 + "px";
 };

modal.setEndAnimationPostition = function ( ) {

  var win = this.window,
      top = window.innerHeight - win.offsetHeight ,
      left = ( window.innerWidth - win.offsetWidth ) / 2 ;

  win.style.top = top + "px";
  win.style.left = left + "px";
};
```
 
##Animation change example

http://jsfiddle.net/dyL78o6k/2/ 


```javascript

modal.on( "hide", function ( ) {
  win.style.transform = "scale(0)";
} );

modal.on( "show", function ( ) {
   win.style.transform = "scale(1)";
} );
```

```CSS
 transition: all .7s ease-in; /* changed "top" on "all" */
-o-transition: all .7s ease-in;
-moz-transition: all  .7s ease-in;
-webkit-transition: all  .7s ease-in;      

```

## License

modalJS is licensed under the MIT License (see LICENSE for details). 
 
