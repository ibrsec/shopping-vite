

import {getAllDataApi,getOneProduct,cartItems } from "./public/src/getAllDataApi.js";
import {getData} from "./public/src/localstorage.js";
import {getCartItemsCount} from "./public/src/sendCardsToDom.js";
import {calculateProducts} from "./public/src/cartCalculations.js";

getAllDataApi();


window.onload = () => {
  getData();
  getCartItemsCount();
  calculateProducts();

}