
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

connectionURL = 'mongodb://127.0.0.1:27018';
const databaseName = 'task-manager'; 

//original method is being deprecated 
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client ) => {
    if(error){
        return console.log('there was an error');
    }
    const db = client.db(databaseName)

    db.collection('users').insertOne({
        name: 'Dan',
        age: 27
    });
});