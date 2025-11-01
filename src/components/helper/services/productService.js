import AxiosInstance from './../axiosInstance/axiosInstance';

const productService={
    getAllProducts:async()=>{
    let {data}=await AxiosInstance.get(`/products/all`)
    return data
},

addProduct:async(payload,token)=>{
    let {data}=await AxiosInstance.post(`/products/add`,payload,{
        headers:{
            "Content-Type": "multipart/form-data",
             Authorization: `Bearer ${token}`,
             },
            });
    return data 
},

    
}
export default productService