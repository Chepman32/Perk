import {Logo} from '@assets/svg';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {PropsWithChildren, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';

const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Box = styled.View``;

const duration = 1200;

const AnimatedBox = Animated.createAnimatedComponent(Box);

interface Props {
  loadingWidth?: number;
  loadingHeight?: number;
}

export const Loading = ({
  loadingWidth,
  loadingHeight,
}: PropsWithChildren<Props>) => {
  const sv = useSharedValue<number>(0);

  useEffect(() => {
    sv.value = withRepeat(withTiming(1, {duration}), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotate: `${sv.value * 360}deg`}],
  }));

  return (
    <Wrapper>
      <ActivityIndicator color={'white'} size={32} />
    </Wrapper>
  );
};
