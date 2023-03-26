import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  const AR = process.env.REACT_APP_API_REF;
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${AR}/auth/login`, userCredentials);

    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err});
    return err
  }
};
