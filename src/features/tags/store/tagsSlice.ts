import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { Tag, getTagsQuery } from "api/tags.service"
import { RootState } from "app/store"

interface TagsState {
    tagsById: Record<string, Tag>
    matching: {
        loading: boolean
        error: Error | null
    }
    matchingTags: Tag[]
}

const initialState: TagsState = {
    tagsById: {},
    matching: {
        loading: false,
        error: null,
    },
    matchingTags: [],
}

export const fetchMatchingTags = createAsyncThunk("tags/getMatchingTags", async (search: string) => {
    return await getTagsQuery([
        ["name", ">=", search],
        ["name", "<=", search + "\uf8ff"],
    ])
})

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchMatchingTags.pending.type]: (state) => {
            state.matching = {
                loading: true,
                error: null,
            }
        },
        [fetchMatchingTags.fulfilled.type]: (state, { payload }: PayloadAction<Tag[]>) => {
            state.matching = {
                loading: false,
                error: null,
            }

            state.matchingTags = payload

            payload.forEach((tag: Tag) => {
                state.tagsById[tag.id] = tag
            })
        },
        [fetchMatchingTags.rejected.type]: (state, { error }) => {
            state.matching = {
                loading: false,
                error,
            }
        },
    },
})

export const selectMatchingTags = (state: RootState) => state.tags.matchingTags
export const selectMatchingState = (state: RootState) => state.tags.matching

export default tagsSlice.reducer
