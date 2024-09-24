import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
	productId : {type : String, required : false},
	product_name : {type : String, required : true},
	product_price : {type : String, required : true}
});


const Product = mongoose.model("Product", productSchema);
export default Product;