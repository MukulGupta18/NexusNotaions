const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://mukul22scse2030209:mukul@cluster0.xfzojj8.mongodb.net/"

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI)
        console.log('Mongo connected')
    }
    catch (error) {
        console.log(error)
        process.exit()
    }
}
module.exports = connectToMongo;