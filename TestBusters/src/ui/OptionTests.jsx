import styled from 'styled-components';

const OptionStyled = styled.button`
  width: 20rem;
  height: 3rem;
  padding: 1rem;
  border-radius: 6px;
  margin: 2rem;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  & h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1rem;
    color: black;
  }
`;

const OptionsTest = ({ children }) => {
  return (
    <OptionStyled>
      <h3>{children}</h3>
    </OptionStyled>
  );
};
export default OptionsTest;
