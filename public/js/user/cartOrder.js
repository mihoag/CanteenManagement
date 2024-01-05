const generateFoodItemMarkup = (food) => {
  return `
    <div class="food-item">
        <div
            class="row mb-4 d-flex justify-content-between align-items-center"
          >
            <div class="col-md-2" style="position: relative">
              <div class="heart-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="22"
                  viewBox="0 0 25 22"
                  fill="none"
                >
                  <path
                    d="M22.5738 1.49576C19.8981 -0.784512 15.9186 -0.374356 13.4625 2.15982L12.5006 3.15104L11.5387 2.15982C9.08751 -0.374356 5.10314 -0.784512 2.42736 1.49576C-0.639049 4.11295 -0.800182 8.81021 1.94396 11.6471L11.3922 21.403C12.0026 22.0329 12.9938 22.0329 13.6041 21.403L23.0524 11.6471C25.8014 8.81021 25.6402 4.11295 22.5738 1.49576Z"
                    fill="#D82015"
                  />
                </svg>
              </div>
              <img
                src="${food.image}"
                class="img-fluid rounded-3"
                alt="Image"
              />
            </div>
            <div class="col-md-3">
              <h6 class="text-muted">${food.type}</h6>
              <h6 class="text-black mb-0">${food.name}</h6>
            </div>
            <div class="col-md-3 gx-0 d-flex">
              <button
                class="btn btn-link px-2 btn--modify-amount btn--down"
              >
                <i class="fas fa-minus"></i>
              </button>

              <input
                id="form1"
                min="0"
                name="quantity"
                value="1"
                type="number"
                class="form-control form-control-sm"
              />

              <button
                class="btn btn-link px-2 btn--modify-amount btn--up"
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="col-md-3">
              <h6 class="mb-0 item-price">${food.saleprice} VNĐ</h6>
            </div>
            <div class="col-md-1 text-end">
              <a href="#!" class="text-muted btn--delete-item" data-item-id="${food.id_item}" data-cart-id="${food.id_cart}"><i
                  class="fas fa-times"
                ></i></a>
            </div>
          </div>
        <hr class="my-4" />
      </div>
  `;
};

const loadAllCartItem = async () => {
  try {
    const res = await fetch("/api/user/my-cart-items");
    // console.log(res);
    const data = await res.json();
    const foodCartContainer = document.querySelector(".food-cart-container");
    data.forEach((food) =>
      foodCartContainer.insertAdjacentHTML(
        "afterbegin",
        generateFoodItemMarkup(food)
      )
    );
  } catch (err) {
    console.error(err);
  }
};

const updateOrderDetail = function () {
  const foodItemEls = document.querySelectorAll(".food-item");
  // console.log(foodItemEls);
  const totalPrice = Array.from(foodItemEls)
    .map((el) => {
      return (
        Number.parseInt(el.querySelector("input[type=number]").value) *
        Number.parseInt(
          el.querySelector(".item-price").textContent.replaceAll(".", "")
        )
      );
    })
    .reduce((acc, cur) => acc + cur, 0);
  document.querySelector(".total-price").textContent = `${totalPrice} VNĐ`;

  const discount = Number.parseFloat(
    document.querySelector(".discount").textContent
  );
  document.querySelector(".final-price").textContent = `${totalPrice * (1 - discount / 100)
    } VNĐ`;

  document.querySelector(".selected-table").textContent =
    document.querySelector(".form-select-table").value;
};

const modifyItemAmount = function () {
  document.querySelectorAll(".btn--down").forEach((el) =>
    el.addEventListener("click", function (e) {
      e.target.parentNode.parentNode
        .querySelector("input[type=number]")
        .stepDown();
    })
  );

  document.querySelectorAll(".btn--up").forEach((el) =>
    el.addEventListener("click", function (e) {
      e.target.parentNode.parentNode
        .querySelector("input[type=number]")
        .stepUp();
    })
  );

  document
    .querySelectorAll(".btn--modify-amount")
    .forEach((el) => el.addEventListener("click", updateOrderDetail));

  document
    .querySelectorAll("input[type=number]")
    .forEach((el) => el.addEventListener("change", updateOrderDetail));

  document.querySelectorAll(".btn--delete-item").forEach((el) =>
    el.addEventListener("click", async function (e) {
      const data = {
        cartId: el.dataset.cartId,
        itemId: el.dataset.itemId,
      };
      await fetch("/api/user/item", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      e.target.closest(".food-item").remove();
      updateOrderDetail();
    })
  );
};

document
  .querySelector(".form-select-table")
  .addEventListener("change", function (e) {
    console.log("hello");
    document.querySelector(".selected-table").textContent = e.target.value;
  });

const tableSelected = () => {
  const result =
    document.querySelector(".form-select-table").value !== "Chọn bàn";
  return result;
};

const hasItemToPay = () => {
  const result =
    Number.parseInt(document.querySelector(".final-price").textContent) !== 0;
  return result;
};

window.addEventListener("load", async function () {
  await loadAllCartItem();
  updateOrderDetail();
  modifyItemAmount();

  document
    .querySelector(".btn--payment")
    .addEventListener("click", async function () {
      if (!hasItemToPay()) {
        alert("Quý khách xin vui lòng chọn món trước khi thanh toán");
        window.location.href = "/user/menu/";
        return;
      }
      if (!tableSelected()) {
        alert("Quý khách xin vui lòng chọn bàn");
        return;
      }

      const total_price = Number.parseInt(
        document.querySelector(".final-price").textContent
      );
      const item_ids = Array.from(
        document.querySelectorAll(".btn--delete-item")
      ).map((el) => el.dataset.itemId);
      const quantities = Array.from(
        document.querySelectorAll("input[type=number]")
      ).map((el) => Number.parseInt(el.value));

      quantities.shift();

      const res = await fetch("/api/user/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ total_price, item_ids, quantities }),
      });
      if (!res.ok) {
        const err = await res.json();
        if (err.isOperational) alert(err.errMsg);
      } else {
        alert("Thanh toán thành công");
      }

      // window.location.href = "http://127.0.0.1:3000/user/menu/";
    });
});
