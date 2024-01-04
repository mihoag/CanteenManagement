function LineChart(options) {
  let daySet = [];
  let revenueSet = [];
  let profitSet = [];

  for (let i = 0; i <= 6; i++) {
    let lastday = new Date(
      options.today.setDate(options.today.getDate() - options.today.getDay() + i),
    );
    daySet.push(lastday.getDate());
    revenueSet.push(0);
    profitSet.push(0);
  }
  for (let i = 0; i < options.data.length; i++) {
    revenueSet[daySet.indexOf(parseInt(options.data[i].day))] = options.data[i].sum;
    profitSet[daySet.indexOf(parseInt(options.data[i].day))] = options.data[i].profit;
  }


  const ctx = document.getElementById('myLineChart');
  new Chart(ctx, {
    data: {
      datasets: [{
        type: 'line',
        label: 'Lợi nhuận',
        borderColor: '#FFA732',
        data: profitSet,
      }, {
        type: 'line',
        label: 'Doanh thu',
        borderColor: '#369FFF',
        data: revenueSet,
      }],
      labels: [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
      ]
    },
    options: {
      plugins: {
        title: {
          display: true, text: 'Doanh thu trong tuần', color: '#161A30', font: { size: 40 }
        }
      }, scales: {
        y:
        {
          beginAtZero: true, title: {
            display: true, text: 'VNĐ', color:
              '#EF4040', font: {
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
  let revenueSet = []
  let profitSet = [];
  for (let i = 0; i < options.lastDayOfMonth; i++) labels.push(i + 1);
  for (let i = 0; i < options.lastDayOfMonth; i++) {
    profitSet.push(0);
    revenueSet.push(0);
  }
  for (let i = 0; i < options.data.length; i++) {
    revenueSet[parseInt(options.data[i].day) - 1] = options.data[i].sum;
    profitSet[parseInt(options.data[i].day) - 1] = options.data[i].profit;
  }

  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    data: {
      labels: labels,
      datasets: [{
        type: 'bar',
        label: 'Doanh thu',
        backgroundColor: '#369FFF', data: revenueSet, borderWidth: 1
      },
      {
        type: 'bar',
        label: 'Lợi nhuận',
        backgroundColor: '#FFA732', data: profitSet, borderWidth: 1
      }
      ]
    }, options: {
      plugins: {
        title: {
          display: true, text: 'Doanh thu trong tháng', color: '#161A30', font: { size: 40 }
        }
      }, scales: {
        y:
        {
          beginAtZero: true, title: {
            display: true, text: 'VNĐ', color:
              '#EF4040', font: {
                family: 'Times', size: 30, style: 'normal', lineHeight: 1.2
              },
          }
        }, x: {
          title: {
            display: true, text: 'Days', color: '#161A30', font: {
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
  lastDayOfMonth = today.getDate();
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
