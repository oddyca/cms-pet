import { createSlice } from '@reduxjs/toolkit';

type UpdateImageState = {
  value: { image: string };
};

const initialState: UpdateImageState = {
  value: { image: '' },
};

export const updateImageSlice = createSlice({
  name: 'updateImage',
  initialState,
  reducers: {
    setImage: (state, action) => {
      const inputElem = action.payload;
      state.value = { image: inputElem };
    },
    resetImage: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { setImage, resetImage } = updateImageSlice.actions;

export default updateImageSlice.reducer;
