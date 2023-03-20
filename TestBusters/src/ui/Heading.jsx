import styled from 'styled-components';

const H1 = styled.h1`
  font-family: ${({ font }) => font};
  font-weight: 700;
  letter-spacing: ${({ spacing }) => spacing};
  color: ${({ headcolor }) => headcolor};
  text-align: center;
  text-transform: uppercase;
  font-size: ${({ size }) =>
    size === 'xl'
      ? '2.81rem'
      : size === 'lg'
      ? '2.11rem'
      : size === 'md'
      ? '1.58rem'
      : '1rem'};
`;
const H2 = styled.h2`
  font-family: ${({ font }) => font};
  font-weight: 700;
  letter-spacing: ${({ spacing }) => spacing};
  color: ${({ headcolor }) => headcolor};
  text-align: center;
  font-size: ${({ size }) =>
    size === 'xl'
      ? '2.81rem'
      : size === 'lg'
      ? '2.11rem'
      : size === 'md'
      ? '1.58rem'
      : '1rem'};
`;
const H3 = styled.h3`
  font-family: ${({ font }) => font};
  font-weight: 600;
  letter-spacing: ${({ spacing }) => spacing};
  color: ${({ headcolor }) => headcolor};
  text-align: center;
  font-size: ${({ size }) =>
    size === 'xl'
      ? '2.81rem'
      : size === 'lg'
      ? '2.11rem'
      : size === 'md'
      ? '1.58rem'
      : '1rem'};
`;
const H4 = styled.h4`
  font-family: ${({ font }) => font};
  font-weight: 600;
  letter-spacing: ${({ spacing }) => spacing};
  color: ${({ headcolor }) => headcolor};
  text-align: center;
  font-size: ${({ size }) =>
    size === 'xl'
      ? '2.81rem'
      : size === 'lg'
      ? '2.11rem'
      : size === 'md'
      ? '1.58rem'
      : '1rem'};
`;
const Heading = ({ children, size, as, headcolor }) => {
  if (as === 'h1') {
    return (
      <H1 headcolor={headcolor} size={size}>
        {children}
      </H1>
    );
  } else if (as === 'h2') {
    return (
      <H2 size={size} headcolor={headcolor}>
        {children}
      </H2>
    );
  } else if (as === 'h3') {
    return (
      <H3 size={size} headcolor={headcolor}>
        {children}
      </H3>
    );
  } else if (as === 'h4') {
    return (
      <H4 size={size} headcolor={headcolor}>
        {children}
      </H4>
    );
  } else {
    return (
      <H2 size={size} headcolor={headcolor}>
        {children}
      </H2>
    );
  }
};

export default Heading;
