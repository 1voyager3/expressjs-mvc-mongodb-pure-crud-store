const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
     //put appropriate mongodb url
    MongoClient.connect(
        ''
    )
     .then( client => {
         console.log('CONNECTED TO MongoDB!');

         _db = client.db();

         callback();
     })
     .catch( err => {
         console.log(err);

         throw err;
     });
}

const getDb = () => {
    if (_db) {
        return _db;
    }

    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
