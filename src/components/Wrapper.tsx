import styled from "styled-components";
import Header from "./Header";
import Time from "./timer/Time";
import Modal from "./modal/Modal";
import { useAppSelector } from "../hooks/hooks";
import { FC, useState } from "react";

const Wrapper: FC = () => {
  const { executing } = useAppSelector((state) => state.logicPomodoro);
  const [modal, setModal] = useState(false);

  function ModalApp() {
    setModal((prev) => !prev);
  }

  function FonColor() {
    const { active } = executing;
    let colorFon: string, bgcTime: string, btnColor: string;
    if (active === "work") {
      colorFon = "#ba4949";
      bgcTime = "#c15c5c";
      btnColor = "#a44e4e";
    } else if (active === "shortBreak") {
      colorFon = "#38858a";
      bgcTime = "#4c9196";
      btnColor = "#417b80";
    } else {
      colorFon = "#397097";
      bgcTime = "#4d7fa2";
      btnColor = "#426c8a";
    }
    return { colorFon, bgcTime, btnColor };
  }
  const { colorFon, bgcTime, btnColor } = FonColor();

  return (
    <Container style={{ backgroundColor: `${colorFon}` }}>
      <Header onClick={ModalApp} style={colorFon} colorBtn={btnColor} />
      <div style={{ display: !modal ? "block" : "none" }}>
        <Time bgc={bgcTime} colorBtn={btnColor} />
      </div>
      <Modal display={modal} onClick={ModalApp} />
    </Container>
  );
};

export default Wrapper;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;
