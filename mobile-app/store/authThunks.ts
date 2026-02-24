import { api } from "@/services/api";
import * as SecureStore from "expo-secure-store";
import { setCredentials, setLoading, setError } from "./authSlice";

export const registerUser = () => async (dispatch: any) => {
  try {
    dispatch(setLoading(true));
    dispatch(setError(null));

    const registerRes = await api.post("/register", {
      name: "Test User",
      email: "test@mail.com",
      passportImage: "x",
      selfieImage: "x",
    });

    const did = registerRes.data.did;

    const authRes = await api.post("/auth", { did });

    const token = authRes.data.token;

    await SecureStore.setItemAsync("token", token);

    dispatch(
      setCredentials({
        token,
        vc: registerRes.data.vc,
      }),
    );
  } catch (err: any) {
    dispatch(setError(err.response?.data?.message || "Registration failed"));
  } finally {
    dispatch(setLoading(false));
  }
};
