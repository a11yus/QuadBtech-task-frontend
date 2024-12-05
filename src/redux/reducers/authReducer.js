const initialState = {
  isUserLoggedIn: localStorage.getItem("authToken") ? true : false,
  isAdmin: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAdmin: action.payload.role,
      };
    case "ADMIN_LOGIN_SUCCESS":
      return {
        ...state,
        isAdmin: action.payload.role,
      };
    case "LOGOUT":
      return { ...state, isUserLoggedIn: false, isAdmin: false, user: null };
    default:
      return state;
  }
};

export default authReducer;
