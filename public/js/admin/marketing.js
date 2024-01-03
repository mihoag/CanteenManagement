let okMarketing = false;

function convertToVND(number) {
  // Using toLocaleString to format the number as currency in VND
  number = parseInt(number);
  let vndFormatted = number.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  return vndFormatted.replace("₫", "VNĐ");
}
function formatDate(date) {
  date = date.split('-');
  return date[2] + '.' + date[1] + '.' + date[0]
}

function formatDetail(details) {
  details = details.replaceAll("\r", '');
  details = details.replaceAll("-", '');
  details = details.split("\n");
  details = details.filter(detail => detail.length > 0);
  return details;
}


function showToast(message, type = "bg-danger", time = 2000) {
  var toast = document.getElementById("toast");
  toast.classList.remove("bg-danger");
  toast.classList.remove("bg-success");
  toast.classList.remove("bg-warning");
  toast.classList.add(type);
  toast.querySelector("#toast-body").innerText = message;

  var bsToast = new bootstrap.Toast(toast);
  bsToast.show();
  setTimeout(function () {
    bsToast.hide();
  }, time);
}

function preview() {
  frame.src = URL.createObjectURL(event.target.files[0]);
}

$(function () {
  $("#sendEmailToClient").on("click", async function () {
    const [file] = $("#formFile")[0].files;
    if ($("#formFile").val().length == 0 || !okMarketing) {
      showToast(`Bạn chưa thêm mới quảng cáo`, 'bg-danger');
      return;
    }

    const data = $('#dataMarketing')
      .serializeArray()
      .reduce((obj, field) => ({ ...obj, [field.name]: field.value }), {});
    for (const field in data) {
      if (data[field].length == 0) {
        showToast(`Bạn chưa thêm mới quảng cáo`, 'bg-danger');
        return;
      }
    }

    if (parseInt(data.price) / 1000 < 1 || parseInt(data.price) <= 0) {
      showToast(`Giá tiền phải lớn hơn 10.000 VND`, 'bg-danger');
      return;
    }

    if (parseInt(data.discount) > 100 || parseInt(data.discount) < 0) {
      showToast(`Giảm giá phải trong khoảng từ 0 đến 100`, 'bg-danger');
      return;
    }

    data.money = Math.round(parseInt(data.price) * (100 - parseInt(data.discount)) / 100);

    data.price = convertToVND(data.price);
    data.money = convertToVND(data.money);
    data.detail = formatDetail(data.detail);
    data.date = formatDate(data.date);

    const formData = new FormData();
    formData.set("image", file);
    for (const field in data) {
      if (field === 'detail')
        formData.set(field, JSON.stringify(data[field]));
      else
        formData.set(field, data[field]);
    }

    showToast(`Đang gửi thông tin quảng cáo đến khách hàng, vui lòng đợi trong giây lát!!!`, 'bg-info');
    // push the data to server
    const res = await fetch("/admin/marketing", {
      method: "POST",
      body: formData,
    });

    const response = await res.json();
    if (!response.success) {
      showToast(response.message || 'Có lỗi xảy ra, hãy thử lại sau', 'bg-danger');
    } else {
      showToast(response.message, 'bg-success');
    }
  })

  $("#addNewMarketing").on('click', async function () {
    const [file] = $("#formFile")[0].files;
    if ($("#formFile").val().length == 0) {
      showToast(`Vui lòng chọn ảnh minh họa!!!`, 'bg-danger');
      return;
    }

    const data = $('#dataMarketing')
      .serializeArray()
      .reduce((obj, field) => ({ ...obj, [field.name]: field.value }), {});
    for (const field in data) {
      if (data[field].length == 0) {
        showToast(`Vui lòng điền đầy đủ thông tin!!!`, 'bg-danger');
        return;
      }
    }

    if (parseInt(data.price) / 1000 < 1 || parseInt(data.price) <= 0) {
      showToast(`Giá tiền phải lớn hơn 10.000 VND`, 'bg-danger');
      return;
    }

    if (parseInt(data.discount) > 100 || parseInt(data.discount) < 0) {
      showToast(`Giảm giá phải trong khoảng từ 0 đến 100`, 'bg-danger');
      return;
    }

    data.money = Math.round(parseInt(data.price) * (100 - parseInt(data.discount)) / 100);

    data.price = convertToVND(data.price);
    data.money = convertToVND(data.money);
    data.detail = formatDetail(data.detail);
    data.date = formatDate(data.date);

    // render views to client;
    okMarketing = true;
    $("#namePre").text(data.name);
    $("#datePre").text(data.date);
    $("#pricePre").text(data.price);
    $("#moneyPre").text(data.money);
    $("#imagePre").attr("src", $('#frame').attr("src"));
    let detailPre = document.getElementById("detailPre");
    detailPre.innerHTML = "";
    for (let i = 0; i < data.detail.length; i++)
      detailPre.innerHTML += `
      <div class="col-2 rounded-circle" style="background-color:#A7E8B7; width:40px; height:40px;"></div>
      <div class="col-10">${data.detail[i]}</div>
      `
    $('#marketingModal').modal('hide');
    showToast('Thêm mới quảng cáo thành công!!!', 'bg-success');

  })
});
