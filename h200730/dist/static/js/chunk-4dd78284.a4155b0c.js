(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4dd78284"],{3643:function(e,s,t){"use strict";t.r(s);var a=function(){var e=this,s=e.$createElement,t=e._self._c||s;return t("section",{staticClass:"offic-container"},[t("header",{staticClass:"header"},[e._v("自我评价")]),t("div",{staticClass:"office-item"},[t("Field",{attrs:{rows:"2",autosize:"",label:"自我介绍",type:"textarea",maxlength:"150",placeholder:"自我介绍","show-word-limit":""},model:{value:e.self_message,callback:function(s){e.self_message=s},expression:"self_message"}})],1),t("div",{staticClass:"save-box"},[t("button",{staticClass:"save",on:{click:e.save}},[e._v("保存自我评价")])])])},i=[],n=(t("ac1f"),t("5319"),t("5530")),o=(t("990b"),t("0356")),c=t("2f62"),l={name:"office",components:{Field:o["a"]},data:function(){return{self_message:""}},mounted:function(){var e=this.resume_info.back_value;0!==e.length&&(this.self_message=e.self_introduction)},methods:{save:function(){var e=this;if(""===this.self_message)return this.$Toast("自我介绍不能为空"),!1;this.$Toast.loading({message:"加载中...",forbidClick:!0,duration:0,overlay:!0}),this.$store.dispatch("fetchData",{im:this.$Config.PROJECT_INTERFACE.add_user_resume,fps:{open_id:this.openid_info.back_value.open_id,self_introduction:this.self_message},url:this.$Config.REQUEST_URL}).then((function(s){e.$Toast.clear(),s.back_value&&e.$router.replace("/experience")}))}},computed:Object(n["a"])({},Object(c["b"])(["openid_info","resume_info"]))},f=l,r=(t("c329"),t("2877")),u=Object(r["a"])(f,a,i,!1,null,"4231cf56",null);s["default"]=u.exports},c329:function(e,s,t){"use strict";var a=t("ed7f"),i=t.n(a);i.a},ed7f:function(e,s,t){}}]);
//# sourceMappingURL=chunk-4dd78284.a4155b0c.js.map