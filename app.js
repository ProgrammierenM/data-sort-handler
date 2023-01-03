import dataSortHandler from "./dataSortHandler.js";

document.addEventListener(
  "DOMContentLoaded",
  dataSortHandler.init({
    sortContainer: "#products",
    sortElements: "div.product",
  })
);
