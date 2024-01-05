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
        <div class="container-fluid detail-table" id=${item.id_item}>
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
                <div class="col-2 rounded-circle" style="background-color:#A7E8B7; width:50px; height:50px;">
                </div>
                <div class="col-10">${
                  item.describe
                    ? item.describe
                    : "Sản phẩm được chế biến từ nguyên liệu tươi ngon, nguồn gốc rõ ràng."
                }</div>
              </div>
              <hr />
              <div class="d-flex justify-content-between fw-bold fs-5">
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
                <p style="color: #5B9A6A;">${item.saleprice} VNĐ</p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md text-end">
              <div class="hidden-sm hidden-xs btn-group save-btn">
                <button class="btn btn-xs btn-info edit-btn">
                  <i class="ace-icon fa fa-pencil bigger-120"></i>
                </button>
                <button class="btn btn-xs btn-danger delete-btn">
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
  for (let i = 1; i <= data.pages; i++) {
    pageList.innerHTML += `
    <li class="page-item"><a class="page-link paging-btn ${
      data.page == i ? "active" : ""
    }" href="#">${i}</a></li>
    `;
  }
  showDetail();
  pagingBtn();
  addEventEditButton();
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
  const frame = document.querySelector("#frame");
  frame.src = URL.createObjectURL(event.target.files[0]);
}

function preview2() {
  const frame = document.querySelector("#frame2");
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
    const imageFile = document.getElementById("formFile");
    const file = imageFile.files[0];
    const values = new FormData();

    // Append the image file to the FormData
    values.append("image", file);

    // Iterate over the form data entries and set them in the new FormData object
    for (const [field, value] of formData.entries()) {
      values.set(field, value);
    }
    const response = await fetch(form.action, {
      method: "POST",
      body: values,
    });
    const data = await response.json();
    alert(data);
    if(response.ok){
      window.location.reload();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

document.addEventListener("DOMContentLoaded", addEventEditButton);

function addEventEditButton() {
  var editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.removeEventListener("click", turnOnEditMode);
    button.addEventListener("click", turnOnEditMode);
  });
}

async function getProductData(id_item) {
  try {
    const response = await fetch(
      `/admin/products/get-product?id_item=${id_item}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "GET",
      }
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }

  } catch (error) {
    console.log(error);
  }
}

async function turnOnEditMode(e) {
  var detailTable = this.closest(".detail-table");
  const item = await getProductData(detailTable.id);
  if (!item) {
    alert("Error network");
    return;
  }
  detailTable.innerHTML = `
  <form id="updateProductForm" action="/admin/products/update" method="POST" style="height: 100%;">
    <div class="row" style="height: 100%;">
      <div class="col-md-5">
        <div class="row" style="height: 70%;">
          <img id="frame2" src="${
            item.image
          }" class="img-fluid" style="max-width: 400px;" />
        </div>
        <div class="row mt-5">
          <input
            class="form-control-file border"
            accept="image/*"
            type="file"
            id="formFile2"
            onchange="preview2()"
          />
        </div>
      </div>
      <div class="col-md-7">
        <div class="form-group mt-2">
          <input type="hidden" class="form-control" name="id_item" value="${
            item.id_item
          }"/>
          <input type="hidden" class="form-control" name="oldimage" value="${
            item.image
          }"/>
        <div class="form-group mt-2">
          <label for="name">Tên mặt hàng</label>
          <input type="text" class="form-control" name="name" placeholder="Nhập tên mặt hàng" value="${
            item.name
          }"/>
        </div>
        <div class="form-group mt-2">
          <label for="cost">Giá gốc</label>
          <input
            type="number"
            class="form-control"
            name="cost"
            placeholder="Nhập giá gốc mặt hàng"
            value="${item.cost}"
            required
          />
        </div>
        <div class="form-group mt-2">
          <label for="price">Giá bán</label>
          <input
            type="number"
            class="form-control"
            name="price"
            placeholder="Nhập giá bán mặt hàng"
            value="${item.price}"
            required
          />
        </div>
        <div class="form-group mt-2">
          <label for="discount">Giảm giá</label>
          <input
            type="number"
            class="form-control"
            name="discount"
            placeholder="Nhập % giảm giá"
            value="${item.discount}"
            required
          />
        </div>
        <div class="form-group mt-2">
          <label for="quantity">Số lượng</label>
          <input type="number" class="form-control" name="quantity" placeholder="Nhập số lượng" value="${
            item.quantity
          }" required />
        </div>
        <div class="form-group mt-2">
          <label for="type">Loại</label>
          <select name="type" id="type" required>
            <option value="Món ăn" ${
              item.type == "Món ăn" ? "selected" : ""
            }>Món ăn</option>
            <option value="Đồ uống" ${
              item.type == "Đồ uống" ? "selected" : ""
            }>Đồ uống</option>
          </select>
        </div>
        <div class="form-group mt-2">
          <label for="detail">Mô tả</label>
          <textarea class="form-control" name="describe" rows="2" placeholder="Nhập mô tả" value="${
            item.describe
          }"></textarea>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md text-end p-0">
        <div class="hidden-sm hidden-xs btn-group">
          <button type="button" class="btn btn-xs btn-success save-btn" onclick="updateProduct()">
            <i class="ace-icon fa fa-check bigger-120"></i>
          </button>
          <button type="button" class="btn btn-xs btn-info cancel-btn">
            <i class="fa-solid fa-xmark bigger-120"></i>
          </button>
        </div>
      </div>
    </div>
  </form>
  `;
  addEventCancelButton();
}

function addEventCancelButton() {
  var cancelButtons = document.querySelectorAll(".cancel-btn");
  cancelButtons.forEach((button) => {
    button.removeEventListener("click", turnOffEditMode);
    button.addEventListener("click", turnOffEditMode);
  });
}

async function turnOffEditMode(e) {
  var detailTable = this.closest(".detail-table");
  const item = await getProductData(detailTable.id);

  if (!item) {
    alert("Error network");
    return;
  }

  detailTable.innerHTML = `
    <div class="row gap-5 p-3 w-100 m-0">
      <div class="col-5 d-flex justify-content-between flex-column p-2 rounded-3">
        <div>
          <img src="${item.image}" alt style="object-fit: cover;" width="400" />
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
          <div class="col-2 rounded-circle" style="background-color:#A7E8B7; width:50px; height:50px;">
          </div>
          <div class="col-10">${
            item.describe
              ? item.describe
              : "Sản phẩm được chế biến từ nguyên liệu tươi ngon, nguồn gốc rõ ràng"
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
          <p style="color: #5B9A6A;">${item.saleprice} VNĐ</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md text-end">
        <div class="hidden-sm hidden-xs btn-group">
          <button class="btn btn-xs btn-info edit-btn">
            <i class="ace-icon fa fa-pencil bigger-120"></i>
          </button>
          <button class="btn btn-xs btn-danger delete-btn">
            <i class="ace-icon fa fa-trash bigger-120"></i>
          </button>
        </div>
      </div>
    </div>
  `;
  addEventEditButton();
}

async function updateProduct() {
  try {
    var form = document.getElementById("updateProductForm");
    var formData = new FormData(form);
    const imageFile = document.getElementById("formFile2");
    const file = imageFile.files[0];
    const values = new FormData();

    // Append the image file to the FormData
    values.append("image", file);

    // Iterate over the form data entries and set them in the new FormData object
    for (const [field, value] of formData.entries()) {
      values.set(field, value);
    }
    const response = await fetch("/admin/products/update", {
      method: "POST",
      body: values,
    });
    const data = await response.json();
    alert(data);
    if(response.status === 200) {
      document.querySelector('.cancel-btn').dispatchEvent(new Event('click'));
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
