var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function l(t){return"function"==typeof t}function o(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let c,r;function i(t,e){return c||(c=document.createElement("a")),c.href=e,t===c.href}function a(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function d(t){t.parentNode&&t.parentNode.removeChild(t)}function p(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function f(t){return document.createElement(t)}function g(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function h(t){return document.createTextNode(t)}function m(){return h(" ")}function v(){return h("")}function L(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function $(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function w(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function b(t,e,n,s){null===n?t.style.removeProperty(e):t.style.setProperty(e,n,s?"important":"")}function y(t,e){return new t(e)}function x(t){r=t}function k(t){(function(){if(!r)throw new Error("Function called outside component initialization");return r})().$$.on_mount.push(t)}const C=[],z=[],M=[],_=[],T=Promise.resolve();let q=!1;function A(){q||(q=!0,T.then(S))}function E(){return A(),T}function I(t){M.push(t)}const H=new Set;let B=0;function S(){if(0!==B)return;const t=r;do{try{for(;B<C.length;){const t=C[B];B++,x(t),P(t.$$)}}catch(t){throw C.length=0,B=0,t}for(x(null),C.length=0,B=0;z.length;)z.pop()();for(let t=0;t<M.length;t+=1){const e=M[t];H.has(e)||(H.add(e),e())}M.length=0}while(C.length);for(;_.length;)_.pop()();q=!1,H.clear(),x(t)}function P(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(I)}}const j=new Set;let O;function N(t,e){t&&t.i&&(j.delete(t),t.i(e))}function D(t,e,n,s){if(t&&t.o){if(j.has(t))return;j.add(t),O.c.push((()=>{j.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}else s&&s()}function F(t){t&&t.c()}function Z(t,n,o,c){const{fragment:r,after_update:i}=t.$$;r&&r.m(n,o),c||I((()=>{const n=t.$$.on_mount.map(e).filter(l);t.$$.on_destroy?t.$$.on_destroy.push(...n):s(n),t.$$.on_mount=[]})),i.forEach(I)}function G(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function V(e,l,o,c,i,a,u,p=[-1]){const f=r;x(e);const g=e.$$={fragment:null,ctx:[],props:a,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(l.context||(f?f.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:l.target||f.$$.root};u&&u(g.root);let h=!1;if(g.ctx=o?o(e,l.props||{},((t,n,...s)=>{const l=s.length?s[0]:n;return g.ctx&&i(g.ctx[t],g.ctx[t]=l)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](l),h&&function(t,e){-1===t.$$.dirty[0]&&(C.push(t),A(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}(e,t)),n})):[],g.update(),h=!0,s(g.before_update),g.fragment=!!c&&c(g.ctx),l.target){if(l.hydrate){const t=function(t){return Array.from(t.childNodes)}(l.target);g.fragment&&g.fragment.l(t),t.forEach(d)}else g.fragment&&g.fragment.c();l.intro&&N(e.$$.fragment),Z(e,l.target,l.anchor,l.customElement),S()}x(f)}class W{$destroy(){G(this,1),this.$destroy=t}$on(e,n){if(!l(n))return t;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const t=s.indexOf(n);-1!==t&&s.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function J(t){let e;return{c(){e=h("Failed to Copy!")},m(t,n){u(t,e,n)},d(t){t&&d(e)}}}function R(t){let e;return{c(){e=h("Copied to Clipboard!")},m(t,n){u(t,e,n)},d(t){t&&d(e)}}}function X(t){let e;function n(t,e){return"success"===t[1]?R:"fail"===t[1]?J:void 0}let s=n(t),l=s&&s(t);return{c(){e=f("div"),l&&l.c(),$(e,"class","copy-status svelte-qgrrdi"),$(e,"data-status",t[1])},m(t,n){u(t,e,n),l&&l.m(e,null)},p(t,o){s!==(s=n(t))&&(l&&l.d(1),l=s&&s(t),l&&(l.c(),l.m(e,null))),2&o&&$(e,"data-status",t[1])},d(t){t&&d(e),l&&l.d()}}}function Y(e){let n,l,c,r,i,p,g,h,v,w,b,y,x,k,C,z,M,_,T=e[1],q=X(e);return{c(){n=f("nav"),l=f("div"),c=f("button"),c.innerHTML='<svg width="100" height="100" viewBox="0 0 100 100" id="email-logo" class="svelte-qgrrdi"><path d="M 43.531157,99.631787 C 27.218204,97.766382 11.461454,86.173211 4.5058462,70.918535 -1.5019487,57.742586 -1.5019487,42.3009 4.5058462,29.124934 9.0893112,19.072725 17.916645,10.056001 28.001169,5.1255056 59.285405,-10.169892 96.218273,10.408777 99.736864,45.095987 101.21477,59.66548 96.430046,73.637969 86.319362,84.278177 75.065634,96.121318 60.025942,101.51797 43.531157,99.631787 Z M 82.054509,70.188456 c 0.601881,-0.858827 0.693745,-3.535805 0.693745,-20.216483 0,-18.268102 -0.04245,-19.278991 -0.85209,-20.278062 l -0.852092,-1.05151 -31.123213,0.142585 c -30.688423,0.140565 -31.134117,0.155379 -31.903103,1.051493 -0.716671,0.835191 -0.779884,2.467596 -0.779884,20.135443 0,16.680678 0.0918,19.357657 0.69373,20.216483 l 0.693747,0.989914 H 49.99305 81.360762 Z M 54.226731,69.344595 C 41.358608,69.150346 28.997341,68.932294 26.757217,68.860042 l -4.072924,-0.131307 10.980477,-8.090529 10.980495,-8.090545 1.336946,1.077131 c 0.735333,0.592409 1.875262,1.375348 2.5332,1.739857 1.134657,0.628586 1.295276,0.587359 3.119536,-0.800732 1.057817,-0.80489 2.15362,-1.604208 2.435107,-1.776235 0.29513,-0.180395 5.200429,3.096804 11.586881,7.741103 9.705431,7.057907 12.928807,9.504915 12.173261,9.241259 -0.113861,-0.03973 -10.735355,-0.231133 -23.603465,-0.425365 z M 20.357408,49.793245 V 33.254967 l 3.032068,2.370446 c 12.342066,9.648931 18.320587,14.438255 18.338357,14.690632 0.01701,0.242092 -18.97935,14.54724 -20.813363,15.673409 -0.441786,0.271281 -0.557062,-3.080089 -0.557062,-16.196209 z m 47.907259,8.659135 c -5.882564,-4.28595 -10.735221,-7.936177 -10.783696,-8.111639 -0.08455,-0.306229 20.85712,-16.642632 21.724945,-16.947364 0.261696,-0.09191 0.422802,6.144959 0.422802,16.36854 0,9.084365 -0.150412,16.50939 -0.334241,16.500064 -0.183829,-0.0101 -5.147248,-3.523651 -11.02981,-7.809601 z M 36.724765,42.08581 24.347782,32.205629 37.059006,32.087454 c 6.991181,-0.06498 18.43585,-0.06498 25.432613,0 l 12.721379,0.118175 -12.511662,9.70652 C 55.819934,47.25072 49.944895,51.696814 49.645722,51.792331 49.346549,51.88778 43.532117,47.519915 36.724765,42.08581 Z"></path></svg>',r=m(),i=f("button"),i.innerHTML='<svg width="100" height="100" viewBox="0 0 100 100" id="discord-logo" class="svelte-qgrrdi"><path d="m 64.096087,12.0355 -2.637779,5.36271 c -7.558745,-1.12367 -15.158248,-0.896531 -22.808,0.05282 l -2.68272,-5.394012 C 29.127069,13.248311 20.490937,16.006893 15.39877,18.421448 8.5583951,28.448353 2.7634186,41.325758 0,57.803417 L 0.45916902,75.2063 C 6.5352168,80.296883 21.639148,87.282988 25.772083,87.9645 c 1.638405,-2.032566 4.845834,-7.038163 5.500258,-8.817852 -1.479858,-0.529422 -6.825507,-2.793299 -8.384231,-4.094912 1.365676,-0.997242 1.903109,-1.529965 1.903109,-1.529965 0,0 10.981925,5.778825 25.377393,5.626833 14.395466,-0.15199 25.209355,-5.648355 25.209355,-5.648355 0,0 1.483923,1.223653 1.869893,1.57301 -1.128718,1.069501 -8.454572,4.104694 -8.454572,4.104694 0,0 4.325842,7.92067 5.445549,8.733723 C 79.157425,87.303633 98.572353,77.598989 99.637723,75.174994 99.95929,71.086989 100.24334,63.241967 99.672893,57.803417 98.279502,44.941861 93.346862,30.48537 84.733292,18.425362 78.420626,15.235637 71.471289,13.60935 64.096087,12.0355 Z m 2.66318,31.743874 a 9.1286709,9.9545661 0 0 1 9.128671,9.954567 9.1286709,9.9545661 0 0 1 -9.128671,9.954565 9.1286709,9.9545661 0 0 1 -9.12867,-9.954565 9.1286709,9.9545661 0 0 1 9.12867,-9.954567 z m -33.308316,0.197604 a 9.1286709,9.9545661 0 0 1 9.128671,9.954567 9.1286709,9.9545661 0 0 1 -9.128671,9.954565 9.1286709,9.9545661 0 0 1 -9.12867,-9.954565 9.1286709,9.9545661 0 0 1 9.12867,-9.954567 z"></path></svg>',p=m(),g=f("button"),g.innerHTML='<svg width="512" height="512" viewBox="0 0 512 512.00002" id="github-logo" class="svelte-qgrrdi"><path d="M 256 0 A 256 256 0 0 0 0 256 A 256 256 0 0 0 192.9668 503.60742 C 192.9313 491.76688 192.79813 447.7772 192.78711 445.0957 C 162.76699 451.85506 147.43723 447.28769 129 441.73242 C 110.56277 436.17716 96.15947 394.10616 91.775391 389.04883 C 87.391311 383.99149 83.750269 380.72636 78.164062 377.24805 C 72.577856 373.76973 62.566838 368.4209 69.318359 363.61719 C 76.069881 358.81347 80.251033 360.37211 96.300781 366.39062 C 121.95556 380.33663 135.1736 415.90656 159.59961 415.92383 C 184.02561 415.94113 193.12109 409.71289 193.12109 409.71289 C 193.12109 409.71289 196.10678 379.71206 208.41797 375.55664 C 201.24817 374.69029 103.62731 370.30774 94.716797 282.64258 C 85.806288 194.97741 118.21484 180.88867 118.21484 180.88867 C 118.21484 180.88867 103.48479 124.31041 124.05469 111.98438 C 146.97997 107.70507 192.49609 138.53125 192.49609 138.53125 C 192.49609 138.53125 222.41382 128.96427 255.98438 129.10352 C 289.55492 129.24276 319.52344 138.51367 319.52344 138.51367 C 319.52344 138.51367 345.98965 109.41146 388.25586 111.3125 C 404.80368 131.31953 393.5 180.10742 393.5 180.10742 C 393.5 180.10742 420.64758 180.06397 415.86328 275.99414 C 411.07898 371.92427 302.46484 375.42969 302.46484 375.42969 C 302.46484 375.42969 309.09244 374.58367 315.70508 395.25391 C 321.44334 413.19094 320.09603 484.12251 319.62305 503.48047 A 256 256 0 0 0 512 256 A 256 256 0 0 0 256 0 z M 261.9668 511.57422 L 250.08789 511.57812 A 256 256 0 0 0 256 512 A 256 256 0 0 0 261.9668 511.57422 z "></path></svg>',h=m(),v=f("button"),v.innerHTML='<svg width="100" height="100" viewBox="0 0 100 100" id="youtube-logo" class="svelte-qgrrdi"><path d="M 15 17.5 C 6.6900083 17.5 0 24.190008 0 32.5 L 0 67.5 C 0 75.809992 6.6900083 82.5 15 82.5 L 85 82.5 C 93.309992 82.5 100 75.809992 100 67.5 L 100 32.5 C 100 24.190008 93.309992 17.5 85 17.5 L 15 17.5 z M 40 35 L 60 50 L 40 65 L 40 35 z "></path></svg>',w=m(),b=f("button"),b.innerHTML='<svg width="100" height="100" viewBox="0 0 100 100" id="soundcloud-logo" class="svelte-qgrrdi"><path d="M 50,0 A 50,50 0 0 0 0,50 50,50 0 0 0 50,100 50,50 0 0 0 100,50 50,50 0 0 0 50,0 Z m 11.640625,31.175781 c 14.053738,1.895808 16.669132,13.960449 16.978516,17.039063 1.411028,-0.545038 2.799819,-0.691715 4.18164,-0.740235 6.65559,0.408344 10.563435,4.337361 10.583985,11.246094 0.02055,6.908733 -5.819824,10.850026 -13.607422,10.033203 l -26.701172,-0.02148 c -0.765517,-0.03274 -1.098495,-0.65649 -1.109375,-1.501953 l 0.119141,-34.421875 c 3.889082,-1.953114 6.480409,-1.508181 9.554687,-1.632813 z m -11.847656,2.462891 c 0.878758,-0.004 1.132812,0.814453 1.132812,0.814453 0.509908,11.913217 0.486328,22.092533 0.01953,33.699219 0,0 -0.319283,0.596556 -1.09375,0.597656 -0.774454,0.0011 -1.179687,-0.582031 -1.179687,-0.582031 -0.437535,-11.218153 -0.542172,-22.451208 -0.02344,-33.710938 0,0 0.265773,-0.814359 1.144531,-0.818359 z m -3.660157,2.085937 c 0.814905,-0.0089 1.089844,0.763672 1.089844,0.763672 0.217054,10.569403 0.464672,21.13013 0,31.699219 0,0 -0.263563,0.580538 -1.078125,0.585938 -0.814563,0.0054 -1.054687,-0.628907 -1.054687,-0.628907 C 44.667358,57.596488 44.705583,47.048043 45.078125,36.5 c 0,0 0.239793,-0.766491 1.054687,-0.775391 z m -10.851562,2.5625 c 0.750507,-0.002 0.857422,0.574219 0.857422,0.574219 0.491246,9.810569 0.597816,19.621071 0.0078,29.431641 0,0 -0.306312,0.506112 -0.849609,0.507812 -0.543298,0.0017 -0.867187,-0.505859 -0.867187,-0.505859 -0.548608,-9.772079 -0.548392,-19.587939 -0.01367,-29.44336 0,10e-7 0.114728,-0.562453 0.865234,-0.564453 z m 3.601562,0.363282 c 0.747681,-0.0034 0.904297,0.753906 0.904297,0.753906 0.631791,9.616932 0.495797,19.234631 0.01172,28.851562 0,0 -0.296299,0.539769 -0.90039,0.542969 C 38.294338,68.802029 37.951172,68.25 37.951172,68.25 37.54599,58.59307 37.240999,48.947213 37.9375,39.40625 c 0,0 0.197642,-0.752459 0.945312,-0.755859 z m -7.203124,0.330078 c 0.669086,-0.0094 0.765624,0.65625 0.765624,0.65625 0.75212,9.514832 0.629198,19.118019 -0.01953,28.75 0,0 -0.287225,0.433534 -0.753906,0.427734 -0.466681,-0.0058 -0.738281,-0.431641 -0.738281,-0.431641 -0.476272,-9.579347 -0.697174,-19.158926 -0.05078,-28.738281 0,0 0.127782,-0.654662 0.796876,-0.664062 z m 10.851562,0.347656 c 0.689851,0.0025 0.921875,0.570313 0.921875,0.570313 0.505614,9.40414 0.614937,18.762876 0.0625,28.109374 0,0 -0.249924,0.807233 -1.015625,0.820313 -0.765702,0.01308 -1.046875,-0.804687 -1.046875,-0.804687 -0.328772,-9.41678 -0.385676,-18.8042 0.09375,-28.132813 0,0 0.294525,-0.565 0.984375,-0.5625 z m -14.421875,1.271484 c 0.500347,-0.0046 0.660156,0.427735 0.660156,0.427735 0.457811,8.9664 1.077891,17.92735 -0.0039,27.441406 0,0 -0.253732,0.359669 -0.664063,0.355469 -0.410323,-0.0042 -0.710937,-0.355469 -0.710937,-0.355469 -0.851192,-9.029563 -0.2454,-18.267461 -0.0039,-27.453125 0,0 0.222308,-0.411416 0.722656,-0.416016 z m -3.464844,3.214844 c 0.421882,0.0011 0.585938,0.466797 0.585938,0.466797 0.03511,4.731685 0.662415,10.187144 0.666015,14.1875 0.03938,2.464762 -0.47022,6.473844 -0.658203,9.816406 0,0 -0.187234,0.468462 -0.601562,0.472656 -0.414334,0.0042 -0.683594,-0.472656 -0.683594,-0.472656 -0.184984,-3.333503 -0.332277,-6.960901 -0.546875,-9.794922 0.07579,-3.390664 0.4724,-9.473202 0.5625,-14.208984 0,0 0.253904,-0.467897 0.675781,-0.466797 z m -7.011719,5.044922 c 0.433129,-0.01014 0.511719,0.492187 0.511719,0.492187 0.307272,3.038268 0.60931,6.138938 0.824219,9.167969 -0.185227,3.204903 -0.561597,6.390728 -0.84375,9.585938 0,0 -0.07435,0.417693 -0.453125,0.417969 -0.378773,2.73e-4 -0.527344,-0.457032 -0.527344,-0.457032 -0.247557,-3.176501 -0.566368,-6.388665 -0.738281,-9.527344 0.185069,-3.070941 0.479197,-6.123134 0.730469,-9.15625 0,0 0.06297,-0.513297 0.496093,-0.523437 z m -3.40039,0.369141 c 0.287498,2.97e-4 0.36914,0.339843 0.36914,0.339843 0.328291,2.910039 0.579714,6.012341 0.826172,9.126953 -0.243779,3.049171 -0.48915,6.097312 -0.814453,9.146485 0,0 -0.02611,0.35798 -0.396484,0.357422 -0.370376,-5.57e-4 -0.441406,-0.394531 -0.441406,-0.394531 -0.282482,-3.089211 -0.529319,-6.142511 -0.728516,-9.148438 0.215527,-3.053847 0.455454,-6.098796 0.794922,-9.111328 0,0 0.103127,-0.316703 0.390625,-0.316406 z m 6.904297,0.24414 c 0.37456,-0.0071 0.503906,0.417969 0.503906,0.417969 0.244204,2.912655 0.586408,5.873211 0.794922,8.890625 -0.171719,3.134637 -0.541112,6.253716 -0.757813,9.404297 0,0 -0.105455,0.516272 -0.550781,0.513672 -0.445321,-0.0026 -0.583984,-0.525391 -0.583984,-0.525391 -0.191838,-3.147594 -0.5051,-6.245554 -0.675781,-9.279297 0.169023,-3.045378 0.466908,-6.002946 0.710937,-8.996093 0,0 0.184028,-0.418682 0.558594,-0.425782 z m -10.332031,1.261719 c 0.311853,-0.0049 0.328125,0.453125 0.328124,0.453125 0.315041,2.556487 0.656659,5.070564 0.90625,7.605469 -0.304686,2.515044 -0.609375,5.068477 -0.914062,7.671875 0,0 -0.08198,0.306494 -0.335938,0.308594 -0.25396,0.0021 -0.363281,-0.316407 -0.363281,-0.316407 -0.263019,-2.536145 -0.526042,-5.086735 -0.7890622,-7.652343 0.2438355,-2.575779 0.4558002,-5.127624 0.7851562,-7.617188 0,0 0.07096,-0.448225 0.382813,-0.453125 z m -3.1542974,2.955078 c 0.3171291,0.0038 0.3320313,0.34375 0.3320313,0.34375 L 8.59375,58.765625 7.8261719,63.65625 c 0,0 -0.06912,0.275584 -0.2519531,0.271484 -0.182834,-0.0041 -0.2714844,-0.259765 -0.2714844,-0.259765 l -0.6132813,-4.900391 0.5742188,-4.71289 c 0,0 0.06959,-0.369035 0.3867187,-0.365235 z"></path></svg>',y=m(),x=f("button"),x.innerHTML='<svg width="16" height="17" viewBox="0 0 16 17" id="gamejolt-logo" class="svelte-qgrrdi"><path d="M 4 0 L 4 2 L 3 2 L 3 4 L 2 4 L 2 6 L 1 6 L 1 8 L 0 8 L 0 10 L 6 10 L 6 13 L 5 13 L 5 14 L 4 14 L 4 16 L 5 16 L 5 15 L 6 15 L 6 14 L 7 14 L 7 13 L 8 13 L 8 12 L 9 12 L 9 11 L 10 11 L 10 10 L 11 10 L 11 9 L 12 9 L 12 8 L 13 8 L 13 7 L 14 7 L 14 6 L 15 6 L 15 5 L 12 5 L 12 4 L 13 4 L 13 3 L 14 3 L 14 2 L 15 2 L 15 1 L 16 1 L 16 0 L 4 0 z M 4 16 L 3 16 L 3 17 L 4 17 L 4 16 z M 5 2 L 12 2 L 12 3 L 11 3 L 11 4 L 10 4 L 10 5 L 9 5 L 9 6 L 8 6 L 8 7 L 9 7 L 9 8 L 8 8 L 8 7 L 7 7 L 7 8 L 6 8 L 6 7 L 5 7 L 5 8 L 4 8 L 4 7 L 3 7 L 3.0117188 6 L 3 6 L 3.0117188 5.9980469 L 3.0117188 6 L 4 6 L 4 4 L 5 4 L 5 2 z M 4 6 L 4 7 L 5 7 L 5 6 L 4 6 z M 6 7 L 7 7 L 7 6 L 6 6 L 6 7 z M 10 7 L 11 7 L 11 8 L 10 8 L 10 7 z "></path></svg>',k=m(),C=f("button"),z=m(),q.c(),$(c,"title","Email"),$(c,"class","svelte-qgrrdi"),$(i,"title","Discord"),$(i,"class","svelte-qgrrdi"),$(g,"title","GitHub"),$(g,"class","svelte-qgrrdi"),$(v,"title","YouTube"),$(v,"class","svelte-qgrrdi"),$(b,"title","SoundCloud"),$(b,"class","svelte-qgrrdi"),$(x,"title","GameJolt"),$(x,"class","svelte-qgrrdi"),$(l,"class","content svelte-qgrrdi"),$(C,"class","svelte-qgrrdi"),$(n,"class","svelte-qgrrdi")},m(t,s){u(t,n,s),a(n,l),a(l,c),a(l,r),a(l,i),a(l,p),a(l,g),a(l,h),a(l,v),a(l,w),a(l,b),a(l,y),a(l,x),a(n,k),a(n,C),a(n,z),q.m(n,null),e[11](n),M||(_=[L(c,"click",e[5]),L(i,"click",e[6]),L(g,"click",e[7]),L(v,"click",e[8]),L(b,"click",e[9]),L(x,"click",e[10]),L(C,"click",e[2])],M=!0)},p(t,[e]){2&e&&o(T,T=t[1])?(q.d(1),q=X(t),q.c(),q.m(n,null)):q.p(t,e)},i:t,o:t,d(t){t&&d(n),q.d(t),e[11](null),M=!1,s(_)}}}function U(t,e,n){let s,l=!1,o="undef";const c=()=>{l=!l;const t=getComputedStyle(s).getPropertyValue("--nav-height");n(0,s.style.top=l?`calc(-${t})`:"0",s)},r=t=>{window.open(t,"_blank")},i=t=>{navigator.clipboard.writeText(t).then((async()=>{n(1,o="undef"),await E(),n(1,o="success")})).catch((async()=>{n(1,o="undef"),await E(),n(1,o="fail")}))};setTimeout(c,2e3);return[s,o,c,r,i,()=>i("except.dice@gmail.com"),()=>i("Exedice#7316"),()=>r("https://github.com/Ex-ce-pt"),()=>r("https://www.youtube.com/@ExediceWhyNot"),()=>r("https://soundcloud.com/exedice-ex_ce_pt"),()=>r("https://gamejolt.com/@Exedice"),function(t){z[t?"unshift":"push"]((()=>{s=t,n(0,s)}))}]}class K extends W{constructor(t){super(),V(this,t,U,Y,o,{})}}function Q(e){let n,s,l,o,c;return{c(){n=f("main"),s=f("div"),l=m(),o=f("img"),$(s,"class","shade svelte-155x2l8"),i(o.src,c=window.location.href+"icons/mark neo.svg")||$(o,"src",c),$(o,"alt",""),$(o,"class","svelte-155x2l8"),$(n,"class","svelte-155x2l8")},m(t,e){u(t,n,e),a(n,s),a(n,l),a(n,o)},p:t,i:t,o:t,d(t){t&&d(n)}}}class tt extends W{constructor(t){super(),V(this,t,null,Q,o,{})}}function et(t,e,n){const s=t.slice();return s[7]=e[n],s}function nt(t,e,n){const s=t.slice();return s[10]=e[n],s[12]=n,s}function st(t){let e;return{c(){e=f("div"),b(e,"--activation",t[1](t[12],t[0])),$(e,"class","svelte-cmaito")},m(t,n){u(t,e,n)},p(t,n){1&n&&b(e,"--activation",t[1](t[12],t[0]))},d(t){t&&d(e)}}}function lt(t){let e,n,s=Array(ct),l=[];for(let e=0;e<s.length;e+=1)l[e]=st(nt(t,s,e));return{c(){e=f("main");for(let t=0;t<l.length;t+=1)l[t].c();var s;n=m(),$(e,"class",(null==(s=t[7])?"":s)+" svelte-cmaito"),b(e,"--pads-count",ct)},m(t,s){u(t,e,s);for(let t=0;t<l.length;t+=1)l[t].m(e,null);a(e,n)},p(t,o){if(3&o){let c;for(s=Array(ct),c=0;c<s.length;c+=1){const r=nt(t,s,c);l[c]?l[c].p(r,o):(l[c]=st(r),l[c].c(),l[c].m(e,n))}for(;c<l.length;c+=1)l[c].d(1);l.length=s.length}},d(t){t&&d(e),p(l,t)}}}function ot(e){let n,s=["left-side","right-side"],l=[];for(let t=0;t<2;t+=1)l[t]=lt(et(e,s,t));return{c(){for(let t=0;t<2;t+=1)l[t].c();n=v()},m(t,e){for(let n=0;n<2;n+=1)l[n].m(t,e);u(t,n,e)},p(t,[e]){if(3&e){let o;for(s=["left-side","right-side"],o=0;o<2;o+=1){const c=et(t,s,o);l[o]?l[o].p(c,e):(l[o]=lt(c),l[o].c(),l[o].m(n.parentNode,n))}for(;o<2;o+=1)l[o].d(1)}},i:t,o:t,d(t){p(l,t),t&&d(n)}}}const ct=30;function rt(t,e,n){let{parent:s}=e,l=-100,o=!1;const c=t=>{const e=t.clientY-s.getBoundingClientRect().y;n(0,l=Math.floor(e/s.clientHeight*ct))},r=t=>{const e=document.body.scrollTop-s.offsetTop+document.body.clientHeight/2;n(0,l=Math.floor(e/s.clientHeight*ct))};return t.$$set=t=>{"parent"in t&&n(2,s=t.parent)},t.$$.update=()=>{12&t.$$.dirty&&(null==s||o||(Tt?document.body.addEventListener("scroll",r):s.addEventListener("mousemove",c),n(3,o=!0)))},[l,(t,e)=>{let n=Math.abs(t-e);return n>2&&(n=9999999),s=1/Math.pow(n+1,2),Math.min(Math.max(s,0),1);var s},s,o]}class it extends W{constructor(t){super(),V(this,t,rt,ot,o,{parent:2})}}function at(t,e,n){const s=t.slice();return s[5]=e[n],s[7]=n,s}function ut(e){let n,s,l,o,c,r,p,g=e[5].name+"";return{c(){n=f("div"),s=f("img"),o=m(),c=f("span"),r=h(g),p=m(),i(s.src,l=e[5].icon??"")||$(s,"src",l),$(s,"alt",e[5].name),$(s,"class","svelte-4u9tb9"),$(c,"class","svelte-4u9tb9"),b(n,"--index",e[2].length-e[7]-1),$(n,"class","svelte-4u9tb9")},m(t,e){u(t,n,e),a(n,s),a(n,o),a(n,c),a(c,r),a(n,p)},p:t,d(t){t&&d(n)}}}function dt(e){let n,s=e[2],l=[];for(let t=0;t<s.length;t+=1)l[t]=ut(at(e,s,t));return{c(){n=f("main");for(let t=0;t<l.length;t+=1)l[t].c();b(n,"--stack-size",e[2].length),b(n,"--animation",e[1]?"running":"paused"),$(n,"class","svelte-4u9tb9")},m(t,s){u(t,n,s);for(let t=0;t<l.length;t+=1)l[t].m(n,null);e[3](n)},p(t,[e]){if(4&e){let o;for(s=t[2],o=0;o<s.length;o+=1){const c=at(t,s,o);l[o]?l[o].p(c,e):(l[o]=ut(c),l[o].c(),l[o].m(n,null))}for(;o<l.length;o+=1)l[o].d(1);l.length=s.length}2&e&&b(n,"--animation",t[1]?"running":"paused")},i:t,o:t,d(t){t&&d(n),p(l,t),e[3](null)}}}function pt(t,e,n){let s,l=!1,o=new IntersectionObserver((t=>{t[0].isIntersecting&&n(1,l=!0)}),{rootMargin:"0px",threshold:1});return k((()=>{o.observe(s)})),[s,l,[{name:"Svelte",icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png"},{name:"TypeScript",icon:"https://creazilla-store.fra1.digitaloceanspaces.com/icons/3254474/typescript-icon-icon-md.png"},{name:"C++",icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png"},{name:"Java",icon:"https://cdn-icons-png.flaticon.com/512/226/226777.png"},{name:"Python",icon:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png"},{name:"Rust",icon:"http://rust-lang.org/logos/rust-logo-512x512.png"}],function(t){z[t?"unshift":"push"]((()=>{s=t,n(0,s)}))}]}class ft extends W{constructor(t){super(),V(this,t,pt,dt,o,{})}}function gt(e){let n,s;return{c(){n=f("img"),i(n.src,s=`${window.location.href}icons/mark neo.svg`)||$(n,"src",s),$(n,"alt","Website Icon"),b(n,"width",e[0]),b(n,"height",e[0])},m(t,e){u(t,n,e)},p(t,[e]){1&e&&b(n,"width",t[0]),1&e&&b(n,"height",t[0])},i:t,o:t,d(t){t&&d(n)}}}function ht(t,e,n){let{size:s}=e;return t.$$set=t=>{"size"in t&&n(0,s=t.size)},[s]}class mt extends W{constructor(t){super(),V(this,t,ht,gt,o,{size:0})}}function vt(e){let n,s,l,o,c,r;return{c(){n=g("svg"),s=g("rect"),l=g("path"),o=g("path"),c=g("path"),r=g("path"),$(s,"fill","#000000;"),$(s,"x","0"),$(s,"y","0"),$(s,"width","512"),$(s,"height","512"),$(l,"d","M 170.66667,50 V 462"),$(l,"class","svelte-prnngx"),$(o,"d","M 341.33333,50 V 461.99999"),$(o,"class","svelte-prnngx"),$(c,"d","M 50,170.66667 H 462"),$(c,"class","svelte-prnngx"),$(r,"d","M 60,341.33333 H 472"),$(r,"class","svelte-prnngx"),$(n,"width","512"),$(n,"height","512"),$(n,"viewBox","0 0 512 512"),b(n,"--size",e[0]),$(n,"class","svelte-prnngx")},m(t,e){u(t,n,e),a(n,s),a(n,l),a(n,o),a(n,c),a(n,r)},p(t,[e]){1&e&&b(n,"--size",t[0])},i:t,o:t,d(t){t&&d(n)}}}function Lt(t,e,n){let{size:s}=e;return t.$$set=t=>{"size"in t&&n(0,s=t.size)},[s]}class $t extends W{constructor(t){super(),V(this,t,Lt,vt,o,{size:0})}}function wt(t,e,n){const s=t.slice();return s[12]=e[n],s[14]=n,s}function bt(t){let e,n;return{c(){e=f("span"),$(e,"data-selected",n=t[14]===t[1]),$(e,"class","svelte-6kfkzd")},m(t,n){u(t,e,n)},p(t,s){2&s&&n!==(n=t[14]===t[1])&&$(e,"data-selected",n)},d(t){t&&d(e)}}}function yt(t){let e,n,l,o,c,r,i,g,v,b,x,k,C,z,M,_,T,q,A,E,I=t[2][t[1]].title+"",H=t[2][t[1]].desc+"",B=t[2],S=[];for(let e=0;e<B.length;e+=1)S[e]=bt(wt(t,B,e));var P=t[2][t[1]].icon;function j(t){return{props:{size:Tt?"3em":"7em"}}}return P&&(z=y(P,j())),{c(){e=f("main"),n=f("div");for(let t=0;t<S.length;t+=1)S[t].c();l=m(),o=f("div"),c=f("button"),c.textContent="<",r=m(),i=f("button"),i.textContent=">",g=m(),v=f("section"),b=f("h2"),x=h(I),k=m(),C=f("div"),z&&F(z.$$.fragment),M=m(),_=f("p"),T=h(H),$(n,"class","pos svelte-6kfkzd"),$(c,"class","svelte-6kfkzd"),$(i,"class","svelte-6kfkzd"),$(o,"class","nav svelte-6kfkzd"),$(b,"class","svelte-6kfkzd"),$(C,"class","icon-container svelte-6kfkzd"),$(_,"class","svelte-6kfkzd"),$(v,"class","svelte-6kfkzd"),$(e,"class","svelte-6kfkzd")},m(s,d){u(s,e,d),a(e,n);for(let t=0;t<S.length;t+=1)S[t].m(n,null);a(e,l),a(e,o),a(o,c),a(o,r),a(o,i),a(e,g),a(e,v),a(v,b),a(b,x),a(v,k),a(v,C),z&&Z(z,C,null),a(v,M),a(v,_),a(_,T),t[5](v),q=!0,A||(E=[L(c,"click",t[3]),L(i,"click",t[4])],A=!0)},p(t,[e]){if(2&e){let s;for(B=t[2],s=0;s<B.length;s+=1){const l=wt(t,B,s);S[s]?S[s].p(l,e):(S[s]=bt(l),S[s].c(),S[s].m(n,null))}for(;s<S.length;s+=1)S[s].d(1);S.length=B.length}if((!q||2&e)&&I!==(I=t[2][t[1]].title+"")&&w(x,I),P!==(P=t[2][t[1]].icon)){if(z){O={r:0,c:[],p:O};const t=z;D(t.$$.fragment,1,0,(()=>{G(t,1)})),O.r||s(O.c),O=O.p}P?(z=y(P,j()),F(z.$$.fragment),N(z.$$.fragment,1),Z(z,C,null)):z=null}(!q||2&e)&&H!==(H=t[2][t[1]].desc+"")&&w(T,H)},i(t){q||(z&&N(z.$$.fragment,t),q=!0)},o(t){z&&D(z.$$.fragment,t),q=!1},d(n){n&&d(e),p(S,n),z&&G(z),t[5](null),A=!1,s(E)}}}function xt(t,e,n){const s=[{icon:mt,title:"My website",desc:"This is the website you're currently on! Made with Svelte."},{icon:$t,title:"GravityWarp",desc:"A nice little shader playground. Shows how gravity distords space. (I'm not a physicist!)"}],l=t=>Math.pow(Math.cos((t-1)*Math.PI/2),4);let o,c=0,r={running:!1,start:null,duration:1e3};const i=()=>{r.running&&requestAnimationFrame(i),null==r.start&&(r.start=(new Date).getTime());let t=((new Date).getTime()-r.start)/r.duration;t>=1&&(t=1,r.running=!1),t=l(1-t),n(0,o.style.transform=`translateX(${-100*t*2+(t<.5?0:200)}%)`,o),t<=.5&&!r.callbackCalled&&null!=r.callback&&(r.callback(),r.callbackCalled=!0)},a=()=>{r.running&&requestAnimationFrame(a),null==r.start&&(r.start=(new Date).getTime());let t=((new Date).getTime()-r.start)/r.duration;t>=1&&(t=1,r.running=!1),t=l(t),n(0,o.style.transform=`translateX(${-100*t*2+(t<.5?0:200)}%)`,o),t>=.5&&!r.callbackCalled&&null!=r.callback&&(r.callback(),r.callbackCalled=!0)},u=(t,e)=>{r.running=!1,r.callback=null,r.callbackCalled=!1,r.start=null,r.callback=e,r.running=!0,requestAnimationFrame(t)};return[o,c,s,()=>{r.running||u(i,(()=>{n(1,0===c?c=s.length-1:c-=1)}))},()=>{r.running||u(a,(()=>{n(1,c=(c+1)%s.length)}))},function(t){z[t?"unshift":"push"]((()=>{o=t,n(0,o)}))}]}class kt extends W{constructor(t){super(),V(this,t,xt,yt,o,{})}}function Ct(e){let n,s,l,o,c,r,i,p,g,h,L,w,b,y,x,k,C,z,M,_,T,q;return w=new ft({}),M=new kt({}),{c(){n=f("main"),s=f("p"),s.textContent="Hi there! I'm Exedice. Glad to see you on my portfolio website!",l=m(),o=f("section"),o.innerHTML='<h2 class="svelte-1u5458d">About me</h2> \n        <p class="svelte-1u5458d">I&#39;m just a regular highschooler.</p> \n        <p class="svelte-1u5458d">I do a variety of different things: I&#39;m a <span class="trait svelte-1u5458d">programmer</span>,\n            I try to make <span class="trait svelte-1u5458d">music</span> and draw <span class="trait svelte-1u5458d">pixelart</span> sometimes.\n            I&#39;m not very good at it though.</p> \n        <p class="svelte-1u5458d">I probably have a impostor syndrome. <span class="small svelte-1u5458d">(now read the previous sentence again)</span></p> \n        <p class="svelte-1u5458d">I like math and chemistry. Maybe becoming a <span class="trait svelte-1u5458d">bioinformaticists?</span> Who knows?</p>',c=m(),r=f("section"),i=f("h2"),i.textContent="My programming knowledge",p=m(),g=f("div"),h=f("div"),h.innerHTML='<p class="svelte-1u5458d">Let&#39;s get back to programming, shall we?</p> \n                <p class="svelte-1u5458d">This is quite literally my stack!</p> \n                <p class="svelte-1u5458d">The most used tools are at the top.</p>',L=m(),F(w.$$.fragment),b=m(),y=f("div"),y.innerHTML='<p class="svelte-1u5458d">On top of that, I have also had some experience with\n                    <span class="trait svelte-1u5458d">Arduino</span> and <span class="trait svelte-1u5458d">Unity</span></p>',x=m(),k=f("section"),C=f("h2"),C.textContent="Projects I've worked on",z=m(),F(M.$$.fragment),_=m(),T=v(),$(s,"class","svelte-1u5458d"),$(o,"class","svelte-1u5458d"),$(i,"class","svelte-1u5458d"),$(g,"class","svelte-1u5458d"),$(r,"class","programming svelte-1u5458d"),$(C,"class","svelte-1u5458d"),$(k,"class","projects svelte-1u5458d"),$(n,"class","svelte-1u5458d")},m(t,d){u(t,n,d),a(n,s),e[1](s),a(n,l),a(n,o),e[2](o),a(n,c),a(n,r),a(r,i),a(r,p),a(r,g),a(g,h),a(g,L),Z(w,g,null),a(g,b),a(g,y),e[3](r),a(n,x),a(n,k),a(k,C),a(k,z),Z(M,k,null),e[4](k),u(t,_,d),u(t,T,d),q=!0},p:t,i(t){q||(N(w.$$.fragment,t),N(M.$$.fragment,t),q=!0)},o(t){D(w.$$.fragment,t),D(M.$$.fragment,t),q=!1},d(t){t&&d(n),e[1](null),e[2](null),G(w),e[3](null),G(M),e[4](null),t&&d(_),t&&d(T)}}}function zt(t,e,n){let s=new Array(4),l=new IntersectionObserver((t=>{const e=t[0];e.isIntersecting&&e.target.classList.add("animated")}),{rootMargin:"0px",threshold:0});return k((()=>{s.forEach((t=>{null!=t&&l.observe(t)}))})),[s,function(t){z[t?"unshift":"push"]((()=>{s[0]=t,n(0,s)}))},function(t){z[t?"unshift":"push"]((()=>{s[1]=t,n(0,s)}))},function(t){z[t?"unshift":"push"]((()=>{s[2]=t,n(0,s)}))},function(t){z[t?"unshift":"push"]((()=>{s[3]=t,n(0,s)}))}]}class Mt extends W{constructor(t){super(),V(this,t,zt,Ct,o,{})}}function _t(t){let e,n,s,l,o,c,r,i,p,g,h,v;return n=new K({}),l=new tt({}),r=new it({props:{parent:t[0]}}),p=new Mt({}),{c(){e=f("main"),F(n.$$.fragment),s=m(),F(l.$$.fragment),o=m(),c=f("div"),F(r.$$.fragment),i=m(),F(p.$$.fragment),g=m(),h=f("link"),$(c,"class","content svelte-1qesebf"),b(e,"--scrollbar-width",Tt?"0px":"16px"),$(e,"class","svelte-1qesebf"),$(h,"rel","icon"),$(h,"type","image/png"),$(h,"href",window.location.href+"/favicon.png")},m(d,f){u(d,e,f),Z(n,e,null),a(e,s),Z(l,e,null),a(e,o),a(e,c),Z(r,c,null),a(c,i),Z(p,c,null),t[1](c),u(d,g,f),a(document.head,h),v=!0},p(t,[e]){const n={};1&e&&(n.parent=t[0]),r.$set(n)},i(t){v||(N(n.$$.fragment,t),N(l.$$.fragment,t),N(r.$$.fragment,t),N(p.$$.fragment,t),v=!0)},o(t){D(n.$$.fragment,t),D(l.$$.fragment,t),D(r.$$.fragment,t),D(p.$$.fragment,t),v=!1},d(s){s&&d(e),G(n),G(l),G(r),G(p),t[1](null),s&&d(g),d(h)}}}const Tt=/Android|iPhone/i.test(navigator.userAgent);function qt(t,e,n){let s;return[s,function(t){z[t?"unshift":"push"]((()=>{s=t,n(0,s)}))}]}return new class extends W{constructor(t){super(),V(this,t,qt,_t,o,{})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map