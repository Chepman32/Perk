import styled from 'styled-components/native';
import {Typography} from './Typography';
import {PropsWithChildren} from 'react';
import {Flex} from './Flex';
import {Box} from './Box';
import {Button} from './Button';
import {dateMouthYearLetters} from '@shared/utils/date';

const Wrapper = styled.TouchableOpacity<PropsWithChildren<Props>>`
  width: ${({theme}) => theme.screenWidth - 32}px;
  margin-top: ${({marginTop}) => marginTop || 0}px;
  padding: 12px;
  background: #1d1d1d;
  border-radius: 12px;
`;

const IsRead = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background: #ffd439;
`;

interface Props {
  isRead?: number;
  marginTop?: number;
  handle?: () => void;
  isSubscription?: boolean;
  title?: string;
  type?: string;
  description?: string;
  date?: string;
}

export const NotificationItem = ({
  isRead,
  marginTop,
  handle,
  isSubscription,
  title,
  type,
  description,
  date,
}: PropsWithChildren<Props>) => {
  return (
    <Wrapper onPress={handle} disabled={!handle} marginTop={marginTop}>
      <Flex>
        <Box fixedWidth="50%">
          <Flex justifyContent="flex-start">
            {isRead == 0 && <IsRead />}
            <Typography
              marginLeft={isRead == 0 ? 6 : 0}
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              {type}
            </Typography>
          </Flex>
        </Box>
        <Box fixedWidth="50%">
          <Flex justifyContent="flex-end">
            <Typography
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#7F7F7F">
              {dateMouthYearLetters(date)}
            </Typography>
          </Flex>
        </Box>
      </Flex>
      <Typography
        marginTop={8}
        fontWeight={500}
        lineHeight={20}
        size={15}
        color="#F2F2F2">
        {title}
      </Typography>
      <Typography
        marginTop={4}
        fontWeight={400}
        lineHeight={16}
        size={13}
        color="#7F7F7F">
        {description}
      </Typography>
      {isSubscription && (
        <Button
          fixedWidth="98px"
          height={32}
          borderRadius={8}
          marginTop={8}
          background="rgba(255, 255, 255, 0.08)">
          <Typography
            fontWeight={500}
            lineHeight={16}
            size={13}
            color="#F2F2F2">
            В подписку
          </Typography>
        </Button>
      )}
    </Wrapper>
  );
};
