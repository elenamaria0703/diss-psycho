import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import studentsSlice from './students/slices/studentsSideCoordinatorSlice'

const reducer = combineReducers({
    studentsSlice,
})

const store = configureStore({
    reducer,
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch