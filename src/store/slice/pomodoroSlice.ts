import { Executing, SettingsState } from "./../index.d";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: SettingsState = {
  executing: {
    work: 30,
    shortBreak: 5,
    longBreak: 15,
    active: "work",
  },
  pomodoro: 2,
  startAnimate: false,
  autoStart: false,
  interval: 2,
};

export const settingsSlice = createSlice({
  name: "logicPomodoro",
  initialState: initialState,
  reducers: {
    autoStartContriller: (state) => {
      state.autoStart = !state.autoStart;
    },
    updateExecute: (state, action: PayloadAction<Executing>) => {
      state.executing = action.payload;
      switch (action.payload.active) {
        case "work":
          state.pomodoro =
            action.payload.work >= 0.1 ? action.payload.work : 20;
          break;
        case "shortBreak":
          state.pomodoro =
            action.payload.shortBreak >= 0.1 ? action.payload.shortBreak : 5;
          break;
        case "longBreak":
          state.pomodoro =
            action.payload.longBreak >= 0.1 ? action.payload.longBreak : 20;
          break;
        default:
          state.pomodoro = 0;
      }
    },
    updateInterval: (state, action: PayloadAction<number>) => {
      const numInt = action.payload;
      state.interval = numInt;
    },
  },
});

export const { updateExecute, autoStartContriller, updateInterval } =
  settingsSlice.actions;
