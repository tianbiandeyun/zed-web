(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-089628bc"],{"30d7":function(t,e,n){"use strict";n.d(e,"d",(function(){return i})),n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a}));var i="#fff",s="van-hairline",o=s+"--surround",r=s+"--top-bottom",a=s+"-unset--top-bottom"},"3ae7":function(t,e,n){"use strict";var i=n("3fcc"),s=n("973e"),o=n("4049"),r=n("edc4"),a=Object(i["a"])("popup"),u=a[0],c=a[1];e["a"]=u({mixins:[Object(o["a"])()],props:{round:Boolean,duration:[Number,String],closeable:Boolean,transition:String,safeAreaInsetBottom:Boolean,closeIcon:{type:String,default:"cross"},closeIconPosition:{type:String,default:"top-right"},position:{type:String,default:"center"},overlay:{type:Boolean,default:!0},closeOnClickOverlay:{type:Boolean,default:!0}},beforeCreate:function(){var t=this,e=function(e){return function(n){return t.$emit(e,n)}};this.onClick=e("click"),this.onOpened=e("opened"),this.onClosed=e("closed")},render:function(){var t,e=arguments[0];if(this.shouldRender){var n=this.round,i=this.position,o=this.duration,a="center"===i,u=this.transition||(a?"van-fade":"van-popup-slide-"+i),l={};if(Object(s["c"])(o)){var h=a?"animationDuration":"transitionDuration";l[h]=o+"s"}return e("transition",{attrs:{name:u},on:{afterEnter:this.onOpened,afterLeave:this.onClosed}},[e("div",{directives:[{name:"show",value:this.value}],style:l,class:c((t={round:n},t[i]=i,t["safe-area-inset-bottom"]=this.safeAreaInsetBottom,t)),on:{click:this.onClick}},[this.slots(),this.closeable&&e(r["a"],{attrs:{role:"button",tabindex:"0",name:this.closeIcon},class:c("close-icon",this.closeIconPosition),on:{click:this.close}})])])}}})},"5a26":function(t,e,n){"use strict";var i=n("d955"),s=n.n(i);s.a},"6b43":function(t,e,n){"use strict";n("126c"),n("17da"),n("b7d4"),n("40a3"),n("3d08")},"9ccc":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("section",{staticClass:"experience-container"},[n("header",{staticClass:"header"},[t._v("个人经历")]),n("div",{staticClass:"experience-item"},[n("Field",{attrs:{label:"公司名称",placeholder:"请输入公司名称"},model:{value:t.unit,callback:function(e){t.unit=e},expression:"unit"}})],1),n("div",{staticClass:"experience-item"},[n("Field",{attrs:{label:"职位类型",placeholder:"请输入职位类型"},model:{value:t.post,callback:function(e){t.post=e},expression:"post"}})],1),n("div",{staticClass:"experience-item"},[n("Field",{attrs:{readonly:"",clickable:"",name:"picker",value:t.work_start,label:"就职开始时间",placeholder:"点击选择就职开始时间"},on:{click:function(e){t.work_start_picker=!0}}}),n("Popup",{attrs:{position:"bottom"},model:{value:t.work_start_picker,callback:function(e){t.work_start_picker=e},expression:"work_start_picker"}},[n("Picker",{attrs:{"show-toolbar":"",columns:t.work_start_columns},on:{confirm:t.getWorkStart,cancel:function(e){t.work_start_picker=!1}}})],1)],1),n("div",{staticClass:"experience-item"},[n("Field",{attrs:{readonly:"",clickable:"",name:"picker",value:t.work_end,label:"就职结束时间",placeholder:"点击选择就职结束时间"},on:{click:function(e){t.work_end_picker=!0}}}),n("Popup",{attrs:{position:"bottom"},model:{value:t.work_end_picker,callback:function(e){t.work_end_picker=e},expression:"work_end_picker"}},[n("Picker",{attrs:{"show-toolbar":"",columns:t.work_end_columns},on:{confirm:t.getWorkEnd,cancel:function(e){t.work_end_picker=!1}}})],1)],1),n("div",{staticClass:"experience-item"},[n("Field",{attrs:{rows:"2",autosize:"",label:"工作描述",type:"textarea",maxlength:"150",placeholder:"工作描述","show-word-limit":""},model:{value:t.word,callback:function(e){t.word=e},expression:"word"}})],1),n("div",{staticClass:"save-box"},[n("button",{staticClass:"jump",on:{click:t.jump}},[t._v("跳过此信息")]),n("button",{staticClass:"save",on:{click:t.save}},[t._v(t._s(t.button))])])])},s=[],o=(n("99af"),n("ac1f"),n("5319"),n("5530")),r=(n("c500"),n("ad23")),a=(n("6b43"),n("3ae7")),u=(n("990b"),n("0356")),c=n("2f62"),l={name:"experience",components:{Field:u["a"],Popup:a["a"],Picker:r["a"]},data:function(){return{button:"保存个人经历",resume_index:0,unit:"",post:"",word:"",work_start:"",work_start_picker:!1,work_start_columns:[{values:this.year(),defaultIndex:0},{values:this.month(),defaultIndex:0},{values:this.day(),defaultIndex:0}],work_end:"",work_end_picker:!1,work_end_columns:[{values:this.year(),defaultIndex:0},{values:this.month(),defaultIndex:0},{values:this.day(),defaultIndex:0}]}},mounted:function(){if(0!==this.resume_info.back_value.length){var t=this.resume_info.back_value.work_history_list;this.unit=t[this.resume_index].work_unit,this.post=t[this.resume_index].name_of_post,this.work_start=t[this.resume_index].start_date,this.work_end=t[this.resume_index].end_date,this.word=t[this.resume_index].describe}},methods:{getWorkEnd:function(t){this.work_end="".concat(t[0],"-").concat(t[1],"-").concat(t[2]),this.work_end_picker=!1},getWorkStart:function(t){this.work_start="".concat(t[0],"-").concat(t[1],"-").concat(t[2]),this.work_start_picker=!1},jump:function(){this.$router.replace("/")},save:function(){var t=this,e=this;if(""===this.unit)return this.$Toast("公司名称不能为空"),!1;if(""===this.post)return this.$Toast("职位类型不能为空"),!1;if(""===this.work_start)return this.$Toast("就职开始时间不能为空"),!1;if(""===this.work_end)return this.$Toast("就职结束时间不能为空"),!1;if(""===this.word)return this.$Toast("工作描述不能为空"),!1;if(0===this.resume_info.back_value.length)return this.$Toast.loading({message:"加载中...",forbidClick:!0,duration:0,overlay:!0}),this.$store.dispatch("fetchData",{im:this.$Config.PROJECT_INTERFACE.add_user_resume,fps:{open_id:this.openid_info.back_value.open_id,work_unit:this.unit,name_of_post:this.post,start_date:this.work_start,end_date:this.work_end,describe:this.word},url:this.$Config.REQUEST_URL}).then((function(n){t.$Toast.clear(),n.back_value&&t.$Alert.show({title:"是否继续添加工作经历",alertContent:"工作经历可以反复添加多次，如果您有其他工作经历请点击继续。",yesText:"继续",noText:"结束添加",yes:function(){e.unit="",e.post="",e.work_start="",e.work_end="",e.word=""},no:function(){e.$router.replace("/")}})})),!1;if(0!==this.resume_info.back_value.length){var n=this.resume_info.back_value.work_history_list;return this.resume_index<=n.length-1&&this.$store.dispatch("fetchData",{im:this.$Config.PROJECT_INTERFACE.update_user_resume,fps:{open_id:this.openid_info.back_value.open_id,user_resume_id:this.resume_info.back_value.id,work_id:n[this.resume_index].id,work_unit:this.unit,name_of_post:this.post,start_date:this.work_start,end_date:this.work_end,describe:this.word},url:this.$Config.REQUEST_URL}).then((function(e){e.back_value&&(t.resume_index+=1,t.resume_index<=n.length-1?(t.unit=n[t.resume_index].work_unit,t.post=n[t.resume_index].name_of_post,t.work_start=n[t.resume_index].start_date,t.work_end=n[t.resume_index].end_date,t.word=n[t.resume_index].describe):t.$router.replace("/"))})),!1}},year:function(){for(var t=[],e=2010;e<2021;e++)t.push(e);return t},month:function(){for(var t=[],e=1;e<13;e++)t.push(e<10?"0".concat(e):e);return t},day:function(){for(var t=[],e=1;e<32;e++)t.push(e<10?"0".concat(e):e);return t}},computed:Object(o["a"])({},Object(c["b"])(["openid_info","resume_info"]))},h=l,d=(n("5a26"),n("2877")),f=Object(d["a"])(h,i,s,!1,null,"293aff7d",null);e["default"]=f.exports},ad23:function(t,e,n){"use strict";var i=n("d601"),s=n("3fcc"),o=n("973e"),r=n("5977"),a=n("30d7"),u=n("bb6b"),c=n("fbbe"),l=n("17c5"),h=n("23c4"),d=n.n(h),f=n("c8f7");function m(t){return Array.isArray(t)?t.map((function(t){return m(t)})):"object"===typeof t?Object(f["a"])({},t):t}var p=n("248e"),v=n("e7cb"),_=200,b=300,g=15,x=Object(s["a"])("picker-column"),k=x[0],w=x[1];function C(t){var e=window.getComputedStyle(t),n=e.transform||e.webkitTransform,i=n.slice(7,n.length-1).split(", ")[5];return Number(i)}function I(t){return Object(o["e"])(t)&&t.disabled}var y=k({mixins:[v["a"]],props:{valueKey:String,allowHtml:Boolean,className:String,itemHeight:Number,defaultIndex:Number,swipeDuration:[Number,String],visibleItemCount:[Number,String],initialOptions:{type:Array,default:function(){return[]}}},data:function(){return{offset:0,duration:0,options:m(this.initialOptions),currentIndex:this.defaultIndex}},created:function(){this.$parent.children&&this.$parent.children.push(this),this.setIndex(this.currentIndex)},mounted:function(){this.bindTouchEvent(this.$el)},destroyed:function(){var t=this.$parent.children;t&&t.splice(t.indexOf(this),1)},watch:{initialOptions:"setOptions",defaultIndex:function(t){this.setIndex(t)}},computed:{count:function(){return this.options.length},baseOffset:function(){return this.itemHeight*(this.visibleItemCount-1)/2}},methods:{setOptions:function(t){JSON.stringify(t)!==JSON.stringify(this.options)&&(this.options=m(t),this.setIndex(this.defaultIndex))},onTouchStart:function(t){if(this.touchStart(t),this.moving){var e=C(this.$refs.wrapper);this.offset=Math.min(0,e-this.baseOffset),this.startOffset=this.offset}else this.startOffset=this.offset;this.duration=0,this.transitionEndTrigger=null,this.touchStartTime=Date.now(),this.momentumOffset=this.startOffset},onTouchMove:function(t){this.touchMove(t),"vertical"===this.direction&&(this.moving=!0,Object(r["c"])(t,!0)),this.offset=Object(p["b"])(this.startOffset+this.deltaY,-this.count*this.itemHeight,this.itemHeight);var e=Date.now();e-this.touchStartTime>b&&(this.touchStartTime=e,this.momentumOffset=this.offset)},onTouchEnd:function(){var t=this,e=this.offset-this.momentumOffset,n=Date.now()-this.touchStartTime,i=n<b&&Math.abs(e)>g;if(i)this.momentum(e,n);else{var s=this.getIndexByOffset(this.offset);this.duration=_,this.setIndex(s,!0),setTimeout((function(){t.moving=!1}),0)}},onTransitionEnd:function(){this.stopMomentum()},onClickItem:function(t){this.moving||(this.transitionEndTrigger=null,this.duration=_,this.setIndex(t,!0))},adjustIndex:function(t){t=Object(p["b"])(t,0,this.count);for(var e=t;e<this.count;e++)if(!I(this.options[e]))return e;for(var n=t-1;n>=0;n--)if(!I(this.options[n]))return n},getOptionText:function(t){return Object(o["e"])(t)&&this.valueKey in t?t[this.valueKey]:t},setIndex:function(t,e){var n=this;t=this.adjustIndex(t)||0;var i=-t*this.itemHeight,s=function(){t!==n.currentIndex&&(n.currentIndex=t,e&&n.$emit("change",t))};this.moving&&i!==this.offset?this.transitionEndTrigger=s:s(),this.offset=i},setValue:function(t){for(var e=this.options,n=0;n<e.length;n++)if(this.getOptionText(e[n])===t)return this.setIndex(n)},getValue:function(){return this.options[this.currentIndex]},getIndexByOffset:function(t){return Object(p["b"])(Math.round(-t/this.itemHeight),0,this.count-1)},momentum:function(t,e){var n=Math.abs(t/e);t=this.offset+n/.003*(t<0?-1:1);var i=this.getIndexByOffset(t);this.duration=+this.swipeDuration,this.setIndex(i,!0)},stopMomentum:function(){this.moving=!1,this.duration=0,this.transitionEndTrigger&&(this.transitionEndTrigger(),this.transitionEndTrigger=null)},genOptions:function(){var t=this,e=this.$createElement,n={height:this.itemHeight+"px"};return this.options.map((function(i,s){var o,r=t.getOptionText(i),a=I(i),u={style:n,attrs:{role:"button",tabindex:a?-1:0},class:[w("item",{disabled:a,selected:s===t.currentIndex})],on:{click:function(){t.onClickItem(s)}}},c={class:"van-ellipsis",domProps:(o={},o[t.allowHtml?"innerHTML":"textContent"]=r,o)};return e("li",d()([{},u]),[e("div",d()([{},c]))])}))}},render:function(){var t=arguments[0],e={transform:"translate3d(0, "+(this.offset+this.baseOffset)+"px, 0)",transitionDuration:this.duration+"ms",transitionProperty:this.duration?"all":"none"};return t("div",{class:[w(),this.className]},[t("ul",{ref:"wrapper",style:e,class:w("wrapper"),on:{transitionend:this.onTransitionEnd}},[this.genOptions()])])}}),T=Object(s["a"])("picker"),O=T[0],$=T[1],E=T[2];e["a"]=O({props:Object(i["a"])({},u["b"],{defaultIndex:{type:[Number,String],default:0},columns:{type:Array,default:function(){return[]}},toolbarPosition:{type:String,default:"top"},valueKey:{type:String,default:"text"}}),data:function(){return{children:[],formattedColumns:[]}},computed:{itemPxHeight:function(){return this.itemHeight?Object(c["b"])(this.itemHeight):u["a"]},dataType:function(){var t=this.columns,e=t[0]||{};return e.children?"cascade":e.values?"object":"text"}},watch:{columns:{handler:"format",immediate:!0}},methods:{format:function(){var t=this.columns,e=this.dataType;"text"===e?this.formattedColumns=[{values:t}]:"cascade"===e?this.formatCascade():this.formattedColumns=t},formatCascade:function(){var t=[],e={children:this.columns};while(e&&e.children){var n=Object(o["c"])(e.defaultIndex)?e.defaultIndex:+this.defaultIndex;t.push({values:e.children,className:e.className,defaultIndex:n}),e=e.children[n]}this.formattedColumns=t},emit:function(t){var e=this;if("text"===this.dataType)this.$emit(t,this.getColumnValue(0),this.getColumnIndex(0));else{var n=this.getValues();"cascade"===this.dataType&&(n=n.map((function(t){return t[e.valueKey]}))),this.$emit(t,n,this.getIndexes())}},onCascadeChange:function(t){for(var e={children:this.columns},n=this.getIndexes(),i=0;i<=t;i++)e=e.children[n[i]];while(e&&e.children)t++,this.setColumnValues(t,e.children),e=e.children[e.defaultIndex||0]},onChange:function(t){var e=this;if("cascade"===this.dataType&&this.onCascadeChange(t),"text"===this.dataType)this.$emit("change",this,this.getColumnValue(0),this.getColumnIndex(0));else{var n=this.getValues();"cascade"===this.dataType&&(n=n.map((function(t){return t[e.valueKey]}))),this.$emit("change",this,n,t)}},getColumn:function(t){return this.children[t]},getColumnValue:function(t){var e=this.getColumn(t);return e&&e.getValue()},setColumnValue:function(t,e){var n=this.getColumn(t);n&&(n.setValue(e),"cascade"===this.dataType&&this.onCascadeChange(t))},getColumnIndex:function(t){return(this.getColumn(t)||{}).currentIndex},setColumnIndex:function(t,e){var n=this.getColumn(t);n&&(n.setIndex(e),"cascade"===this.dataType&&this.onCascadeChange(t))},getColumnValues:function(t){return(this.children[t]||{}).options},setColumnValues:function(t,e){var n=this.children[t];n&&n.setOptions(e)},getValues:function(){return this.children.map((function(t){return t.getValue()}))},setValues:function(t){var e=this;t.forEach((function(t,n){e.setColumnValue(n,t)}))},getIndexes:function(){return this.children.map((function(t){return t.currentIndex}))},setIndexes:function(t){var e=this;t.forEach((function(t,n){e.setColumnIndex(n,t)}))},confirm:function(){this.children.forEach((function(t){return t.stopMomentum()})),this.emit("confirm")},cancel:function(){this.emit("cancel")},genTitle:function(){var t=this.$createElement,e=this.slots("title");return e||(this.title?t("div",{class:["van-ellipsis",$("title")]},[this.title]):void 0)},genToolbar:function(){var t=this.$createElement;if(this.showToolbar)return t("div",{class:$("toolbar")},[this.slots()||[t("button",{attrs:{type:"button"},class:$("cancel"),on:{click:this.cancel}},[this.cancelButtonText||E("cancel")]),this.genTitle(),t("button",{attrs:{type:"button"},class:$("confirm"),on:{click:this.confirm}},[this.confirmButtonText||E("confirm")])]])},genColumns:function(){var t=this.$createElement,e=this.itemPxHeight,n=e*this.visibleItemCount,i={height:e+"px"},s={height:n+"px"},o={backgroundSize:"100% "+(n-e)/2+"px"};return t("div",{class:$("columns"),style:s,on:{touchmove:r["c"]}},[this.genColumnItems(),t("div",{class:$("mask"),style:o}),t("div",{class:[a["c"],$("frame")],style:i})])},genColumnItems:function(){var t=this,e=this.$createElement;return this.formattedColumns.map((function(n,i){return e(y,{attrs:{valueKey:t.valueKey,allowHtml:t.allowHtml,className:n.className,itemHeight:t.itemPxHeight,defaultIndex:Object(o["c"])(n.defaultIndex)?n.defaultIndex:+t.defaultIndex,swipeDuration:t.swipeDuration,visibleItemCount:t.visibleItemCount,initialOptions:n.values},on:{change:function(){t.onChange(i)}}})}))}},render:function(t){return t("div",{class:$()},["top"===this.toolbarPosition?this.genToolbar():t(),this.loading?t(l["a"],{class:$("loading")}):t(),this.slots("columns-top"),this.genColumns(),this.slots("columns-bottom"),"bottom"===this.toolbarPosition?this.genToolbar():t()])}})},bb6b:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return s}));var i=44,s={title:String,loading:Boolean,itemHeight:[Number,String],showToolbar:Boolean,cancelButtonText:String,confirmButtonText:String,allowHtml:{type:Boolean,default:!0},visibleItemCount:{type:[Number,String],default:6},swipeDuration:{type:[Number,String],default:1e3}}},c3e2:function(t,e,n){},c500:function(t,e,n){"use strict";n("126c"),n("430d"),n("c3e2")},d955:function(t,e,n){}}]);
//# sourceMappingURL=chunk-089628bc.46712cd4.js.map