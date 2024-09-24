import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

export const connectDB = ()=>{
	try{
		const connect = mongoose.connect(process.env.MONGO_URI);
		console.log("Mongo Database connected " );
	}
	catch(error){
		console.error("Error : ", error);
		process.exit(1);
	}
}