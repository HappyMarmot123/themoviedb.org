import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IdState {
  sessionId: string;
  accountId: string;
  username: string;
}

const initialState: IdState = {
  sessionId: "",
  accountId: "",
  username: "",
};

const IdSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
    setAccountId: (state, action: PayloadAction<string>) => {
      state.accountId = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setSessionId, setAccountId, setUsername } = IdSlice.actions;
export default IdSlice.reducer;
