import mongoose from 'mongoose';

function initDB() {
    //mongoose.connection.close();    
    console.log('Number of DB connections: ' + mongoose.connections.length )
    if (mongoose.connections[0].readyState) {
        console.log("DB already connected");
        return;        
    }

    //mongoose.connect('mongodb://127.0.0.1:27017/storedb', { useNewUrlParser: true, useUnifiedTopology: true});
    //mongoose.connect('mongodb+srv://nkhattar:F8pv1dqOxWu4xuRK@cluster0.ai6zo.mongodb.net/storedb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.connect('mongodb://nkhattar:Namaste@clusternk-shard-00-00.ai6zo.mongodb.net:27017,clusternk-shard-00-01.ai6zo.mongodb.net:27017,clusternk-shard-00-02.ai6zo.mongodb.net:27017/storedb?ssl=true&replicaSet=atlas-4qz547-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
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
