const mongoose = require("mongoose");

const MONGO_URL = "mongodb://localhost/proyectoAydS";

const db = async () => {
    await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Db running"))
    .catch((error) => console.error(error));
};

module.exports = db




  
    
