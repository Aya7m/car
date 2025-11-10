import mongoose from "mongoose";

export const dbConnection=async()=>{
    try {
        
     const connected=  await mongoose.connect(process.env.MONGO_URL)
     if(connected){
        return console.log("database connected successfully ...");
        
     }
     else{
        return console.log("error in db Connection");
        
     }
    } catch (error) {
        console.log(error);
        
        
    }
}