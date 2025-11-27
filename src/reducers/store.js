import { configureStore} from "reduxjs/toolkit";
import counterReducer from "./counterSlice";
import authReducer from "./authReducer";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        authReducer: authReducer,
    },
});