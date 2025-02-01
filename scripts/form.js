const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5,
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7,
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5,
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9,
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0,
  },
];

// Create select products
products_select = document.getElementById("productName");
products.forEach((product) => {
  const productSelect = document.createElement("option");

  productSelect.value = product.id;
  productSelect.innerHTML = product.name;

  products_select.appendChild(productSelect);
});

let currentCount = localStorage.getItem("reviewCount");

if (currentCount === null) {
  currentCount = 0;
}

currentCount++;

localStorage.setItem("reviewCount", currentCount);

document.getElementById("review_form").onsubmit = function(){};
