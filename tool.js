//异步加载JS
function loadScript(url, callback){
   var script = document.createElement('script');
   script.type = "text/javascript";
   if(script.readyState){
       script.onreadystatechange = function (){
           if(script.readyState == "complete" || script.readyState == "loaded"){
               callback();
           }
       }
   }else{
       script.onload = function (){
           callback();
       }
   }
   script.src = url;
   document.head.appendChild(script);
}

//拖拽dome
function drag(elem) {
    var disX,
        disY;
    elem.addEventListener('mousedown', test, false);
    function test(e) {
        disX = e.pageX - parseInt(elem.style.left);
        disY = e.pageY - parseInt(elem.style.top);
        document.addEventListener('mousemove', testa, false)
        function testa(e) {
            lef.innerText = elem.style.left;
            to.innerText = elem.style.top;
            var event = e || window.event;
            elem.style.left = e.pageX - disX + "px";
            elem.style.top = e.pageY - disY + "px";
        }
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', testa, false)
        }, false)
    }
    stopBubble(elem);
}

//兼容性的addEvent
function addEvent(elem, type, handle) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handle, false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + type, function () {
            handle.call(elem)
        })
    } else {
        elem['on' + type] = handle;
    }
}

//  取消冒泡
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

//阻止默认事件
function cancelHandler(event) {
    if (event.preventDefaule) {
        event.preventDefaule();
    } else {
        event.returnValue = false;
    }
}

// 封装兼容性方法getStyle
function getStyle(elem, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(elem, null)[prop];
    } else {
        return elem.currentStyle[prop];
    }
}


//myChildren功能，解决以前部分浏览器的兼容性问题
Element.prototype.myChildren = function () {
    var child = this.childNodes;
    var len = child.length;
    var arr = [];
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType == 1) {
            arr.push(child[i]);
        }
    }
    return arr;
}

//insertAfter;功能类似insertBefor 提示:可忽略老版本浏览器，直接在Element.prototype上编程
Element.prototype.insertAfetr = function (targetNode, afterNode) {
    var beforeNode = afterNode.nextElementSibling;
    if (beforeNode == null) {
        this.appendChild(targetNode);
    } else {
        this.insertBefore(targetNode, beforeNode);
    }
}

// 查看滚动条距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

// 查看视口尺寸
function getViewportOffset() {
    if (0 & window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight
        }
    } else {
        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight,
            }
        }
    }
}

// call方法
function Person(name, age) {
    this.name = name;
    this.age = age;
}

var obj = {

}
// Person.call(obj, "cheng", 300);

//type方法
function myType(target) {
    var obj = {
        "[object Array]": "Array",
        "[object Object]": "Object",
        "[object Number]": "Numbet - object",
        "[object String]": "string - object",
        "[object Boolean]": "boolean - object"
    }
    if (target === null) {
        return "null"
    } else if (typeof (target) == "object") {
        var str = Object.prototype.toString.call(target);
        return obj[str];
    } else {
        return typeof (target)
    }
}

// 遍历子元素节点
function retElementChild(node) {
    var temp = {
        length: 0,
        push: Array.prototype.push,
        splice: Array.prototype.splice
    },
        child = node.childNodes,
        len = child.length;
    for (var i = 0; i < len; i++) {
        if (child[i].nodeType === 1) {
            temp.push(child[i]);
        }
    }
    return temp;
}

//克隆数组，对象
function deepClone(origin, target) {
    var target = target || {},
        toStr = Object.prototype.toString,
        arrStr = "[object Array]";
    for (var prop in origin) {
        if (origin.hasOwnProperty(prop)) {
            if (origin[prop] !== "null" && typeof (origin[prop]) == 'object') {
                target[prop] = toStr.call(origin[prop]) == arrStr ? [] : {};
                deepClone(origin[prop], target[prop])
            } else {
                target[prop] = origin[prop];
            }
        }
    }
    return target;
}
