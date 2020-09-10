class Shoes{
    constructor(productId, price, stock, size, color, thumbnail, onCart){
        this._productId = productId;
        this._price = price;
        this._stock = stock;
        this._size = size;
        this._color = color;
        this._thumbnail = thumbnail;
        this._onCart = onCart;
    }

    get productId(){
        return this._productId;
    }

    set productId(value){
        this._productId = value;
    }

    get price(){
        return this._price;
    }

    set price(value){
        this._price = value;
    }

    get stock(){
        return this._stock;
    }

    set stock(value){
        this._stock = value;
    }

    get size(){
        return this._size;
    }

    set size(value){
        this._size = value;
    }

    get color(){
        return this._color;
    }

    set color(value){
        this._color = value;
    }

    get thumbnail(){
        return this._thumbnail;
    }

    set thumbnail(value){
        this._thumbnail = value;
    }

    get onCart(){
        return this._onCart;
    }

    set onCart(value){
        this._onCart = value;
    }
}

class ItemOnCart{

    constructor(idOnCart, productId){
        this._idOnCart = idOnCart;
        this._productId = productId;
    }

    get idOnCart(){
        return this._idOnCart;
    }

    set idOnCart(value){
        this._idOnCart = value;
    }

    get productId(){
        return this._productId;
    }

    set productId(value){
        this._productId = value;
    }

}

let allShoes = [];
let cart = [];

//En esta parte se traería desde el localStorage el carrito si existiera uno guardado
//pero no funciona así que gg wp salu2

// if (localStorage.getItem("userCart").length >= 1){
//     cart = localStorage.getItem("userCart")
//     console.log(typeof cart);
// }

let shoe = new Shoes("0001", 2000, 4, 43, "black", "https://cdn.shopify.com/s/files/1/0238/2821/products/Mens-193-Royale-TripleBlack-3RBW-Product-101_0dfdc0b7-602d-413d-a381-4baa1060da91_854x.jpg?v=1563992320");
let shoe2 = new Shoes("0002", 3000, 1, 40, "white", "https://cf.shopee.ph/file/39511199f221cfed9a55205bb7491831");
let shoe3 = new Shoes("0003", 50, 15, 38, "None", "images/facha.png");

allShoes.push(shoe);
allShoes.push(shoe2);
allShoes.push(shoe3);

//Esta parte es la creación dinámica de los elementos del HTML
//Se van creando a partir de los productos en el array "allShoes"

let clickOnBtn = 0;

for (let i = 0; i < allShoes.length; i++){

    let container = document.createElement("div"); //Creamos el div para las tarjetas de los artículos
    let image = document.createElement("img"); //Creamos la imagen que va a tener
    let btn = document.createElement("button"); //Creamos el botón para añadir al carrito
    let priceTag = document.createElement("p")
    let product = document.getElementById("product-container"); //Del HTML nos traemos el contenedor de las tarjetas

    btn.innerHTML = "Añadir al carrito"; //Le ponemos texto al botón
    btn.className = "add-to-cart";  //Le ponemos clase

    image.alt = "Producto-" + allShoes[i].productId; //Le cargamos el alt a la imagen de cada producto
    image.src = allShoes[i].thumbnail; //Y le cargamos la imagen
    image.style.width = "100px";

    container.className = "product-card"
    container.id = allShoes[i].productId; //A cada tarjeta, le ponemos el id del producto que representa

    product.style.display = "flex";
    product.style.flexFlow = "column wrap";

    priceTag.textContent = "$" + allShoes[i].price; //Ponemos el precio a cada tarjeta según corresponda

    container.appendChild(image); //Ahora añadimos el boton, el precio y la imagen al contenedor
    container.appendChild(priceTag);
    container.appendChild(btn);
    
    container.id = allShoes[i].productId; //A la tarjeta le ponemos el id del producto que le corresponde

    product.appendChild(container); //Finalmente añadimos al HTML todo lo que creamos
}

let addBtn = document.getElementsByClassName("add-to-cart");
let buyBtn = document.getElementById("buy-btn");

for (let i = 0; i < addBtn.length; i++){

    //Le agregamos events al botón de "añadir al carrito" de cada producto
    addBtn[i].addEventListener("click", agregarProducto);
}

function mensajeDeBorrado(){
    alert("Elimina3 D:");
}

function mensajeDeAgregado(){
    alert("Agregado al carrito :D");
}

function sumando(valorTotal){

    for (let i = 0; i < cart.length; i++){

        let product = allShoes.find(element => element.productId == cart[i].productId);

        valorTotal = valorTotal + product.price;
    } 

    return valorTotal;
}

function agregarProducto(){
    clickOnBtn = clickOnBtn + 1
    buyBtn.textContent = "Comprar por $";

    let shoe = this.parentNode.id; //Tomamos el ID del que se haya clickeado
    let addShoe = allShoes.find(element => element.productId === shoe); //Y según el ID buscamos en el array de todos los productos y nos traemos el que queremos
    
    let addOnCart = new ItemOnCart(clickOnBtn, addShoe.productId); //Creamos una instancia de la clase ItemOnCart para agregar al carrito y le ponemos un id único según
    console.log(addOnCart);                                        //Cuantas veces se haya clickeado el botón de agregar. Esto nos genera un id único para cada elemento

    cart.push(addOnCart); //Metemos el producto en el carrito y lo ponemos en el localStorage
    localStorage.setItem("userCart", cart);
    console.log("Carrito: ", cart);

    let valorTotal = 0;
    buyBtn.textContent = buyBtn.innerHTML + sumando(valorTotal);

    let cartCtn = document.getElementById("cart-container"); //Buscamos el contenedor de productos del carrito

    let cartItem = document.createElement("div"); //Creamos el div para los elementos del carrito
    cartItem.id = "cart-product-" + addOnCart.idOnCart;

    let image = document.createElement("img"); //Creamos la imagen para el producto y el botón para eliminarlo del carrito
    let cartBtn = document.createElement("button");

    image.src = addShoe.thumbnail; //Insertamos la imagen del producto con su alt
    image.alt = addShoe.productId; 
    image.style.width = "100px";

    cartBtn.innerHTML = "Eliminar"; //Al botón le ponemos el texto de eliminar

    cartCtn.classList.remove("hidden"); //Mostramos el contenedor de productos cuando tiene al menos uno
    cartItem.appendChild(image);
    cartItem.appendChild(cartBtn);
    cartCtn.insertBefore(cartItem, buyBtn); //Finalmente añadimos al HTML lo que creamos para el producto que ingresa al carrito

    mensajeDeAgregado();

    //Creo el evento para eliminar productos del carrito
    cartBtn.addEventListener("click", eliminarProducto);
}

function eliminarProducto(){

    let deleteShoe = document.getElementById(this.parentNode.id); //Busco la tarjeta padre del botón que fue presionado, en el HTML.

    mensajeDeBorrado(); 

    let trueId = deleteShoe.id.slice(13,deleteShoe.length);  //Tomamos el id único que generamos para cada Objeto del carrito
    let shoeIndex = cart.findIndex(element => element.idOnCart == trueId); //Buscamos ese id en el carrito

    cart.splice(shoeIndex, 1); //Lo eliminamos del carrito
    console.log(cart);

    deleteShoe.remove(); //Eliminamos la tarjeta de ese producto en el carrito

    let buyBtn = document.getElementById("buy-btn");

    let valorTotal = 0;
    buyBtn.innerHTML = "Comprar por $" + sumando(valorTotal); //Actualizamos el precio total

    //Si el precio final es 0, entonces no hay más elementos en el carrito por lo que lo escondemos nuevamente
    if (buyBtn.innerHTML === "Comprar por $0"){ 
        let cartCtn = document.getElementById("cart-container");
        cartCtn.classList.add("hidden");
    }

}

buyBtn.addEventListener("click", () => {

    let personalData = document.getElementById("personal-data");
    personalData.classList.remove("hidden");

})

console.log(delivery.checked)

let paymentBtn = document.getElementById("payment-btn");

paymentBtn.addEventListener("click", () => {

    let personalData = document.getElementById("personal-data");
    personalData.classList.add("hidden");

    let paymentInfo = document.getElementById("billing-info");
    paymentInfo.classList.remove("hidden");

})

let finalPay = document.getElementById("buy-btn-final");

finalPay.addEventListener("click", () => {

    let today = new Date;
    let year = today.getFullYear();
    let month = today.getMonth()
    let day = today.getDate();
    let hour = today.getHours();
    let minute = today.getMinutes();
    let seconds = today.getSeconds();

    if (seconds < 10){
        alert("Gracias por darnos tu plata, jaaaaa\n" + "Nos diste tu plata el día " 
        + day + "/" + month + "/" + year + " a las " + hour + ":" + minute + ":0" + seconds);
    }else{
        alert("Gracias por darnos tu plata, jaaaaa\n" + "Nos diste tu plata el día " 
        + day + "/" + month + "/" + year + " a las " + hour + ":" + minute + ":" + seconds);
    }

    localStorage.removeItem("userCart");
    location.reload();

});

let sortBtn = document.getElementById("sort"); //Nos traemos el botón para ordenar
let clickOnSort = 0;

sortBtn.addEventListener("click", sortByPrice); //Agregamos evento al botón

//Pasando un parámetro, se puede generalizar
function sortByPrice(){

    let productCards = document.getElementsByClassName("product-card"); //Nos traemos el array de productos en el catálogo
    clickOnSort = clickOnSort + 1; //Le sumamos uno al contador de clicks de sort

    switch(clickOnSort % 3){

        case 1:

            sortBtn.innerHTML = "Ordenar de mayor a menor precio"

            for (let i = 0; i < productCards.length; i++){

                //shoe es el resultado de encontrar el id del producto en allshoes que sea igual al id de las tarjetas de producto del catálogo
                let shoe = allShoes.find(element => element.productId == productCards[i].id)

                //Finalmente, ordenamos por precio
                productCards[i].style.order = shoe.price;

            }
            break;

        case 2:

            sortBtn.innerHTML = "No ordenar"

            for (let i = 0; i < productCards.length; i++){

                let shoe = allShoes.find(element => element.productId == productCards[i].id);
                //Con esta cuenta logramos hacer que los de precio más grande queden al principio
                productCards[i].style.order = 500000 - shoe.price;
            }
            break;

        default:

            sortBtn.innerHTML = "Ordenar de menor a mayor precio"

            for (let i = 0; i < productCards.length; i++){
                //Ordenamos los productos como vienen en el array
                productCards[i].style.order = i
            }

            break;
    }   


}

