import styled from 'styled-components';

const ScrollBarStyled = styled.div`
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: #bb0303;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ad1111;
    border-radius: 5px;
  }
`;

const scrollBar = () => {
  return <ScrollBarStyled />;
};
export default scrollBar;
