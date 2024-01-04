const loadAllCartItem = async () => {
  const data = await fetch("http://127.0.0.1:3000/user/my-cart-items");
  console.log(data);
};

const updateOrderDetail = function () {
  const foodItemEls = document.querySelectorAll(".food-item");
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
  document.querySelector(".final-price").textContent = `${
    totalPrice * (1 - discount / 100)
  } VNĐ`;

  document.querySelector(".selected-table").textContent =
    document.querySelector(".form-select-table").value;
};

document
  .querySelector(".form-select-table")
  .addEventListener("change", function (e) {
    console.log("hello");
    document.querySelector(".selected-table").textContent = e.target.value;
  });

window.addEventListener("load", async function () {
  await loadAllCartItem();
  updateOrderDetail();
});

document.querySelectorAll(".btn--down").forEach((el) =>
  el.addEventListener("click", function (e) {
    e.target.parentNode.parentNode
      .querySelector("input[type=number]")
      .stepDown();
  })
);

document.querySelectorAll(".btn--up").forEach((el) =>
  el.addEventListener("click", function (e) {
    e.target.parentNode.parentNode.querySelector("input[type=number]").stepUp();
  })
);

document
  .querySelectorAll(".btn--modify-amount")
  .forEach((el) => el.addEventListener("click", updateOrderDetail));

document
  .querySelectorAll("input[type=number]")
  .forEach((el) => el.addEventListener("change", updateOrderDetail));
//onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
