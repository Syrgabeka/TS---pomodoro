export type Executing = {
  work: number;
  shortBreak: number;
  longBreak: number;
  active: "work" | "shortBreak" | "longBreak";
};

export type SettingsState = {
  executing: Executing;
  pomodoro: number;
  startAnimate: boolean;
  autoStart: boolean;
  interval: number;
};
