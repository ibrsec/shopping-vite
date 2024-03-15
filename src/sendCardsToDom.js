import { searchProducts } from "./search.js";



export const cardContainer = document.querySelector("#products");

 const sendEachCardToDom = ({id,image,title,description,price}) => {
    cardContainer.innerHTML += `
    <div class="col"  id="${id}">
        <div class="card" >
        <img
            src="${image}"
            class="p-2"
            height="250px"
            alt="..." /> 
        <div class="card-body">
            <h5 class="card-title line-clamp-1">${title}</h5>
            <p class="card-text line-clamp-3" style="
            overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 3; /* number of lines to show */
           line-clamp: 2;
   -webkit-box-orient: vertical;">${description}</p>
        </div>
        <div
            class="card-footer w-100 fw-bold d-flex justify-content-between gap-3">
            <span>Price:</span><span>${price} $</span>
        </div>
        <div class="card-footer w-100 d-flex justify-content-center gap-3">
            <button class="btn btn-danger" id="addtocart-btn" data-card-id="${id}">Sepete Ekle</button>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="see-details-btn" data-card-id="${id}">
                See Details
            </button>
        </div>
    </div>                              
  </div>
    `;

}


export const sendCardsToDom = (jsonData) => {
     //clear the ui before sending cards
     cardContainer.textContent = "";

     //send products to ui
     jsonData.forEach((product) => {
        sendEachCardToDom(product);
     });
}


export const bringCategoryProducts = (categories,jsonData) => {
    const categoryBtns = document.querySelectorAll("#btns button");
    const categoryTitle = document.querySelector("#category");
    const input = document.querySelector("#searchInput");

    categoryBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            if(btn.textContent != "ALL"){
                sendCardsToDom(categories[btn.textContent]);
            }else{
                sendCardsToDom(jsonData);
            }
            categoryTitle.textContent = btn.textContent;
            
            sendCardsToDom(
                categories[categoryTitle.textContent].filter((item) => item.title.toLowerCase().includes(input.value.trim().toLowerCase()))
              );

        })
    })
    
}



export const sendDetailstoModal = ({title,image,description,price}) => {
    const modalTitle = document.getElementById("exampleModalLabel");
    const modalBody = document.querySelector(".modal-body");

    modalTitle.textContent = title;
    modalBody.innerHTML = `
            <div class="text-center">
                <img
                src="${image}"
                class="p-2"
                height="250px"
                alt="..."
                    />
                <div class="card-body my-3">
                <h5 class="">${title}</h5>
                <p class=" ">${description}</p>
                </div>
                <div
                class="w-100 fw-bold d-flex justify-content-center gap-3 "
                >
                <span>Price:</span><span>${price} $</span>
                </div>
            </div>
    `

}

export const sendProductToCart = (id, jsonData,cartItems) => {
    const cartContainer = document.querySelector(".offcanvas-body");
    const productsInCart = document.querySelectorAll(".offcanvas-body .card");
    const cardTitles = document.querySelectorAll(" .offcanvas-body .card .card-title");
    const product = jsonData.filter((item) => item.id == id)[0];
    const { image, title, price } = product;
  if(productsInCart.length > 0){
      if([...cardTitles].map(item => item.textContent).some(item=> item == title)){
          alert("Already added to the cart")
          return;
      }
  }
    cartContainer.innerHTML += `
      <div class="card mb-3" style="max-width: 540px" data-product-id="${id}">
          <div class="row g-0">
              <div class="col-md-4 my-auto">
                  <img
                  src="${image}"
                  class="img-fluid rounded-start"
                  alt="..."
                  />
              </div>
              <div class="col-md-8">
                  <div class="card-body">
                      <h5 class="card-title">${title}</h5>
                      <div class="d-flex align-items-center gap-2" role="button">
                          <i
                          class="fa-solid fa-minus border rounded-circle bg-danger text-white p-2"
                          ></i
                          ><span class="fw-bold">1</span
                          ><i
                          class="fa-solid fa-plus border bg-danger text-white rounded-circle p-2"
                          ></i>
                      </div>
                      <p class="card-text">Total : <span id="cart-item-quantity">${1}</span> x <span id="cart-item-price">${price}</span> $</p>
                      <button class="btn btn-danger" id="remove-btn">Remove</button>
                  </div>
              </div>
          </div>
      </div>
      `;
  
      getCartItemsCount();

    cartItems.push(product);
  };

  export const getCartItemsCount = () => {
    const cartCount = document.querySelector("#sepet");
    const productsInCart = document.querySelectorAll(".offcanvas-body .card");
    if(productsInCart.length != 0){
    }
    const productCount = productsInCart.length ;
    cartCount.textContent = productCount;
  }