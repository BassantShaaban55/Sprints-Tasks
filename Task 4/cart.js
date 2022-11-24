"use strict";



const addProduct = () => {


    const product = document.getElementById('product-name').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;
    let total = price * quantity;

    console.log(product);

    if (product == '' || price == '' || quantity == '') {

        alert("Product or price or quantity shouldn't be empty")
    }
    else if (price <= 0 || quantity <= 0) {
        alert("You shouldn't enter zero or negative value for price or  quantity")
    }
    else {
        document.getElementById('products').innerHTML += '<tr> <td>' + product + '</td> <td>' + price + '</td> <td>' + quantity + '</td><td>' + total + '</td> <td>Remove</td> </tr > ';
    }
}