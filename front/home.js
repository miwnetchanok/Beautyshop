window.onload = Pageload

function Pageload() {
    getAllProduct();
}       

async function getAllProduct() {
    const res = await axios.get("http://localhost:4000/all-product");
    const data= await res.data;
    console.log(data);
    const {msg} = data;
    console.log(msg);
    for(let index = 0;index < msg.length; index++){
        const dataItem = msg[index];
        createProductCard(dataItem);
    }
}

function createProductCard(data){
    const container = document.getElementById("product-row");
    let div = document.createElement("div");
    div.className = "col-3"
    div.innerHTML=`<div class="card">
    <img class="product-image" src="${data.url}">
    <div class="card-body">
      <h5 class="card-title">${data.productName}</h5>
      <p>Price : ${data.productPrice}</p>
      <p class="card-text">${data.priductDetails}</p>
      <a href="./product.html?id=${data.id}" class="btn btn-primary">View details</a>
    </div>
  </div>`
  container.appendChild(div);
}
function handleLogout(){
    localStorage.clear();
    window.location.href="./index.html"
}