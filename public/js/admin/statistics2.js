
async function DoughnutChart(options) {
  let labels = [];
  let dataSet = [];
  options.sort(function (a, b) { return b.quantity - a.quantity });
  for (let i = 0; i < Math.min(options.length, 10); i++) {
    labels.push(options[i].name);
    dataSet.push(options[i].quantity);
  }
  const data = {
    labels,
    datasets: [{
      label: 'Số lượng bán ra',
      data: dataSet,
      backgroundColor: [
        'rgb(255, 99, 132)', '#0C356A',
        '#A2FF86', '#FF9800',
        '#52D3D8', '#38419D',
        '#304D30', "#6C5F5B",
        "#FE0000", '#6B240C'
      ],
      hoverOffset: 4
    }]
  };

  const ctx = document.getElementById('myPieChart');
  new Chart(ctx, {
    type: 'pie',
    data,
    options: {
      plugins: {
        title: {
          display: true, text: 'Top 10 sản phẩm bán chạy nhất', font: { size: 40 }
        }
      }
    }
  });
}

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
  const res = await fetch(`/admin/statistics/stats2/${page}`, {
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
      <p>${convertToVND(response.data[i].saleprice)}</p>
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
  document.getElementById('stats2').innerHTML = context;
  DoughnutChart(response.rs);
}

document.addEventListener("DOMContentLoaded", async function () {
  renderData(1);
})