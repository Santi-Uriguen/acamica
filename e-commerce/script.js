class products {
  constructor(id, name, memory, price, stock, img) {
    this.id = id;
    this.name = name;
    this.memory = memory;
    this.price = price;
    this.stock = stock;
    this.img = img;
  }
}

/*--------------------------PRODUCTOS--------------------------*/
let celu1 = new products(
  1001,
  "Samsung Galaxy S7 Edge",
  "32 GB",
  21999,
  15,
  "https://http2.mlstatic.com/samsung-galaxy-s7-edge-reacondicionado-32gb-liberado-D_NQ_NP_889766-MLA28838735052_112018-F.jpg"
);
let celu2 = new products(
  1002,
  "LG K40",
  "32 GB",
  29000,
  5,
  "https://cnet1.cbsistatic.com/img/SH20O_troUn1MkQWWPdqvsSIcdU=/940x0/2019/02/20/eb10e07c-5194-4af4-952d-8a1d2dd91daf/lg-k40.jpg"
);
let celu3 = new products(
  1003,
  "Iphone Xs",
  "64 GB",
  190000,
  7,
  "https://images-na.ssl-images-amazon.com/images/I/414uMAUDY5L._AC_SY400_.jpg"
);

let mobiles = [];
let btnArray = [];
let cart = [];

mobiles.push(celu1);
mobiles.push(celu2);
mobiles.push(celu3);

/*---------------------------INTERFAZ PRODUCTOS EN PÁGINA-------------------*/
const show = () => {
  for (let i = 0; i < mobiles.length; i++) {
    let container = document.createElement("div");
    let image = document.createElement("img");
    let ul = document.createElement("ul");
    let liName = document.createElement("li");
    let liMemory = document.createElement("li");
    let liPrice = document.createElement("li");
    let btn = document.createElement("button");
    let prod_container = document.getElementById("prod_container");

    btn.innerHTML = "Añadir al carrito";
    btn.className = "add-to-cart";

    image.alt = "Producto-" + mobiles[i].id;
    image.src = mobiles[i].img;
    image.style.width = "100px";

    liName.innerHTML = mobiles[i].name;
    liMemory.innerHTML = " Memoria: " + mobiles[i].memory;
    liPrice.innerHTML = " Precio: $" + mobiles[i].price;

    ul.appendChild(liName);
    ul.appendChild(liMemory);
    ul.appendChild(liPrice);

    container.className = "product-card";
    container.id = mobiles[i].id;

    container.appendChild(image);
    container.appendChild(ul);
    container.appendChild(btn);

    prod_container.style.display = "flex";
    prod_container.style.flexFlow = "column wrap";
    prod_container.appendChild(container);
  }
};
show();

/*-------------------AÑADIR AL CARRITO-----------------*/

let addBtn = document.getElementsByClassName("add-to-cart");
// console.log(addBtn);

var valorTotal = 0;
let clickOnBtn = -1;

for (let i = 0; i < addBtn.length; i++) {
  //Le agregamos events al botón de "añadir al carrito" de cada producto
  addBtn[i].addEventListener("click", agregarProducto);
}

function agregarProducto() {
  clickOnBtn = clickOnBtn + 1;
  /*agregamos el producto al array carrito*/
  let cont = this.parentNode.id;
  let mobilArr = mobiles.findIndex((element) => element.id == cont);
  cart.push(mobiles[mobilArr]);
  localStorage.setItem("userCart", cart);
  // console.log(cart);

  /*imprimimos el producto dentro del carrito*/
  let CartContainer = document.createElement("div");
  let CartImg = document.createElement("img");
  let CartName = document.createElement("h4");
  let CartPrice = document.createElement("h4");
  let CartBtn = document.createElement("button");
  let CartProdContainer = document.getElementById("cart_container");

  CartBtn.innerHTML = "Quitar del carrito";
  CartBtn.className = "quit-from-cart";

  CartImg.alt = "Producto-" + mobiles[mobilArr].id;
  CartImg.src = mobiles[mobilArr].img;
  CartImg.style.width = "50px";

  CartName.innerHTML = mobiles[mobilArr].name;
  CartPrice.innerHTML = " Precio: $" + mobiles[mobilArr].price;

  CartContainer.className = "cart-product-card";
  CartContainer.id = clickOnBtn;

  CartContainer.appendChild(CartImg);
  CartContainer.appendChild(CartName);
  CartContainer.appendChild(CartPrice);
  CartContainer.appendChild(CartBtn);

  CartProdContainer.appendChild(CartContainer);

  addMsj(); //llamamos a la función para mensaje de agregado

  CartBtn.addEventListener("click", quitarProducto);
  console.log(cart);

  valorTotal = valorTotal + mobiles[mobilArr].price; //calcula el valor total de los productos

  buyBtn();
}

//función para quitar el producto del carrito
function quitarProducto() {
  let ID = document.getElementById(this.parentNode.id);
  let num = parseInt(ID.id);
  ID.remove();
  cart.splice(num, 1);
  quitMsj();
  console.log(cart)
}

//Funciones para mensaje de agregado y quitado de productos
function addMsj() {
  //función mensaje de agregado
  alert("Agregaste un item a tu carrito!");
}
function quitMsj() {
  //función mensaje de quitado
  alert("Eliminaste un item de tu carrito");
}

// función para agregar el botón de compra y el precio total
function buyBtn() {
  let buyButton = document.getElementById("buy_btn");
  let buyValue = document.getElementById("buy_value");
  buyValue.innerHTML = "Total a pagar: $" + valorTotal;
  buyButton.style.display = "flex";
  buyButton.innerHTML = "Comprar";
  buyButton.addEventListener("click", form);
}
//Funciones para imprimir en pantalla el formulario para ingresar los datos de compra
function form() {
  let formulario = document.getElementById("personal-data");
  formulario.style.display = "flex";
  let billing = document.getElementById("payment-btn");
  billing.addEventListener("click", buy_billing)
}

function buy_billing(){
  let billing_info = document.getElementById("billing-info")
  billing_info.style.display="flex";
  let buy = document.getElementById("buy-btn-final");
  buy.addEventListener("click",() =>{alert("Realizaste la compra!")} )

}

