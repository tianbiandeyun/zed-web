(function(e){function n(n){for(var r,o,i=n[0],u=n[1],s=n[2],l=0,f=[];l<i.length;l++)o=i[l],Object.prototype.hasOwnProperty.call(c,o)&&c[o]&&f.push(c[o][0]),c[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(e[r]=u[r]);d&&d(n);while(f.length)f.shift()();return a.push.apply(a,s||[]),t()}function t(){for(var e,n=0;n<a.length;n++){for(var t=a[n],r=!0,o=1;o<t.length;o++){var i=t[o];0!==c[i]&&(r=!1)}r&&(a.splice(n--,1),e=u(u.s=t[0]))}return e}var r={},o={app:0},c={app:0},a=[];function i(e){return u.p+"static/js/"+({}[e]||e)+"."+{"chunk-2c01fc52":"3f1f4b44","chunk-3412b7f2":"9055650f","chunk-06b00291":"2464a12b","chunk-63a7edd7":"aa21e67b","chunk-7d6ea2cc":"4dc793e6","chunk-83ac4fa6":"fcc4f89b","chunk-a63c931c":"db354c95","chunk-fabd2056":"52d97915"}[e]+".js"}function u(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(e){var n=[],t={"chunk-2c01fc52":1,"chunk-06b00291":1,"chunk-63a7edd7":1,"chunk-7d6ea2cc":1,"chunk-83ac4fa6":1,"chunk-a63c931c":1,"chunk-fabd2056":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise((function(n,t){for(var r="static/css/"+({}[e]||e)+"."+{"chunk-2c01fc52":"1a19d979","chunk-3412b7f2":"31d6cfe0","chunk-06b00291":"a519e329","chunk-63a7edd7":"f230c7f5","chunk-7d6ea2cc":"9847e6a1","chunk-83ac4fa6":"30e2e4cc","chunk-a63c931c":"76cbf3e9","chunk-fabd2056":"b6755693"}[e]+".css",c=u.p+r,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var s=a[i],l=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(l===r||l===c))return n()}var f=document.getElementsByTagName("style");for(i=0;i<f.length;i++){s=f[i],l=s.getAttribute("data-href");if(l===r||l===c)return n()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=n,d.onerror=function(n){var r=n&&n.target&&n.target.src||c,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.code="CSS_CHUNK_LOAD_FAILED",a.request=r,delete o[e],d.parentNode.removeChild(d),t(a)},d.href=c;var p=document.getElementsByTagName("head")[0];p.appendChild(d)})).then((function(){o[e]=0})));var r=c[e];if(0!==r)if(r)n.push(r[2]);else{var a=new Promise((function(n,t){r=c[e]=[n,t]}));n.push(r[2]=a);var s,l=document.createElement("script");l.charset="utf-8",l.timeout=120,u.nc&&l.setAttribute("nonce",u.nc),l.src=i(e);var f=new Error;s=function(n){l.onerror=l.onload=null,clearTimeout(d);var t=c[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src;f.message="Loading chunk "+e+" failed.\n("+r+": "+o+")",f.name="ChunkLoadError",f.type=r,f.request=o,t[1](f)}c[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:l})}),12e4);l.onerror=l.onload=s,document.head.appendChild(l)}return Promise.all(n)},u.m=e,u.c=r,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)u.d(t,r,function(n){return e[n]}.bind(null,r));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="",u.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=n,s=s.slice();for(var f=0;f<s.length;f++)n(s[f]);var d=l;a.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"56d7":function(e,n,t){"use strict";t.r(n);var r={};t.r(r),t.d(r,"PROJECT_ID",(function(){return _})),t.d(r,"SHARE_ID",(function(){return g})),t.d(r,"PROJECT_REQUEST",(function(){return b})),t.d(r,"PROJECT_SHARE_REQUEST",(function(){return k})),t.d(r,"REQUEST_URL",(function(){return w})),t.d(r,"REQUEST_SHARE_URL",(function(){return U})),t.d(r,"PROJECT_INTERFACE",(function(){return y})),t.d(r,"TEST_QUESTION_LIST",(function(){return E}));t("a133"),t("ed0d"),t("f09c"),t("e117");var o=t("0261"),c=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("transition",{attrs:{name:"effect"}},[t("router-view")],1)],1)},a=[],i={name:""},u=i,s=(t("883a"),t("9ca4")),l=Object(s["a"])(u,c,a,!1,null,"50f279da",null),f=l.exports,d=(t("e18c"),t("3211"));o["a"].use(d["a"]);var p=[{path:"/",name:"Home",component:function(){return Promise.all([t.e("chunk-3412b7f2"),t.e("chunk-7d6ea2cc")]).then(t.bind(null,"bb51"))}},{path:"/login",name:"Login",component:function(){return Promise.all([t.e("chunk-3412b7f2"),t.e("chunk-63a7edd7")]).then(t.bind(null,"dd7b"))}},{path:"/info",name:"Info",component:function(){return Promise.all([t.e("chunk-3412b7f2"),t.e("chunk-06b00291")]).then(t.bind(null,"13ac"))}},{path:"/test",name:"Test",component:function(){return t.e("chunk-83ac4fa6").then(t.bind(null,"2762"))}},{path:"/rules",name:"Rules",component:function(){return t.e("chunk-fabd2056").then(t.bind(null,"6662"))}},{path:"/question",name:"Question",component:function(){return t.e("chunk-a63c931c").then(t.bind(null,"0bbd"))}},{path:"/result",name:"Result",component:function(){return t.e("chunk-2c01fc52").then(t.bind(null,"f6f8"))}}],h=new d["a"]({routes:p}),v=h,m=t("9f3a"),_=(t("b4fb"),t("e35a"),t("f4e3"),t("5e9f"),"h200727"),g="h_200727",b="https://hztc.dev.hztcapp.com/index.php",k="https://f.hztc.dev.hztcapp.com",w="".concat(b,"?r=interface/api&ac=hxdf&ic=").concat(_),U="".concat(k,"/h/retobridge.html?"),y={get_answer_record:"get_answer_record",set_answer_record:"set_answer_record",set_uv_statistics:"set_uv_statistics",set_pv_statistics:"set_pv_statistics",get_jsconf:"get_jsconf",set_video_click_count:"set_video_click_count",has_user_info:"has_user_info",send_phone_identifying_code:"send_phone_identifying_code",get_video_list:"get_video_list",set_user_info:"set_user_info",set_user_organization:"set_user_organization",getopenid:"getopenid"},E=[{index:0,count:15,title:"圆形、三角形、S形3种图形，你更喜欢哪一种？",result:[{val:"圆形",score:2},{val:"三角形",score:1},{val:"S形",score:0}]},{index:1,count:15,title:"以下几种文学题材作品你更喜欢哪一种？",result:[{val:"诗歌",score:0},{val:"小说",score:1},{val:"哲理散文",score:2}]},{index:2,count:15,title:"你对学习演奏一种乐器是否感兴趣？",result:[{val:"没有",score:2},{val:"非常希望有机会能学习",score:0},{val:"说不上",score:1}]},{index:3,count:15,title:"以下哪种性格更符合你本人实际性格？",result:[{val:"比较安静",score:2},{val:"比较爱动",score:0},{val:"介于两者之间",score:1}]},{index:4,count:15,title:"在做事的条理性方面，你对自己的评价是？",result:[{val:"很差，乱透了",score:0},{val:"我做事总是井井有条",score:2},{val:"不算很好",score:1}]},{index:5,count:15,title:"过往是否接触或主动了解过创业相关的信息？",result:[{val:"从来没有",score:"从来没有"},{val:"接触/了解过但是不熟悉",score:"接触/了解过但是不熟悉"},{val:"经常接触",score:"经常接触"}]},{index:6,count:15,title:"是否认为自己在服饰穿搭方面有天赋？",result:[{val:"是",score:0},{val:"不是",score:2},{val:"说不上",score:1}]},{index:7,count:15,title:"如果创业，以下哪个选项你会优先考虑？",result:[{val:"考虑有成功案例的领域",score:"考虑有成功案例的领域"},{val:"探索新领域",score:"探索新领域"},{val:"单刀直入当前热门领域",score:"单刀直入当前热门领域"}]},{index:8,count:15,title:"你通常选择以下哪种方式度过周末？",result:[{val:"看书",score:2},{val:"逛街购物",score:1},{val:"动手做些小饰品",score:0}]},{index:9,count:15,title:"外出旅行，你更喜欢去哪些地方？",result:[{val:"风景优美的人间仙境",score:1},{val:"充满文化气息的名胜古迹",score:2},{val:"不为人知的山野小景",score:0}]},{index:10,count:15,title:"朋友在一起讨论问题，通常情况下，你的见解？",result:[{val:"总能令人耳目一新",score:0},{val:"与他人大致相同",score:2},{val:"偶尔也有一番见地",score:1}]},{index:11,count:15,title:"如果某件事吸引了你，你会？",result:[{val:"通常都是被事物的表象或者有趣的地方所吸引",score:0},{val:"如果被吸引，我就一定要对它探个究竟",score:2},{val:"如果可能的话，我也会参与其中",score:1}]},{index:12,count:15,title:"在以下那种情况下会决定创业？",result:[{val:"等有了一定工作经验后",score:"等有了一定工作经验后"},{val:"等有了经济实力后",score:"等有了经济实力后"},{val:"一边学习一边思考，成熟后就创业",score:"一边学习一边思考，成熟后就创业"}]},{index:13,count:15,title:"下面的场景你更喜欢哪个？",result:[{val:"静谧深邃的森林",score:2},{val:"蓝天白云下的草场",score:0},{val:"怪石林立的高山峭壁",score:1}]},{index:14,count:15,title:"如果有三种职业摆在你的面前，人事经理、记者和自由画家，你会选择哪一种？",result:[{val:"善于处理人际关系的人事经理",score:2},{val:"能言善辩、可能接触社会各色人等的记者",score:1},{val:"尽管有可能非常清贫，但是可以率性生活的自由画家",score:0}]}],R={produceRequestUrl:function(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"get",o=t,c="?";/\?/.test(o)&&(c="&");var a=o+c+"im="+e;if("get"===r){for(var i in n)a+="&fps["+i+"]="+encodeURIComponent(n[i]).replace(/[!'()]/g,escape).replace(/\*/g,"%2A");a+="&iv=jsonp&callback="}return a},setDocumentTitle:function(e){document.title=e},makeShareLink:function(){var e=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return new Promise((function(t){var r="".concat(b,"?r=interface/anycall&k=").concat(g,"&page=dist/index&ac=hxdf&base=0");for(var o in n)r+="&",r+=o,r+="=",r+=e._toEncode(n[o]);t("".concat(U,"&to=").concat(e._toEncode(r)))}))},_toEncode:function(e){return encodeURIComponent(e).replace(/[!'()]/g,escape).replace(/\*/g,"%2A")},isWeiXin:function(){var e=window.navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/MicroMessenger/i)}},P=t("82ae"),x=t.n(P);x.a.defaults.withCredentials=!0,o["a"].use(m["a"]);var O=new m["a"].Store({state:{getOpenid_info:"",hasUserInfo_geren:"",hasUserInfo_zuzhi:""},mutations:{get_openid:function(e,n){e.getOpenid_info=n},has_user_info_geren:function(e,n){e.hasUserInfo_geren=n},has_user_info_zuzhi:function(e,n){e.hasUserInfo_zuzhi=n}},actions:{_getQuestionResult:function(e,n){e.commit;var t=[n.im,n.fps,n.url],r=t[0],o=t[1],c=void 0===o?{}:o,a=t[2],i=R.produceRequestUrl(r,c,a);return new Promise((function(e,n){x.a.get(i).then((function(n){e(n.data)}))}))},_setQuestionResult:function(e,n){e.commit;var t=[n.im,n.fps,n.url],r=t[0],o=t[1],c=void 0===o?{}:o,a=t[2],i=R.produceRequestUrl(r,c,a);return new Promise((function(e,n){x.a.get(i).then((function(n){e(n.data)}))}))},_setPv:function(e,n){e.commit;var t=[n.im,n.fps,n.url],r=t[0],o=t[1],c=void 0===o?{}:o,a=t[2],i=R.produceRequestUrl(r,c,a);return new Promise((function(e,n){x.a.get(i).then((function(n){e(n.data)}))}))},_setUv:function(e,n){e.commit;var t=[n.im,n.fps,n.url],r=t[0],o=t[1],c=void 0===o?{}:o,a=t[2],i=R.produceRequestUrl(r,c,a);return new Promise((function(e,n){x.a.get(i).then((function(n){e(n.data)}))}))},_getWeiXinConfig:function(e,n){e.commit;var t=[n.im,n.fps,n.url],r=t[0],o=t[1],c=void 0===o?{}:o,a=t[2],i=R.produceRequestUrl(r,c,a);return new Promise((function(e,n){x.a.get(i).then((function(n){e(n.data)}))}))},_hasUserInfo_zuzhi:function(e,n){var t=e.commit,r=[n.im,n.fps,n.url],o=r[0],c=r[1],a=void 0===c?{}:c,i=r[2],u=R.produceRequestUrl(o,a,i);return new Promise((function(e,n){x.a.get(u).then((function(n){t("has_user_info_zuzhi",n.data),e(n.data)}))}))},_hasUserInfo_geren:function(e,n){var t=e.commit,r=[n.im,n.fps,n.url],o=r[0],c=r[1],a=void 0===c?{}:c,i=r[2],u=R.produceRequestUrl(o,a,i);return new Promise((function(e,n){x.a.get(u).then((function(n){t("has_user_info_geren",n.data),e(n.data)}))}))},_setVideoClickCount:function(e,n){e.commit;var t=[n.im,n.fps,n.url],r=t[0],o=t[1],c=void 0===o?{}:o,a=t[2],i=R.produceRequestUrl(r,c,a);return new Promise((function(e,n){x.a.get(i).then((function(n){e(n.data)}))}))},_getVideoList:function(e,n){e.commit;var t=[n.im,n.fps,n.url],r=t[0],o=t[1],c=void 0===o?{}:o,a=t[2],i=R.produceRequestUrl(r,c,a);return new Promise((function(e,n){x.a.get(i).then((function(n){e(n.data)}))}))},_setUserInfo:function(e,n){e.commit;var t=[n.im,n.fps,n.url],r=t[0],o=t[1],c=void 0===o?{}:o,a=t[2],i=R.produceRequestUrl(r,c,a);return new Promise((function(e,n){x.a.get(i).then((function(n){e(n.data)}))}))},_getPhotoCode:function(e,n){e.commit;var t=[n.im,n.fps,n.url],r=t[0],o=t[1],c=void 0===o?{}:o,a=t[2],i=R.produceRequestUrl(r,c,a);return new Promise((function(e,n){x.a.get(i).then((function(n){e(n.data)}))}))},_setOrganization:function(e,n){e.commit;var t=[n.im,n.fps,n.url],r=t[0],o=t[1],c=void 0===o?{}:o,a=t[2],i=R.produceRequestUrl(r,c,a);return new Promise((function(e,n){x.a.get(i).then((function(n){e(n.data)}))}))},_getOpenid:function(e,n){var t=e.commit,r=[n.im,n.fps,n.url],o=r[0],c=r[1],a=void 0===c?{}:c,i=r[2],u=R.produceRequestUrl(o,a,i);return new Promise((function(e,n){x.a.post(u).then((function(n){t("get_openid",n.data),e(n.data)}))}))}},getters:{getOpenid_info:function(e){return e.getOpenid_info},hasUserInfo_geren:function(e){return e.hasUserInfo_geren},hasUserInfo_zuzhi:function(e){return e.hasUserInfo_zuzhi}}}),C=(t("9f35"),t("44ce"),t("6307"),function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.show?t("section",{staticClass:"loading-container"},[t("div",{staticClass:"loading"},[e._m(0),t("div",{staticClass:"loading-content"},[e._v(e._s(e.content))])])]):e._e()}),S=[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"loading-animation"},[t("span"),t("span")])}],T={name:"loading",props:{show:{type:Boolean,default:!1},content:{type:String,default:"请稍后..."}}},z=T,I=(t("7f14"),Object(s["a"])(z,C,S,!1,null,"274a50ba",null)),q=I.exports,j=function(e){e.prototype.$config=r,e.prototype.$utils=R,e.component("loading",q)},A=j;o["a"].use(A),o["a"].config.productionTip=!1,new o["a"]({router:v,store:O,render:function(e){return e(f)}}).$mount("#app")},6307:function(e,n,t){},7020:function(e,n,t){},"7f14":function(e,n,t){"use strict";var r=t("e6aa"),o=t.n(r);o.a},"883a":function(e,n,t){"use strict";var r=t("7020"),o=t.n(r);o.a},e6aa:function(e,n,t){}});
//# sourceMappingURL=app.319f2cde.js.map