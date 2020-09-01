import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Question {
    id: string
    title: string
    description: string
    user_id: string | null
}

interface QuestionsState {
    questionsById: Record<string, Question>
}

const initialState: QuestionsState = {
    questionsById: {},
}

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
})

export default questionsSlice.reducer
