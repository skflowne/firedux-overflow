import { combineReducers } from "redux"
import authReducer from "features/auth/store/authSlice"
import questionsReducer from "features/questions/store/questionsSlice"

export default combineReducers({
    auth: authReducer,
    questions: questionsReducer,
})
