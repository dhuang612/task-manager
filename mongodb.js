
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

    db.collection('tasks').insertMany([
        {
            description: 'Go buy groceries',
            completed: true
    }, {
        description: 'Get toothpaste',
        completed: false
    },
    {
        description: 'Make more friends',
        completed: false
    }
    ],(error, result) => {
        if(error){
            return console.log('could not insert new documents!');
        }
        console.log(result.ops);
    })
});


/*
Goal: insert 3 tasks into a new tasks collection

use insertMany to insert three documents 
    -description (string), completed (boolean) make some true and some false
setup the callback to handle error or print ops
Run the script
refresh db and confimr the data is in task collection

*/