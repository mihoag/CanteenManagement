//export excel file
function exportExcel() {
  if (response.rs.length <= 0) {
    alert("Không có dữ liệu");
    return;
  }
  const rows = response.rs.map(row => ({
    "Tên": row.name,
    "Ảnh": row.image,
    "Giá bán": row.saleprice,
    "Số lượng bán ra": row.quantity,
    "Loại": row.type
  }))
  const worksheet = XLSX.utils.json_to_sheet(rows);
  var wscols = [
    { wch: 30 },
    { wch: 80 },
    { wch: 10 },
    { wch: 20 },
    { wch: 10 }
  ];
  var wsrows = [
    { hpx: 30 },
  ];
  worksheet['!cols'] = wscols;
  worksheet['!rows'] = wsrows;

  for (i in worksheet) {
    if (typeof (worksheet[i]) != "object") continue;
    let cell = XLSX.utils.decode_cell(i);
    worksheet[i].s = {      // set the style for target cell
      font: {
        name: "Calibri",
        sz: 14,
      },
      border: {
        right: {
          style: "thin",
          color: "000000"
        },
        left: {
          style: "thin",
          color: "000000"
        },
        top: {
          style: "thin",
          color: "000000"
        },
        bottom: {
          style: "thin",
          color: "000000"
        },
      }
    };

    if (cell.r == 0) {
      worksheet[i].s.alignment = {
        horizontal: "center",
        vertical: "center",
      }
      worksheet[i].s.font = {
        name: "Calibri",
        sz: 16,
        color: { rgb: "FFFFFF" },
        bold: true
      }
    }
    else if (cell.c > 1) {
      worksheet[i].s.alignment = {
        horizontal: "center",
      }
    }
    if (cell.r % 2 == 0) { // every other row
      if (cell.r > 0) {
        worksheet[i].s.fill = { // background color
          patternType: "solid",
          fgColor: { rgb: "B6C4B6" },
          bgColor: { rgb: "B6C4B6" }
        }
      }
      else {
        worksheet[i].s.fill = { // background color
          patternType: "solid",
          fgColor: { rgb: "508D69" },
          bgColor: { rgb: "508D69" }
        };
      }
    }
  }

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Thống kê tiêu thụ");

  XLSX.writeFile(workbook, "Thống kê tiêu thụ.xlsx", { cellStyles: true });
}
// -----------------------------

var currentPage = 1;
var response;

async function DoughnutChart(options) {
  let labels = [];
  let dataSet = [];
  options = options.filter(option => option.type != 'Đồ uống')
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
          display: true, text: 'Top 10 món ăn bán chạy nhất', font: { size: 40 }
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
  currentpage = parseInt($(page).attr("data-id"));
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
  const res = await fetch(`/admin/statistics/stats2/${page}/${currentMonth + 1}/${currentYear + 2019}`, {
    method: "GET",
  });

  response = await res.json();

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
  currentPage = 1;
  renderData(1);
})

// Month filter
var Month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "All"]
var currentMonth = Month.length - 1;

function prevMonthClick() {
  currentMonth = (currentMonth - 1 + Month.length) % Month.length;
  document.getElementById('Month').innerText = Month[currentMonth];
  renderData(currentPage);
}

function nextMonthClick() {
  currentMonth = (currentMonth + 1) % Month.length;
  document.getElementById('Month').innerText = Month[currentMonth];
  renderData(currentPage);
}
// ------------------------

// Year filter  
var Year = ["2019", "2020", "2021", "2022", "2023", "2024", "All"]
var currentYear = Year.length - 1;

function prevYearClick() {
  currentYear = (currentYear - 1 + Year.length) % Year.length;
  document.getElementById('Year').innerText = Year[currentYear];
  renderData(currentPage);
}

function nextYearClick() {
  currentYear = (currentYear + 1) % Year.length;
  document.getElementById('Year').innerText = Year[currentYear];
  renderData(currentPage);
}
// ---------------------------------------