!function(t){function s(s){for(var e,o,p=s[0],r=s[1],c=s[2],l=0,m=[];l<p.length;l++)o=p[l],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&m.push(a[o][0]),a[o]=0;for(e in r)Object.prototype.hasOwnProperty.call(r,e)&&(t[e]=r[e]);for(h&&h(s);m.length;)m.shift()();return n.push.apply(n,c||[]),i()}function i(){for(var t,s=0;s<n.length;s++){for(var i=n[s],e=!0,p=1;p<i.length;p++){var r=i[p];0!==a[r]&&(e=!1)}e&&(n.splice(s--,1),t=o(o.s=i[0]))}return t}var e={},a={0:0},n=[];function o(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=e,o.d=function(t,s,i){o.o(t,s)||Object.defineProperty(t,s,{enumerable:!0,get:i})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,s){if(1&s&&(t=o(t)),8&s)return t;if(4&s&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&s&&"string"!=typeof t)for(var e in t)o.d(i,e,function(s){return t[s]}.bind(null,e));return i},o.n=function(t){var s=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(s,"a",s),s},o.o=function(t,s){return Object.prototype.hasOwnProperty.call(t,s)},o.p="/";var p=window.webpackJsonp=window.webpackJsonp||[],r=p.push.bind(p);p.push=s,p=p.slice();for(var c=0;c<p.length;c++)s(p[c]);var h=r;n.push([25,1]),i()}([,,function(t,s,i){var e=i(23);"string"==typeof e&&(e=[[t.i,e,""]]);var a={insert:"head",singleton:!1};i(3)(e,a);e.locals&&(t.exports=e.locals)},,,,,function(t,s){},function(t,s,i){var e=i(9);"string"==typeof e&&(e=[[t.i,e,""]]);var a={insert:"head",singleton:!1};i(3)(e,a);e.locals&&(t.exports=e.locals)},function(t,s,i){},function(t,s,i){var e=i(11);"string"==typeof e&&(e=[[t.i,e,""]]);var a={insert:"head",singleton:!1};i(3)(e,a);e.locals&&(t.exports=e.locals)},function(t,s,i){},,,,,,,,function(t,s){},function(t,s){},function(t,s){},function(t,s,i){"use strict";var e=i(2);i.n(e).a},function(t,s,i){},function(t,s,i){"use strict";i.r(s);var e=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("section",{staticClass:"map-container",attrs:{id:"map-controller"},on:{mousedown:t.mouseDown,mousemove:t.mouseMove,mouseup:function(s){t.isMousePush=!1},wheel:t.zoom}},[i("canvas",{attrs:{id:"map"}})])};e._withStripped=!0;var a=i(0),n={data:function(){return{isMousePush:!1,mouseCoords:{x:0,y:0},map:null,mapImg:"../assets/img/test.jpg",mapOptions:{baseWidth:0,baseHeight:0,baseScale:1,width:0,height:0,transX:0,transY:0,scale:1}}},computed:{width:function(){return 100*this.$parent.$el.clientWidth/100}},methods:{mouseMove:function(t){this.isMousePush&&(this.mapOptions.transX-=(this.mouseCoords.x-t.pageX)/this.mapOptions.scale,this.mapOptions.transY-=(this.mouseCoords.y-t.pageY)/this.mapOptions.scale,this.applyTransform(),this.map.renderAll(),this.mouseCoords.x=t.pageX,this.mouseCoords.y=t.pageY)},mouseDown:function(t){this.isMousePush=!0,this.mouseCoords.x=t.pageX,this.mouseCoords.y=t.pageY},zoom:function(t){var s=document.getElementById("map").getBoundingClientRect(),i=t.clientX-s.left,e=t.clientY-s.top,a=Math.pow(1.04,t.deltaY);this.setScale(this.mapOptions.scale*a,i,e),t.preventDefault()},mapInit:function(){var t=this;this.map=new a.fabric.Canvas("map",{width:1e3,height:500,selection:!1,scale:1,renderOnAddRemove:!1,moveCursor:"default",hoverCursor:"default"}),a.fabric.Image.fromURL(this.mapImg,(function(s){t.mapOptions.baseWidth=s.width,t.mapOptions.baseHeight=s.height,t.mapOptions.width=1e3,t.mapOptions.height=500,s.set({hasRotatingPoint:!1,hasBorders:!1,hasControls:!1,lockScalingY:!0,lockScalingX:!0,selectable:!1,left:s.width/2,top:s.height/2,originX:"center",originY:"center"}),t.map.add(s),t.map.sendToBack(s),t.map.renderAll()})),this.addMarker({x:550,y:390},"0","#1048a7"),this.addMarker({x:460,y:120},"1","#aa2222"),this.map.renderAll()},applyTransform:function(){var t,s,i,e,n;this.mapOptions.baseWidth*this.mapOptions.scale<=this.mapOptions.width?(t=(this.mapOptions.width-this.mapOptions.baseWidth*this.mapOptions.scale)/(2*this.mapOptions.scale),i=(this.mapOptions.width-this.mapOptions.baseWidth*this.mapOptions.scale)/(2*this.mapOptions.scale)):(t=0,i=(this.mapOptions.width-this.mapOptions.baseWidth*this.mapOptions.scale)/this.mapOptions.scale),this.mapOptions.transX>t?this.mapOptions.transX=t:this.mapOptions.transX<i&&(this.mapOptions.transX=i),this.mapOptions.baseHeight*this.mapOptions.scale<=this.mapOptions.height?(s=(this.mapOptions.height-this.mapOptions.baseHeight*this.mapOptions.scale)/(2*this.mapOptions.scale),e=(this.mapOptions.height-this.mapOptions.baseHeight*this.mapOptions.scale)/(2*this.mapOptions.scale)):(s=0,e=(this.mapOptions.height-this.mapOptions.baseHeight*this.mapOptions.scale)/this.mapOptions.scale),this.mapOptions.transY>s?this.mapOptions.transY=s:this.mapOptions.transY<e&&(this.mapOptions.transY=e),(n=new a.fabric.Group(this.map.getObjects())).scaleX=this.mapOptions.scale/this.map.scale,n.scaleY=this.mapOptions.scale/this.map.scale,n.left=this.mapOptions.transX*this.mapOptions.scale,n.top=this.mapOptions.transY*this.mapOptions.scale,n.destroy(),this.map.scale=this.mapOptions.scale,this.map.renderAll()},setScale:function(t,s,i){var e;t>5*this.mapOptions.baseScale?t=5*this.mapOptions.baseScale:t<-1*this.mapOptions.baseScale&&(t=-1*this.mapOptions.baseScale),void 0!==s&&void 0!==i&&(e=t/this.mapOptions.scale,this.mapOptions.transX-=(e-1)/t*s,this.mapOptions.transY-=(e-1)/t*i),this.mapOptions.scale=t,this.applyTransform()},addMarker:function(t,s,i){var e=new a.fabric.Path("M356.208,107.051c-1.531-5.738-4.64-11.852-6.94-17.205C321.746,23.704,261.611,0,213.055,0C148.054,0,76.463,43.586,66.905,133.427v18.355c0,0.766,0.264,7.647,0.639,11.089c5.358,42.816,39.143,88.32,64.375,131.136c27.146,45.873,55.314,90.999,83.221,136.106c17.208-29.436,34.354-59.259,51.17-87.933c4.583-8.415,9.903-16.825,14.491-24.857c3.058-5.348,8.9-10.696,11.569-15.672c27.145-49.699,70.838-99.782,70.838-149.104v-20.262C363.209,126.938,356.581,108.204,356.208,107.051z M214.245,199.193c-19.107,0-40.021-9.554-50.344-35.939c-1.538-4.2-1.414-12.617-1.414-13.388v-11.852c0-33.636,28.56-48.932,53.406-48.932c30.588,0,54.245,24.472,54.245,55.06C270.138,174.729,244.833,199.193,214.245,199.193z",{scaleX:this.mapOptions.scale/5,scaleY:this.mapOptions.scale/5,left:t.x,top:t.y,opacity:.7,originX:"center",originY:"bottom",fill:i,stroke:"black",text:s}),n=new a.fabric.Text(s,{fontSize:14,originX:"center",fill:i,originY:"center"}),o=new a.fabric.Circle({radius:11,originX:"center",originY:"center",fill:"white",stroke:i}),p=new a.fabric.Group([o,n],{scaleX:this.mapOptions.scale,scaleY:this.mapOptions.scale,opacity:.8,left:t.x-12*this.mapOptions.scale,top:t.y-69*this.mapOptions.scale});this.map.add(e),this.map.bringToFront(e),this.map.add(p),this.map.bringToFront(p)}},mounted:function(){this.mapInit()}},o=(i(22),i(6)),p=Object(o.a)(n,e,[],!1,null,"3074bd5c",null);p.options.__file="src/components/Map.vue";s.default=p.exports},function(t,s,i){"use strict";i.r(s);i(7),i(8),i(10);var e=i(4),a=i.n(e),n=i(5);a.a.use(n.a);var o=new n.a.Store({modules:{example:{state:{},getters:{},mutations:{},actions:{}}}});window.Vue=i(4),Vue.component("canvas-map",i(24).default);new Vue({el:"#app",store:o})}]);