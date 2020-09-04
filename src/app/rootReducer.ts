import { combineReducers } from "redux"
import authReducer from "features/auth/store/authSlice"
import questionsReducer from "features/questions/store/questionsSlice"
import tagsReducer from "features/tags/store/tagsSlice"

export default combineReducers({
    auth: authReducer,
    questions: questionsReducer,
    tags: tagsReducer,
})
