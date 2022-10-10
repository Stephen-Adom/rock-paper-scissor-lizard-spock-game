import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../utils/firebasedb.model";

// Define a type for the slice state
interface AppState {
  userSelectedTile: string;
  totalScore: number;
  drawScore: number;
  loseScore: number;
  result: string | null;
  authId: string;
}

// Define the initial state using that type
const initialState: AppState = {
  userSelectedTile: "",
  totalScore: 0,
  drawScore: 0,
  loseScore: 0,
  result: null,
  authId: "",
};

export const appSlice = createSlice({
  name: "app",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    saveSelectedUserTile: (state, action: PayloadAction<string>) => {
      state.userSelectedTile = action.payload;
    },
    increaseTotalScore: (state) => {
      state.totalScore++;
    },
    increaseLoseScore: (state) => {
      state.loseScore++;
    },
    increaseDrawScore: (state) => {
      state.drawScore++;
    },
    setResult: (state, action: PayloadAction<string>) => {
      state.result = action.payload;
    },
    setAuthId: (state, action: PayloadAction<string>) => {
      state.authId = action.payload;
    },
    updateUserScores: (state, action: PayloadAction<UserInfo>) => {
      state.totalScore = action.payload.scores.win;
      state.drawScore = action.payload.scores.draw;
      state.loseScore = action.payload.scores.lose;
    },
  },
});

export const {
  saveSelectedUserTile,
  increaseTotalScore,
  increaseLoseScore,
  increaseDrawScore,
  setResult,
  setAuthId,
  updateUserScores,
} = appSlice.actions;

export default appSlice.reducer;
