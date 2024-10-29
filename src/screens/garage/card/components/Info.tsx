import {Flex, Typography} from '@components';
import {InfoBox} from './style';
import {InfoIcon} from '@assets/svg';
import {Content} from '@assets/styles/globals';

export const Info = () => {
  return (
    <Content>
      <Flex marginTop={16}>
        <InfoBox percentWidth="58%">
          <Typography
            fontWeight={400}
            lineHeight={16}
            size={11}
            color="#7F7F7F">
            Текущий пробег
          </Typography>
          <Typography
            fontWeight={400}
            lineHeight={20}
            size={15}
            marginTop={2}
            color="#F2F2F2">
            16 000 км
          </Typography>
        </InfoBox>
        <InfoBox percentWidth="40%">
          <Typography
            fontWeight={400}
            lineHeight={16}
            size={11}
            marginTop={2}
            color="#7F7F7F">
            Дата
          </Typography>
          <Typography
            fontWeight={400}
            lineHeight={20}
            size={15}
            color="#F2F2F2">
            12.08.2023
          </Typography>
        </InfoBox>
      </Flex>

      <Flex marginTop={16} justifyContent="flex-start">
        <InfoIcon />
        <Typography
          marginLeft={12}
          fontWeight={400}
          lineHeight={20}
          size={15}
          color="#F2F2F2">
          Рекомендации от производителя
        </Typography>
      </Flex>
    </Content>
  );
};
