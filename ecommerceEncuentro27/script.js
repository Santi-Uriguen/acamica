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
let shoe3 = new Shoes("0003", 50000, 15, 38, "None", "images/facha.png");

allShoes.push(shoe);
allShoes.push(shoe2);
allShoes.push(shoe3);

//Esta parte es la creación dinámica de los elementos del HTML
//Se van creando a partir de los productos en el array "allShoes"

for (let i = 0; i < allShoes.length; i++){

    let container = document.createElement("div"); //Creamos el div para las tarjetas de los artículos
    let image = document.createElement("img"); //Creamos la imagen que va a tener
    let btn = document.createElement("button"); //Creamos el botón para añadir al carrito
    let product = document.getElementById("product-container"); //Del HTML nos traemos el contenedor de las tarjetas

    btn.innerHTML = "Añadir al carrito"; //Le ponemos texto al botón
    btn.className = "add-to-cart";  //Le ponemos clase

    image.alt = "Producto-" + allShoes[i].productId; //Le cargamos el alt a la imagen de cada producto
    image.src = allShoes[i].thumbnail; //Y le cargamos la imagen
    image.style.width = "100px";

    container.appendChild(image); //Ahora añadimos el boton y la imagen al contenedor
    container.appendChild(btn);
    
    container.id = allShoes[i].productId; //A la tarjeta le ponemos el id del producto que le corresponde

    product.appendChild(container); //Finalmente añadimos al HTML todo lo que creamos
}

let addBtn = document.getElementsByClassName("add-to-cart");
let buyBtn = document.getElementById("buy-btn");

for (let i = 0; i < addBtn.length; i++){

    //Le agregamos events al botón de "añadir al carrito" de cada producto
    addBtn[i].addEventListener("click", () => {

        buyBtn.textContent = "Comprar por $";

        let shoe = addBtn[i].parentNode.id; //Tomamos el ID del que se haya clickeado
        let addShoe = allShoes.find(element => element.productId === shoe); //Y según el ID buscamos en el array de todos los productos y nos traemos el que queremos
    
        cart.push(addShoe); //Metemos el producto en el carrito y lo ponemos en el localStorage
        localStorage.setItem("userCart", cart);
        console.log("Carrito: ", cart);

        let valorTotal = 0;
        buyBtn.textContent = buyBtn.innerHTML + sumando(valorTotal);

        let cartCtn = document.getElementById("cart-container"); //Buscamos el contenedor de productos del carrito

        let cartItem = document.createElement("div"); //Creamos el div para los elementos del carrito
        cartItem.id = "cart-product-" + addShoe.productId + "-" + cart.length;

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

        //Creo el evento para eliminar productos del carrito
        cartBtn.addEventListener("click", eliminarProducto)

    })
}

function mensaje(callback){
    alert(callback(name))
}

function mensajeDeBorrado(idToDelete){
    return "Borramos el item id: " + idToDelete;
}

function mensajeDeAgregado(idToAdd){
    return "Agregamos el item id: " + idToAdd;
}

function sumando(valorTotal){

    for (let i = 0; i < cart.length; i++){
        valorTotal = valorTotal + cart[i].price;
    } 

    return valorTotal;
}

function eliminarProducto(){

    let deleteId = this.parentNode.id; //Obtengo el Id de la tarjeta que contiene al botón que se presionó
    let deleteShoe = document.getElementById(deleteId); //Busco esa tarjeta en el HTML

    mensajeDeBorrado(deleteId);

    // console.log(deleteId);
    // console.log(deleteShoe);

    // // let indexToDelete = deleteId.slice(-1); //Obtengo el indice según en qué posición del array está metido
    // // indexToDelete = parseInt(indexToDelete);

    // for (let i = 0; i < cart.length; i++){

    //     let htmlId = "cart-product" + cart[i].productId + "-" + i;

    //     if (htmlId === deleteId){
    //         console.log("aca toy");
    //         cart.splice(i);
    //         break;
    //     }
    // }

    // console.log(cart);

    deleteShoe.classList.add("hidden"); //Le agrego la class hidden para que se oculte
}

// let delivery = document.querySelector('input[id="delivery"]');
// let pickup = document.querySelector('input[id="pickup"]');
// let flag = true;

buyBtn.addEventListener("click", () => {

    // if (delivery.checked && pickup.checked){
    //     alert("No podés seleccionar ambas")
    //     delivery.checked = false;
    //     pickup.checked = false;
        
    // }else if(!(delivery.checked) && !(pickup.checked) && !(flag)){
    //     alert("Tenés que seleccionar un método de envío")
    // }else{

    let personalData = document.getElementById("personal-data");
    personalData.classList.remove("hidden");

    // }

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


