class Cart{
    
    cartLines=[];
    total;
    subTotal;

    constructor(cartLines){
     this.cartLines=cartLines;
    }

    getShipping = () => {
        return this.cartLines.length * 10;
      };
      
    getSubTotal = () => {
        this.subTotal=this.cartLines.map((cl) => cl.product.price * cl.productQuantity).reduce((a, e) => (a += e),0);
        return this.subTotal;
      };

    removeCartLine = (i) => {
       products.splice(i, 1);
       this.cartLines.splice(i,1);
       renderHTML()
    }

    incCartLineQuantity =(i) =>{
      products[i].quantity++;
      this.cartLines[i].productQuantity++;
      renderHTML()
    }

    decCartLineQuantity =(i) =>{
      if (this.cartLines[i].productQuantity > 1) {
        products[i].quantity--;
        this.cartLines[i].productQuantity--;
      }
      renderHTML()
    }


    getTotal = () => {
        this.total=this.getShipping() + this.getSubTotal();
        return this.total;
        
    }

}


class Product {
    id;
    price;
    productName;
    constructor(id,productName,price) {
      this.id=id;
      this.productName=productName;
      this.price = price;
    }

  }


  class CartLine {

    product;
    productQuantity;

    constructor(product,productQuantity){
        this.product=product;
        this.productQuantity=productQuantity;
    }

   decQuantity = (i) => {
        if (this.productQuantity > 1) {
            this.productQuantity--;
        }
      };
   incQuantity = (i) => {
       this.productQuantity++;
      };

}


const initializeCart=()=>{
  let cartLines=[];
  products.forEach((p) => {
    let product= new Product(p.id,p.productName,p.price);
    let cartLine= new CartLine(product,p.quantity);
    cartLines.push(cartLine);  
  });

    let cart = new Cart(cartLines);
    return cart;

  }

const renderHTML = () => {
  
    document.getElementById("products").innerHTML = "";
  
    let cart=initializeCart();

    cart.cartLines.forEach((cl,i) =>{
        document.getElementById("products").innerHTML += getProductHTMLRow(cl, i);
    });
    
    document.getElementById("shipping").innerHTML = `$${cart.getShipping()}`;
    document.getElementById("sub-total").innerHTML = `$${cart.getSubTotal()}`;
    document.getElementById("total").innerHTML = `$${cart.getTotal()}`;

    localStorage.setItem("products",JSON.stringify(products));

    
    
  };
  
const getProductHTMLRow = (cartLine, i) => {
    return `
    <tr>
      <td class="align-middle"><img src="img/${
        cartLine.product.productName
      }.jpg" alt="" style="width: 50px;"> ${cartLine.product.productName}</td>
      <td class="align-middle">$${cartLine.product.price}</td>
      <td class="align-middle">
          <div class="input-group quantity mx-auto" style="width: 100px;">
              <div class="input-group-btn">
                  <button type="button" class="btn btn-sm btn-primary btn-minus" onclick="cart.decCartLineQuantity(${i})">
                  <i class="fa fa-minus"></i>
                  </button>
              </div>
              <input type="text" class="form-control form-control-sm bg-secondary border-0 text-center" value="${
                cartLine.productQuantity
              }">
              <div class="input-group-btn">
                  <button type="button" class="btn btn-sm btn-primary btn-plus" onclick="cart.incCartLineQuantity(${i})">
                      <i class="fa fa-plus"></i>
                  </button>
              </div>
          </div>
      </td>
      <td class="align-middle">$${cartLine.product.price * cartLine.productQuantity}</td>
      <td class="align-middle"><button class="btn btn-sm btn-danger" type="button" onclick="cart.removeCartLine(${i})"><i class="fa fa-times"></i></button></td>
  </tr>`;
  };


  const products = JSON.parse(localStorage.getItem("products") || "[]");
  let cart =initializeCart();
  renderHTML();

