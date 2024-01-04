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
      `/admin/orders/paging?page=${e.target.innerText}&search=${search.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    renderOrders(data);
  }
  buttons.forEach(function (button) {
    button.removeEventListener("click", clickHandler);
    button.addEventListener("click", clickHandler);
  });
}
document.addEventListener("DOMContentLoaded", pagingBtn);

function renderOrders(data) {
  const body = document.getElementById("orders-list");
  body.innerHTML = "";

  data.orders.forEach((order) => {
    const tr = `
      <tr>
        <th scope="row"><input class="form-check-input" type="checkbox"></th>
        <td>#${order.id_order}</td>
        <td>${order.user.name}</td>
        <td class="text-center">${order.order_date}</td>
        <td class="text-center"><span class="fw-bolder">${
          order.total_price
        }&#8363</span></td>
        <td class="text-center"><span class="fw-bolder">${
          order.payment ? "Paid" : "Pending"
        }</span></td>
        <td class="text-center">
          <button class="btn btn-xs btn-light detail-btn">
            <i class="fa-solid fa-angles-down" style="color: #a5d737;"></i>
          </button>
        </td>
      </tr>
    `;
    let items = ``;
    order.items.forEach((item) => {
      items += `
      <tr>
      <th
          scope="row">${item.index}</th>
      <td>
          <div>
              <h5
                  class="text-truncate font-size-14 mb-1">${item.name}</h5>
          </div>
      </td>
      <td class="text-center">${item.price}&#8363</td>
      <td class="text-center">${item.quantity}</td>
      <td
          class="text-end">${item.money}&#8363</td>
  </tr>
      `;
    });
    const detail = `
    <tr class="detail-row">
    <td colspan="7" class="detail-col">
        <div class="container-fluid detail-table">
            <div class="row">
                <div class="col-lg-12">
                    <div class="card border-0">
                        <div class="card-body">
                            <div
                                class="invoice-title">
                                <h4
                                    class="float-end font-size-15">Hóa
                                    đơn #${order.id_order}<span
                                        class="badge bg-success font-size-12 ms-2">${
                                          order.payment ? "Paid" : "Pending"
                                        }</span></h4>
                                <div class="mb-4">
                                    <h2
                                        class="mb-1 text-muted">HCMUS
                                        CANTEEN</h2>
                                </div>
                                <div
                                    class="text-muted">
                                    <p
                                        class="mb-1">227
                                        Đ. Nguyễn
                                        Văn Cừ,
                                        Phường 4,
                                        Quận 5,
                                        Thành phố Hồ
                                        Chí Minh</p>
                                    <p
                                        class="mb-1"><i
                                            class="uil uil-envelope-alt me-1"></i>
                                        canteen@hcmus.edu.vn</p>
                                    <p><i
                                            class="uil uil-phone me-1"></i>
                                        0123-456-789</p>
                                </div>
                            </div>

                            <hr class="my-4">
                            <div class="row">
                                <div
                                    class="col-sm-6">
                                    <div
                                        class="text-muted">
                                        <h5
                                            class="font-size-16 mb-3">Khách
                                            hàng</h5>
                                        <h5
                                            class="font-size-15 mb-2">${
                                              order.user.name
                                            }</h5>
                                        <p
                                            class="mb-1">${
                                              order.user.username
                                            }</p>
                                    </div>
                                </div>
                                <!-- end col -->
                                <div
                                    class="col-sm-6">
                                    <div
                                        class="text-muted text-sm-end">
                                        <div
                                            class="mt-4">
                                            <h5
                                                class="font-size-15 mb-1">Ngày
                                                mua</h5>
                                            <p>${order.order_date}</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- end col -->
                            </div>
                            <!-- end row -->

                            <div class="py-2">
                                <h5
                                    class="font-size-15">Đơn
                                    mua</h5>

                                <div
                                    class="table-responsive">
                                    <table
                                        class="table align-middle table-nowrap table-centered mb-0">
                                        <thead>
                                            <tr>
                                                <th
                                                    style="width: 70px;">No.</th>
                                                <th>Mặt
                                                    hàng</th>
                                                <th class="text-center">Giá</th>
                                                <th class="text-center">Số
                                                    lượng</th>
                                                <th
                                                    class="text-end"
                                                    style="width: 120px;">Giá
                                                    tiền</th>
                                            </tr>
                                        </thead><!-- end thead -->
                                        <tbody>
                                            ${items}
                                            <tr>
                                                <th
                                                    scope="row"
                                                    colspan="4"
                                                    class="text-end">Tổng
                                                    mua</th>
                                                <td
                                                    class="text-end">${
                                                      order.originPrice
                                                    }&#8363</td>
                                            </tr>
                                            <!-- end tr -->
                                            <tr>
                                                <th
                                                    scope="row"
                                                    colspan="4"
                                                    class="border-0 text-end">
                                                    Giảm
                                                    giá:</th>
                                                <td
                                                    class="border-0 text-end">-${
                                                      order.discount
                                                    }&#8363</td>
                                            </tr>
                                            <!-- end tr -->
                                            <tr>
                                                <th
                                                    scope="row"
                                                    colspan="4"
                                                    class="border-0 text-end">Thành
                                                    tiền</th>
                                                <td
                                                    class="border-0 text-end"><h4
                                                        class="m-0 fw-semibold">${
                                                          order.total_price
                                                        }&#8363</h4></td>
                                            </tr>
                                            <!-- end tr -->
                                        </tbody><!-- end tbody -->
                                    </table><!-- end table -->
                                </div><!-- end table responsive -->
                                <div
                                    class="d-print-none mt-4">
                                    <div
                                        class="float-end">
                                        <a
                                            href="javascript:window.print()"
                                            class="btn btn-success me-1"><i
                                                class="fa fa-print"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </td>
</tr>
    `;
    body.innerHTML += tr + "\n" + detail + "\n";
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
      `/admin/orders/paging?page=1&search=${search.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    renderOrders(data);
  }
});

var txt = document.getElementById("droptxt"),
  search = document.getElementById("searchtxt"),
  content = document.getElementById("content"),
  list = document.querySelectorAll('.content input[type="checkbox"]'),
  quantity = document.querySelectorAll(".quantity");

search.addEventListener("click", function () {
  content.classList.toggle("show");
});

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches(".list")) {
    if (content.classList.contains("show")) content.classList.remove("show");
  }
};

list.forEach(function (item, index) {
  item.addEventListener("click", function () {
    quantity[index].type = item.checked ? "number" : "hidden";
    calc();
  });
});

quantity.forEach(function (item) {
  item.addEventListener("input", calc);
});

function calc() {
  for (var i = 0, arr = []; i < list.length; i++) {
    if (list[i].checked) {
      arr.push(`<div>${quantity[i].value}x ${list[i].value}</div>`);
    }
  }

  txt.innerHTML = arr.join("\n");
}
