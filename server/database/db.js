import mongoose from "mongoose";

const Connection=async()=>{
    const URL=`mongodb+srv://root:root@docsclone.cwqf4tv.mongodb.net/docsclone?retryWrites=true&w=majority&appName=docsclone`;

    try{
        await mongoose.connect(URL,{useUnifiedTopology:true,useNewUrlParser:true});
        console.log('connected database');
    }catch(error){
        console.log("error while connecting",error)
    }

}

export default Connection;