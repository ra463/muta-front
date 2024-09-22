import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosUtils";

export const getKey = async (dispatch, setKey, token) => {
  try {
    const { data } = await axiosInstance.get(`/api/order/get-key`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      setKey(data.key);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
};
