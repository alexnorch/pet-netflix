import { createSlice } from "@reduxjs/toolkit";

const initialData = JSON.parse(localStorage.getItem('userData'))

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        userId: null,
        movieList: [],
        userEmail: initialData?.userEmail,
        authToken: initialData?.token,
        isLogged: initialData?.token ? true : false
    },
    reducers: {
        login: (state, { payload }) => {
            state.authToken = localStorage.setItem('userData', JSON.stringify({
                token: payload.token,
                userEmail: payload.userEmail
            }))

            state.isLogged = true
            state.userId = payload.userId
            state.userEmail = payload.userEmail

        },
        logout: (state) => {
            state.authToken = localStorage.removeItem('userData')
            state.isLogged = false;
            state.userId = null;
            state.userEmail = null;
        },
        addItem: (state, { payload }) => {
            state.movieList.push(payload)
        },
        deleteItem: (state, { payload }) => {
            state.movieList = [...state.movieList.filter(item => item.id !== payload)]
        }
    }
})

export default profileSlice.reducer
export const { login, logout, addItem, deleteItem } = profileSlice.actions