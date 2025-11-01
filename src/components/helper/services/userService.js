import AxiosInstance from './../axiosInstance/axiosInstance';
const userService={
registerUser:async (payload)=>{
    let {data}=await AxiosInstance.post("/auth/register",payload,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
    })
    return data
},
loginUser:async (payload)=>{
    let {data}=await AxiosInstance.post("/auth/login",payload)
    return data
},
updateProfile: async (id,payload,token)=>{
    let {data}=await AxiosInstance.put(`/auth/updateProfile/${id}`,payload,{
        headers:{  
              "Content-Type": "multipart/form-data", 
                Authorization: `Bearer ${token}`,
            },
        });
    return data
},


}
export default userService