import AxiosInstance from './../axiosInstance/axiosInstance';
const cartService={
    addToCart : async (payload, token) => {
  return await AxiosInstance.post(`/cart/add`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

getCart: async (token) => {
  return await AxiosInstance.get(`/cart/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},

removeFromCart :async (productId, token) => {
  return await AxiosInstance.delete(`/cart/remove/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},


 clearCart : async (token) => {
  return await AxiosInstance.delete(`/cart/clear`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
},
}
export default cartService


