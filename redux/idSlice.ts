import AsyncStorage from "@react-native-async-storage/async-storage";
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
    initializeState: (state, action: PayloadAction<Partial<IdState>>) => {
      Object.assign(state, action.payload);
    },
  },
});

// 엔트리 or 루트 파일에 해당 함수를 실행합니다. (예: app/_layout.tsx)
export const loadStoredData = () => async (dispatch: any) => {
  try {
    const [sessionId, accountId, username] = await Promise.all([
      AsyncStorage.getItem("sessionId"),
      AsyncStorage.getItem("accountId"),
      AsyncStorage.getItem("username"),
    ]);

    dispatch(
      initializeState({
        sessionId: sessionId || "",
        accountId: accountId || "",
        username: username || "",
      })
    );
  } catch (error) {
    console.error("AsyncStorage 데이터 로드 실패:", error);
  }
};

export const clearStoredData = () => async (dispatch: any) => {
  try {
    AsyncStorage.clear();
    dispatch(
      initializeState({
        sessionId: "",
        accountId: "",
        username: "",
      })
    );
  } catch (error) {
    console.error("AsyncStorage 데이터 삭제 실패:", error);
  }
};

export const { setSessionId, setAccountId, setUsername, initializeState } =
  IdSlice.actions;
export default IdSlice.reducer;
