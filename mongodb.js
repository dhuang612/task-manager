
const {MongoClient, ObjectID} = require('mongodb');


connectionURL = 'mongodb://127.0.0.1:27018';
const databaseName = 'task-manager'; 

//original method is being deprecated 
MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client ) => {
    if(error){
        return console.log('there was an error');
    } 
    const db = client.db(databaseName)
    db.collection('tasks').updateMany({completed: false}, {$set: {
        completed: true
    }}).then((result)=> {
        console.log(result)
    }).catch((error)=> {console.log(error)})
});
