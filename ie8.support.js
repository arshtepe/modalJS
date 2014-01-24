(function (window, html) {
    if (!window.innerWidth) Object.defineProperty(window, 'innerWidth', {
        get: function () { return html.clientWidth }
    });

    if (!window.innerHeight) Object.defineProperty(window, 'innerHeight', {
        get: function () { return html.clientHeight }
    });

   var rect =  Element.prototype.getBoundingClientRect;

   Element.prototype.getBoundingClientRect = function () {
   	var res = rect.apply(this, arguments),
   		_return = {};

    for(var key in res) {
    	_return[key] = res[key];
    };

   	_return.height = this.clientHeight;
   	_return.width = this.clientWidth;

   	return _return;
   }



   // added addEventListener support
  function stopPropagation() {
    this.cancelBubble = true;
  };
  function preventDefault() {
    this.returnValue = false;
  };
  function addEventUsingAttach(eventName, handler)
  {
    this.attachEvent("on" + eventName, function() {
      var e = window.event;
      e.stopPropagation = stopPropagation;
      e.preventDefault = preventDefault;
      handler.call(this, e);
    });
  }

  // Function to add `addEvent` to the given target object
  function extendIt(target)
  {
  	target.addEventListener = addEventUsingAttach;
  }

  // Add it to `Element.prototype` if we have it
  extendIt(Element.prototype);
  // Add it to `window` and `document` (etc.)
  extendIt(window);
  extendIt(document);


   
}(window, document.documentElement));