import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  did: string | null;
  vc: any | null;
  token: string | null;
  auditHash: string | null;
}

const initialState: WalletState = {
  did: null,
  vc: null,
  token: null,
  auditHash: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletData(state, action: PayloadAction<any>) {
      state.did = action.payload.did;
      state.vc = action.payload.vc;
      state.token = action.payload.token;
    },
    setAuditHash(state, action: PayloadAction<string>) {
      state.auditHash = action.payload;
    },
  },
});

export const { setWalletData, setAuditHash } = walletSlice.actions;
export default walletSlice.reducer;
