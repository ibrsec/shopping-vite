import {
  sendCardsToDom,
  bringCategoryProducts,
  cardContainer,
  sendDetailstoModal,
  sendProductToCart,
} from "./sendCardsToDom.js";
import { createButtons } from "./createBtns.js";
import { searchProducts } from "./search.js";

const BASE_URL = "https://anthonyfs.pythonanywhere.com/api/products/";
let cartItems = [];
const cartField = document.querySelector("#offcanvasScrolling");


export const getAllDataApi = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (response.status === 200) {
      const jsonData = await response.json();
      console.log(jsonData);

      sendCardsToDom(jsonData);

      //extract the categories with products with adding ALL
      const categoriesWithProducts = {
        ALL: jsonData,
        ...[...jsonData].reduce((categories, product) => {
          const { category } = product;
          if (!categories[category]) {
            categories[category] = [];
          }
          categories[category].push(product);
          return categories;
        }, {}),
      };
      console.log("categoriesWithProducts :>> ", categoriesWithProducts);

      //create buttons with categories
      createButtons(categoriesWithProducts);

      //click category btns
      bringCategoryProducts(categoriesWithProducts, jsonData);

      //search with category
      searchProducts(categoriesWithProducts);

      //see details and add to cart btns events
      cardContainer.addEventListener("click", (e) => {
        if (e.target.id == "see-details-btn") {
          getOneProduct(e.target.getAttribute("data-card-id"));
        } else if (e.target.id == "addtocart-btn") {
          sendProductToCart(
            e.target.getAttribute("data-card-id"),
            jsonData,
            cartItems
          );
        calculateProducts();

          console.log(cartItems);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getOneProduct = async (id) => {
  try {
    const response = await fetch(BASE_URL + id);
    if (response.status === 200) {
      const jsonDataOne = await response.json();
      console.log(jsonDataOne);
      sendDetailstoModal(jsonDataOne);
    }
  } catch (error) {
    console.log(error);
  }
};

cartField.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-plus")) {
    e.target.previousElementSibling.textContent++;
    e.target.closest(".card-body").querySelector("#cart-item-quantity").textContent++;
    calculateProducts();
    
  } else if (e.target.classList.contains("fa-minus")) {
    if (e.target.nextElementSibling.textContent > 1) {
      e.target.nextElementSibling.textContent--;
      e.target.closest(".card-body").querySelector("#cart-item-quantity").textContent--;
      calculateProducts();

    }
  } else if (e.target.id == "remove-btn") {
    cartItems = cartItems.filter(
      (item) =>
        item.id != e.target.closest(".card").getAttribute("data-product-id")
    );
    e.target.closest(".card").remove();
    console.log(cartItems);
    calculateProducts();

  }
});


const calculateProducts = () => {
    const quantities = document.querySelectorAll("#cart-item-quantity");
    const prices = document.querySelectorAll("#cart-item-price");
    const totalPrices = [];
    quantities.forEach((item,i,array) => {
        const totalPrice = Number((Number(item.textContent) * Number(prices[i].textContent)).toFixed(2));
        totalPrices.push(totalPrice);
    })
    console.log(totalPrices);
    const totalPrice = totalPrices.reduce((sum,item) => sum + item, 0);
    const totalPriceElement = document.querySelector("#total-price");
    totalPriceElement.textContent = totalPrice.toFixed(2);

    

}