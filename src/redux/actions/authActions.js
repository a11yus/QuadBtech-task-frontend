import * as types from "../actionTypes";

export const login = (role) => {
  console.log("User Login role:", role); // Log the role here
  return {
    type: types.LOGIN_SUCCESS,
    payload: { role },
  };
}; 

export const adminLogin = (role) => {
  console.log("Admin login role:", role); // Log the role here
  return {
    type: types.ADMIN_LOGIN_SUCCESS,
    payload: { role },
  };
};

export const logout = () => ({
  type: types.LOGOUT,
});
