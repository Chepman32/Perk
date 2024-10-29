import {Flex, Loading, StubImage, Typography} from '@components';
import {CarWrapper, CarImage, CarName, CarLoader} from './style';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {PropsWithChildren, useState} from 'react';
import {Name} from '@screens/serviceHistory/components';

interface Props {
  item: any;
}

export const Car = ({item}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const [loadingImage, setLoadingImage] = useState(false);

  return (
    <CarWrapper
      onPress={() =>
        navigation.navigate(Screens.GARAGE_CARD, {carId: item?._id})
      }>
      {loadingImage && (
        <CarLoader>
          <Loading loadingWidth={30} loadingHeight={30} />
        </CarLoader>
      )}
      <CarImage
        onLoadStart={() => setLoadingImage(true)}
        onLoadEnd={() => setLoadingImage(false)}
        source={{
          uri: item?.photos?.[0]?.url,
        }}>
        <CarName>
          <Flex widthAuto>
            <Typography
              marginRight={!item?.owner?.isUserOwner ? 10 : 0}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              {item?.mark?.name}, {item?.model?.name}
            </Typography>
            {!item?.owner?.isUserOwner && (
              <Name name={item?.owner?.firstName} />
            )}
          </Flex>
        </CarName>
        {!item?.photos?.[0]?.url && <StubImage />}
      </CarImage>
    </CarWrapper>
  );
};
