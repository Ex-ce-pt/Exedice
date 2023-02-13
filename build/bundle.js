var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function s(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let i,l;function a(t,e){return i||(i=document.createElement("a")),i.href=e,t===i.href}function c(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function p(t){t.parentNode&&t.parentNode.removeChild(t)}function m(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function d(t){return document.createElement(t)}function g(t){return document.createTextNode(t)}function f(){return g(" ")}function h(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function L(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function v(t,e,n,o){null===n?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}function $(t){l=t}function k(t){(function(){if(!l)throw new Error("Function called outside component initialization");return l})().$$.on_mount.push(t)}const y=[],b=[],w=[],x=[],C=Promise.resolve();let j=!1;function _(t){w.push(t)}const M=new Set;let z=0;function E(){if(0!==z)return;const t=l;do{try{for(;z<y.length;){const t=y[z];z++,$(t),A(t.$$)}}catch(t){throw y.length=0,z=0,t}for($(null),y.length=0,z=0;b.length;)b.pop()();for(let t=0;t<w.length;t+=1){const e=w[t];M.has(e)||(M.add(e),e())}w.length=0}while(y.length);for(;x.length;)x.pop()();j=!1,M.clear(),$(t)}function A(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(_)}}const T=new Set;let I;function S(t,e){t&&t.i&&(T.delete(t),t.i(e))}function B(t,e,n,o){if(t&&t.o){if(T.has(t))return;T.add(t),I.c.push((()=>{T.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}else o&&o()}function H(t){t&&t.c()}function q(t,n,r,i){const{fragment:l,after_update:a}=t.$$;l&&l.m(n,r),i||_((()=>{const n=t.$$.on_mount.map(e).filter(s);t.$$.on_destroy?t.$$.on_destroy.push(...n):o(n),t.$$.on_mount=[]})),a.forEach(_)}function N(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function O(t,e){-1===t.$$.dirty[0]&&(y.push(t),j||(j=!0,C.then(E)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function P(e,s,r,i,a,c,u,m=[-1]){const d=l;$(e);const g=e.$$={fragment:null,ctx:[],props:c,update:t,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(s.context||(d?d.$$.context:[])),callbacks:n(),dirty:m,skip_bound:!1,root:s.target||d.$$.root};u&&u(g.root);let f=!1;if(g.ctx=r?r(e,s.props||{},((t,n,...o)=>{const s=o.length?o[0]:n;return g.ctx&&a(g.ctx[t],g.ctx[t]=s)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](s),f&&O(e,t)),n})):[],g.update(),f=!0,o(g.before_update),g.fragment=!!i&&i(g.ctx),s.target){if(s.hydrate){const t=function(t){return Array.from(t.childNodes)}(s.target);g.fragment&&g.fragment.l(t),t.forEach(p)}else g.fragment&&g.fragment.c();s.intro&&S(e.$$.fragment),q(e,s.target,s.anchor,s.customElement),E()}$(d)}class G{$destroy(){N(this,1),this.$destroy=t}$on(e,n){if(!s(n))return t;const o=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return o.push(n),()=>{const t=o.indexOf(n);-1!==t&&o.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function J(e){let n,s,r,i,l,a,m,g,v,$,k;return{c(){n=d("nav"),s=d("div"),r=d("button"),r.innerHTML='<svg width="100" height="100" viewBox="0 0 100 100" class="svelte-tdgzmm"><path id="youtube-logo" style="stroke-linecap:round;stroke-miterlimit:0" d="M 15 17.5 C 6.6900083 17.5 0 24.190008 0 32.5 L 0 67.5 C 0 75.809992 6.6900083 82.5 15 82.5 L 85 82.5 C 93.309992 82.5 100 75.809992 100 67.5 L 100 32.5 C 100 24.190008 93.309992 17.5 85 17.5 L 15 17.5 z M 40 35 L 60 50 L 40 65 L 40 35 z "></path></svg>',i=f(),l=d("button"),l.innerHTML='<svg width="16" height="17" viewBox="0 0 16 17" class="svelte-tdgzmm"><path id="gamejolt-logo" style="stroke:none;stroke-linecap:round;stroke-miterlimit:0" d="M 4 0 L 4 2 L 3 2 L 3 4 L 2 4 L 2 6 L 1 6 L 1 8 L 0 8 L 0 10 L 6 10 L 6 13 L 5 13 L 5 14 L 4 14 L 4 16 L 5 16 L 5 15 L 6 15 L 6 14 L 7 14 L 7 13 L 8 13 L 8 12 L 9 12 L 9 11 L 10 11 L 10 10 L 11 10 L 11 9 L 12 9 L 12 8 L 13 8 L 13 7 L 14 7 L 14 6 L 15 6 L 15 5 L 12 5 L 12 4 L 13 4 L 13 3 L 14 3 L 14 2 L 15 2 L 15 1 L 16 1 L 16 0 L 4 0 z M 4 16 L 3 16 L 3 17 L 4 17 L 4 16 z M 5 2 L 12 2 L 12 3 L 11 3 L 11 4 L 10 4 L 10 5 L 9 5 L 9 6 L 8 6 L 8 7 L 9 7 L 9 8 L 8 8 L 8 7 L 7 7 L 7 8 L 6 8 L 6 7 L 5 7 L 5 8 L 4 8 L 4 7 L 3 7 L 3.0117188 6 L 3 6 L 3.0117188 5.9980469 L 3.0117188 6 L 4 6 L 4 4 L 5 4 L 5 2 z M 4 6 L 4 7 L 5 7 L 5 6 L 4 6 z M 6 7 L 7 7 L 7 6 L 6 6 L 6 7 z M 10 7 L 11 7 L 11 8 L 10 8 L 10 7 z "></path></svg>',a=f(),m=d("button"),m.innerHTML='<svg width="512" height="512" viewBox="0 0 512 512.00002" class="svelte-tdgzmm"><path id="github-logo" style="stroke-linecap:round;stroke-miterlimit:0" d="M 256 0 A 256 256 0 0 0 0 256 A 256 256 0 0 0 192.9668 503.60742 C 192.9313 491.76688 192.79813 447.7772 192.78711 445.0957 C 162.76699 451.85506 147.43723 447.28769 129 441.73242 C 110.56277 436.17716 96.15947 394.10616 91.775391 389.04883 C 87.391311 383.99149 83.750269 380.72636 78.164062 377.24805 C 72.577856 373.76973 62.566838 368.4209 69.318359 363.61719 C 76.069881 358.81347 80.251033 360.37211 96.300781 366.39062 C 121.95556 380.33663 135.1736 415.90656 159.59961 415.92383 C 184.02561 415.94113 193.12109 409.71289 193.12109 409.71289 C 193.12109 409.71289 196.10678 379.71206 208.41797 375.55664 C 201.24817 374.69029 103.62731 370.30774 94.716797 282.64258 C 85.806288 194.97741 118.21484 180.88867 118.21484 180.88867 C 118.21484 180.88867 103.48479 124.31041 124.05469 111.98438 C 146.97997 107.70507 192.49609 138.53125 192.49609 138.53125 C 192.49609 138.53125 222.41382 128.96427 255.98438 129.10352 C 289.55492 129.24276 319.52344 138.51367 319.52344 138.51367 C 319.52344 138.51367 345.98965 109.41146 388.25586 111.3125 C 404.80368 131.31953 393.5 180.10742 393.5 180.10742 C 393.5 180.10742 420.64758 180.06397 415.86328 275.99414 C 411.07898 371.92427 302.46484 375.42969 302.46484 375.42969 C 302.46484 375.42969 309.09244 374.58367 315.70508 395.25391 C 321.44334 413.19094 320.09603 484.12251 319.62305 503.48047 A 256 256 0 0 0 512 256 A 256 256 0 0 0 256 0 z M 261.9668 511.57422 L 250.08789 511.57812 A 256 256 0 0 0 256 512 A 256 256 0 0 0 261.9668 511.57422 z "></path></svg>',g=f(),v=d("button"),L(r,"title","YouTube"),L(r,"class","svelte-tdgzmm"),L(l,"title","GameJolt"),L(l,"class","svelte-tdgzmm"),L(m,"title","GitHub"),L(m,"class","svelte-tdgzmm"),L(s,"class","content svelte-tdgzmm"),L(v,"class","svelte-tdgzmm"),L(n,"class","svelte-tdgzmm")},m(t,o){u(t,n,o),c(n,s),c(s,r),c(s,i),c(s,l),c(s,a),c(s,m),c(n,g),c(n,v),e[6](n),$||(k=[h(r,"click",e[3]),h(l,"click",e[4]),h(m,"click",e[5]),h(v,"click",e[1])],$=!0)},p:t,i:t,o:t,d(t){t&&p(n),e[6](null),$=!1,o(k)}}}function R(t,e,n){let o,s=!1;const r=()=>{s=!s;const t=getComputedStyle(o).getPropertyValue("--nav-height");n(0,o.style.top=s?`calc(-${t})`:"0",o)},i=t=>{window.location.href=t};setTimeout(r,2e3);return[o,r,i,()=>i("https://www.youtube.com/@ExediceWhyNot"),()=>i("https://gamejolt.com/@Exedice"),()=>i("https://github.com/Ex-ce-pt"),function(t){b[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}class W extends G{constructor(t){super(),P(this,t,R,J,r,{})}}function Y(e){let n,o,s,r,i;return{c(){n=d("main"),o=d("div"),s=f(),r=d("img"),L(o,"class","shade svelte-k9jeps"),a(r.src,i=window.location.href+"/mark neo.svg")||L(r,"src",i),L(r,"alt",""),L(r,"class","svelte-k9jeps"),L(n,"class","svelte-k9jeps")},m(t,e){u(t,n,e),c(n,o),c(n,s),c(n,r)},p:t,i:t,o:t,d(t){t&&p(n)}}}class F extends G{constructor(t){super(),P(this,t,null,Y,r,{})}}function U(t,e,n){const o=t.slice();return o[6]=e[n],o}function V(t,e,n){const o=t.slice();return o[9]=e[n],o[11]=n,o}function D(t){let e;return{c(){e=d("div"),v(e,"--activation",t[1](t[11],t[0])),L(e,"class","svelte-1afwh32")},m(t,n){u(t,e,n)},p(t,n){1&n&&v(e,"--activation",t[1](t[11],t[0]))},d(t){t&&p(e)}}}function K(t){let e,n,o=Array(X),s=[];for(let e=0;e<o.length;e+=1)s[e]=D(V(t,o,e));return{c(){e=d("main");for(let t=0;t<s.length;t+=1)s[t].c();var o;n=f(),L(e,"class",(null==(o=t[6])?"":o)+" svelte-1afwh32"),v(e,"--pads-count",X)},m(t,o){u(t,e,o);for(let t=0;t<s.length;t+=1)s[t].m(e,null);c(e,n)},p(t,r){if(3&r){let i;for(o=Array(X),i=0;i<o.length;i+=1){const l=V(t,o,i);s[i]?s[i].p(l,r):(s[i]=D(l),s[i].c(),s[i].m(e,n))}for(;i<s.length;i+=1)s[i].d(1);s.length=o.length}},d(t){t&&p(e),m(s,t)}}}function Q(e){let n,o=["left-side","right-side"],s=[];for(let t=0;t<2;t+=1)s[t]=K(U(e,o,t));return{c(){for(let t=0;t<2;t+=1)s[t].c();n=g("")},m(t,e){for(let n=0;n<2;n+=1)s[n].m(t,e);u(t,n,e)},p(t,[e]){if(3&e){let r;for(o=["left-side","right-side"],r=0;r<2;r+=1){const i=U(t,o,r);s[r]?s[r].p(i,e):(s[r]=K(i),s[r].c(),s[r].m(n.parentNode,n))}for(;r<2;r+=1)s[r].d(1)}},i:t,o:t,d(t){m(s,t),t&&p(n)}}}const X=20;function Z(t,e,n){let{parent:o}=e,s=-100,r=!1;const i=t=>{const e=getComputedStyle(o);Number(e.marginTop.substring(0,e.marginTop.length-2));const r=t.clientY-o.getBoundingClientRect().y;n(0,s=Math.floor(r/o.clientHeight*X))};return t.$$set=t=>{"parent"in t&&n(2,o=t.parent)},t.$$.update=()=>{12&t.$$.dirty&&(null==o||r||(o.addEventListener("mousemove",i),n(3,r=!0)))},[s,(t,e)=>{let n=Math.abs(t-e);return n>2&&(n=9999999),o=1/Math.pow(n+1,2),Math.min(Math.max(o,0),1);var o},o,r]}class tt extends G{constructor(t){super(),P(this,t,Z,Q,r,{parent:2})}}function et(t,e,n){const o=t.slice();return o[5]=e[n],o[7]=n,o}function nt(e){let n,o,s,r,i,l,m,h=e[5].name+"";return{c(){n=d("div"),o=d("img"),r=f(),i=d("span"),l=g(h),m=f(),a(o.src,s=e[5].icon)||L(o,"src",s),L(o,"alt",e[5].name),L(o,"class","svelte-1or4yq8"),L(i,"class","svelte-1or4yq8"),v(n,"--index",e[2].length-e[7]-1),L(n,"class","svelte-1or4yq8")},m(t,e){u(t,n,e),c(n,o),c(n,r),c(n,i),c(i,l),c(n,m)},p:t,d(t){t&&p(n)}}}function ot(e){let n,o=e[2],s=[];for(let t=0;t<o.length;t+=1)s[t]=nt(et(e,o,t));return{c(){n=d("main");for(let t=0;t<s.length;t+=1)s[t].c();v(n,"--stack-size",e[2].length),v(n,"--animation",e[1]?"running":"paused"),L(n,"class","svelte-1or4yq8")},m(t,o){u(t,n,o);for(let t=0;t<s.length;t+=1)s[t].m(n,null);e[3](n)},p(t,[e]){if(4&e){let r;for(o=t[2],r=0;r<o.length;r+=1){const i=et(t,o,r);s[r]?s[r].p(i,e):(s[r]=nt(i),s[r].c(),s[r].m(n,null))}for(;r<s.length;r+=1)s[r].d(1);s.length=o.length}2&e&&v(n,"--animation",t[1]?"running":"paused")},i:t,o:t,d(t){t&&p(n),m(s,t),e[3](null)}}}function st(t,e,n){let o,s=!1,r=new IntersectionObserver((t=>{t[0].isIntersecting&&n(1,s=!0)}),{rootMargin:"0px",threshold:1});return k((()=>{r.observe(o)})),[o,s,[{name:"Svelte",icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png"},{name:"TypeScript",icon:"https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254474/typescript-icon-icon-md.png"},{name:"C++",icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png"},{name:"Java",icon:"https://cdn-icons-png.flaticon.com/512/226/226777.png"},{name:"Python",icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png"},{name:"Rust",icon:"http://rust-lang.org/logos/rust-logo-512x512.png"}],function(t){b[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}class rt extends G{constructor(t){super(),P(this,t,st,ot,r,{})}}function it(e){let n,o,s,r,i,l,a,m,g,h,v,$,k,y,b;return $=new rt({}),{c(){n=d("main"),o=d("p"),o.textContent="Hi there! I'm Exedice. Glad to see you on my portfolio website!",s=f(),r=d("section"),r.innerHTML='<h2 class="svelte-kkr4j0">About me</h2> \n        <p class="svelte-kkr4j0">I&#39;m just a regular highschooler.</p> \n        <p class="svelte-kkr4j0">I do a variety of different things: I&#39;m a <span class="trait svelte-kkr4j0">programmer</span>,\n            I try to make <span class="trait svelte-kkr4j0">music</span> and draw <span class="trait svelte-kkr4j0">pixelart</span> sometimes.\n            I&#39;m not very good at it though.</p> \n        <p class="svelte-kkr4j0">I have a quite strong self-diagnosed impostor syndrome. <span class="small svelte-kkr4j0">(now read the previous sentence again)</span></p> \n        <p class="svelte-kkr4j0">I like math and chemistry. Maybe becoming a <span class="trait svelte-kkr4j0">bioinformaticists?</span> Who knows?</p>',i=f(),l=d("section"),a=d("h2"),a.textContent="My programming knowledge",m=f(),g=d("div"),h=d("div"),h.innerHTML='<p class="svelte-kkr4j0">Let&#39;s get back to programming, shall we?</p> \n                <p class="svelte-kkr4j0">This is quite literally my stack!</p> \n                <p class="svelte-kkr4j0">The most used tools are at the top.</p>',v=f(),H($.$$.fragment),k=f(),y=d("div"),y.innerHTML='<p class="svelte-kkr4j0">On top of that, I have also had some experience with\n                    <span class="trait svelte-kkr4j0">Arduino</span> and <span class="trait svelte-kkr4j0">Unity</span></p>',L(o,"class","svelte-kkr4j0"),L(r,"class","svelte-kkr4j0"),L(a,"class","svelte-kkr4j0"),L(g,"class","svelte-kkr4j0"),L(l,"class","programming svelte-kkr4j0"),L(n,"class","svelte-kkr4j0")},m(t,e){u(t,n,e),c(n,o),c(n,s),c(n,r),c(n,i),c(n,l),c(l,a),c(l,m),c(l,g),c(g,h),c(g,v),q($,g,null),c(g,k),c(g,y),b=!0},p:t,i(t){b||(S($.$$.fragment,t),b=!0)},o(t){B($.$$.fragment,t),b=!1},d(t){t&&p(n),N($)}}}class lt extends G{constructor(t){super(),P(this,t,null,it,r,{})}}function at(t){let e,n,o,s,r,i,l,a,m,g,h,v;return n=new W({}),s=new F({}),l=new tt({props:{parent:t[0]}}),m=new lt({}),{c(){e=d("main"),H(n.$$.fragment),o=f(),H(s.$$.fragment),r=f(),i=d("div"),H(l.$$.fragment),a=f(),H(m.$$.fragment),g=f(),h=d("link"),L(i,"class","content svelte-12pgg1j"),L(e,"class","svelte-12pgg1j"),L(h,"rel","icon"),L(h,"type","image/png"),L(h,"href",window.location.href+"/favicon.png")},m(p,d){u(p,e,d),q(n,e,null),c(e,o),q(s,e,null),c(e,r),c(e,i),q(l,i,null),c(i,a),q(m,i,null),t[1](i),u(p,g,d),c(document.head,h),v=!0},p(t,[e]){const n={};1&e&&(n.parent=t[0]),l.$set(n)},i(t){v||(S(n.$$.fragment,t),S(s.$$.fragment,t),S(l.$$.fragment,t),S(m.$$.fragment,t),v=!0)},o(t){B(n.$$.fragment,t),B(s.$$.fragment,t),B(l.$$.fragment,t),B(m.$$.fragment,t),v=!1},d(o){o&&p(e),N(n),N(s),N(l),N(m),t[1](null),o&&p(g),p(h)}}}function ct(t,e,n){let o;return[o,function(t){b[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}return new class extends G{constructor(t){super(),P(this,t,ct,at,r,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
