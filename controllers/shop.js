// by convention name of imported class names with capital letter
const Product = require('../models/product');


exports.getProducts = (request, response, next) => {

    Product.fetchAll()
           .then(products => {

               response.render('shop/product-list', {
                   prods: products,
                   pageTitle: 'All Products',
                   path: '/products'
               });
           })
           .catch(err => console.log(err));
}


exports.getProduct = (request, response, next) => {

    const prodId = request.params.productId;

    Product.findById(prodId)
           .then((product) => {

               response.render('shop/product-detail', {
                   product: product,
                   pageTitle: product.title,
                   path: '/products'
               });
           })
           .catch(err => console.log(err));

}

exports.getIndex = (request, response, next) => {

    Product.fetchAll()
           .then(products => {

               response.render('shop/index', {
                   prods: products,
                   pageTitle: 'Shop',
                   path: '/'
               });
           })
           .catch(err => console.log(err))

};

exports.getCart = (request, response, next) => {

    request.user.getCart()
           .then(products => {
               response.render('shop/cart', {
                   pageTitle: 'Your Cart',
                   path: '/cart',
                   products: products
               });
           })
           .catch(err => console.log(err));
}


exports.postCart = (request, response, next) => {
    const prodId = request.body.productId;

    Product.findById(prodId)
           .then(product => {

               return request.user.addToCart(product);

           })
           .then(result => {

               response.redirect('/cart');
           })
           .catch(err => {
               console.log(err);
           });

};

exports.postCartDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    request.user.deleteItemFromCart(prodId)
           .then(result => {
               response.redirect('/cart');
           })
           .catch(err => console.log(err));

}

exports.postOrder = (request, response, next) => {

    request.user.addOrder()
           .then(result => {

               response.redirect('/orders');
           })
           .catch(err => console.log(err));

}


exports.getOrders = (request, response, next) => {

    request.user.getOrders()
           .then(orders => {
               response.render('shop/orders', {
                   pageTitle: 'Your Orders',
                   path: '/orders',
                   orders: orders
               });
           })
           .catch(err => console.log(err))

}


















