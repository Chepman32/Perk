import {Center} from '@assets/styles/globals';
import {PlusIcon} from '@assets/svg';
import {
  Button,
  ContactItem,
  Flex,
  RecommendItemHorizontal,
  Typography,
} from '@components';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Screens} from '@shared/enums';
import {RootParamList} from '@shared/types/navigation';
import {PropsWithChildren} from 'react';

interface Props {
  carIdList?: any;
}

export const TabDrivers = ({carIdList}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Center>
      {carIdList?.sharedWith &&
        carIdList?.sharedWith.map((item: any, index: number) => {
          return (
            <ContactItem
              key={index}
              disabled={!carIdList?.owner?.isUserOwner}
              handle={() =>
                navigation.navigate(Screens.CONTACT_SETTINGS, {
                  contactId: item?._id,
                })
              }
              firstName={item?.firstName}
              phone={item?.phone}
              addPadding
              marginTop={8}
              background="rgba(29, 29, 29, 1)"
            />
          );
        })}

      {carIdList?.owner?.isUserOwner && (
        <Button
          marginTop={8}
          onPress={() =>
            navigation.navigate(Screens.ADD_DRIVER, {
              carId: carIdList?._id,
              sharedWith: carIdList?.sharedWith,
            })
          }
          subtractScreenWidth={32}
          background="rgba(255, 255, 255, 0.08)"
          height={44}>
          <Flex justifyContent="center">
            <PlusIcon color="#F2F2F2" width={16} height={16} />
            <Typography
              fontWeight={500}
              marginLeft={8}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              Добавить водителя
            </Typography>
          </Flex>
        </Button>
      )}

      {/* <RecommendItemHorizontal marginTop={16} subtractScreenWidth={32} /> */}
    </Center>
  );
};
