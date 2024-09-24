'use client';

import Image from "next/image";
import styles from "./Products.css";
import {useEffect, useState} from "react";
import axios from 'axios';

export default function Products() {

  const [products,set_products] = useState([]);
  const [positions,set_positions] = useState({
    top_of_create_new_product_input_area: "-100vh",
    top_of_update_product_input_area: "-100vh"
  });
  const [new_product_infos,set_new_product_infos] = useState({
  });

  const [old_product_info,set_old_product_info] = useState();

  const [update_product_infos,set_update_product_infos] = useState({
  });

// --------------------------------------------------------------------------------CRUD----------------------------------------------------------------------------------

  useEffect(()=>{
    axios.get("http://localhost:5000/products")
    .then((res)=>{
      set_products(res.data);
    })
    .catch(err=>{
      console.log(err.message);
    });
  },[]);

  const create_new_product = (new_product)=>{
    if(new_product.product_name !== "" && new_product.product_price !== ""){
        axios.post("http://localhost:5000/products",new_product_infos)
        .then((res)=>{
          set_products([...products,res.data.product]); 
          set_new_product_infos((old)=>({product_name : "", product_price: ""}))
        })
        .catch(err=>{
          console.log(err.message);
        });

    }
    else{
      alert("Invalid Input!");
    }
  };

  const update_product = (update_product)=>{
    axios.patch(`http://localhost:5000/products/${update_product._id}`,update_product)
    .then((res)=>{
      const new_list = products.map(item => 
        item._id === update_product._id ? update_product : item
      );
      set_products(new_list);
    })
    .catch(err=>{
      console.log(err.message);
    });
  }

  const delete_product = (product)=>{
    axios.delete(`http://localhost:5000/products/${product._id}`)
    .then((res)=>{
      set_products((oldProduct) => oldProduct.filter(item => item._id !== product._id));
    })
    .catch(err=>{
      console.log(err.message);
    });
  };

// --------------------------------------------------------------------------------CRUD----------------------------------------------------------------------------------
  const check_valid_update_input = (infos)=>{
    if(infos.product_name === ""){ set_update_product_infos(product_info => ({ ...product_info, product_name: old_product_info.product_name})); } if(infos.product_price === ""){ set_update_product_infos(product_info => ({ ...product_info, product_price: old_product_info.product_price})); }
  };

  const handle_update_product_infos = (infos)=>{
    update_product(update_product_infos)

  }

  return (
    <div className="Products">
      
      <div className="nevigations_display_area">
        <div className="logo_area"></div>
        <div className="gap_area"></div>
        <div className="buttons_area">
          <div className="create_product_button" onClick={()=>{ set_positions((positions)=>({...positions,top_of_create_new_product_input_area: "20vh"})); }}>+</div>
          <div className="extra_button"></div>
        </div>  
      </div>


      <div className="products_display_area">
        {
          products.map((product,index)=>{
            return (<div key={index} className="singal_product">{product.product_name} {product.product_price}
                      <div className="singal_product_delete_button" onClick={()=>{ delete_product(product) }}>Delete</div>
                      <div className="singal_product_update_button" onClick={()=>{  set_positions((positions)=>({...positions,top_of_update_product_input_area: "20vh"}));set_old_product_info(product) ; set_update_product_infos(product); }}>Update</div>
                    </div>);
          })
        }
      </div>

      <div className="create_new_product_input_area" style={{ top: positions.top_of_create_new_product_input_area }}>
        <div className="exit_create_new_product_input_area" onClick={()=>{ set_positions((positions)=>({...positions,top_of_create_new_product_input_area: "-100vh"})); }}>+</div>

        <div className="input_fields_in_create_new_product_input_area">
          <input type="text" placeholder="Enter Name" onChange={(e)=>{ e.preventDefault(); set_new_product_infos(product_info => ({ ...product_info, product_name: e.target.value})) }} value={new_product_infos.product_name} className="input_in_create_new_product_input_area name_of_new_product" />
          <input type="number" placeholder="Enter Price" onChange={(e)=>{ e.preventDefault(); set_new_product_infos(product_info => ({ ...product_info, product_price: e.target.value})) }} value={new_product_infos.product_price} className="input_in_create_new_product_input_area price_of_new_product"/>
          <div className="add_new_product_btn" onClick={()=>{ create_new_product(new_product_infos) }}>Add Product</div>
        </div>
      </div>

      <div className="update_product_input_area" style={{ top: positions.top_of_update_product_input_area }}>
        <div className="exit_update_product_input_area" onClick={()=>{ set_positions((positions)=>({...positions,top_of_update_product_input_area: "-100vh"})); }}>+</div>

        <div className="input_fields_in_update_product_input_area">
          <input type="text" placeholder="Enter Name" onChange={(e)=>{ e.preventDefault(); set_update_product_infos(product_info => ({ ...product_info, product_name: e.target.value})) }} value={update_product_infos.product_name} className="input_in_update_product_input_area name_of_update_product" />
          <input type="number" placeholder="Enter Price" onChange={(e)=>{ e.preventDefault(); set_update_product_infos(product_info => ({ ...product_info, product_price: e.target.value})) }} value={update_product_infos.product_price} className="input_in_update_product_input_area price_of_update_product"/>
          <div className="update_product_btn" onClick={()=>{update_product(update_product_infos); set_positions((positions)=>({...positions,top_of_update_product_input_area: "-100vh"})); }}>Update Product</div>
        </div>
      </div>

    </div>
  );
}


