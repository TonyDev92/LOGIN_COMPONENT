import {configureStore , createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({

    initial_name : 'auth',
    initialState : {
        isLoggedIn: false,
        token: null
    },
    reducers: {
        logginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
        },

        loggout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        }
    }
});
