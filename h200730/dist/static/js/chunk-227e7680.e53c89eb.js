(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-227e7680"],{"061e":function(t,i,e){"use strict";function n(t){var i=window.getComputedStyle(t),e="none"===i.display,n=null===t.offsetParent&&"fixed"!==i.position;return e||n}e.d(i,"a",(function(){return n}))},1164:function(t,i,e){},"4aaa":function(t,i,e){},5558:function(t,i,e){},"6df0":function(t,i,e){},"93f8":function(t,i,e){"use strict";function n(t){var i=[];function e(t){t.forEach((function(t){i.push(t),t.componentInstance&&e(t.componentInstance.$children.map((function(t){return t.$vnode}))),t.children&&e(t.children)}))}return e(t),i}function s(t,i){var e=i.$vnode.componentOptions;if(e&&e.children){var s=n(e.children);t.sort((function(t,i){return s.indexOf(t.$vnode)-s.indexOf(i.$vnode)}))}}function o(t,i){var e,n;void 0===i&&(i={});var o=i.indexKey||"index";return{inject:(e={},e[t]={default:null},e),computed:(n={parent:function(){return this.disableBindRelation?null:this[t]}},n[o]=function(){return this.bindRelation(),this.parent?this.parent.children.indexOf(this):null},n),watch:{disableBindRelation:function(t){t||this.bindRelation()}},mounted:function(){this.bindRelation()},beforeDestroy:function(){var t=this;this.parent&&(this.parent.children=this.parent.children.filter((function(i){return i!==t})))},methods:{bindRelation:function(){if(this.parent&&-1===this.parent.children.indexOf(this)){var t=[].concat(this.parent.children,[this]);s(t,this.parent),this.parent.children=t}}}}}function a(t){return{provide:function(){var i;return i={},i[t]=this,i},data:function(){return{children:[]}}}}e.d(i,"a",(function(){return o})),e.d(i,"b",(function(){return a}))},a5e8:function(t,i,e){},aff9:function(t,i,e){},baa5:function(t,i,e){var n=e("23e7"),s=e("e58c");n({target:"Array",proto:!0,forced:s!==[].lastIndexOf},{lastIndexOf:s})},bac6:function(t,i,e){"use strict";(function(t){e.d(i,"c",(function(){return h})),e.d(i,"b",(function(){return l})),e.d(i,"a",(function(){return u}));var n=e("973e"),s=Date.now();function o(t){var i=Date.now(),e=Math.max(0,16-(i-s)),n=setTimeout(t,e);return s=i+e,n}var a=n["g"]?t:window,r=a.requestAnimationFrame||o,c=a.cancelAnimationFrame||a.clearTimeout;function h(t){return r.call(a,t)}function l(t){h((function(){h(t)}))}function u(t){c.call(a,t)}}).call(this,e("c8ba"))},ca29:function(t,i,e){t.exports=e.p+"static/img/shangchuan.a2d6a917.png"},e58c:function(t,i,e){"use strict";var n=e("fc6a"),s=e("a691"),o=e("50c4"),a=e("a640"),r=e("ae40"),c=Math.min,h=[].lastIndexOf,l=!!h&&1/[1].lastIndexOf(1,-0)<0,u=a("lastIndexOf"),d=r("indexOf",{ACCESSORS:!0,1:0}),f=l||!u||!d;t.exports=f?function(t){if(l)return h.apply(this,arguments)||0;var i=n(this),e=o(i.length),a=e-1;for(arguments.length>1&&(a=c(a,s(arguments[1]))),a<0&&(a=e+a);a>=0;a--)if(a in i&&i[a]===t)return a||0;return-1}:h},e856:function(t,i,e){"use strict";var n=e("6df0"),s=e.n(n);s.a},e875:function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("section",{staticClass:"uploader"},[n("Uploader",{attrs:{"max-count":1,accept:".pdf,image/*,.docx,.doc,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"},model:{value:t.fileList,callback:function(i){t.fileList=i},expression:"fileList"}},[0===t.fileList.length?n("div",{staticClass:"uploader-img"},[n("img",{attrs:{src:e("ca29"),alt:""}})]):t._e()]),n("button",{staticClass:"save",on:{click:t.send}},[t._v("上传简历")])],1)},s=[],o=(e("99af"),e("baa5"),e("b0c0"),e("ac1f"),e("5319"),e("5530")),a=(e("96cf"),e("1da1")),r=(e("ce7f"),e("df67")),c=(e("126c"),e("17da"),e("b7d4"),e("40a3"),e("5558"),e("3d08"),e("430d"),e("1164"),e("4aaa"),e("a5e8"),e("aff9"),e("d601")),h=e("3fcc"),l=e("fbbe"),u=e("973e");function d(t){return Array.isArray(t)?t:[t]}function f(t,i){return new Promise((function(e){if("file"!==i){var n=new FileReader;n.onload=function(t){e(t.target.result)},"dataUrl"===i?n.readAsDataURL(t):"text"===i&&n.readAsText(t)}else e()}))}function m(t,i){return d(t).some((function(t){return t.size>i}))}var v=/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;function p(t){return v.test(t)}function g(t){return!!t.isImage||(t.file&&t.file.type?0===t.file.type.indexOf("image"):t.url?p(t.url):!!t.content&&0===t.content.indexOf("data:image"))}var w={inject:{vanField:{default:null}},watch:{value:function(){var t=this.vanField;t&&(t.resetValidation(),t.validateWithTrigger("onChange"))}},created:function(){var t=this.vanField;t&&!t.children&&(t.children=this)}},b=e("edc4"),y=e("23c4"),S=e.n(y),x=Object(h["a"])("image"),$=x[0],O=x[1],T=$({props:{src:String,fit:String,alt:String,round:Boolean,width:[Number,String],height:[Number,String],radius:[Number,String],lazyLoad:Boolean,showError:{type:Boolean,default:!0},showLoading:{type:Boolean,default:!0},errorIcon:{type:String,default:"photo-fail"},loadingIcon:{type:String,default:"photo"}},data:function(){return{loading:!0,error:!1}},watch:{src:function(){this.loading=!0,this.error=!1}},computed:{style:function(){var t={};return Object(u["c"])(this.width)&&(t.width=Object(l["a"])(this.width)),Object(u["c"])(this.height)&&(t.height=Object(l["a"])(this.height)),Object(u["c"])(this.radius)&&(t.overflow="hidden",t.borderRadius=Object(l["a"])(this.radius)),t}},created:function(){var t=this.$Lazyload;t&&u["b"]&&(t.$on("loaded",this.onLazyLoaded),t.$on("error",this.onLazyLoadError))},beforeDestroy:function(){var t=this.$Lazyload;t&&(t.$off("loaded",this.onLazyLoaded),t.$off("error",this.onLazyLoadError))},methods:{onLoad:function(t){this.loading=!1,this.$emit("load",t)},onLazyLoaded:function(t){var i=t.el;i===this.$refs.image&&this.loading&&this.onLoad()},onLazyLoadError:function(t){var i=t.el;i!==this.$refs.image||this.error||this.onError()},onError:function(t){this.error=!0,this.loading=!1,this.$emit("error",t)},onClick:function(t){this.$emit("click",t)},genPlaceholder:function(){var t=this.$createElement;return this.loading&&this.showLoading?t("div",{class:O("loading")},[this.slots("loading")||t(b["a"],{attrs:{name:this.loadingIcon},class:O("loading-icon")})]):this.error&&this.showError?t("div",{class:O("error")},[this.slots("error")||t(b["a"],{attrs:{name:this.errorIcon},class:O("error-icon")})]):void 0},genImage:function(){var t=this.$createElement,i={class:O("img"),attrs:{alt:this.alt},style:{objectFit:this.fit}};if(!this.error)return this.lazyLoad?t("img",S()([{ref:"image",directives:[{name:"lazy",value:this.src}]},i])):t("img",S()([{attrs:{src:this.src},on:{load:this.onLoad,error:this.onError}},i]))}},render:function(){var t=arguments[0];return t("div",{class:O({round:this.round}),style:this.style,on:{click:this.onClick}},[this.genImage(),this.genPlaceholder(),this.slots()])}}),z=e("17c5"),C=e("2b0e"),I=Object(h["a"])("image-preview"),j=I[0],L=I[1],P=e("4049"),k=e("e7cb"),R=e("562a"),M=e("061e"),E=e("5977"),A=e("bac6"),D=e("248e"),_=e("93f8"),B=Object(h["a"])("swipe"),N=B[0],X=B[1],F=N({mixins:[k["a"],Object(_["b"])("vanSwipe"),Object(R["a"])((function(t,i){t(window,"resize",this.resize,!0),t(window,"orientationchange",this.resize,!0),t(window,"visibilitychange",this.onVisibilityChange),i?this.initialize():this.clear()}))],props:{width:[Number,String],height:[Number,String],autoplay:[Number,String],vertical:Boolean,lazyRender:Boolean,indicatorColor:String,loop:{type:Boolean,default:!0},duration:{type:[Number,String],default:500},touchable:{type:Boolean,default:!0},initialSwipe:{type:[Number,String],default:0},showIndicators:{type:Boolean,default:!0},stopPropagation:{type:Boolean,default:!0}},data:function(){return{rect:null,offset:0,active:0,deltaX:0,deltaY:0,swiping:!1,computedWidth:0,computedHeight:0}},watch:{children:function(){this.initialize()},initialSwipe:function(){this.initialize()},autoplay:function(t){t>0?this.autoPlay():this.clear()}},computed:{count:function(){return this.children.length},maxCount:function(){return Math.ceil(Math.abs(this.minOffset)/this.size)},delta:function(){return this.vertical?this.deltaY:this.deltaX},size:function(){return this[this.vertical?"computedHeight":"computedWidth"]},trackSize:function(){return this.count*this.size},activeIndicator:function(){return(this.active+this.count)%this.count},isCorrectDirection:function(){var t=this.vertical?"vertical":"horizontal";return this.direction===t},trackStyle:function(){var t,i=this.vertical?"height":"width",e=this.vertical?"width":"height";return t={},t[i]=this.trackSize+"px",t[e]=this[e]?this[e]+"px":"",t.transitionDuration=(this.swiping?0:this.duration)+"ms",t.transform="translate"+(this.vertical?"Y":"X")+"("+this.offset+"px)",t},indicatorStyle:function(){return{backgroundColor:this.indicatorColor}},minOffset:function(){return(this.vertical?this.rect.height:this.rect.width)-this.size*this.count}},mounted:function(){this.bindTouchEvent(this.$refs.track)},methods:{initialize:function(t){if(void 0===t&&(t=+this.initialSwipe),this.$el&&!Object(M["a"])(this.$el)){clearTimeout(this.timer);var i=this.$el.getBoundingClientRect();this.rect=i,this.swiping=!0,this.active=t,this.computedWidth=Math.round(+this.width||i.width),this.computedHeight=Math.round(+this.height||i.height),this.offset=this.getTargetOffset(t),this.children.forEach((function(t){t.offset=0})),this.autoPlay()}},resize:function(){this.initialize(this.activeIndicator)},onVisibilityChange:function(){document.hidden?this.clear():this.autoPlay()},onTouchStart:function(t){this.touchable&&(this.clear(),this.touchStartTime=Date.now(),this.touchStart(t),this.correctPosition())},onTouchMove:function(t){this.touchable&&this.swiping&&(this.touchMove(t),this.isCorrectDirection&&(Object(E["c"])(t,this.stopPropagation),this.move({offset:this.delta})))},onTouchEnd:function(){if(this.touchable&&this.swiping){var t=this.size,i=this.delta,e=Date.now()-this.touchStartTime,n=i/e,s=Math.abs(n)>.25||Math.abs(i)>t/2;if(s&&this.isCorrectDirection){var o=this.vertical?this.offsetY:this.offsetX,a=0;a=this.loop?o>0?i>0?-1:1:0:-Math[i>0?"ceil":"floor"](i/t),this.move({pace:a,emitChange:!0})}else i&&this.move({pace:0});this.swiping=!1,this.autoPlay()}},getTargetActive:function(t){var i=this.active,e=this.count,n=this.maxCount;return t?this.loop?Object(D["b"])(i+t,-1,e):Object(D["b"])(i+t,0,n):i},getTargetOffset:function(t,i){void 0===i&&(i=0);var e=t*this.size;this.loop||(e=Math.min(e,-this.minOffset));var n=Math.round(i-e);return this.loop||(n=Object(D["b"])(n,this.minOffset,0)),n},move:function(t){var i=t.pace,e=void 0===i?0:i,n=t.offset,s=void 0===n?0:n,o=t.emitChange,a=this.loop,r=this.count,c=this.active,h=this.children,l=this.trackSize,u=this.minOffset;if(!(r<=1)){var d=this.getTargetActive(e),f=this.getTargetOffset(d,s);if(a){if(h[0]&&f!==u){var m=f<u;h[0].offset=m?l:0}if(h[r-1]&&0!==f){var v=f>0;h[r-1].offset=v?-l:0}}this.active=d,this.offset=f,o&&d!==c&&this.$emit("change",this.activeIndicator)}},prev:function(){var t=this;this.correctPosition(),this.resetTouchStatus(),Object(A["b"])((function(){t.swiping=!1,t.move({pace:-1,emitChange:!0})}))},next:function(){var t=this;this.correctPosition(),this.resetTouchStatus(),Object(A["b"])((function(){t.swiping=!1,t.move({pace:1,emitChange:!0})}))},swipeTo:function(t,i){var e=this;void 0===i&&(i={}),this.correctPosition(),this.resetTouchStatus(),Object(A["b"])((function(){var n;n=e.loop&&t===e.count?0===e.active?0:t:t%e.count,i.immediate?Object(A["b"])((function(){e.swiping=!1})):e.swiping=!1,e.move({pace:n-e.active,emitChange:!0})}))},correctPosition:function(){this.swiping=!0,this.active<=-1&&this.move({pace:this.count}),this.active>=this.count&&this.move({pace:-this.count})},clear:function(){clearTimeout(this.timer)},autoPlay:function(){var t=this,i=this.autoplay;i>0&&this.count>1&&(this.clear(),this.timer=setTimeout((function(){t.next(),t.autoPlay()}),i))},genIndicator:function(){var t=this,i=this.$createElement,e=this.count,n=this.activeIndicator,s=this.slots("indicator");return s||(this.showIndicators&&e>1?i("div",{class:X("indicators",{vertical:this.vertical})},[Array.apply(void 0,Array(e)).map((function(e,s){return i("i",{class:X("indicator",{active:s===n}),style:s===n?t.indicatorStyle:null})}))]):void 0)}},render:function(){var t=arguments[0];return t("div",{class:X()},[t("div",{ref:"track",style:this.trackStyle,class:X("track",{vertical:this.vertical})},[this.slots()]),this.genIndicator()])}}),Y=Object(h["a"])("swipe-item"),U=Y[0],W=Y[1],H=U({mixins:[Object(_["a"])("vanSwipe")],data:function(){return{offset:0,mounted:!1}},mounted:function(){var t=this;this.$nextTick((function(){t.mounted=!0}))},computed:{style:function(){var t={},i=this.parent,e=i.size,n=i.vertical;return t[n?"height":"width"]=e+"px",this.offset&&(t.transform="translate"+(n?"Y":"X")+"("+this.offset+"px)"),t},shouldRender:function(){var t=this.index,i=this.parent,e=this.mounted;if(!i.lazyRender)return!0;if(!e)return!1;var n=i.activeIndicator,s=i.count-1,o=0===n?s:n-1,a=n===s?0:n+1;return t===n||t===o||t===a}},render:function(){var t=arguments[0];return t("div",{class:W(),style:this.style,on:Object(c["a"])({},this.$listeners)},[this.shouldRender&&this.slots()])}});function Z(t){return Math.sqrt(Math.pow(t[0].clientX-t[1].clientX,2)+Math.pow(t[0].clientY-t[1].clientY,2))}var V,q={mixins:[k["a"]],props:{src:String,show:Boolean,active:Number,minZoom:[Number,String],maxZoom:[Number,String],windowWidth:Number,windowHeight:Number},data:function(){return{scale:1,moveX:0,moveY:0,moving:!1,zooming:!1,imageRatio:0,displayWidth:0,displayHeight:0}},computed:{vertical:function(){var t=this.windowWidth,i=this.windowHeight,e=i/t;return this.imageRatio>e},imageStyle:function(){var t=this.scale,i={transitionDuration:this.zooming||this.moving?"0s":".3s"};if(1!==t){var e=this.moveX/t,n=this.moveY/t;i.transform="scale("+t+", "+t+") translate("+e+"px, "+n+"px)"}return i},maxMoveX:function(){if(this.imageRatio){var t=this.vertical?this.windowHeight/this.imageRatio:this.windowWidth;return Math.max(0,(this.scale*t-this.windowWidth)/2)}return 0},maxMoveY:function(){if(this.imageRatio){var t=this.vertical?this.windowHeight:this.windowWidth*this.imageRatio;return Math.max(0,(this.scale*t-this.windowHeight)/2)}return 0}},watch:{show:function(t){t||this.resetScale()}},mounted:function(){this.bindTouchEvent(this.$el)},methods:{resetScale:function(){this.setScale(1),this.moveX=0,this.moveY=0},setScale:function(t){this.scale=Object(D["b"])(t,+this.minZoom,+this.maxZoom),this.$emit("scale",{scale:this.scale,index:this.active})},toggleScale:function(){var t=this.scale>1?1:2;this.setScale(t),this.moveX=0,this.moveY=0},onTouchStart:function(t){var i=t.touches,e=this.offsetX,n=void 0===e?0:e;this.touchStart(t),this.touchStartTime=new Date,this.startMoveX=this.moveX,this.startMoveY=this.moveY,this.moving=1===i.length&&1!==this.scale,this.zooming=2===i.length&&!n,this.zooming&&(this.startScale=this.scale,this.startDistance=Z(t.touches))},onTouchMove:function(t){var i=t.touches;if(this.touchMove(t),(this.moving||this.zooming)&&Object(E["c"])(t,!0),this.moving){var e=this.deltaX+this.startMoveX,n=this.deltaY+this.startMoveY;this.moveX=Object(D["b"])(e,-this.maxMoveX,this.maxMoveX),this.moveY=Object(D["b"])(n,-this.maxMoveY,this.maxMoveY)}if(this.zooming&&2===i.length){var s=Z(i),o=this.startScale*s/this.startDistance;this.setScale(o)}},onTouchEnd:function(t){var i=!1;(this.moving||this.zooming)&&(i=!0,this.moving&&this.startMoveX===this.moveX&&this.startMoveY===this.moveY&&(i=!1),t.touches.length||(this.zooming&&(this.moveX=Object(D["b"])(this.moveX,-this.maxMoveX,this.maxMoveX),this.moveY=Object(D["b"])(this.moveY,-this.maxMoveY,this.maxMoveY),this.zooming=!1),this.moving=!1,this.startMoveX=0,this.startMoveY=0,this.startScale=1,this.scale<1&&this.resetScale())),Object(E["c"])(t,i),this.checkTap(),this.resetTouchStatus()},checkTap:function(){var t=this,i=this.offsetX,e=void 0===i?0:i,n=this.offsetY,s=void 0===n?0:n,o=new Date-this.touchStartTime,a=250,r=10;e<r&&s<r&&o<a&&(this.doubleTapTimer?(clearTimeout(this.doubleTapTimer),this.doubleTapTimer=null,this.toggleScale()):this.doubleTapTimer=setTimeout((function(){t.$emit("close"),t.doubleTapTimer=null}),a))},onLoad:function(t){var i=t.target,e=i.naturalWidth,n=i.naturalHeight;this.imageRatio=n/e}},render:function(){var t=arguments[0],i={loading:function(){return t(z["a"],{attrs:{type:"spinner"}})}};return t(H,{class:L("swipe-item")},[t(T,{attrs:{src:this.src,fit:"contain"},class:L("image",{vertical:this.vertical}),style:this.imageStyle,scopedSlots:i,on:{load:this.onLoad}})])}},J=j({mixins:[k["a"],Object(P["a"])({skipToggleEvent:!0}),Object(R["a"])((function(t){t(window,"resize",this.resize,!0),t(window,"orientationchange",this.resize,!0)}))],props:{className:null,closeable:Boolean,asyncClose:Boolean,showIndicators:Boolean,images:{type:Array,default:function(){return[]}},loop:{type:Boolean,default:!0},overlay:{type:Boolean,default:!0},minZoom:{type:[Number,String],default:1/3},maxZoom:{type:[Number,String],default:3},showIndex:{type:Boolean,default:!0},swipeDuration:{type:[Number,String],default:500},startPosition:{type:[Number,String],default:0},overlayClass:{type:String,default:L("overlay")},closeIcon:{type:String,default:"clear"},closeOnPopstate:{type:Boolean,default:!0},closeIconPosition:{type:String,default:"top-right"}},data:function(){return{active:0,windowWidth:0,windowHeight:0,doubleClickTimer:null}},created:function(){this.resize()},watch:{startPosition:"setActive",value:function(t){var i=this;t?(this.setActive(+this.startPosition),this.$nextTick((function(){i.$refs.swipe.swipeTo(+i.startPosition,{immediate:!0})}))):this.$emit("close",{index:this.active,url:this.images[this.active]})}},methods:{resize:function(){u["b"]&&(this.windowWidth=window.innerWidth,this.windowHeight=window.innerHeight)},emitClose:function(){this.asyncClose||this.$emit("input",!1)},emitScale:function(t){this.$emit("scale",t)},setActive:function(t){t!==this.active&&(this.active=t,this.$emit("change",t))},genIndex:function(){var t=this.$createElement;if(this.showIndex)return t("div",{class:L("index")},[this.slots("index")||this.active+1+" / "+this.images.length])},genCover:function(){var t=this.$createElement,i=this.slots("cover");if(i)return t("div",{class:L("cover")},[i])},genImages:function(){var t=this,i=this.$createElement;return i(F,{ref:"swipe",attrs:{lazyRender:!0,loop:this.loop,duration:this.swipeDuration,initialSwipe:this.startPosition,showIndicators:this.showIndicators,indicatorColor:"white"},class:L("swipe"),on:{change:this.setActive}},[this.images.map((function(e){return i(q,{attrs:{src:e,show:t.value,active:t.active,maxZoom:t.maxZoom,minZoom:t.minZoom,windowWidth:t.windowWidth,windowHeight:t.windowHeight},on:{scale:t.emitScale,close:t.emitClose}})}))])},genClose:function(){var t=this.$createElement;if(this.closeable)return t(b["a"],{attrs:{role:"button",name:this.closeIcon},class:L("close-icon",this.closeIconPosition),on:{click:this.emitClose}})},onClosed:function(){this.$emit("closed")},swipeTo:function(t,i){this.$refs.swipe&&this.$refs.swipe.swipeTo(t,i)}},render:function(){var t=arguments[0];if(this.shouldRender)return t("transition",{attrs:{name:"van-fade"},on:{afterLeave:this.onClosed}},[t("div",{directives:[{name:"show",value:this.value}],class:[L(),this.className]},[this.genClose(),this.genImages(),this.genIndex(),this.genCover()])])}}),Q={loop:!0,value:!0,images:[],maxZoom:3,minZoom:1/3,onClose:null,onChange:null,className:"",showIndex:!0,closeable:!1,closeIcon:"clear",asyncClose:!1,getContainer:"body",startPosition:0,swipeDuration:500,showIndicators:!1,closeOnPopstate:!0,closeIconPosition:"top-right"},K=function(){V=new(C["a"].extend(J))({el:document.createElement("div")}),document.body.appendChild(V.$el),V.$on("change",(function(t){V.onChange&&V.onChange(t)})),V.$on("scale",(function(t){V.onScale&&V.onScale(t)}))},G=function(t,i){if(void 0===i&&(i=0),!u["g"]){V||K();var e=Array.isArray(t)?{images:t,startPosition:i}:t;return Object(c["a"])(V,Q,e),V.$once("input",(function(t){V.value=t})),V.$once("closed",(function(){V.images=[]})),e.onClose&&(V.$off("close"),V.$once("close",e.onClose)),V}};G.Component=J,G.install=function(){C["a"].use(J)};var tt=G,it=Object(h["a"])("uploader"),et=it[0],nt=it[1],st=et({inheritAttrs:!1,mixins:[w],model:{prop:"fileList"},props:{disabled:Boolean,lazyLoad:Boolean,uploadText:String,afterRead:Function,beforeRead:Function,beforeDelete:Function,previewSize:[Number,String],previewOptions:Object,name:{type:[Number,String],default:""},accept:{type:String,default:"image/*"},fileList:{type:Array,default:function(){return[]}},maxSize:{type:[Number,String],default:Number.MAX_VALUE},maxCount:{type:[Number,String],default:Number.MAX_VALUE},deletable:{type:Boolean,default:!0},showUpload:{type:Boolean,default:!0},previewImage:{type:Boolean,default:!0},previewFullImage:{type:Boolean,default:!0},imageFit:{type:String,default:"cover"},resultType:{type:String,default:"dataUrl"},uploadIcon:{type:String,default:"photograph"}},computed:{previewSizeWithUnit:function(){return Object(l["a"])(this.previewSize)},value:function(){return this.fileList}},methods:{getDetail:function(t){return void 0===t&&(t=this.fileList.length),{name:this.name,index:t}},onChange:function(t){var i=this,e=t.target.files;if(!this.disabled&&e.length){if(e=1===e.length?e[0]:[].slice.call(e),this.beforeRead){var n=this.beforeRead(e,this.getDetail());if(!n)return void this.resetInput();if(Object(u["f"])(n))return void n.then((function(t){t?i.readFile(t):i.readFile(e)})).catch(this.resetInput)}this.readFile(e)}},readFile:function(t){var i=this,e=m(t,this.maxSize);if(Array.isArray(t)){var n=this.maxCount-this.fileList.length;t.length>n&&(t=t.slice(0,n)),Promise.all(t.map((function(t){return f(t,i.resultType)}))).then((function(n){var s=t.map((function(t,i){var e={file:t,status:"",message:""};return n[i]&&(e.content=n[i]),e}));i.onAfterRead(s,e)}))}else f(t,this.resultType).then((function(n){var s={file:t,status:"",message:""};n&&(s.content=n),i.onAfterRead(s,e)}))},onAfterRead:function(t,i){var e=this;this.resetInput();var n=t;if(i){var s=t;Array.isArray(t)?(s=[],n=[],t.forEach((function(t){t.file&&(t.file.size>e.maxSize?s.push(t):n.push(t))}))):n=null,this.$emit("oversize",s,this.getDetail())}var o=Array.isArray(n)?Boolean(n.length):Boolean(n);o&&(this.$emit("input",[].concat(this.fileList,d(n))),this.afterRead&&this.afterRead(n,this.getDetail()))},onDelete:function(t,i){var e=this;if(this.beforeDelete){var n=this.beforeDelete(t,this.getDetail(i));if(!n)return;if(Object(u["f"])(n))return void n.then((function(){e.deleteFile(t,i)})).catch(u["h"])}this.deleteFile(t,i)},deleteFile:function(t,i){var e=this.fileList.slice(0);e.splice(i,1),this.$emit("input",e),this.$emit("delete",t,this.getDetail(i))},resetInput:function(){this.$refs.input&&(this.$refs.input.value="")},onPreviewImage:function(t){var i=this;if(this.previewFullImage){var e=this.fileList.filter((function(t){return g(t)})),n=e.map((function(t){return t.content||t.url}));this.imagePreview=tt(Object(c["a"])({images:n,startPosition:e.indexOf(t),onClose:function(){i.$emit("close-preview")}},this.previewOptions))}},closeImagePreview:function(){this.imagePreview&&this.imagePreview.close()},chooseFile:function(){this.disabled||this.$refs.input&&this.$refs.input.click()},genPreviewMask:function(t){var i=this.$createElement,e=t.status,n=t.message;if("uploading"===e||"failed"===e){var s="failed"===e?i(b["a"],{attrs:{name:"close"},class:nt("mask-icon")}):i(z["a"],{class:nt("loading")}),o=Object(u["c"])(n)&&""!==n;return i("div",{class:nt("mask")},[s,o&&i("div",{class:nt("mask-message")},[n])])}},genPreviewItem:function(t,i){var e=this,n=this.$createElement,s="uploading"!==t.status&&this.deletable,o=s&&n("div",{class:nt("preview-delete"),on:{click:function(n){n.stopPropagation(),e.onDelete(t,i)}}},[n(b["a"],{attrs:{name:"cross"},class:nt("preview-delete-icon")})]),a=this.slots("preview-cover",Object(c["a"])({index:i},t)),r=a&&n("div",{class:nt("preview-cover")},[a]),h=g(t)?n(T,{attrs:{fit:this.imageFit,src:t.content||t.url,width:this.previewSize,height:this.previewSize,lazyLoad:this.lazyLoad},class:nt("preview-image"),on:{click:function(){e.onPreviewImage(t)}}},[r]):n("div",{class:nt("file"),style:{width:this.previewSizeWithUnit,height:this.previewSizeWithUnit}},[n(b["a"],{class:nt("file-icon"),attrs:{name:"description"}}),n("div",{class:[nt("file-name"),"van-ellipsis"]},[t.file?t.file.name:t.url]),r]);return n("div",{class:nt("preview"),on:{click:function(){e.$emit("click-preview",t,e.getDetail(i))}}},[h,this.genPreviewMask(t),o])},genPreviewList:function(){if(this.previewImage)return this.fileList.map(this.genPreviewItem)},genUpload:function(){var t=this.$createElement;if(!(this.fileList.length>=this.maxCount)&&this.showUpload){var i,e=this.slots(),n=t("input",{attrs:Object(c["a"])({},this.$attrs,{type:"file",accept:this.accept,disabled:this.disabled}),ref:"input",class:nt("input"),on:{change:this.onChange}});if(e)return t("div",{class:nt("input-wrapper")},[e,n]);if(this.previewSize){var s=this.previewSizeWithUnit;i={width:s,height:s}}return t("div",{class:nt("upload"),style:i},[t(b["a"],{attrs:{name:this.uploadIcon},class:nt("upload-icon")}),this.uploadText&&t("span",{class:nt("upload-text")},[this.uploadText]),n])}}},render:function(){var t=arguments[0];return t("div",{class:nt()},[t("div",{class:nt("wrapper",{disabled:this.disabled})},[this.genPreviewList(),this.genUpload()])])}}),ot=e("2f62"),at={name:"uploader",components:{Uploader:st,Button:r["a"]},data:function(){return{fileList:[]}},mounted:function(){this.$Utils.setDocumentTitle("上传简历")},methods:{send:function(){var t=this;if(0===t.fileList.length)return t.$Toast("请选择简历"),!1;this.$Alert.show({title:"提示",alertContent:"确认投递此份简历",yes:function(){return Object(a["a"])(regeneratorRuntime.mark((function i(){var e,n;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return t.$Toast.loading({message:"正在上传，请稍后...",forbidClick:!0,duration:0,overlay:!0}),i.next=3,t.getFileName(t.fileList[0].file.name);case 3:e=i.sent,n=new FormData,n.append("fps[open_id]",t.openid_info.back_value.open_id),n.append("fps[img]",t.fileList[0].content),n.append("fps[suffix]",e),t.$store.dispatch("fetchData",{im:t.$Config.PROJECT_INTERFACE.make_img_route,fps:n,url:t.$Config.REQUEST_URL,method:"post"}).then((function(i){if(i.back_value)return t.$store.dispatch("fetchData",{im:t.$Config.PROJECT_INTERFACE.set_application_record,fps:{open_id:t.openid_info.back_value.open_id,company_id:"",job_info_id:t.$route.query.jobid,storage_path:i.back_value},url:t.$Config.REQUEST_URL})})).then((function(i){i.back_value&&(t.$Toast.clear(),t.$Toast("上传完毕"),setTimeout((function(){t.$router.replace("/officeDetails?id=".concat(t.$route.query.jobid,"&openid=").concat(t.openid_info.back_value.open_id))}),2e3))}));case 9:case"end":return i.stop()}}),i)})))()}})},getFileName:function(t){var i=t.lastIndexOf("."),e=t.length;return t.substring(i+1,e)}},computed:Object(o["a"])({},Object(ot["b"])(["openid_info"]))},rt=at,ct=(e("e856"),e("2877")),ht=Object(ct["a"])(rt,n,s,!1,null,"f7a12edc",null);i["default"]=ht.exports}}]);
//# sourceMappingURL=chunk-227e7680.e53c89eb.js.map