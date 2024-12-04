import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const registerUser = createAsyncThunk(
    "/auth/register",
    async (formData) => {
        const response = await axios.post(
            "http://localhost:5000/api/auth/register",
            formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
);

// khi người dùng đăng nhập gửi 1 yêu cầu post đến server => đến bên auth-controller xử lý => nhận phản hồi từ loginUser bên controller
//  xong xuống thực hiện ở extraReducer
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
    const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
            withCredentials: true,
        }
    );
    return response.data;
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
    const response = await axios.post(
        "http://localhost:5000/api/auth/logout", {},

        {
            withCredentials: true,
        }
    );
    return response.data;
});


export const checkAuth = createAsyncThunk('/auth/CheckAuth', async () => {
    const response = await axios.get(
        "http://localhost:5000/api/auth/check-auth",
        {
            withCredentials: true,
            headers: {
                "Cache-Control": 'no-store, no-cache, must-revalidate, proxy-revalidate',
                Expires: '0'
            }
        }
    );
    return response.data;
})

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: (builder) => {
        builder

            // điều kiện đăng ký
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false; // Dừng trạng thái tải
                state.user = null; // Đặt user là null (không đăng nhập ngay sau khi đăng ký)
                state.isAuthenticated = false; // Không xác thực (chỉ đăng ký, chưa đăng nhập)
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })


            // điều kiện đăng nhập

            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })


            // kiểm tra token 
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {

                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })

            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            // điều kiện đăng xuất

            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })

    },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
