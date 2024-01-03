module.exports = function (data) {
  let content = '';
  for (let i = 0; i < data.detail.length; i++)
    content += `
  <div style="display:flex; justify-content:between; margin: 10px">
  <div style="background-color:#A7E8B7; width:30px; height:30px; border-radius:50%; margin-right:10px"></div>
  <div class="col-10" style="vertical-align:center">${data.detail[i]}</div>
  </div>
    
    `
  return `
  <section>
  <h4 class="mb-4">Quảng cáo</h4>
  <div class="row gap-5 shadow p-3 mb-5 bg-white rounded-4 w-100 m-0">
    <div class="col-5 d-flex justify-content-between flex-column p-2 rounded-3"
      style="background-image:linear-gradient(#D5EEDB, #FFC9D6) ">
      <div class="mb-5">
        <img src="http://res.cloudinary.com/dbs5ve8kj/image/upload/v1704266374/ylozvevc4ywvomesqlwa.png" alt="HCMUS Canteen" width="300" />
      </div>
      <div style="text-align:center;">
        <img src="${data.image}" alt="" style="object-fit: cover;" width="460" />
      </div>
    </div>
    <div class="col-6">
      <div style="color: #88D49A; font-size:1.5rem; font-weight:700" class="fw-bold fs-4 mb-2">${data.name}</div>
      <div class="d-flex justify-content-between" style="color: #828282;">
        <p>Món mới</p>
        <p>Mở bán: ${data.date}</p>
      </div>
      <hr />
      <div class="row gap-3 align-items-center" style="margin:10px 0px;">
        ${content}
      </div>
      <hr />
      <div class="d-flex justify-content-between fw-bold fs-5 mb-3" style="font-size:1.25rem; font-weight:700; display:flex;">
        <p style="margin-right: 180px">Giá:</p>
        <p>${data.price}</p>
      </div>
      <div class="d-flex justify-content-between fw-bold fs-5" style="font-size:1.25rem; font-weight:700; display:flex;">
        <p style="margin-right: 120px">Giảm giá:</p>
        <p>${data.discount}%</p>
      </div>
      <hr />
      <div class="d-flex justify-content-between fw-bold fs-5 mb-4" style="font-size:1.25rem; font-weight:700; display:flex;">
        <p style="margin-right: 100px">Thành tiền:</p>
        <p style="color: #5B9A6A;">${data.money}</p>
      </div>
    </div>
  </div>
</section>
  `;
}