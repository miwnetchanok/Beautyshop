async function handleSubmit() {
    const image = document.getElementById("image");
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const details = document.getElementById("productDetails").value;
  
    let formData = new FormData();
  
    formData.append("image", image.files[0]);
    formData.append("userId", localStorage.getItem("userId"));
    formData.append("productName", name);
    formData.append("productPrice", price);
    formData.append("productDetails", details);
  
    const res = await axios.post(
      "http://localhost:4000/upload-product",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }