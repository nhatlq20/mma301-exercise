import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
    name: 'tasks',
    initialState: [
        { id: '1', text: 'Học React Native State', done: false },
        { id: '2', text: 'Thực hành Redux Toolkit (SDK 57)', done: true },
    ],
    reducers: {
        add: (state, action) => {
            state.unshift({
                id: Date.now().toString(),
                text: action.payload,
                done: false,
            });
        },
        toggle: (state, action) => {
            const task = state.find((t) => t.id === action.payload);
            if (task) {
                task.done = !task.done;
            }
        },
        remove: (state, action) => {
            return state.filter((t) => t.id !== action.payload);
        },
    },
});

export const { add, toggle, remove } = taskSlice.actions;
export default taskSlice.reducer;