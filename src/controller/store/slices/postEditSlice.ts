import { createSlice } from '@reduxjs/toolkit';

export interface EditPostState {
  value: {
    intro?: string;
    content: string;
    isEdited: boolean;
  };
}

const initialState: EditPostState = {
  value: {
    intro: '',
    content: '',
    isEdited: false,
  },
};

export const postEditSlice = createSlice({
  name: 'postEdit',
  initialState,
  reducers: {
    setPostInfo: (state, action) => {
      const { type, text } = action.payload;
      if (type === 'intro') {
        state.value = { ...state.value, intro: text };
      } else {
        state.value = { ...state.value, content: text };
      }
    },
    setIsEdited: (state) => {
      state.value.isEdited = true;
    },
    resetPost: () => initialState,
  },
});

export const { setPostInfo, setIsEdited, resetPost } = postEditSlice.actions;

export default postEditSlice.reducer;
