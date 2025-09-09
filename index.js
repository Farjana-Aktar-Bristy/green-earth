function removeCart(button) {
  console.log(button.parentElement.parentElement.querySelector(".cart-price"));
  document.getElementById("total-price").innerHTML =
    parseInt(document.getElementById("total-price").innerText) -
    parseInt(
      button.parentElement.parentElement.querySelector(".cart-price").innerText
    );
  button.parentElement.parentElement.remove();
}

function updateActiveButton(element) {
  const categoryElements = document.getElementsByClassName("category-item");
  for (const categoryElement of categoryElements) {
    categoryElement.classList.remove("bg-[#15803d]", "text-white");
  }
  document
    .getElementById("category-item-all")
    .classList.remove("bg-[#15803d]", "text-white");
  element.classList.remove("bg-[#dcfce7]");
  element.classList.add("bg-[#15803d]", "text-white");
}

function getAllTree(element) {
  updateActiveButton(element);
  updateTreeContainer("https://openapi.programming-hero.com/api/plants");
}

function showModal(event) {
  const plantId = event.target.getAttribute("data-plant-id");
  fetch("https://openapi.programming-hero.com/api/plant/" + plantId)
    .then((res) => res.json())
    .then((data) => {
      tree_details_modal.showModal();
      document.getElementById("card-image").src = data.plants.image;
      document.getElementById("card-title").innerText = data.plants.name;
      document.getElementById("card-description").innerText =
        data.plants.description;
      document.getElementById("card-category").innerText = data.plants.category;
      document.getElementById("card-price").innerText = "$" + data.plants.price;
      document
        .getElementById("add-to-cart-btn")
        .setAttribute("data-plant-id", data.plants.id);
    })
    .catch((error) => console.log(error));
}
updateTreeContainer("https://openapi.programming-hero.com/api/plants");

let categoryElement = `<div class="mb-2 py-1"><div onclick="getAllTree(this)" id="category-item-all" class="text-white border-0 drop-shadow-none w-full p-2 rounded-sm bg-[#15803d]" data-category-id="0">All Trees</div></div>`;
fetch("https://openapi.programming-hero.com/api/categories")
  .then((res) => res.json())
  .then((data) => {
    data.categories.map((category) => {
      categoryElement += `<div class="mb-2 py-1"><div class="category-item bg-[#dcfce7] border-0 drop-shadow-none  w-full p-2 rounded-sm" data-category-id="${category.id}">${category.category_name}</div></div>`;
    });
    document.getElementById("category-container").innerHTML = categoryElement;

    const categoryElements = document.getElementsByClassName("category-item");

    for (const categoryElement of categoryElements) {
      categoryElement.addEventListener("click", function (event) {
        updateActiveButton(event.target);
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
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("tree-container").classList.add("hidden");
  let treeElement = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.plants.map((plant) => {
        treeElement += `
            <div class="card bg-white shadow-sm p-3">
              <figure>
                <img
                data-plant-id="${plant.id}"
                onclick="showModal(event)"
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
                  <div class="price font-bold">$${plant.price}</div>
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
          fetch(
            "https://openapi.programming-hero.com/api/plant/" +
              cardButton.getAttribute("data-plant-id")
          )
            .then((res) => res.json())
            .then((data) => {
              document.getElementById("cart-container").innerHTML += `
              <div
              class="grid-cols-2 bg-[#F0FDF4] p-2 rounded-sm flex justify-between mb-1"
              >
              <div class="grid-rows-2">
                <div>${data.plants.name}</div>
                <div><span class="cart-price">${data.plants.price}</span> x 1</div>
              </div>
              <div class="remove-cart-btn flex justify-center items-center"><button onclick="removeCart(this)" class="btn btn-xs bg-[#F0FDF4] border-0"><i class="fa-solid fa-xmark"></i></button></div>
            </div>`;
              document.getElementById("total-price").innerHTML =
                parseInt(document.getElementById("total-price").innerText) +
                data.plants.price;
            })
            .catch((error) => console.log(error));
        });
      }

      document.getElementById("loader").classList.add("hidden");
      document.getElementById("tree-container").classList.remove("hidden");
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
