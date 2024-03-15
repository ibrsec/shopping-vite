

const cart = document.querySelector(".offcanvas-body");
export const saveData = (cartItems) => {

    localStorage.setItem("cart",cart.innerHTML);
}
export const getData = (cartItems) => {
    cart.innerHTML = localStorage.getItem("cart");
}