function showDetail() {
  var buttons = document.querySelectorAll(".detail-btn");

  function clickHandler() {
    var parentRow = this.closest("tr");
    var nextRow = parentRow.nextElementSibling;

    document.querySelectorAll(".detail-row").forEach(function (row) {
      if (row !== nextRow) {
        row.classList.remove("open");
      }
    });

    if (nextRow && nextRow.classList.contains("detail-row")) {
      nextRow.classList.toggle("open");
    }
  }

  buttons.forEach(function (button) {
    button.removeEventListener("click", clickHandler);
    button.addEventListener("click", clickHandler);
  });
}

document.addEventListener("DOMContentLoaded", showDetail);

function pagingBtn() {
  var buttons = document.querySelectorAll(".paging-btn");

  async function clickHandler(e) {
    e.preventDefault();
    const search = document.querySelector("#searchTxt");
    const response = await fetch(
      `/admin/products/paging?page=${e.target.innerText}&search=${search.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    renderProducts(data);
  }
  buttons.forEach(function (button) {
    button.removeEventListener("click", clickHandler);
    button.addEventListener("click", clickHandler);
  });
}
document.addEventListener("DOMContentLoaded", pagingBtn);

function renderProducts(data) {
  const body = document.getElementById("products-list");
  body.innerHTML = "";

  data.items.forEach((item) => {
    const tr = `
    <tr>
    <th scope="row"><input class="form-check-input" type="checkbox"></th>
    <td>${item.id_item}</td>
    <td>${item.name}</td>
    <td class="text-center">${item.cost}&#8363</td>
    <td class="text-center fw-bold">${item.price}&#8363</td>
    <td class="text-center">${item.discount}%</td>
    <td class="text-center">${item.quantity}</td>
    <td class="text-center">
      <button class="btn btn-xs btn-light detail-btn">
        <i class="fa-solid fa-angles-down" style="color: #a5d737;"></i>
      </button>
    </td>
  </tr>
  <tr class="detail-row">
    <td colspan="8" class="detail-col">
      <div class="container-fluid detail-table">
        <div class="row gap-5 p-3 mb-5 w-100 m-0">
          <div class="col-5 d-flex justify-content-between flex-column p-2 rounded-3">
            <div class="mb-5">
              <img src="img/user/logo.png" alt="HCMUS Canteen" width="300" />
            </div>
            <div>
              <img src="${
                item.image
              }" alt style="object-fit: cover;" width="400" />
            </div>
          </div>
          <div class="col-6">
            <div style="color: #88D49A;" class="fw-bold fs-4 mb-2">${
              item.name
            }</div>
            <hr />
            <div class="d-flex justify-content-between fw-bold fs-5">
              <p>Số lượng</p>
              <p>${item.quantity}</p>
            </div>
            <hr />
            <div class="row gap-3 align-items-center">
              <!--<div class="col-2 rounded-circle" style="background-color:#A7E8B7; width:50px; height:50px;">
              </div>
              <div class="col-10">Cơm gà
                là món ăn ngon, phù hợp
                với mọi người, tiện
                lợi cho các bữa ăn trong
                ngày.</div> -->

              <div class="col-2 rounded-circle" style="background-color:#A7E8B7; width:50px; height:50px;">
              </div>
              <div class="col-10">${
                item.describe
                  ? item.describe
                  : "Sản phẩm được chế biến từ nguyên liệu tươi ngon, nguồn gốc rõ ràng."
              }</div>

            </div>
            <hr />
            
            <div class="d-flex justify-content-between fw-bold fs-5 mb-3">
              <p>Giá</p>
              <p>${item.price} VNĐ</p>
            </div>
            <div class="d-flex justify-content-between fw-bold fs-5">
              <p>Giảm giá</p>
              <p>${item.discount}%</p>
            </div>
            <hr />
            <div class="d-flex justify-content-between fw-bold fs-5 mb-4">
              <p>Thành tiền</p>
              <p style="color: #5B9A6A;">${item.saleprice}
                VNĐ</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md text-end">
            <div class="hidden-sm hidden-xs btn-group">
              <button class="btn btn-xs btn-success">
                <i class="ace-icon fa fa-check bigger-120"></i>
              </button>

              <button class="btn btn-xs btn-info">
                <i class="ace-icon fa fa-pencil bigger-120"></i>
              </button>

              <button class="btn btn-xs btn-danger">
                <i class="ace-icon fa fa-trash bigger-120"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
    `;
    body.innerHTML += tr + "\n";
  });

  const pageList = document.getElementById("pages-list");
  pageList.innerHTML = ``;
  for (let i = 1; i < data.pages; i++) {
    pageList.innerHTML += `
    <li class="page-item"><a class="page-link paging-btn ${
      data.page == i ? "active" : ""
    }"
            href="#">${i}</a></li>
    `;
  }
  showDetail();
  pagingBtn();
}

const searchInput = document.querySelector("#searchTxt");
searchInput.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    const search = document.querySelector("#searchTxt");
    const response = await fetch(
      `/admin/products/paging?page=1&search=${search.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    renderProducts(data);
  }
});

function preview() {
  frame.src = URL.createObjectURL(event.target.files[0]);
}
function clearImage() {
  document.getElementById("formFile").value = null;
  frame.src = "";
}

async function addProduct() {
  try {
    var form = document.getElementById("addProductForm");
    var formData = new FormData(form);
    const values = {
      image: '',
      name: formData.get('name'),
      cost: formData.get('cost'),
      price: formData.get('price'),
      discount: formData.get('discount'),
      quantity: formData.get('quantity'),
      type: formData.get('type'),
      describe: formData.get('describe'),
    }
    console.log(values);
    const response = await fetch(form.action, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(values)
    });
      const data = await response.json();
      alert(data);
    
  } catch (error) {
    console.error("Error:", error);
  }
}
