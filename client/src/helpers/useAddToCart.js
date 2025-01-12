import { useDispatch, useSelector } from "react-redux";
import { addCart, countCartProduct } from "../redux/slice/cart-slice";
import { message } from "antd";

const useAddToCart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCart = async (id) => {
    const response = await dispatch(addCart(id));
    console.log("Add to Cart Response:", response);
    if (response.type === addCart.fulfilled.type) {
      dispatch(countCartProduct());
      message.success(response.payload?.message || "Product added to cart!");
    } else {
        message.error(response.payload?.message || "Failed to add product to cart.");
    }
  };

  return addToCart;
};

export default useAddToCart;
