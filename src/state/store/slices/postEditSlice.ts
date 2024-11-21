import { createSlice } from '@reduxjs/toolkit';

export interface EditPostState {
  value: {
    title: string;
    tag: string;
    author: string;
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
        state.value = { ...state.value, intro: text, title, author, tag };
      } else if (type === 'content') {
        state.value = { ...state.value, content: text, title, author, tag };
      } else {
        state.value = { ...state.value, title, author, tag };
      }
    },
  },
});

export const { setPostInfo } = postEditSlice.actions;

export default postEditSlice.reducer;
