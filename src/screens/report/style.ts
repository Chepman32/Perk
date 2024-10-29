import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ReportBrand = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${scale(20)}px;
`;

export const ReportBrandInner = styled.View``;

export const ReportBrandImage = styled.Image`
  width: ${scale(48)}px;
  height: ${scale(48)}px;
  border-radius: ${scale(8)}px;
  background: #2a2a2a;
  margin-right: ${scale(12)}px;
`;
