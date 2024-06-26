import styled from "styled-components";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { ChangeEvent, FormEvent, useState } from "react";
import { Executing } from "../../store";
import { useDispatch } from "react-redux";
import {
  autoStartContriller,
  updateExecute,
  updateInterval,
} from "../../store/slice/pomodoroSlice";
import { useAppSelector } from "../../hooks/hooks";

type ModalProps = {
  display: boolean;
  onClick: () => void;
};

const Modal = ({ display, onClick }: ModalProps) => {
  const dispatch = useDispatch();
  const { autoStart, interval } = useAppSelector(
    (state) => state.logicPomodoro
  );

  const [newTime, setNewTime] = useState<Executing>({
    work: 30,
    shortBreak: 5,
    longBreak: 15,
    active: "work",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTime({
      ...newTime,
      [name]: Number(value),
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateExecute(newTime));
    onClick();
  };

  const handleCheckboxChange = () => {
    dispatch(autoStartContriller());
  };

  const handleIntervalChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateInterval(Number(e.target.value)));
  };

  return (
    <FormContainer style={{ display: display ? "block" : "none" }}>
      <Header>
        <p></p>
        <h3>SETTING</h3>
        <Button variant="text" onClick={onClick}>
          x
        </Button>
      </Header>
      <form onSubmit={handleSubmit}>
        <h3>Time (minutes)</h3>
        <FirstInputContainer>
          <Input
            name="work"
            value={newTime.work}
            onChange={handleChange}
            type="number"
            label="Pomodoro"
          />
          <Input
            name="shortBreak"
            value={newTime.shortBreak}
            onChange={handleChange}
            type="number"
            label="Short Break"
          />
          <Input
            name="longBreak"
            value={newTime.longBreak}
            onChange={handleChange}
            type="number"
            label="Long Break"
          />
        </FirstInputContainer>
        <TwoStateContainer>
          <DivNastroyki>
            <label htmlFor="">Auto Start</label>
            <input
              type="checkbox"
              checked={autoStart}
              onChange={handleCheckboxChange}
            />
          </DivNastroyki>

          <DivNastroyki>
            <label htmlFor="">Long Break Interval</label>
            <Input
              size="small"
              value={interval}
              type="number"
              onChange={handleIntervalChange}
            />
          </DivNastroyki>
        </TwoStateContainer>

        <div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </FormContainer>
  );
};

export default Modal;

const FormContainer = styled.div`
  margin: 20px auto;
  width: 30%;
  padding: 1.5%;
  border: 2px solid grey;
  border-radius: 10px;
  border: 0;
  background-color: #fff;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  color: grey;
  margin-bottom: 20px;
  border-bottom: 1px solid grey;
`;

const FirstInputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 5%;
  margin: 10px 0px;
`;

const TwoStateContainer = styled.div`
  width: 100%;
  font-size: 25px;
`;

const DivNastroyki = styled.div`
  display: grid;
  grid-template-columns: 80% 20%;
`;
