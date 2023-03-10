
// Récupération de l'id de produit de URL de la page
let params = new URL(document.location).searchParams;
let id = params.get("id");

fetch(`http://localhost:3000/api/products/${id}`)
    .then(function(reponse){
        if(reponse.ok){
            return reponse.json();
        }
    })
    .then(function(product){

 //Ajouter l'information de produit au balises 

        const itemImg = document.querySelector(".item__img");
        const productImg = document.createElement("img");
        productImg.src = product.imageUrl;
        productImg.setAttribute("alt", product.altTxt);

        const productName = document.getElementById("title");
        productName.innerText = product.name;

        const productPrice = document.getElementById("price");
        productPrice.innerText = product.price;

        const productDescription = document.getElementById("description");
        productDescription.innerText = product.description;

        const selectColors = document.getElementById("colors");
        for(let i= 0; i < product.colors.length; i++){
            selectColors.innerHTML += `<option value="${product.colors[i]}"> ${product.colors[i]} </option>`;
        };

// Ajouter les nouvelles éléments à parent
        itemImg.appendChild(productImg);

// Stockage des produits dans le LocalStorage

        addToCartBtn = document.getElementById("addToCart");
        addToCartBtn.addEventListener("click", (event) => {
            let item = {
                id: id,
                color: selectColors.value,
                quantity:parseInt(document.querySelector("#quantity").value)
            };

            let itemsInCart = JSON.parse(localStorage.getItem("items"));


            if (localStorage.getItem("items") === null) {
                
                itemsInCart = [];
                itemsInCart.push(item);
                localStorage.setItem("items", JSON.stringify(itemsInCart));
                console.log("the first item added:");
            
            } else {
                
// Changement de quantity en cas d'item doublé
              
                if(itemsInCart.find(({ id}) => id === item.id).color === item.color){
                        // console.log("found the item with the same id and color}");
                        k = item.quantity;
                        // console.log(k);
                        
                       let index = itemsInCart.findIndex(function (item) {
                            return item.id === id;
                        });
                        itemsInCart[index].quantity += k;
                        localStorage.setItem("items", JSON.stringify(itemsInCart));
                        // console.log("the quantity of the items was changed");

                } else {

                itemsInCart.push(item);
                localStorage.setItem("items", JSON.stringify(itemsInCart));
                console.log("new item added:");
                }

            }
        });   
   
    });



