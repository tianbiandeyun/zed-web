(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bbe22b7"],{"0d7a":function(e,t,n){"use strict";var i=n("b2a2"),s=n("8a1c"),a=n("857c"),r=n("2732"),o=n("ef4c"),c=n("38eb"),u=n("d88d"),l=n("59da"),d=n("5139"),p=n("efe2"),f=[].push,h=Math.min,g=4294967295,v=!p((function(){return!RegExp(g,"y")}));i("split",2,(function(e,t,n){var i;return i="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var i=String(r(this)),a=void 0===n?g:n>>>0;if(0===a)return[];if(void 0===e)return[i];if(!s(e))return t.call(i,e,a);var o,c,u,l=[],p=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),h=0,v=new RegExp(e.source,p+"g");while(o=d.call(v,i)){if(c=v.lastIndex,c>h&&(l.push(i.slice(h,o.index)),o.length>1&&o.index<i.length&&f.apply(l,o.slice(1)),u=o[0].length,h=c,l.length>=a))break;v.lastIndex===o.index&&v.lastIndex++}return h===i.length?!u&&v.test("")||l.push(""):l.push(i.slice(h)),l.length>a?l.slice(0,a):l}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:t.call(this,e,n)}:t,[function(t,n){var s=r(this),a=void 0==t?void 0:t[e];return void 0!==a?a.call(t,s,n):i.call(String(s),t,n)},function(e,s){var r=n(i,e,this,s,i!==t);if(r.done)return r.value;var d=a(e),p=String(this),f=o(d,RegExp),_=d.unicode,R=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(v?"y":"g"),b=new f(v?d:"^(?:"+d.source+")",R),A=void 0===s?g:s>>>0;if(0===A)return[];if(0===p.length)return null===l(b,p)?[p]:[];var m=0,E=0,k=[];while(E<p.length){b.lastIndex=v?E:0;var w,y=l(b,v?p:p.slice(E));if(null===y||(w=h(u(b.lastIndex+(v?0:E)),p.length))===m)E=c(p,E,_);else{if(k.push(p.slice(m,E)),k.length===A)return k;for(var x=1;x<=y.length-1;x++)if(k.push(y[x]),k.length===A)return k;E=m=w}}return k.push(p.slice(m)),k}]}),!v)},"8a1c":function(e,t,n){var i=n("a719"),s=n("2118"),a=n("90fb"),r=a("match");e.exports=function(e){var t;return i(e)&&(void 0!==(t=e[r])?!!t:"RegExp"==s(e))}},9368:function(e,t,n){},bb51:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,i=e._self._c||t;return e.page_show?i("section",{staticClass:"home-container"},[i("div",{staticClass:"banner"},[i("button",{on:{click:e.goTest}},[e._v("点击测评")])]),e._l(e.video_list,(function(t,n){return i("div",{key:n},[i("div",{staticClass:"video-list"},[i("div",{staticClass:"details"},[i("p",{staticClass:"details-title"},[e._v(e._s(t.title))]),i("p",{staticClass:"details-sub"},[e._v("直播时间："+e._s(t.start_date))])]),i("div",{staticClass:"operat"},[i("button",{class:[{yyActive:"观看直播"===e.buttonType[n]},{zbActive:"立即预约"===e.buttonType[n]},{hfActive:"直播回放"===e.buttonType[n]}],on:{click:function(i){return e.go(e.buttonType[n],t)}}},[e._v(" "+e._s(e.buttonType[n])+" ")])])])])})),i("transition",{attrs:{name:"fade"}},[e.show?i("div",{staticClass:"reservation"},[i("div",{staticClass:"reservation-main"},[i("div",{staticClass:"qr"},[i("img",{attrs:{src:e.qr_img,alt:""}}),i("p",[e._v("长按识别二维码")]),i("p",[e._v("预约本场直播")])]),i("div",{staticClass:"close",on:{click:function(t){e.show=!1}}},[i("img",{attrs:{src:n("d991"),alt:""}})])])]):e._e()])],2):e._e()},s=[],a=(n("b4fb"),n("e35a"),n("5e9f"),n("0d7a"),n("e793")),r=(n("6a61"),n("cf7f")),o=n("9f3a"),c={name:"Home",components:{},data:function(){return{page_show:!1,show:!1,qr_img:"",video_list:""}},mounted:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.$utils.setDocumentTitle("职业倾向测评"),""!==e.getOpenid_info){t.next=4;break}return t.next=4,e.$store.dispatch("_getOpenid",{im:e.$config.PROJECT_INTERFACE.getopenid,url:e.$config.REQUEST_URL});case 4:return t.next=6,e._hasUserInfo();case 6:return t.t0=e.$WxShare,t.t1=e.wx_config.back_value,t.next=10,e.$utils.makeShareLink();case 10:t.t2=t.sent,t.t3={title:"测试分享标题",details:"测试分享内容",link:t.t2,image:"www"},n=new t.t0(t.t1,t.t3,!0),n.init();case 14:case"end":return t.stop()}}),t)})))()},methods:{goTest:function(){this.$router.push("/test")},go:function(e,t){var n=this;this.$store.dispatch("_setVideoClickCount",{im:this.$config.PROJECT_INTERFACE.set_video_click_count,fps:{video_id:t.id,video_type:e},url:this.$config.REQUEST_URL}).then((function(i){if(i.back_value){if("立即预约"===e)return n.qr_img=t.fixed_date_qr,n.show=!0,!1;window.location.href="http://f.hztc.dev.hztcapp.com/h/h200727/video/video.html?video_url=".concat(t.url,"&id=").concat(n.getOpenid_info.back_value.open_id,"&video_id=").concat(t.id,"&type=").concat(encodeURI(encodeURI(e)),"&qr=").concat(t.download_qr)}}))},_hasUserInfo:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("_getWxConfig",{im:e.$config.PROJECT_INTERFACE.get_jsconf,fps:{url:encodeURIComponent(window.location.href.split("#")[0])},url:e.$config.REQUEST_URL});case 2:return t.next=4,e.$store.dispatch("_setPv",{im:e.$config.PROJECT_INTERFACE.set_pv_statistics,fps:{info_key:"视频列表"},url:e.$config.REQUEST_URL});case 4:return t.next=6,e.$store.dispatch("_setUv",{im:e.$config.PROJECT_INTERFACE.set_uv_statistics,fps:{open_id:e.getOpenid_info.back_value.open_id},url:e.$config.REQUEST_URL});case 6:return t.next=8,e.$store.dispatch("_hasUserInfo_zuzhi",{im:e.$config.PROJECT_INTERFACE.has_user_info,fps:{open_id:e.getOpenid_info.back_value.open_id,type:1},url:e.$config.REQUEST_URL}).then(function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!1!==n.back_value){t.next=5;break}return e.$router.replace("/login"),t.abrupt("return",!1);case 5:return t.next=7,e.$store.dispatch("_hasUserInfo_geren",{im:e.$config.PROJECT_INTERFACE.has_user_info,fps:{open_id:e.getOpenid_info.back_value.open_id,type:2},url:e.$config.REQUEST_URL}).then((function(t){!1===t.back_value?e.$router.replace("/info"):e.page_show=!0}));case 7:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 8:e.hasUserInfo_geren.back_value&&e.hasUserInfo_zuzhi.back_value&&e.$store.dispatch("_getVideoList",{im:e.$config.PROJECT_INTERFACE.get_video_list,fps:{open_id:e.getOpenid_info.back_value.open_id},url:e.$config.REQUEST_URL}).then((function(t){e.video_list=t.back_value}));case 9:case"end":return t.stop()}}),t)})))()}},computed:Object(a["a"])(Object(a["a"])({},Object(o["b"])(["getOpenid_info","hasUserInfo_zuzhi","hasUserInfo_geren","wx_config"])),{},{buttonType:function(){for(var e=[],t=0;t<this.video_list.length;t++){var n=this.video_list[t].start_date,i=this.video_list[t].end_date,s=new Date,a=s.getFullYear(),r=parseInt(s.getMonth()+1)<10?"0"+parseInt(s.getMonth()+1):parseInt(s.getMonth()+1),o=s.getDate()<10?"0"+s.getDate():s.getDate(),c=s.getHours()<10?"0"+s.getHours():s.getHours(),u=s.getMinutes()<10?"0"+s.getMinutes():s.getMinutes(),l=s.getSeconds()<10?"0"+s.getSeconds():s.getSeconds(),d=n.replace(/-/g,"/"),p=i.replace(/-/g,"/");s="".concat(a,"-").concat(r,"-").concat(o," ").concat(c,":").concat(u,":").concat(l).replace(/-/g,"/"),Date.parse(s)>=Date.parse(d)&&Date.parse(s)<=Date.parse(p)&&e.push("观看直播"),Date.parse(s)<Date.parse(d)&&e.push("立即预约"),Date.parse(s)>Date.parse(p)&&e.push("直播回放")}return e}})},u=c,l=(n("c8a5"),n("9ca4")),d=Object(l["a"])(u,i,s,!1,null,"d87d4256",null);t["default"]=d.exports},c8a5:function(e,t,n){"use strict";var i=n("9368"),s=n.n(i);s.a},d991:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHIAAAByCAMAAAC4A3VPAAAArlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8tivQqAAAAOXRSTlMAboqM0bFtWg4Jyo9w8enWwS1VGxbaXwbefHn44qh0ZbqiSCL1xTk2KALtlGlAtqyATmIfheacM9P8wUpHAAAF8ElEQVRo3rWa6VriMBSGj0ApRWhZCsoOZZEdEUVz/zc28wwhp4RI+kHn/alpv56cNVHCqG8G7aNTzPnlv/i5onNsDzZ1+l98u8fcUhhY5o7ud+pyL7NVUdykuJq9pCg4ew5EAoLnWTp6XrMiElNpeg8LFvpdAdHtFx6z0CDY6RYd55jJZjNHxyl2OwbRByx1G5pasFrvqxdWFKr79SrQdAP3TsG3oYjzuhqMF2RkMR6sXkWc4ds9ip8ixmRXK1icXttN4k98woLzeBo28gdKwCEfd0Rljik2y/zs9MNLHG4f01hRagKCi1WsqtQIohbbnufkubhVD5X7BNPnHdomzNEwpx4ZsQ8BDiP1glxICai+KhPduxNaGdqoJlD0VdjwapiqCiO/al2rOmKWHiKrAteiGX4JyZoeZK1q7k1/eipyXHoYV8XQrbwengNnQymwOQfRkH7l+VxRU+rus4mtJtSEhBUf1RSS2i8ZPAH8CPpzcjAW1iIQq3DcTslAS/5yRaly7hBtQ4M8dw5KmXPeXbfPitz0cdqS845s2aSxl9+itdXxU78KVtf+k/bVTfnqvXYAkO3D0T5kIqcYaGKaaC935Lx2eYAoyS+pX1bcDtLcuZhMwsvjmnx56aK2yo7Vogs+uKlg7ePDmAy+d21koJ2dBkKSSaaYEZKB5rbgysyXrrksjQXUPLNq+dhcSrsvelnqks4HMqzJpsD7yiy6eimt8HZoPInEe5tRS5/oioGWm1UOYkATUOQknPNqdq5R0+7PrElRD1DOcfkFIRnJsz+T+DFPRkI5k8hDHU8LgJ2QjTzjvPG+coZY/In5kXHjbzi15qVHhNtpt5ELHPfGw2l1j26Qv6WZtfhR0uMqUePxA7ATtJFjtsbBxm3R5k/cj/EozShXvi6IcDvtNjKL17Mzw/LpJEmM1Z+IH5nRKUwL9MalB7ATsFHRPmemq2Ul4E+bH80dzKU+nwkQTVSRTwslOdouQ8I0s8CuSupL+eTudKQnAjVbLU3RTkPWnO3VXGtLaJ0SJWR6ah9yft8RgXaCNvI8m5OSW/VzID+1fAQlj0SInbiNXAuKtAQGVe2QwUcYZMz9oi9css2SbVyyK6v6CLtEYrL4xkpfOqiiromHzw7YHY0MKsmlALQRt1P6cCtHksYCtdF1UTsXsuDJzy7XiUk4IefBC+16WW5KKTbSAicdrZchzYsbJ6gIa/Iw8M05jSiimlxBvqmw1CZn4KSD+bOnLgymp8r3YrPR3B9Lie1cfMl0VO96A3cV3ts3PmHu+duBEyt85qU233HVJ1zyAD9C/uRy16nzSFIuILuK722hHKus73wfAiiimgN1f8YXIhVEEdec8gGPL2kPFj+yokHT5s8xX0/EdrYF2IjZyRrvl1/gFwBFULPgy2O7dkfbBxRBzbZ+wxz9dm34zvkIzNTXLlpIIyP+UcN8w1hlG7GZumq+8Qyuh+Gud/3ddhvt672uYdBuGKukG7cRsdM15lnDOPPPtThDTzp5U+xXzaeJH+OfpmZ/rS+vCWBd/mvNzFh4frSlG/MeerVmnSDqzZpn3u0NaewEt2oQe2s2d8d6h6+704OvuDuhsbvYBy+cnrjRG7dcO9KC65f5aBcugcQHL1A4bcxRK2pp/ymao1WnZVmBEgm7r0bqKJeWjfZrgYqQ9B9X7AvJkG7hBULynlasisCS6aHS7D1UE7yeUgytNVJp/jwQRFGgFLlGWzX1Qyd6GcWKdryteqDyfVchr/C/qHnANZQkW0AFC1l+enTXLd1rqQAJlmTngDMtij341QopIWHrK/axEbg9O8H4mUQ+/c74gunx7iBTDFMp1S2BXqrE15cHdAfjnogzcT433i8xvvl0JiLOaHxvQuv/y+0774NoHitLL/No8O742rJKRPfzEYgrOo2fouOMRo5T/Gl0rn8fNOkhFs2pgJg2F/Qw+14nqV6nt6d0GLeGSQSH7QOlyLy/9W/J+dv+nFInjNrDRscUTsN2FNJ/Yx6tW6vdMPeP4W7VWkeodX8AJ+OxVI0kVL0AAAAASUVORK5CYII="}}]);
//# sourceMappingURL=chunk-6bbe22b7.b34045b3.js.map