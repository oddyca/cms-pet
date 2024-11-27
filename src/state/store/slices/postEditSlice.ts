import { createSlice } from '@reduxjs/toolkit';

export interface EditPostState {
  value: {
    title: string;
    author: string;
    tag: string;
    intro?: string;
    content: string;
  };
}

const initialState: EditPostState = {
  value: {
    title: '',
    author: '',
    tag: '',
    intro: '',
    content: '',
  },
};

export const postEditSlice = createSlice({
  name: 'postEdit',
  initialState,
  reducers: {
    setPostInfo: (state, action) => {
      const { type, text, title, author, tag } = action.payload;
      if (type === 'intro') {
        state.value = { ...state.value, intro: text };
      } else if (type === 'content') {
        state.value = { ...state.value, content: text };
      } else {
        state.value = { ...state.value, title, author, tag };
      }
    },
    resetPostInfo: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setPostInfo, resetPostInfo } = postEditSlice.actions;

export default postEditSlice.reducer;
