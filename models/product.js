// this function call database and with method .getDb to interact with database
const getDb = require('../utility/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(title, price, description, imageUrl, id, userId) {

        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectID(id) : null;
        this.userId = userId;
    }

    save() {
        const db = getDb();

        // for db operations
        let dbOp;


        if (this._id) {
            // Update the product
            dbOp = db.collection('products')
                     .updateOne(
                         {_id: this._id},
                         // second argument specify how to update this element
                         // $set is special property name which is understood by mongodb
                         {$set: this}
                     );
        } else {
            dbOp = db.collection('products').insertOne(this);
        }

        return dbOp
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        // by calling getDb() we are getting access to mongodb database
        const db = getDb();

        return db
            .collection('products')
            //find() is mongodb method which returns all product
            // important about the method find(), it's not immediately returns
            // a promise though instead it returns so-called cursor
            // a cursor is an object provided by mongodb which allow us to go through our elements
            // step by step, because theoretically in a collection find() could of course return millions
            // of documents and to avoid transfer them over the wire all at once. So instead find gives
            // you a handle which you can use to tell to give you the particular document of collection
            .find()
            // a toArray() mongodb method tell mongodb to get all particular documents and turn them into JS array
            // this method should be used only that we want to get only a couple of dozens or maybe one hundred documents
            // otherwise it's better to implement pagination method
            .toArray()
            .then(products => {
                console.log(products);

                return products
            })
            .catch(err => {
                console.log(err);
            })
    }

    static findById(prodId) {

        const db = getDb();

        return db
            .collection('products')
            .find({_id: new mongodb.ObjectID(prodId)})
            // the next()a mongodb method to get a next and in this case here also
            // the last document that was returned by find() method here
            .next()
            .then(product => {
                console.log(product);

                return product;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(prodId) {
        const db = getDb();

        return db
            .collection('products')
            .deleteOne({_id: new mongodb.ObjectId(prodId)})
            .then(result => {
                console.log(`DELETED prodId: ${prodId}`)
            })
            .catch(err => {
                console.log(err);
            });
    }

}


module.exports = Product;