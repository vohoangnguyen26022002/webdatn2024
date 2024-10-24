import axios from "axios";
import { changePasswordFailed, changePasswordStart, changePasswordSuccess, loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess, PostUnlockHistoryFailed, PostUnlockHistoryStart, PostUnlockHistorySuccess, registerFailed, registerStart, registerSuccess } from "./authSlice";
import { deleteUserStart, deleteUserSuccess, deteleUserFailed, getPassHistoryFailed, getPassHistoryStart, getPassHistorySuccess, getUsersFailed, getUserStart, getUserSuccess, UpdateUserFailed, UpdateUserStart, UpdateUserSuccess } from "./userSlice";
import { createAxios } from "../createInstance";

export const loginUser = async(user,dispatch,navigate) =>{
    dispatch(loginStart());
    try {
        const res = await axios.post("/v1/auth/login", user);
        dispatch(loginSuccess(res.data));
        localStorage.setItem('accessToken', res.data.accessToken);
        navigate("/");
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = async(user,dispatch,navigate) =>{
    dispatch(registerStart());
    try {
        await axios.post("/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get("/v1/user", {
            headers: {token: `Bearer ${accessToken}`},
        });
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        dispatch(getUsersFailed());
    }
};

export const logOut = async(dispatch, id, navigate, accessToken, axiosJWT) =>{
    dispatch(logOutStart());
    try{
        await axiosJWT.post("/v1/auth/logout", id, {
            headers: {token: `Bearer ${accessToken}`}
        });
        dispatch(logOutSuccess());
        navigate("/login");
    } catch(error){
        dispatch(logOutFailed());
    } 
};

export const deleteUser = async (accessToken, dispatch, id) => {
    dispatch(deleteUserStart());
    try {
        const res = await axios.delete("/v1/user/" + id, {
            headers: {token: `Bearer ${accessToken}`},
        });
        dispatch(deleteUserSuccess(res.data))
    } catch (error) {
        dispatch(deteleUserFailed(error.response.data));
    }
};

export const changePassword = async (dispatch, payload, accessToken) => {
    dispatch(changePasswordStart());

    try {
        const res = await axios.put("/v1/auth/changePassWord", payload, {
            headers: {token: `Bearer ${accessToken}`}
        });
        dispatch(changePasswordSuccess(res.data));
    } catch (error) {
        dispatch(changePasswordFailed());
        throw new Error("Password change failed.");
    }
};

export const updateUserStatus = async (accessToken, dispatch, id, can_open) => {
    dispatch(UpdateUserStart());
    try {
        const res = await axios.put(`/v1/user/${id}`, { can_open }, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(UpdateUserSuccess(res.data));
    } catch (error) {
        dispatch(UpdateUserFailed(error.response.data));
    }
};

export const PostUnlockHistory = async (accessToken, dispatch,unlockTime, email) => {
    dispatch(PostUnlockHistoryStart());

    try {
        const res = await axios.post("/v1/auth/historyPassLock", { email, unlockTime }, {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(PostUnlockHistorySuccess(res.data));
    } catch (error) {
        dispatch(PostUnlockHistoryFailed());
        throw new Error("Failed to log unlock history.");
    }
};


export const getPassWordHistory = async (accessToken, dispatch) => {
    dispatch(getPassHistoryStart()); // Dispatch start action
    try {
        const res = await axios.get("/v1/user/passwordhistory", {
            headers: { token: `Bearer ${accessToken}` },
        });
        dispatch(getPassHistorySuccess(res.data)); 
    } catch (error) {
        dispatch(getPassHistoryFailed());
        throw new Error("Failed to fetch password history.");
    }
};
