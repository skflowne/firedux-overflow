import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { Question, QuestionPayload, createQuestion, getQuestions } from "api/questions.service"
import { RootState } from "app/store"

interface QuestionsState {
    questionsById: Record<string, Question>
    creating: {
        loading: boolean
        error: Error | null
    }
    fetching: {
        loading: boolean
        error: Error | null
    }
}

const initialState: QuestionsState = {
    fetching: {
        loading: false,
        error: null,
    },
    questionsById: {},
    creating: {
        loading: false,
        error: null,
    },
}

export const postQuestion = createAsyncThunk("questions/create", async (payload: QuestionPayload) => {
    const res = await createQuestion(payload)
    return res
})

export const fetchQuestions = createAsyncThunk("questions/fetch", async () => {
    return await getQuestions()
})

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchQuestions.pending.type]: (state) => {
            state.fetching = {
                loading: true,
                error: null,
            }
        },
        [fetchQuestions.fulfilled.type]: (state, { payload }: PayloadAction<Question[]>) => {
            state.fetching = {
                loading: false,
                error: null,
            }

            payload.forEach((question) => (state.questionsById[question.id] = question))
        },
        [fetchQuestions.rejected.type]: (state, { error }) => {
            state.fetching = {
                loading: false,
                error,
            }
        },
        [postQuestion.pending.type]: (state) => {
            state.creating = {
                loading: true,
                error: null,
            }
        },
        [postQuestion.fulfilled.type]: (state, { payload }: PayloadAction<Question>) => {
            state.creating = {
                loading: false,
                error: null,
            }

            if (payload.id) {
                state.questionsById[payload.id] = payload
            }
        },
        [postQuestion.rejected.type]: (state, { error }) => {
            state.creating = {
                loading: false,
                error,
            }
        },
    },
})

export const selectCreating = (state: RootState) => state.questions.creating
export const selectFetching = (state: RootState) => state.questions.fetching
export const selectAllQuestions = (state: RootState) => {
    const questionsById = state.questions.questionsById
    return Object.values(questionsById)
}

export default questionsSlice.reducer
