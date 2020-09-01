import { combineReducers } from "redux"
import authReducer from "app/auth/store/authSlice"

export default combineReducers({
    auth: authReducer,
})
