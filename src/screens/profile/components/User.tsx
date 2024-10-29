import {
  Avatar,
  Box,
  Button,
  Flex,
  Typography,
  UserCompletedStatus,
} from '@components';
import {UserWrapper} from './style';
import {EditIcon} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {RootParamList} from '@shared/types/navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import {Screens} from '@shared/enums';
import {scale} from 'react-native-size-matters';
import {PropsWithChildren} from 'react';

interface Props {
  userInfo?: any;
}

export const UserName = ({userInfo}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <UserWrapper>
      <Flex subtractScreenWidth={20}>
        <Flex subtractScreenWidth={scale(64)} justifyContent="flex-start">
          <Avatar name={userInfo?.firstName} image={userInfo?.avatar?.url} />
          <Box subtractScreenWidth={135}>
            <Typography
              marginLeft={12}
              lineHeight={24}
              size={18}
              color="#F2F2F2">
              {userInfo?.firstName} {userInfo?.lastName}
            </Typography>
            <Typography
              marginLeft={12}
              marginTop={3}
              lineHeight={20}
              size={15}
              color="#7F7F7F">
              {userInfo?.phone}
            </Typography>
          </Box>
        </Flex>
        <Button
          onPress={() =>
            navigation.navigate(Screens.EDIT_PROFILE, {item: userInfo})
          }
          fixedWidth={`${scale(44)}px`}
          height={44}
          borderRadius={44}
          background="rgba(255, 255, 255, 0.08)">
          <EditIcon />
        </Button>
      </Flex>
      <UserCompletedStatus userInfo={userInfo} marginTop={20} />
    </UserWrapper>
  );
};
