
import { sendCardsToDom } from "./sendCardsToDom.js";



export const searchProducts = (categories) => {
    const input = document.querySelector("#searchInput");
    const categoryTitle = document.querySelector("#category");
  
    input.addEventListener("input", () => {
      const value = input.value.trim();
      sendCardsToDom(
        categories[categoryTitle.textContent].filter((item) => item.title.toLowerCase().includes(value.toLowerCase()))
      );
    });
  };