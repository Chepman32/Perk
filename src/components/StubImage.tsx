import {GarageIcon} from '@assets/svg';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  background: #1d1d1d;
  align-items: center;
  justify-content: center;
`;

export const StubImage = () => {
  return (
    <Wrapper>
      <GarageIcon width={60} height={60} color="#F2F2F2" />
    </Wrapper>
  );
};
