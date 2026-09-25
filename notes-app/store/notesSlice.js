import { createSlice } from '@reduxjs/toolkit';

const notesSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        setNotes: (state, action) => {
            return action.payload;
        },
        addNote: (state, action) => {
            state.unshift({
                id: Date.now().toString(),
                content: action.payload,
                createdAt: new Date().toLocaleTimeString(),
            });
        },
        deleteNote: (state, action) => {
            return state.filter((note) => note.id !== action.payload);
        },
    },
});

export const { setNotes, addNote, deleteNote } = notesSlice.actions;
export default notesSlice.reducer;