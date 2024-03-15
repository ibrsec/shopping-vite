(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function c(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=c(o);fetch(o.href,n)}})();const h=e=>{const t=document.querySelector("#searchInput"),c=document.querySelector("#category");t.addEventListener("input",()=>{const s=t.value.trim();i(e[c.textContent].filter(o=>o.title.toLowerCase().includes(s.toLowerCase())))})},p=document.querySelector("#products"),x=({id:e,image:t,title:c,description:s,price:o})=>{p.innerHTML+=`
    <div class="col"  id="${e}">
        <div class="card" >
        <img
            src="${t}"
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
            <button class="btn btn-danger" id="addtocart-btn" data-card-id="${e}">Sepete Ekle</button>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="see-details-btn" data-card-id="${e}">
                See Details
            </button>
        </div>
    </div>                              
  </div>
    `},i=e=>{p.textContent="",e.forEach(t=>{x(t)})},C=(e,t)=>{const c=document.querySelectorAll("#btns button"),s=document.querySelector("#category"),o=document.querySelector("#searchInput");c.forEach(n=>{n.addEventListener("click",()=>{n.textContent!="ALL"?i(e[n.textContent]):i(t),s.textContent=n.textContent,i(e[s.textContent].filter(r=>r.title.toLowerCase().includes(o.value.trim().toLowerCase())))})})},S=({title:e,image:t,description:c,price:s})=>{const o=document.getElementById("exampleModalLabel"),n=document.querySelector(".modal-body");o.textContent=e,n.innerHTML=`
            <div class="text-center">
                <img
                src="${t}"
                class="p-2"
                height="250px"
                alt="..."
                    />
                <div class="card-body my-3">
                <h5 class="">${e}</h5>
                <p class=" ">${c}</p>
                </div>
                <div
                class="w-100 fw-bold d-flex justify-content-center gap-3 "
                >
                <span>Price:</span><span>${s} $</span>
                </div>
            </div>
    `},w=(e,t,c)=>{const s=document.querySelector(".offcanvas-body"),o=document.querySelectorAll(".offcanvas-body .card"),n=document.querySelectorAll(" .offcanvas-body .card .card-title"),r=t.filter(l=>l.id==e)[0],{image:a,title:m,price:v}=r;if(o.length>0&&[...n].map(l=>l.textContent).some(l=>l==m)){alert("Already added to the cart");return}s.innerHTML+=`
      <div class="card mb-3" style="max-width: 540px" data-product-id="${e}">
          <div class="row g-0">
              <div class="col-md-4 my-auto">
                  <img
                  src="${a}"
                  class="img-fluid rounded-start"
                  alt="..."
                  />
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <h5 class="card-title">${m}</h5>
                      <div class="d-flex align-items-center gap-2" role="button">
                          <i
                          class="fa-solid fa-minus border rounded-circle bg-danger text-white p-2"
                          ></i
                          ><span class="fw-bold">1</span
                          ><i
                          class="fa-solid fa-plus border bg-danger text-white rounded-circle p-2"
                          ></i>
                      </div>
                      <p class="card-text">Total : <span id="cart-item-quantity">1</span> x <span id="cart-item-price">${v}</span> $</p>
                      <button class="btn btn-danger" id="remove-btn">Remove</button>
                  </div>
              </div>
          </div>
      </div>
      `,f(),c.push(r)},f=()=>{const e=document.querySelector("#sepet"),t=document.querySelectorAll(".offcanvas-body .card");t.length!=0;const c=t.length;e.textContent=c},L=e=>{const t=["btn-primary","btn-secondary","btn-success","btn-info","btn-warning","btn-danger"];let c=0;const o=Object.keys(e).map(r=>({text:r,style:t[c++]}));console.log("buttons :>> ",o);const n=document.querySelector("#btns");o.forEach(r=>{let a=document.createElement("button");a.textContent=r.text,a.classList.add("btn",r.style),n.appendChild(a)})},g=document.querySelector(".offcanvas-body"),y=e=>{localStorage.setItem("cart",g.innerHTML)},q=e=>{g.innerHTML=localStorage.getItem("cart")},E=()=>{document.querySelector("#offcanvasScrolling").addEventListener("click",t=>{if(t.target.classList.contains("fa-plus"))t.target.previousElementSibling.textContent++,t.target.closest(".card-body").querySelector("#cart-item-quantity").textContent++,d();else if(t.target.classList.contains("fa-minus"))t.target.nextElementSibling.textContent>1&&(t.target.nextElementSibling.textContent--,t.target.closest(".card-body").querySelector("#cart-item-quantity").textContent--,d());else if(t.target.id=="remove-btn"){const c=u.filter(s=>s.id!=t.target.closest(".card").getAttribute("data-product-id"));$(c),t.target.closest(".card").remove(),console.log(u),d(),f()}y()})},d=()=>{const e=document.querySelectorAll("#cart-item-quantity"),t=document.querySelectorAll("#cart-item-price"),c=[];e.forEach((n,r,a)=>{const m=Number((Number(n.textContent)*Number(t[r].textContent)).toFixed(2));c.push(m)}),console.log(c);const s=c.reduce((n,r)=>n+r,0),o=document.querySelector("#total-price");o.textContent=s.toFixed(2)},b="https://anthonyfs.pythonanywhere.com/api/products/";let u=[];const $=e=>{u=e},P=async()=>{try{const e=await fetch(b);if(e.status===200){const t=await e.json();console.log(t),i(t);const c={ALL:t,...[...t].reduce((s,o)=>{const{category:n}=o;return s[n]||(s[n]=[]),s[n].push(o),s},{})};console.log("categoriesWithProducts :>> ",c),L(c),C(c,t),h(c),p.addEventListener("click",s=>{s.target.id=="see-details-btn"?A(s.target.getAttribute("data-card-id")):s.target.id=="addtocart-btn"&&(w(s.target.getAttribute("data-card-id"),t,u),d(),y(),console.log(u))})}}catch(e){console.log(e)}},A=async e=>{try{const t=await fetch(b+e);if(t.status===200){const c=await t.json();console.log(c),S(c)}}catch(t){console.log(t)}};E();P();window.onload=()=>{q(),f(),d()};
