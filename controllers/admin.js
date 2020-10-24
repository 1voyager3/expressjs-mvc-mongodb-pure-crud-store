const Product = require('../models/product');


exports.getAddProduct = (request, response, next) => {

    response.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddproduct = (request, response, next) => {

    const title = request.body.title;
    const imageUrl = request.body.imageUrl;
    const price = request.body.price;
    const description = request.body.description;

    const product = new Product(
        title,
        price,
        description,
        imageUrl,
        null,
        request.user._id
    );

    product.save()
           .then(result => {
               console.log('Created product');

               response.redirect('/admin/products');
           })
           .catch(err => {
               console.log(err);
           });


}

exports.getEditProduct = (request, response, next) => {

    const editMode = request.query.edit;

    if (!editMode) {
        return response.redirect('/');
    }

    //params property is from router.get('/edit-product/:productId', adminController.getEditProduct)
    // located in controllers/admin.js
    // :productId is a value of params property
    const prodId = request.params.productId;

    Product.findById(prodId)
           .then(product => {

               if (!product) {
                   return response.redirect('/');
               }

               response.render('admin/edit-product', {
                   pageTitle: 'Edit Product',
                   path: '/admin/edit-product',
                   editing: editMode,
                   product: product
               });
           }).catch(err => {
        console.log(err)
    })
};


exports.postEditProduct = (request, response, next) => {
    const prodId = request.body.productId;
    const updatedTitle = request.body.title;
    const updatedPrice = request.body.price;
    const updatedDesc = request.body.description;
    const updatedImageUrl = request.body.imageUrl;


    const product = new Product(
        updatedTitle,
        updatedPrice,
        updatedDesc,
        updatedImageUrl,
        prodId
    );

    product.save()
           .then(result => {
               console.log('UPDATED PRODUCT!');

               response.redirect('/admin/products');
           })
           .catch(err => console.log(err));

}

exports.getProducts = (request, response, next) => {

    Product.fetchAll()
           .then(products => {

               response.render('admin/products', {
                   prods: products,
                   pageTitle: 'Admin Products',
                   path: '/admin/products'
               });
           })
           .catch(err => console.log(err));

}

exports.postDeleteProduct = (request, response, next) => {

    const prodId = request.body.productId;

    Product.deleteById(prodId)
           .then(result => {
               console.log(`DELETED PRODUCT WITH ID ${prodId}`);

               response.redirect('/admin/products');
           })
           .catch(err => console.log(err));

}

















