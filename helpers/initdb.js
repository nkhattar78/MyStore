import mongoose from 'mongoose';

function initDB() {
    console.log('Number of DB connections: ' + mongoose.connections.length )
    if (mongoose.connections[0].readyState) {
        console.log("DB already connected");
        return;        
    }

    mongoose.connect('mongodb://127.0.0.1:27017/storedb', { useNewUrlParser: true, useUnifiedTopology: true});
    //mongoose.connect('mongodb+srv://admin:Namaste78@testcluster.n3ium.mongodb.net/storedb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
    //mongodb+srv://admin:Namaste78@testcluster.n3ium.mongodb.net/storedb?retryWrites=true&w=majority
    mongoose.connection.on('connected', ()=> {
        console.log("DB connected")
    })
    mongoose.connection.on('error', (err)=> {
        console.log("Error while connecting to  DB " + err);
    })

    // const connection = mongoose.connection;
    
    // connection.once('open', function() {
    //     console.log("MongoDB database connection established successfully");
    // });       
}

export default initDB;
