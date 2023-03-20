import styled from 'styled-components';

const InputStyled = styled.input`
  border-radius: 0.5rem;
  padding: 0.5rem;
  padding: ${({ padding }) => padding};
  background: ${({ back }) => (back ? back : 'none')};
  color: ${({ color }) => color};
  width: ${({ width }) => width};
  ::placeholder {
    color: ${({ letter }) => (letter ? letter : 'white')};
    position: ${({ position }) => position};
  }
`;

const Input = ({
  position,
  ph,
  type,
  onChange,
  value,
  color,
  back,
  letter,
  width,
  inputMode,
}) => {
  return (
    <InputStyled
      width={width}
      placeholder={ph}
      type={type}
      onChange={onChange}
      value={value}
      color={color}
      variant={back}
      letter={letter}
      position={position}
      inputMode={inputMode}
    />
  );
};

export default Input;
