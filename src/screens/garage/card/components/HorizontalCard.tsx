import {ButtonWrapper, Flex, Frame, Typography} from '@components';
import {PropsWithChildren, ReactNode} from 'react';
import {HorizontalCardIcon, HorizontalCardText} from './style';

interface Props {
  icon?: ReactNode;
  title?: string;
  subTitle?: string;
  handle?: () => void;
}

export const HorizontalCard = ({
  icon,
  title,
  subTitle,
  handle,
}: PropsWithChildren<Props>) => {
  return (
    <Frame>
      <ButtonWrapper handle={handle}>
        <Flex>
          <HorizontalCardIcon>{icon}</HorizontalCardIcon>
          <HorizontalCardText>
            <Typography
              fontWeight={500}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              {title}
            </Typography>
            <Typography
              fontWeight={400}
              lineHeight={16}
              size={11}
              color="#7F7F7F">
              {subTitle}
            </Typography>
          </HorizontalCardText>
        </Flex>
      </ButtonWrapper>
    </Frame>
  );
};
