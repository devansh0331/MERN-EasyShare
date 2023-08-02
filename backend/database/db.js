const mongoose = require('mongoose')

const DBConnection = async () => {
    const MONGO_URL = 'mongodb+srv://devansh0331:8982660233@cluster0.eppfmtt.mongodb.net/?retryWrites=true&w=majority'
    try{
        await mongoose.connect(MONGO_URL, {useNewUrlParser: true})
        console.log('Database connected successfully');
    }
    catch(error){
        console.error("Error while connecting the server: " + error.message);
    
    }
}

module.exports = DBConnection