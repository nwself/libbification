import{S as ie,i as ne,s as de,e as d,t as C,k as N,c,a as f,h as B,d as i,m as O,b as s,g as F,K as t,L as ce,j as Y,V as ue,M as z,U as fe,Y as he,Z as be,W as ge,_ as Z,w as G,x as J,y as Q,q as ee,o as te,B as re}from"../../chunks/vendor-e06a1edb.js";import{m as me,w as ve}from"../../chunks/stores-97c1178b.js";function ae(u,e,a){const r=u.slice();return r[7]=e[a],r}function se(u){let e,a,r,l=u[7]+"",_,h,b,n,E=`https://${u[7]}.overdrive.com`,y,A,o,x,$,k,L;function T(){return u[6](u[7])}return{c(){e=d("li"),a=d("div"),r=d("div"),_=C(l),h=N(),b=d("div"),n=d("a"),y=C(E),o=N(),x=d("button"),$=C("X"),this.h()},l(S){e=c(S,"LI",{class:!0});var I=f(e);a=c(I,"DIV",{class:!0});var w=f(a);r=c(w,"DIV",{});var U=f(r);_=B(U,l),U.forEach(i),h=O(w),b=c(w,"DIV",{});var V=f(b);n=c(V,"A",{href:!0,class:!0,target:!0,rel:!0});var m=f(n);y=B(m,E),m.forEach(i),o=O(V),x=c(V,"BUTTON",{type:!0,class:!0});var g=f(x);$=B(g,"X"),g.forEach(i),V.forEach(i),w.forEach(i),I.forEach(i),this.h()},h(){s(n,"href",A=`https://${u[7]}.overdrive.com`),s(n,"class","text-gray-900 dark:text-gray-400"),s(n,"target","_blank"),s(n,"rel","noopener"),s(x,"type","button"),s(x,"class","text-red-600 bg-white border border-red-600 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium font-sans uppercase rounded-lg text-xs px-2 py-1 font-extrabold text-center dark:bg-gray-600 dark:text-red-700 dark:border-red-700 dark:hover:bg-gray-700 dark:hover:border-red-600 dark:focus:ring-gray-800"),s(a,"class","flex flex-wrap flex-col md:flex-row md:justify-between"),s(e,"class","py-2 pl-4 pr-1 w-full rounded-t-lg border-b border-gray-200 dark:border-gray-600")},m(S,I){F(S,e,I),t(e,a),t(a,r),t(r,_),t(a,h),t(a,b),t(b,n),t(n,y),t(b,o),t(b,x),t(x,$),k||(L=ce(x,"click",T),k=!0)},p(S,I){u=S,I&4&&l!==(l=u[7]+"")&&Y(_,l),I&4&&E!==(E=`https://${u[7]}.overdrive.com`)&&Y(y,E),I&4&&A!==(A=`https://${u[7]}.overdrive.com`)&&s(n,"href",A)},d(S){S&&i(e),k=!1,L()}}}function oe(u){let e,a;return{c(){e=d("div"),a=C("Copied!"),this.h()},l(r){e=c(r,"DIV",{class:!0});var l=f(e);a=B(l,"Copied!"),l.forEach(i),this.h()},h(){s(e,"class","absolute right-[38vw]")},m(r,l){F(r,e,l),t(e,a)},d(r){r&&i(e)}}}function pe(u){let e,a,r,l,_,h,b,n,E,y,A,o,x,$,k,L,T,S,I,w,U,V=u[2],m=[];for(let v=0;v<V.length;v+=1)m[v]=se(ae(u,V,v));let g=u[1]&&oe();return{c(){e=d("ul");for(let v=0;v<m.length;v+=1)m[v].c();a=N(),r=d("li"),l=d("div"),_=d("form"),h=d("div"),b=d("label"),n=C("Add library shortcode"),E=N(),y=d("input"),A=N(),o=d("button"),x=C("Add"),$=N(),k=d("li"),L=d("div"),T=d("button"),S=C("Copy shortcodes"),I=N(),g&&g.c(),this.h()},l(v){e=c(v,"UL",{class:!0});var D=f(e);for(let H=0;H<m.length;H+=1)m[H].l(D);a=O(D),r=c(D,"LI",{});var p=f(r);l=c(p,"DIV",{class:!0});var W=f(l);_=c(W,"FORM",{});var j=f(_);h=c(j,"DIV",{class:!0});var M=f(h);b=c(M,"LABEL",{for:!0,class:!0});var P=f(b);n=B(P,"Add library shortcode"),P.forEach(i),E=O(M),y=c(M,"INPUT",{name:!0,type:!0,id:!0,class:!0,placeholder:!0}),M.forEach(i),A=O(j),o=c(j,"BUTTON",{type:!0,class:!0});var X=f(o);x=B(X,"Add"),X.forEach(i),j.forEach(i),W.forEach(i),p.forEach(i),$=O(D),k=c(D,"LI",{});var K=f(k);L=c(K,"DIV",{class:!0});var q=f(L);T=c(q,"BUTTON",{type:!0,class:!0});var R=f(T);S=B(R,"Copy shortcodes"),R.forEach(i),I=O(q),g&&g.l(q),q.forEach(i),K.forEach(i),D.forEach(i),this.h()},h(){s(b,"for","shortcode"),s(b,"class","block pl-1 mt-2 font-sans text-sm font-medium text-gray-900 dark:text-gray-300"),s(y,"name","shortcode"),s(y,"type","text"),s(y,"id","shortcode"),s(y,"class","bg-gray-50 border border-gray-300 text-gray-900 font-sans text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"),s(y,"placeholder","Supports comma delimiter"),y.required=!0,s(h,"class","mb-2"),s(o,"type","submit"),s(o,"class","font-sans font-semibold tracking-wide text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"),s(l,"class","p-2 bg-blue-50 dark:bg-slate-600"),s(T,"type","button"),s(T,"class","py-2.5 px-5 mr-2 text-sm font-sans font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"),s(L,"class","p-2 flex justify-center items-center"),s(e,"class","text-sm font-medium bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 ")},m(v,D){F(v,e,D);for(let p=0;p<m.length;p+=1)m[p].m(e,null);t(e,a),t(e,r),t(r,l),t(l,_),t(_,h),t(h,b),t(b,n),t(h,E),t(h,y),t(_,A),t(_,o),t(o,x),t(e,$),t(e,k),t(k,L),t(L,T),t(T,S),t(L,I),g&&g.m(L,null),w||(U=[ue(u[3].call(null,_)),ce(T,"click",u[5])],w=!0)},p(v,[D]){if(D&20){V=v[2];let p;for(p=0;p<V.length;p+=1){const W=ae(v,V,p);m[p]?m[p].p(W,D):(m[p]=se(W),m[p].c(),m[p].m(e,a))}for(;p<m.length;p+=1)m[p].d(1);m.length=V.length}v[1]?g||(g=oe(),g.c(),g.m(L,null)):g&&(g.d(1),g=null)},i:z,o:z,d(v){v&&i(e),fe(m,v),g&&g.d(),w=!1,he(U)}}}function _e(u,e,a){let r,l=z,_=()=>(l(),l=be(h,o=>a(2,r=o)),h);u.$$.on_destroy.push(()=>l());let{libraryStore:h}=e;_();let b=!1;const{form:n}=ge({onSubmit:({shortcode:o},{setFields:x})=>{const $=o.split(",").map(k=>k.trim()).filter(k=>r.indexOf(k)===-1);Z(h,r=[...r,...$],r),x("shortcode","")}});function E(o){Z(h,r=r.filter(x=>x!==o),r)}function y(){window.navigator.clipboard.writeText(r.join(",")).then(function(){a(1,b=!0),setInterval(()=>a(1,b=!1),3e3)},function(){console.error("Navigator failed")})}const A=o=>E(o);return u.$$set=o=>{"libraryStore"in o&&_(a(0,h=o.libraryStore))},[h,b,r,n,E,y,A]}class le extends ie{constructor(e){super();ne(this,e,_e,pe,de,{libraryStore:0})}}function ye(u){let e,a,r,l,_,h,b,n,E,y,A,o,x,$,k,L,T,S,I;return o=new le({props:{libraryStore:me}}),S=new le({props:{libraryStore:ve}}),{c(){e=d("div"),a=d("div"),r=C("Settings are stored in this browser via "),l=d("a"),_=C("localStorage"),h=C(" which means these settings won't persist across browsers."),b=N(),n=d("div"),E=d("h2"),y=C("Main Libraries"),A=N(),G(o.$$.fragment),x=N(),$=d("div"),k=d("h2"),L=C("Wishlist Libraries"),T=N(),G(S.$$.fragment),this.h()},l(w){e=c(w,"DIV",{class:!0});var U=f(e);a=c(U,"DIV",{class:!0});var V=f(a);r=B(V,"Settings are stored in this browser via "),l=c(V,"A",{class:!0,href:!0});var m=f(l);_=B(m,"localStorage"),m.forEach(i),h=B(V," which means these settings won't persist across browsers."),V.forEach(i),b=O(U),n=c(U,"DIV",{class:!0});var g=f(n);E=c(g,"H2",{class:!0});var v=f(E);y=B(v,"Main Libraries"),v.forEach(i),A=O(g),J(o.$$.fragment,g),g.forEach(i),x=O(U),$=c(U,"DIV",{class:!0});var D=f($);k=c(D,"H2",{class:!0});var p=f(k);L=B(p,"Wishlist Libraries"),p.forEach(i),T=O(D),J(S.$$.fragment,D),D.forEach(i),U.forEach(i),this.h()},h(){s(l,"class","underline"),s(l,"href","https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"),s(a,"class","container border w-11/12 md:w-1/2 mx-auto mb-2 p-8 bg-blue-50 dark:bg-slate-600 rounded-lg font-sans"),s(E,"class","text-xl py-4"),s(n,"class","container md:w-1/2 mx-auto px-4"),s(k,"class","text-xl py-4"),s($,"class","container md:w-1/2 mx-auto mt-4 px-4"),s(e,"class","h-full min-h-screen py-8 bg-slate-100 dark:bg-slate-700 text-gray-900 dark:text-white")},m(w,U){F(w,e,U),t(e,a),t(a,r),t(a,l),t(l,_),t(a,h),t(e,b),t(e,n),t(n,E),t(E,y),t(n,A),Q(o,n,null),t(e,x),t(e,$),t($,k),t(k,L),t($,T),Q(S,$,null),I=!0},p:z,i(w){I||(ee(o.$$.fragment,w),ee(S.$$.fragment,w),I=!0)},o(w){te(o.$$.fragment,w),te(S.$$.fragment,w),I=!1},d(w){w&&i(e),re(o),re(S)}}}const we=!0;class Ee extends ie{constructor(e){super();ne(this,e,null,ye,de,{})}}export{Ee as default,we as prerender};