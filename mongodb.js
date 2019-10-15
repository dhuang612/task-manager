
const {MongoClient, ObjectID} = require('mongodb');


connectionURL = 'mongodb://127.0.0.1:27018';
const databaseName = 'task-manager'; 

//original method is being deprecated 
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client ) => {
    if(error){
        return console.log('there was an error');
    }
    const db = client.db(databaseName)
//we need to use new
    db.collection('users').findOne({_id : new ObjectID("5da5fd2e148474b454e9fcce")}, (error, id) => {
        if(error){
            return console.log('unable to connect')
        }
        console.log(id)
    })
       
    db.collection('tasks').find({completed: false}).toArray((error, completed) => {
        if(error){
            return console.log('unable to connect')
        }
        console.log(completed);
    })
});
