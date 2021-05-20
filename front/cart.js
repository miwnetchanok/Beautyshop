window.onload = Pageload

async function Pageload(){
    const userId = localStorage.getItem("userId");
    await getMycart(userId);
}
let total = 0
async function getMycart(id){
    const res = await axios.get(`http://localhost:4000/cart?userId=${id}`);
    const data = await res.data;
    const {msg} = data
    for(let index = 0; index < msg.length;index++){ 
        const cartItem = msg[index];
        total += parseFloat(cartItem.productPrice);
        createCartItem(cartItem);

    }

    document.getElementById("price").innerHTML = total;
}

function createCartItem(data){
    const container = document.getElementById("cart-container");
    let div = document.createElement("div");
    div.className = "alert alert-primary"
    div.innerHTML = `Name : ${data.productName} and price : ${data.productPrice}`;
    container.appendChild(div); 
}

function handleLogout(){
    localStorage.clear();
    window.location.href="./index.html"
}

async function handleCheckout(){
    const userId = localStorage.getItem("userId");
    const temp ={
        userId :userId,
        price:total,
    };

    const res = await axios.post("http://localhost:4000/checkout",temp);
    const data = await res.data;
    
    if(data.status){
        Swal.fire({
            icon: 'success',
            title: 'Complete',
            text: 'Ordered sucessfully',
        });
    }


}

