(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function c(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=c(o);fetch(o.href,n)}})();const g=t=>{const e=document.querySelector("#searchInput"),c=document.querySelector("#category");e.addEventListener("input",()=>{const s=e.value.trim();l(t[c.textContent].filter(o=>o.title.toLowerCase().includes(s.toLowerCase())))})},m=document.querySelector("#products"),v=({id:t,image:e,title:c,description:s,price:o})=>{m.innerHTML+=`
    <div class="col"  id="${t}">
        <div class="card" >
        <img
            src="${e}"
            class="p-2"
            height="250px"
            alt="..." /> 
        <div class="card-body">
            <h5 class="card-title line-clamp-1">${c}</h5>
            <p class="card-text line-clamp-3" style="
            overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 3; /* number of lines to show */
           line-clamp: 2;
   -webkit-box-orient: vertical;">${s}</p>
        </div>
        <div
            class="card-footer w-100 fw-bold d-flex justify-content-between gap-3">
            <span>Price:</span><span>${o} $</span>
        </div>
        <div class="card-footer w-100 d-flex justify-content-center gap-3">
            <button class="btn btn-danger" id="addtocart-btn" data-card-id="${t}">Sepete Ekle</button>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="see-details-btn" data-card-id="${t}">
                See Details
            </button>
        </div>
    </div>                              
  </div>
    `},l=t=>{m.textContent="",t.forEach(e=>{v(e)})},h=(t,e)=>{const c=document.querySelectorAll("#btns button"),s=document.querySelector("#category"),o=document.querySelector("#searchInput");c.forEach(n=>{n.addEventListener("click",()=>{n.textContent!="ALL"?l(t[n.textContent]):l(e),s.textContent=n.textContent,l(t[s.textContent].filter(r=>r.title.toLowerCase().includes(o.value.trim().toLowerCase())))})})},x=({title:t,image:e,description:c,price:s})=>{const o=document.getElementById("exampleModalLabel"),n=document.querySelector(".modal-body");o.textContent=t,n.innerHTML=`
            <div class="text-center">
                <img
                src="${e}"
                class="p-2"
                height="250px"
                alt="..."
                    />
                <div class="card-body my-3">
                <h5 class="">${t}</h5>
                <p class=" ">${c}</p>
                </div>
                <div
                class="w-100 fw-bold d-flex justify-content-center gap-3 "
                >
                <span>Price:</span><span>${s} $</span>
                </div>
            </div>
    `},C=(t,e,c)=>{const s=document.querySelector(".offcanvas-body"),o=document.querySelectorAll(".offcanvas-body .card");document.querySelectorAll(" .offcanvas-body .card .card-title");const n=e.filter(i=>i.id==t)[0],{image:r,title:a,price:p}=n;if(c.length>0&&c.map(i=>i.title).some(i=>i==a)){alert("Already added to the cart");return}s.innerHTML+=`
      <div class="card mb-3" style="max-width: 540px" data-product-id="${t}">
          <div class="row g-0">
              <div class="col-md-4 my-auto">
                  <img
                  src="${r}"
                  class="img-fluid rounded-start"
                  alt="..."
                  />
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <h5 class="card-title">${a}</h5>
                      <div class="d-flex align-items-center gap-2" role="button">
                          <i
                          class="fa-solid fa-minus border rounded-circle bg-danger text-white p-2"
                          ></i
                          ><span class="fw-bold">1</span
                          ><i
                          class="fa-solid fa-plus border bg-danger text-white rounded-circle p-2"
                          ></i>
                      </div>
                      <p class="card-text">Total : <span id="cart-item-quantity">1</span> x <span id="cart-item-price">${p}</span> $</p>
                      <button class="btn btn-danger" id="remove-btn">Remove</button>
                  </div>
              </div>
          </div>
      </div>
      `;const b=document.querySelector("#sepet"),y=o.length+1;b.textContent=y,c.push(n)},w=t=>{const e=["btn-primary","btn-secondary","btn-success","btn-info","btn-warning","btn-danger"];let c=0;const o=Object.keys(t).map(r=>({text:r,style:e[c++]}));console.log("buttons :>> ",o);const n=document.querySelector("#btns");o.forEach(r=>{let a=document.createElement("button");a.textContent=r.text,a.classList.add("btn",r.style),n.appendChild(a)})},f="https://anthonyfs.pythonanywhere.com/api/products/";let d=[];const S=document.querySelector("#offcanvasScrolling"),L=async()=>{try{const t=await fetch(f);if(t.status===200){const e=await t.json();console.log(e),l(e);const c={ALL:e,...[...e].reduce((s,o)=>{const{category:n}=o;return s[n]||(s[n]=[]),s[n].push(o),s},{})};console.log("categoriesWithProducts :>> ",c),w(c),h(c,e),g(c),m.addEventListener("click",s=>{s.target.id=="see-details-btn"?q(s.target.getAttribute("data-card-id")):s.target.id=="addtocart-btn"&&(C(s.target.getAttribute("data-card-id"),e,d),u(),console.log(d))})}}catch(t){console.log(t)}},q=async t=>{try{const e=await fetch(f+t);if(e.status===200){const c=await e.json();console.log(c),x(c)}}catch(e){console.log(e)}};S.addEventListener("click",t=>{t.target.classList.contains("fa-plus")?(t.target.previousElementSibling.textContent++,t.target.closest(".card-body").querySelector("#cart-item-quantity").textContent++,u()):t.target.classList.contains("fa-minus")?t.target.nextElementSibling.textContent>1&&(t.target.nextElementSibling.textContent--,t.target.closest(".card-body").querySelector("#cart-item-quantity").textContent--,u()):t.target.id=="remove-btn"&&(d=d.filter(e=>e.id!=t.target.closest(".card").getAttribute("data-product-id")),t.target.closest(".card").remove(),console.log(d),u())});const u=()=>{const t=document.querySelectorAll("#cart-item-quantity"),e=document.querySelectorAll("#cart-item-price"),c=[];t.forEach((n,r,a)=>{const p=Number((Number(n.textContent)*Number(e[r].textContent)).toFixed(2));c.push(p)}),console.log(c);const s=c.reduce((n,r)=>n+r,0),o=document.querySelector("#total-price");o.textContent=s.toFixed(2)};L();
