import { useEffect } from "react";
import Wrapper from "./components/Wrapper";
import { useAppSelector } from "./hooks/hooks";
import { useDispatch } from "react-redux";
import { updateExecute } from "./store/slice/pomodoroSlice";

function App() {
  const dispatch = useDispatch();
  const { executing } = useAppSelector((state) => state.logicPomodoro);

  useEffect(() => {
    dispatch(updateExecute(executing));
  }, [executing, dispatch]);

  return (
    <>
      <Wrapper />
    </>
  );
}

export default App;
