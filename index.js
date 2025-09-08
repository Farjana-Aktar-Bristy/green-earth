updateTreeContainer("https://openapi.programming-hero.com/api/plants");
let categoryElement = "";
fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((data) => {
    data.categories.map((category) => {
      categoryElement += `<div class="mb-2 py-1"><button class="category-item btn bg-[#dcfce7] border-0 drop-shadow-none" data-category-id="${category.id}">${category.category_name}</button></div>`;
    });
    document.getElementById("category-container").innerHTML = categoryElement;

    const categoryElements = document.getElementsByClassName("category-item");
    for (const categoryElement of categoryElements) {
      categoryElement.addEventListener("click", function (event) {
        updateTreeContainer(
          "https://openapi.programming-hero.com/api/category/" +
            categoryElement.getAttribute("data-category-id")
        );
      });
    }
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

function updateTreeContainer(url) {
  let treeElement = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.plants.map((plant) => {
        treeElement += `
            <div class="card bg-white shadow-sm p-3">
              <figure>
                <img
                class="w-full h-[200px] object-cover rounded-xl"
                  src="${plant.image}"
                  alt="tree"
                />
              </figure>
              <div>
                <h2 class="card-title">${plant.name}</h2>
                <p>
                  ${plant.description}
                </p>
                <div class="flex justify-between gap-3 my-2">
                  <div class="bg-[#dcfce7] rounded-xl px-2 py-1 text-sm">${plant.category}</div>
                  <div class="font-bold">$${plant.price}</div>
                </div>
                <div class="">
                  <button class="card-btn btn bg-[#15803d] w-full rounded-full" data-plant-id="${plant.id}">Add to Cart</button>
                </div>
              </div>
            </div>
        `;
      });

      document.getElementById("tree-container").innerHTML = treeElement;
      const cardBtns = document.getElementsByClassName("card-btn");
      for (const cardButton of cardBtns) {
        cardButton.addEventListener("click", function (event) {
          console.log("plant id " + cardButton.getAttribute("data-plant-id"));
          fetch(
            "https://openapi.programming-hero.com/api/plant/" +
              cardButton.getAttribute("data-plant-id")
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(document.getElementById("cart-container"));
              document.getElementById("cart-container").innerHTML += `<div
              class="grid-cols-2 bg-[#F0FDF4] p-2 rounded-sm flex justify-between mb-1"
            >
              <div class="grid-rows-2">
                <div>${data.plants.name}</div>
                <div>${data.plants.price} x 1</div>
              </div>
              <div>x</div>
            </div>`;
            })
            .catch((error) => console.log(error));
        });
      }
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
