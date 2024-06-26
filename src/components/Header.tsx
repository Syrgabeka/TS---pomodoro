import styled from "styled-components";
import Button from "./UI/Button";

type HeaderProps = {
  style: string;
  onClick?: () => void;
  colorBtn: string;
};

const Header = ({ onClick, style, colorBtn }: HeaderProps) => {
  return (
    <HeaderDiv style={{ backgroundColor: `${style}` }}>
      <h2>Pomofocus</h2>
      <div>
        <Button
          variant="contained"
          onClick={onClick}
          backgroundColor={colorBtn}
        >
          x setting
        </Button>
      </div>
    </HeaderDiv>
  );
};

export default Header;

const HeaderDiv = styled.div`
  width: 44%;
  margin: auto;
  padding: 2%;
  display: flex;
  justify-content: space-between;
  color: white;
`;
