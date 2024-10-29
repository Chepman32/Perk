import {useCallback, forwardRef, PropsWithChildren} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Box, ButtonWrapper, Flex, Typography} from '@components';
import {DangerIcon, DarkListIcon} from '@assets/svg';
import {Center, Content} from '@assets/styles/globals';
import {useAuth} from '@shared/hooks';
import {Brands} from '@services';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';

interface Props {
  brandId: string;
  legalName: string;
  address: string;
  avatar: any;
}

export const OptionsModal = forwardRef(
  (
    {brandId, legalName, address, avatar}: PropsWithChildren<Props>,
    ref: any,
  ) => {
    const navigation = useNavigation<StackNavigationProp<RootParamList>>();
    const {jwt} = useAuth();
    const {brandEdit} = Brands;

    const handleInBlackList = async () => {
      const response = await brandEdit(jwt, brandId, 0);

      if (response) {
        navigation.goBack();
      }
    };

    const handleReport = () => {
      ref.current?.close();
      navigation.navigate(Screens.REPORT, {
        legalName,
        address,
        image: avatar.url,
        brandId,
      });
    };

    const renderBackdrop = useCallback(
      (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={1} />,
      [],
    );

    return (
      <BottomSheet
        snapPoints={[0.1, 140]}
        backdropComponent={renderBackdrop}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        ref={ref}>
        <Center>
          <Content>
            <ButtonWrapper handle={handleInBlackList}>
              <Flex marginTop={20}>
                <Box fixedWidth="24px">
                  <DarkListIcon />
                </Box>
                <Box subtractScreenWidth={65}>
                  <Typography
                    fontWeight={500}
                    lineHeight={20}
                    size={15}
                    color="#C53830">
                    Не показывать бренд
                  </Typography>
                </Box>
              </Flex>
            </ButtonWrapper>
            <ButtonWrapper handle={handleReport}>
              <Flex marginTop={20}>
                <Box fixedWidth="24px">
                  <DangerIcon />
                </Box>
                <Box subtractScreenWidth={65}>
                  <Typography
                    fontWeight={500}
                    lineHeight={20}
                    size={15}
                    color="#F2F2F2">
                    Сообщить об ошибке
                  </Typography>
                </Box>
              </Flex>
            </ButtonWrapper>
          </Content>
        </Center>
      </BottomSheet>
    );
  },
);
