function LineChart(options) {
  let daySet = [];
  let dataSet = [];

  for (let i = 0; i <= 6; i++) {
    let lastday = new Date(
      options.today.setDate(options.today.getDate() - options.today.getDay() + i),
    );
    daySet.push(lastday.getDate());
    dataSet.push(0);
  }
  console.log(options.data);
  for (let i = 0; i < options.data.length; i++)
    dataSet[daySet.indexOf(parseInt(options.data[i].day))] = options.data[i].sum

  const data = {
    labels: [
      'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ],
    datasets: [{
      label: 'Renvenue',
      data: dataSet,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };
  const ctx = document.getElementById('myLineChart');
  new Chart(ctx, {
    type: 'line',
    data,
    options: {
      plugins: {
        title: {
          display: true, text: 'Doanh thu trong tuần', font: { size: 40 }
        }
      }, scales: {
        y:
        {
          beginAtZero: true, title: {
            display: true, text: 'Revenue (VNĐ)', color:
              '#BDBDBD', font: {
                family: 'Times', size: 30, style: 'normal', lineHeight: 1.2
              },
          }
        }
      }
    }
  });
}

function viewChart(options) {
  let labels = [];
  let data = []
  for (let i = 0; i < options.lastDayOfMonth; i++) labels.push(i + 1);
  for (let i = 0; i < options.lastDayOfMonth; i++) data.push(0);
  for (let i = 0; i < options.data.length; i++)
    data[parseInt(options.data[i].day)] = options.data[i].sum;

  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Doanh thu',
        backgroundColor: '#369FFF', data: data, borderWidth: 1
      }]
    }, options: {
      plugins: {
        title: {
          display: true, text: 'Doanh thu trong tháng', font: { size: 40 }
        }
      }, scales: {
        y:
        {
          beginAtZero: true, title: {
            display: true, text: 'Revenue (VNĐ)', color:
              '#BDBDBD', font: {
                family: 'Times', size: 30, style: 'normal', lineHeight: 1.2
              },
          }
        }, x: {
          title: {
            display: true, text: 'Days', color: '#BDBDBD', font: {
              size: 30
            }
          }
        }
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", async function () {
  const res = await fetch("/admin/statistics/revenue", {
    method: "GET",
  });

  const response = await res.json();
  //get last day in this month
  var today = new Date();
  var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  lastDayOfMonth = lastDayOfMonth.getDate();
  viewChart({
    lastDayOfMonth,
    data: response
  });

  // get week
  const firstday = new Date(
    today.setDate(today.getDate() - today.getDay()),
  );

  // ✅ Get the last day of the current week (Saturday)
  const lastday = new Date(
    today.setDate(today.getDate() - today.getDay() + 6),
  );
  const from = `${firstday.getFullYear()}-${firstday.getMonth() + 1}-${firstday.getDate()}`
  const to = `${lastday.getFullYear()}-${lastday.getMonth() + 1}-${lastday.getDate()}`

  const res1 = await fetch(`/admin/statistics/revenueW/${from}/${to}`, {
    method: "GET",
  });

  const response1 = await res1.json();
  LineChart({
    today,
    data: response1
  });
})