import Cookies from "js-cookie";

const tokenMiddleware = ({ dispatch }) => next => action => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Prevent infinite loop by skipping already dispatched actions
  if (!token) {
    if (action.type !== 'wishlist/resetWishlist' && action.type !== 'customerData/clearCustomerData') {
      dispatch({ type: 'wishlist/resetWishlist' });
      dispatch({ type: 'customerData/clearCustomerData' });
      Cookies.remove("token");
    }
  }

  return next(action);
};

export default tokenMiddleware;
