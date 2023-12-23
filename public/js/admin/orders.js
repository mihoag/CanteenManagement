document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".detail-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var parentRow = this.closest("tr");
      var nextRow = parentRow.nextElementSibling;

      if (nextRow && nextRow.classList.contains("detail-row")) {
        nextRow.classList.toggle("open");
      }
    });
  });
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
  console.log(e.target);
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
