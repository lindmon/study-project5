fetch("http://localhost:3000/api/products")
    .then(function(response){
        if(response.ok){
            return response.json();
        }
    })
    .then(function(products) {
        
        products.forEach(product => {

    // Création des balises

    const itemsSection = document.querySelector(".items");

    const linkProduct = document.createElement("a");
    linkProduct.href = "./product.html?id="+product._id;


    const productCard = document.createElement("article");


    const imgProduct = document.createElement("img");
    imgProduct.src = product.imageUrl;
    imgProduct.setAttribute("alt", product.altTxt);

    const productName = document.createElement("h3");
    productName.innerText = product.name;
    productName.classList.add("productName");

    const productDescription = document.createElement("p");
    productDescription.innerText = product.description;
    productDescription.classList.add("productDescription");

    //Ajouter les nouvelles éléments à parent
    itemsSection.appendChild(linkProduct);
    productCard.appendChild(imgProduct);
    productCard.appendChild(productName);
    productCard.appendChild(productDescription);
    linkProduct.appendChild(productCard);
        
    });    
});