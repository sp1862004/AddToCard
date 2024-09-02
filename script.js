// show api data
async function item() {
    var htmlFormat = "";
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    data?.forEach((items, index) => {
        htmlFormat += `
        <div class="col-xl-3 col-lg-4 col-md-6">
        <div class="card">
            <img src="${items.image}" alt="">
            <div class="card-body">
                <h3>${items.title}</h3>
                <ul>
                    <li>${items.category}</li>
                    <li>${items.price}</li>
                    <li>${items.rating.rate}</li>
                    <li>${items.rating.count}</li>
                </ul>
                <button class="btn btn-warning" onclick="addToCart(${items.id}, ${index})">ADD TO CART</button>
            </div>
        </div>
    </div>`
    })
    document.getElementById('cardItem').innerHTML = htmlFormat;
}
item();
// end show api data
// add to cart 
async function addToCart(id, index) {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    const addCartList = localStorage.getItem('addToCart');
    var arr = addCartList == null ? [] : JSON.parse(addCartList);
    if (data[index].id === id) {
        var count = 0;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                count = arr[i].count;
            }
        }
        var cartData = {
            id: id,
            title: data[index].title,
            price: data[index].price,
            description: data[index].description,
            category: data[index].category,
            image: data[index].image,
            rating: data[index].rating.rate,
            count: ++count
        }
        arr.push(cartData)
        const unique = arr.reverse().filter((obj, index) => {
            return arr.findIndex((item) => { return item.id === obj.id }) === index
        });
        localStorage.setItem("addToCart", JSON.stringify(unique))
        countCart();
    }
}
// end add to cart 
// count add tocart 
function countCart() {
    var totalCount = JSON.parse(localStorage.getItem('addToCart'));
    var sum = 0;
    for (var i = 0; i < totalCount.length; i++) {
        sum = sum + parseInt(totalCount[i].count)
    }
    document.querySelector('#count').innerHTML = sum
}
// end count add tocart 
// show add to cart 
function showAddCart() {
    var addItem = JSON.parse(localStorage.getItem('addToCart'));
    var dataHtml = "";
    addItem?.map((items, index) => {
        dataHtml += `
            <div class="row">
                <div class="col-md-4">
                    <img src="${items.image}" width="100%" height="200"/>
                    <button class="btn btn-danger mt-3" onclick="trash(${index})">Delete</button>
                    <button class="btn btn-info mt-3" onclick="newCart()">Buy</button>
                    </br><br>
                    <h2 class="mx-5" id="price">$12.3</h2>
                </div>
                <div class="col-md-8">
                    <h3>${items.category}</h3>
                    <ul>
                        <li>Title : ${items.title}</li>
                        <li>Price : ${items.price}</li>
                        <li>Rating : ${items.rating}</li>
                    </ul>
                    <input type="number" id="getCount${index}" onchange="changeCount(${index})" value=${items.count++} class="form-control" min="0" max="5" />
                    <p class="my-3 lh-lg">${items.description}</p>
                </div>
            </div>
            <hr/>
            `
    })
    document.getElementById('show').innerHTML = dataHtml

}
// end show add to cart 
// change count in add to cart 
function changeCount(id) {
    var datacount = document.getElementById(`getCount${id}`).value;

    if (datacount == 0) {
        let addItem = JSON.parse(localStorage.getItem('addToCart'));
        console.log(addItem[id])
        addItem.splice(id, 1)
        localStorage.setItem('addToCart', JSON.stringify(addItem))
        showAddCart();
    } else {
        let addItem = JSON.parse(localStorage.getItem('addToCart'));
        addItem[id].count = datacount;
        localStorage.setItem('addToCart', JSON.stringify(addItem))
        showAddCart();
    }
}
// end change count in add to cart 
// delete add to cart product 
function trash(id) {
    if (confirm("Do you want to delete this item?")) {
        let addItem = JSON.parse(localStorage.getItem('addToCart'));
        addItem.splice(id, 1);
        localStorage.setItem('addToCart', JSON.stringify(addItem))
        showAddCart();
    }
}
// end delete add to cart product
// Buy add to cart product
function newCart (){
    window.location.href = "http://127.0.0.1:5501/ADD_TO_CART/Buy.html"
}
// end Buy add to cart product
// Function to update product total price
function updateProductTotal(productNode) {
    const quantity = parseInt(productNode.querySelector('input').value);
    const price = parseFloat(productNode.querySelector('.price').innerText);
    const total = quantity * price;
    productNode.querySelector('.product-total').innerText = total.toFixed(2);
}