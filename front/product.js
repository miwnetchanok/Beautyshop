function handleLogout(){
    localStorage.clear();
    window.location.href="./index.html"
}

window.onload = Pageload

async function Pageload(){
    const id = getQueryString();
    const data = await getProductById(id);
    insertProductdetail(data);
}

function getQueryString(){
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return id;
}

async function getProductById(id){
    const res = await axios.get(`http://localhost:4000/product/${id}`)
    const data = await res.data;
    return data
}

//รายละเอียดของสินค้า
function insertProductdetail(data)
{
    console.log(data.msg[0]);
    let img = document.getElementById("product-img");
    img.src = data.msg[0].url
    let name = document.getElementById("name")
    let price = document.getElementById("price")
    let description = document.getElementById("description")
    name.innerHTML = data.msg[0].productName;   //แทรกhtml tagลงในตำแหน่งที่ต้องการ
    price.innerHTML = data.msg[0].productPrice;
    description.innerHTML = data.msg[0].priductDetails;
}


//async เป็น syntax await ใช้เพื่อบอกว่าให้รอคำสั่งนั้นเสร็จก่อนค่อยทำอันต่อไป
async function addtoCart(){ 
    const id = getQueryString();
    const userId = localStorage.getItem("userId");
    
    const temp ={
        productId : id,
        userId : userId
    }
    const res = await axios.post("http://localhost:4000/cart",temp);
    const data = await res.data;
    console.log(data);
    
    if(data.status){
        Swal.fire({
            icon: 'success',
            title: 'Complete',
            text: 'Register is sucessfully',
          })
    }
}