import {Box, Flex, Typography} from '@components';
import {PropsWithChildren, useState} from 'react';
import {HelpIcon} from '@assets/svg';
import {Switch} from 'react-native';
import {Content} from '@assets/styles/globals';

interface Props {
  handle?: () => void;
}

export const TrackAuto = ({handle}: PropsWithChildren<Props>) => {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Content>
      <Flex marginTop={26}>
        <Box subtractScreenWidth={92}>
          <Flex justifyContent="flex-start">
            <Typography
              fontWeight={400}
              lineHeight={16}
              marginRight={8}
              size={13}
              color="#F2F2F2">
              Следить за ТО автомобиля
            </Typography>
            <HelpIcon />
          </Flex>
        </Box>
        <Switch
          trackColor={{
            false: 'rgba(255, 255, 255, 0.08)',
            true: 'rgba(255, 255, 255, 0.08)',
          }}
          thumbColor={isEnabled ? '#F2F2F2' : '#7F7F7F'}
          ios_backgroundColor="rgba(255, 255, 255, 0.08)"
          onValueChange={() => setIsEnabled(!isEnabled)}
          value={isEnabled}
        />
      </Flex>
    </Content>
  );
};
