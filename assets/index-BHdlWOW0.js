(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const x=e=>{const t=document.querySelector("#searchInput"),s=document.querySelector("#category");t.addEventListener("input",()=>{const c=t.value.trim();i(e[s.textContent].filter(o=>o.title.toLowerCase().includes(c.toLowerCase())))})},p=document.querySelector("#products"),h=({id:e,image:t,title:s,description:c,price:o})=>{p.innerHTML+=`
    <div class="col"  id="${e}">
        <div class="card" >
        <img
            src="${t}"
            class="p-2"
            height="250px"
            alt="..." /> 
        <div class="card-body">
            <h5 class="card-title line-clamp-1">${s}</h5>
            <p class="card-text line-clamp-3" style="
            overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 3; /* number of lines to show */
           line-clamp: 2;
   -webkit-box-orient: vertical;">${c}</p>
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
    `},i=e=>{p.textContent="",e.forEach(t=>{h(t)})},C=(e,t)=>{const s=document.querySelectorAll("#btns button"),c=document.querySelector("#category"),o=document.querySelector("#searchInput");s.forEach(n=>{n.addEventListener("click",()=>{n.textContent!="ALL"?i(e[n.textContent]):i(t),c.textContent=n.textContent,i(e[c.textContent].filter(a=>a.title.toLowerCase().includes(o.value.trim().toLowerCase())))})})},L=({title:e,image:t,description:s,price:c})=>{const o=document.getElementById("exampleModalLabel"),n=document.querySelector(".modal-body");o.textContent=e,n.innerHTML=`
            <div class="text-center">
                <img
                src="${t}"
                class="p-2"
                height="250px"
                alt="..."
                    />
                <div class="card-body my-3">
                <h5 class="">${e}</h5>
                <p class=" ">${s}</p>
                </div>
                <div
                class="w-100 fw-bold d-flex justify-content-center gap-3 "
                >
                <span>Price:</span><span>${c} $</span>
                </div>
            </div>
    `},S=()=>{const e=document.getElementById("exampleModalLabel"),t=document.querySelector(".modal-body");e.textContent="Loading...",t.innerHTML=`
    <div class="text-center">
                <div class="spinner-border text-info" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-info mx-3" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div class="spinner-border text-info" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                </div>
    `},w=(e,t,s)=>{const c=document.querySelector(".offcanvas-body"),o=document.querySelectorAll(".offcanvas-body .card"),n=document.querySelectorAll(" .offcanvas-body .card .card-title"),a=t.filter(l=>l.id==e)[0],{image:r,title:m,price:v}=a;if(o.length>0&&[...n].map(l=>l.textContent).some(l=>l==m)){alert("Already added to the cart");return}c.innerHTML+=`
      <div class="card mb-3" style="max-width: 540px" data-product-id="${e}">
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
                      <h5 class="card-title">${m}</h5>
                      <div class="d-flex align-items-center gap-2" role="button">
                          <i
                          class="fa-solid fa-minus border rounded-circle  text-white p-2"
                          style="background-color:var(--color-2)"
                          ></i
                          ><span class="fw-bold">1</span
                          ><i
                          class="fa-solid fa-plus border  text-white rounded-circle p-2"
                          style="background-color:var(--color-2)"

                          ></i>
                      </div>
                      <p class="card-text">Total : <span id="cart-item-quantity">1</span> x <span id="cart-item-price">${v}</span> $</p>
                      <button class="btn btn-danger" id="remove-btn">Remove</button>
                  </div>
              </div>
          </div>
      </div>
      `,f(),s.push(a)},f=()=>{const e=document.querySelector("#sepet"),t=document.querySelectorAll(".offcanvas-body .card");t.length!=0;const s=t.length;e.textContent=s},q=e=>{const t=["btn-primary","btn-secondary","btn-success","btn-info","btn-warning","btn-danger"];let s=0;const o=Object.keys(e).map(a=>({text:a,style:t[s++]}));console.log("buttons :>> ",o);const n=document.querySelector("#btns");o.forEach(a=>{let r=document.createElement("button");r.textContent=a.text,r.classList.add("btn",a.style),n.appendChild(r)})},y=document.querySelector(".offcanvas-body"),g=e=>{localStorage.setItem("cart",y.innerHTML)},E=e=>{y.innerHTML=localStorage.getItem("cart")},$=()=>{document.querySelector("#offcanvasScrolling").addEventListener("click",t=>{if(t.target.classList.contains("fa-plus"))t.target.previousElementSibling.textContent++,t.target.closest(".card-body").querySelector("#cart-item-quantity").textContent++,d();else if(t.target.classList.contains("fa-minus"))t.target.nextElementSibling.textContent>1&&(t.target.nextElementSibling.textContent--,t.target.closest(".card-body").querySelector("#cart-item-quantity").textContent--,d());else if(t.target.id=="remove-btn"){const s=u.filter(c=>c.id!=t.target.closest(".card").getAttribute("data-product-id"));P(s),t.target.closest(".card").remove(),console.log(u),d(),f()}g()})},d=()=>{const e=document.querySelectorAll("#cart-item-quantity"),t=document.querySelectorAll("#cart-item-price"),s=[];e.forEach((n,a,r)=>{const m=Number((Number(n.textContent)*Number(t[a].textContent)).toFixed(2));s.push(m)}),console.log(s);const c=s.reduce((n,a)=>n+a,0),o=document.querySelector("#total-price");o.textContent=c.toFixed(2)},b="https://anthonyfs.pythonanywhere.com/api/products/";let u=[];const P=e=>{u=e},T=async()=>{try{const e=await fetch(b);if(e.status===200){const t=await e.json();console.log(t),i(t);const s={ALL:t,...[...t].reduce((c,o)=>{const{category:n}=o;return c[n]||(c[n]=[]),c[n].push(o),c},{})};console.log("categoriesWithProducts :>> ",s),q(s),C(s,t),x(s),p.addEventListener("click",c=>{c.target.id=="see-details-btn"?(S(),A(c.target.getAttribute("data-card-id"))):c.target.id=="addtocart-btn"&&(w(c.target.getAttribute("data-card-id"),t,u),d(),g(),console.log(u))})}}catch(e){console.log(e)}},A=async e=>{try{const t=await fetch(b+e);if(t.status===200){const s=await t.json();console.log(s),L(s)}}catch(t){console.log(t)}};$();T();window.onload=()=>{E(),f(),d()};
