import AxiosInstance from './../axiosInstance/axiosInstance';
const userService={
registerUser:async (payload)=>{
    let {data}=await AxiosInstance.post("/auth/register",payload,{
    headers: {
      "Content-Type": "multipart/form-data",
    },
    })
    return data
}
}


export default userService