import mongoose from "mongoose"

const dbConnection = async()=>{

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN,{
            userNewUrlPArse: true,
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });



    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}

export {
    dbConnection
}