if(!self.define){let i,l={};const n=(n,o)=>(n=new URL(n+".js",o).href,l[n]||new Promise((l=>{if("document"in self){const i=document.createElement("script");i.src=n,i.onload=l,document.head.appendChild(i)}else i=n,importScripts(n),l()})).then((()=>{let i=l[n];if(!i)throw new Error(`Module ${n} didn’t register its module`);return i})));self.define=(o,u)=>{const e=i||("document"in self?document.currentScript.src:"")||location.href;if(l[e])return;let s={};const r=i=>n(i,e),c={module:{uri:e},exports:s,require:r};l[e]=Promise.all(o.map((i=>c[i]||r(i)))).then((i=>(u(...i),s)))}}define(["./workbox-6567b62a"],(function(i){"use strict";i.setCacheNameDetails({prefix:"quick_flow"}),self.addEventListener("message",(i=>{i.data&&"SKIP_WAITING"===i.data.type&&self.skipWaiting()})),i.precacheAndRoute([{url:"/quickflow/css/app.b5a4c309.css",revision:null},{url:"/quickflow/img/bistecTacos.18d31a8e.png",revision:null},{url:"/quickflow/img/carnitasQuesadilla.d0588307.png",revision:null},{url:"/quickflow/img/desechables-min.5fdbb526.png",revision:null},{url:"/quickflow/img/gorditaChicharron.fd635084.png",revision:null},{url:"/quickflow/img/gorditas-min.301c0204.png",revision:null},{url:"/quickflow/img/gorditasChicharronCarnitas.9cacf38e.png",revision:null},{url:"/quickflow/img/peso.0a5aacae.png",revision:null},{url:"/quickflow/img/quesadillaSimple.4af6a0d6.png",revision:null},{url:"/quickflow/img/quesito.9bc2a187.png",revision:null},{url:"/quickflow/img/taquito.44a65fb3.png",revision:null},{url:"/quickflow/img/torta.9beb7ba3.png",revision:null},{url:"/quickflow/img/tortasimple.a64b5820.png",revision:null},{url:"/quickflow/img/vidrio-min.7d8e16b1.png",revision:null},{url:"/quickflow/index.html",revision:"a0c54918717482c25f2b98ffcbbc7df9"},{url:"/quickflow/js/456.7f71bad3.js",revision:null},{url:"/quickflow/js/about.f63c0f0b.js",revision:null},{url:"/quickflow/js/app.20c1bdce.js",revision:null},{url:"/quickflow/js/chunk-vendors.276024da.js",revision:null},{url:"/quickflow/js/history.1929898b.js",revision:null},{url:"/quickflow/js/sales.d31e5620.js",revision:null},{url:"/quickflow/js/settings.441fd03d.js",revision:null},{url:"/quickflow/manifest.json",revision:"74611ec84428713d5e0f14996e4afb64"},{url:"/quickflow/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
