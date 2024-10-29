import {Typography} from '@components';
import {SwitcherItemWrapper, SwitcherText, SwitcherBox} from './style';
import {PropsWithChildren, useState} from 'react';
import {Switch} from 'react-native';

interface Props {
  title?: string;
  description?: string;
  swith?: boolean;
  handle: () => void;
  isEnabled: boolean;
}

export const SwitcherItem = ({
  title,
  description,
  handle,
  isEnabled,
}: PropsWithChildren<Props>) => {
  return (
    <SwitcherItemWrapper>
      <SwitcherText>
        <Typography lineHeight={20} size={15} fontWeight={600} color="#F2F2F2">
          {title}
        </Typography>
        <Typography lineHeight={20} size={15} fontWeight={400} color="#7F7F7F">
          {description}
        </Typography>
      </SwitcherText>
      <SwitcherBox>
        <Switch
          trackColor={{
            false: 'rgba(255, 255, 255, 0.08)',
            true: 'rgba(255, 255, 255, 0.08)',
          }}
          thumbColor={isEnabled ? '#F2F2F2' : '#7F7F7F'}
          ios_backgroundColor="rgba(255, 255, 255, 0.08)"
          onValueChange={handle}
          value={isEnabled}
        />
      </SwitcherBox>
    </SwitcherItemWrapper>
  );
};
