function addClass(elem, cls) {
    var classes = elem.className.split(" ");

    for(var i = classes.length; i; i--) {
        if(classes[i] == cls) return;
    }

    classes.push(cls);
    elem.className = classes.join(" ");
};

function removeClass(el, cls) {
    var c = el.className.split(' ');

    for (var i=0; i<c.length; i++) {
        if (c[i] == cls) c.splice(i--, 1);
    }

    el.className = c.join(' ');

};

function hasClass(el, cls) {

    for (var c = el.className.split(' '),i=c.length-1; i>=0; i--) {
        if (c[i] == cls) return true;
    }

    return false;
}