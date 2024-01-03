function convertToVND(number) {
  // Using toLocaleString to format the number as currency in VND
  number = parseInt(number);
  let vndFormatted = number.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  return vndFormatted.replace("₫", "VNĐ");
}

function handleClick(page) {
  let currentpage = parseInt($(page).attr("data-id"));
  renderData(currentpage);
}

function renderPagination(totalPage, currentPage) {
  let pages = '';

  for (let i = 1; i <= totalPage; i++) {
    if (i == currentPage) {
      pages += `<li class="page-item active" aria-current="page"><span class="page-link">${i}</span></li>`
    }
    else {
      pages += `<li class="page-item"><a data-id='${i}' class="page-link" style ="cursor: pointer" onclick="handleClick(this)">${i}</a></li>`;
    }
  }

  document.querySelector('#pagination').innerHTML = pages;
}

async function renderData(page = 1) {
  const res = await fetch(`/admin/statistics/stats4/${page}`, {
    method: "GET",
  });

  const response = await res.json();
  let context = '';
  for (let i = 0; i < response.data.length; i++) {
    context += ` <tr>
    <td>
      <div class="d-flex align-items-center justify-content-center">${i + 1}
      </div>
    </td>
    <td>
      <p class="fw-normal mb-1">${response.data[i].name}</p>
    </td>
    <td>
      <p>${convertToVND(response.data[i].price)}</p>
    </td>
    <td>
      <p>${response.data[i].quantity}</p>
    </td>
    <td>
      <div>
        <img src="${response.data[i].image}" alt="item" width="70" height="70" />
      </div>
    </td>
  </tr>`
  }
  renderPagination(response.totalPage, response.page)
  document.getElementById('stats4').innerHTML = context;
}

document.addEventListener("DOMContentLoaded", async function () {
  renderData(1);
})