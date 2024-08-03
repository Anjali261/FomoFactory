

import mongoose from 'mongoose';



const Connection = async() =>{
    const URL=  `mongodb+srv://mail2anjalisingh2610:mzivxm5EiDpm23e1@cluster0.ybo0zd5.mongodb.net/`
    try{
       await  mongoose.connect(URL, {
        // useNewUrlParser:true,
    });
        console.log('Database Connected Successfully');

    }catch(error){
        console.log('Error while Connecting with the database ');
    }
}

export default Connection;
Connection();

