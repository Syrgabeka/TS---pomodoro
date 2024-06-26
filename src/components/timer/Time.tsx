import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../UI/Button";
import { useAppSelector } from "../../hooks/hooks";
import { Executing } from "../../store";
import { useDispatch } from "react-redux";
import { updateExecute, updateInterval } from "../../store/slice/pomodoroSlice";

type styleprops = {
  bgc: string;
  colorBtn: string;
};
const Time = ({ bgc, colorBtn }: styleprops) => {
  const dispatch = useDispatch();
  const { pomodoro, executing, autoStart, interval } = useAppSelector(
    (state) => state.logicPomodoro
  );
  const [start, setStart] = useState(false);
  const [time, setTime] = useState(0);
  const intervalId = useRef<number | undefined>(undefined);
  const audioElement = document.getElementById("myAudio") as HTMLAudioElement;

  function playAudio() {
    audioElement.play();
  }

  const progressWith = () => {
    let width = 0;
    width = 100 - (time / (pomodoro * 60)) * 100;
    return width;
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  let titleText: string;
  if (executing.active === "work") {
    titleText = "to focus!";
  } else {
    titleText = " for a breack!";
  }
  useEffect(() => {
    const titleValue = `${formatTime(time)} - Time ${titleText} `;
    document.title = titleValue;
  }, [time, titleText]);

  const startTimer = () => {
    if (!start) {
      setStart(true);
      intervalId.current = setInterval(() => {
        setTime((time) => {
          if (time === 0) {
            clearInterval(intervalId.current);
            switch (executing.active) {
              case "work":
                btnCurrentTime("shortBreak");
                playAudio();
                autoStart ? startTimer() : stopTimer();
                break;

              case "shortBreak":
                if (interval === 0) {
                  btnCurrentTime("longBreak");
                  const a = interval - 1;
                  dispatch(updateInterval(a));
                } else {
                  btnCurrentTime("work");
                }
                playAudio();
                autoStart ? startTimer() : stopTimer();
                break;
              case "longBreak":
                btnCurrentTime("work");
                autoStart ? startTimer() : stopTimer();
                break;
              default:
                btnCurrentTime("work");
            }
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
  };
  const stopTimer = () => {
    setStart(false);
    if (intervalId.current !== undefined) {
      clearInterval(intervalId.current);
    }
  };

  function btnCurrentTime(activeState: "work" | "shortBreak" | "longBreak") {
    const newExecuting: Executing = {
      ...executing,
      active: activeState,
    };
    dispatch(updateExecute(newExecuting));
    stopTimer();
  }

  function perehodTime() {
    const { active } = executing;
    let activeValue: "work" | "shortBreak" | "longBreak";
    if (active === "work") {
      activeValue = "shortBreak";
    } else if (active === "shortBreak") {
      interval
        ? ((activeValue = "work"), interval - 1)
        : (activeValue = "longBreak");
    } else {
      activeValue = "work";
    }
    stopTimer();
    const newExecuting: Executing = {
      ...executing,
      active: activeValue,
    };
    dispatch(updateExecute(newExecuting));
  }

  useEffect(() => {
    setTime(pomodoro * 60);
  }, [pomodoro]);

  return (
    <Container>
      <Progress style={{ width: `${progressWith()}%` }}></Progress>
      <TimerContainer style={{ backgroundColor: `${bgc}` }}>
        <HeaderTimer>
          <Button
            backgroundColor={
              executing.active === "work"
                ? `${colorBtn}`
                : "rgba(194, 93, 93, 0)"
            }
            onClick={() => btnCurrentTime("work")}
          >
            Pomodoro
          </Button>
          <Button
            backgroundColor={
              executing.active === "shortBreak"
                ? `${colorBtn}`
                : "rgba(194, 93, 93, 0)"
            }
            onClick={() => btnCurrentTime("shortBreak")}
          >
            Short Break
          </Button>
          <Button
            backgroundColor={
              executing.active === "longBreak"
                ? `${colorBtn}`
                : "rgba(194, 93, 93, 0)"
            }
            onClick={() => btnCurrentTime("longBreak")}
          >
            Long Break
          </Button>
        </HeaderTimer>

        <TimerNum>{formatTime(time)}</TimerNum>

        {!start ? (
          <StyledButton
            size="large"
            backgroundColor="white"
            colors="#c25d5d"
            onClick={startTimer}
          >
            Start
          </StyledButton>
        ) : (
          <SledContainer>
            <StyledButton
              size="large"
              backgroundColor="white"
              colors="#c25d5d"
              onClick={stopTimer}
            >
              Stop
            </StyledButton>

            <StyledButton
              size="large"
              backgroundColor="rgba(194, 93, 93, 0)"
              colors="white"
              onClick={() => perehodTime()}
            >
              следуюший
            </StyledButton>
          </SledContainer>
        )}
      </TimerContainer>
    </Container>
  );
};

export default Time;

const Container = styled.div`
  width: 35%;
  margin: 0 auto;
`;

const TimerContainer = styled.div`
  margin-top: 2%;
  padding: 3% 5%;
  border-radius: 7px;
  background-color: #c15c5c;
  text-align: center;
`;
const HeaderTimer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TimerNum = styled.div`
  font-size: 125px;
  font-weight: 900;
  color: aliceblue;
  text-align: center;
`;

interface StyledButtonProps {
  backgroundColor: string;
  colors: string;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  width: 35%;
  height: 50px;
`;
const Progress = styled.div`
  height: 2px;
  border: 3px solid white;
  border-radius: 3px;
  text-align: right;
`;
const SledContainer = styled.div`
  text-align: right;
`;
