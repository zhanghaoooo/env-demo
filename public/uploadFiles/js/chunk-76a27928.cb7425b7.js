(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-76a27928"],{"159b":function(t,e,n){var r=n("da84"),a=n("fdbc"),o=n("17c2"),i=n("9112");for(var c in a){var s=r[c],u=s&&s.prototype;if(u&&u.forEach!==o)try{i(u,"forEach",o)}catch(l){u.forEach=o}}},"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,a=n("a640"),o=a("forEach");t.exports=o?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},"2ac8":function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"d",(function(){return o})),n.d(e,"e",(function(){return i})),n.d(e,"c",(function(){return c})),n.d(e,"b",(function(){return s}));var r=n("b775");function a(t){return Object(r["a"])({url:"/question/addcq",method:"post",data:t})}function o(){return Object(r["a"])({url:"/question/allquestion",method:"get"})}function i(){return Object(r["a"])({url:"/question/randquestion",method:"get"})}function c(t){return Object(r["a"])({url:"/question/updatecq",method:"post",data:t})}function s(t){return Object(r["a"])({url:"/question/deletecq?id="+t,method:"get"})}},"3ca7":function(t,e,n){"use strict";n("9c89")},"9c89":function(t,e,n){},a640:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},b727:function(t,e,n){var r=n("0366"),a=n("44ad"),o=n("7b0b"),i=n("50c4"),c=n("65f0"),s=[].push,u=function(t){var e=1==t,n=2==t,u=3==t,l=4==t,f=6==t,d=7==t,h=5==t||f;return function(p,v,m,_){for(var b,w,q=o(p),g=a(q),y=r(v,m,3),k=i(g.length),x=0,O=_||c,S=e?O(p,k):n||d?O(p,0):void 0;k>x;x++)if((h||x in g)&&(b=g[x],w=y(b,x,q),t))if(e)S[x]=w;else if(w)switch(t){case 3:return!0;case 5:return b;case 6:return x;case 2:s.call(S,b)}else switch(t){case 4:return!1;case 7:s.call(S,b)}return f?-1:u||l?l:S}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6),filterReject:u(7)}},d81d:function(t,e,n){"use strict";var r=n("23e7"),a=n("b727").map,o=n("1dde"),i=o("map");r({target:"Array",proto:!0,forced:!i},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},d987:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("div",{staticClass:"_bg"}),n("div",{staticClass:"plcaholder"}),t.maskShow?n("div",{directives:[{name:"loading",rawName:"v-loading",value:!0,expression:"true"}],staticClass:"mask",attrs:{"element-loading-text":"提交上传中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}}):t._e(),t.question_choice.length||t.question_essay.length?n("div",[t._l(t.question_choice,(function(e,r){return n("el-card",{key:e.id},[n("strong",[t._v(t._s(r+1)+". "+t._s(e.title))]),n("br"),n("el-row",t._l(e.options,(function(e,r){return n("span",{key:r},[n("el-checkbox",{model:{value:e.value,callback:function(n){t.$set(e,"value",n)},expression:"option.value"}},[t._v(t._s(String.fromCharCode(97+r))+". "+t._s(e.dec))])],1)})),0),t.showAnswer?n("el-row",{staticStyle:{"font-size":"16px"}},[t._v("答案："),t._l(t.cq_data[r].answer,(function(e,r){return n("span",{key:r,staticStyle:{color:"red"}},[t._v(t._s(e))])}))],2):t._e()],1)})),n("el-row",{staticClass:"submit-btn"},[n("el-button",{attrs:{type:"primary"},on:{click:t.submit}},[t._v("提交")])],1)],2):n("el-empty",{attrs:{description:"暂无测试题"}})],1)},a=[],o=n("1da1"),i=(n("96cf"),n("159b"),n("d81d"),n("2ac8")),c={data:function(){return{maskShow:!1,showAnswer:!1,question_choice:[],question_essay:[],cq_data:[],eq_data:[]}},methods:{getQuestions:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["e"])();case 2:n=e.sent,t.cq_data=JSON.parse(JSON.stringify(n.question_choice)),t.eq_data=JSON.parse(JSON.stringify(n.question_essay)),t.cq_data.forEach((function(t){t.answer=[],t.options.forEach((function(e,n){e.value&&t.answer.push(String.fromCharCode(97+n))}))})),t.question_choice=n.question_choice,t.question_choice.forEach((function(t){t.options.map((function(t){return t.value=!1}))})),t.question_essay=n.question_essay,t.question_essay.map((function(t){return t.answer=""}));case 10:case"end":return e.stop()}}),e)})))()},submit:function(){var t=this;this.maskShow=!0;var e=setTimeout((function(){t.maskShow=!1,t.showAnswer=!0,clearTimeout(e)}),3e3)}},created:function(){this.getQuestions()}},s=c,u=(n("3ca7"),n("2877")),l=Object(u["a"])(s,r,a,!1,null,"71699ce2",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-76a27928.cb7425b7.js.map