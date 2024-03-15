import {
  sendCardsToDom,
  bringCategoryProducts,
  cardContainer,
  sendDetailstoModal,
  sendProductToCart,
} from "./sendCardsToDom.js";
import { createButtons } from "./createBtns.js";
import { searchProducts } from "./search.js";
import { cartFieldEvent, calculateProducts } from "./cartCalculations.js";
import { saveData } from "./localstorage.js";

const BASE_URL = "https://anthonyfs.pythonanywhere.com/api/products/";
export let cartItems = [];
export const setCartItems = (array) => {
    cartItems = array;
}

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
        saveData();
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

cartFieldEvent();