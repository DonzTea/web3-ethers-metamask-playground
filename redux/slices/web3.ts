import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import Web3 from 'web3';

interface Web3State {
  networkID: number | undefined;
}

const initialState: Web3State = {
  networkID: undefined,
};

export const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    setNetworkID: (state, action: PayloadAction<number | undefined>) => {
      state.networkID = action.payload;
    },
  },
});

export const { setNetworkID } = web3Slice.actions;

export default web3Slice.reducer;
