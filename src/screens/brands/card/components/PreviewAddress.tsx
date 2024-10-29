import {Typography} from '@components';
import {
  AddressFlexRow,
  AddressIcon,
  AddressText,
  AddressWrapper,
} from './style';
import {ClockIcon, LocationIcon} from '@assets/svg';
import Animated from 'react-native-reanimated';
import {PropsWithChildren} from 'react';

const AnimatedWrapper = Animated.createAnimatedComponent(AddressWrapper);

interface Props {
  animatedStyle?: any;
}

export const PreviewAddress = ({animatedStyle}: PropsWithChildren<Props>) => {
  return (
    <AnimatedWrapper style={animatedStyle}>
      <AddressFlexRow>
        <AddressIcon>
          <LocationIcon color="#7F7F7F" />
        </AddressIcon>
        <AddressText>
          <Typography
            fontWeight={400}
            lineHeight={20}
            marginLeft={5}
            size={15}
            color="#F2F2F2">
            Лесной просп., 78 (этаж 1)
          </Typography>
        </AddressText>
      </AddressFlexRow>
      <AddressFlexRow>
        <AddressIcon>
          <ClockIcon color="#7F7F7F" />
        </AddressIcon>
        <AddressText>
          <Typography
            fontWeight={400}
            lineHeight={20}
            marginLeft={5}
            size={15}
            color="#F2F2F2">
            Открыто до 21:00
          </Typography>
        </AddressText>
      </AddressFlexRow>
    </AnimatedWrapper>
  );
};
