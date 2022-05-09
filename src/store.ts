import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import studentsSlice from './students/slices/studentsSideCoordinatorSlice'
import coordinatorsSlice from './coordinators/slices/coordinatorsSideStudentSlice'

const reducer = combineReducers({
    studentsSlice,
    coordinatorsSlice
})

const store = configureStore({
    reducer,
})

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch