const mongoose = require('mongoose');

mongoose.set('debug', false);
const databaseLoader = async() =>{

    try {
        await mongoose.connect(String(process.env.DB_STRING), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('***  DB Connected😀  ***');
        
    } catch (error) {
        console.log(`error while connecting to db: ${error}`);
        throw new Error(error) 
    }
}

module.exports = databaseLoader;
