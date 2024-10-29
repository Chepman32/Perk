import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Title, TabsNavigation} from './components';
import {
  Box,
  ButtonWrapper,
  Flex,
  Gallery,
  Layout,
  Loading,
  Typography,
} from '@components';
import {TabCar} from './TabCar';
import {Center, Content} from '@assets/styles/globals';
import {TabDrivers} from './TabDrivers';
import {TabLifehacks} from './TabLifehacks';
import {ScrollView} from 'react-native-gesture-handler';
import {Handle} from '@screens/brands/card/components';
import {useAuth} from '@shared/hooks';
import {Analitics, Cars, LifehacksService, Notifications} from '@services';
import {CheckBorderIcon, EditCarIcon} from '@assets/svg';
import {Screens} from '@shared/enums';
import {useFocusEffect} from '@react-navigation/native';

export const Card: React.FC = ({navigation, route}: any) => {
  const {jwt} = useAuth();
  const {getAnalitics} = Analitics;
  const {carId} = Cars;
  const {getNotifications} = Notifications;
  const {lifehacks} = LifehacksService;
  const initialSnapPoints = useMemo(() => ['67%', '100%'], []);
  const optionsRef = useRef<BottomSheet>(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [carIdList, setCarIdList] = useState<any>({});
  const [lifehacksList, setLifehacksList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [carAnaliticsTotal, setCarAnaliticsTotal] = useState(0);
  const [carNotificationTotal, setCarNotificationTotal] = useState(0);

  const getCarId = async () => {
    setLoading(true);
    const response = await carId(jwt, route.params.carId);

    if (response) {
      setCarIdList(response);
    }
    setLoading(false);
  };

  const getCarAnalitics = async () => {
    const response = await getAnalitics(jwt, '', '', route.params.carId);

    if (response) {
      setCarAnaliticsTotal(response?.total);
    }
  };

  const getCarNotification = async () => {
    const response = await getNotifications(jwt, route.params.carId);

    if (response) {
      setCarNotificationTotal(response?.items.length);
    }
  };

  const getCarLifehacks = async () => {
    const response = await lifehacks(jwt, '', carIdList?.mark?._id);

    if (response) {
      setLifehacksList(response?.items);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCarId();
      getCarAnalitics();
      getCarNotification();
    }, []),
  );

  useEffect(() => {
    getCarLifehacks();
  }, [carIdList]);

  const renderGallary = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={1}
        {...props}
        pressBehavior={'none'}>
        <Gallery
          images={carIdList?.photos}
          owner={carIdList?.owner}
          handleOption={() => optionsRef.current?.snapToIndex(1)}
        />
      </BottomSheetBackdrop>
    ),
    [carIdList],
  );

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} />,
    [],
  );

  const handle = useCallback(
    () => (
      <>
        <Handle />
        <Center>
          <Title
            name={carIdList?.mark?.name}
            year={carIdList?.year}
            handle={() => navigation.goBack()}
          />
        </Center>
        <TabsNavigation
          carIdList={carIdList}
          lifehacksListLength={lifehacksList.length}
          handle={index => setTabIndex(index)}
          index={tabIndex}
        />
      </>
    ),
    [tabIndex, carIdList, lifehacksList],
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <BottomSheet
        snapPoints={initialSnapPoints}
        index={0}
        backgroundStyle={{backgroundColor: '#121212'}}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        handleComponent={handle}
        backdropComponent={renderGallary}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {tabIndex == 0 && (
            <TabCar
              carNotificationTotal={carNotificationTotal}
              carAnaliticsTotal={carAnaliticsTotal}
              item={carIdList}
            />
          )}
          {tabIndex == 1 && <TabDrivers carIdList={carIdList} />}
          {tabIndex == 2 && <TabLifehacks lifeHacks={lifehacksList} />}
        </ScrollView>
      </BottomSheet>

      <BottomSheet
        snapPoints={[0.1, 140]}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backdropComponent={renderBackdrop}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        ref={optionsRef}>
        <Center>
          <Content>
            {carIdList?.owner?.isUserOwner && (
              <ButtonWrapper
                handle={() => {
                  navigation.navigate(Screens.EDIT_CAR, {
                    carId: carIdList?._id,
                  });
                  optionsRef.current?.close();
                }}>
                <Flex marginTop={20}>
                  <Box fixedWidth="24px">
                    <EditCarIcon />
                  </Box>
                  <Box subtractScreenWidth={65}>
                    <Typography
                      fontWeight={500}
                      lineHeight={20}
                      size={15}
                      color="#F2F2F2">
                      Редактировать автомобиль
                    </Typography>
                  </Box>
                </Flex>
              </ButtonWrapper>
            )}

            <ButtonWrapper>
              <Flex marginTop={20}>
                <Box fixedWidth="24px">
                  <CheckBorderIcon />
                </Box>
                <Box subtractScreenWidth={65}>
                  <Typography
                    fontWeight={500}
                    lineHeight={20}
                    size={15}
                    color="#F2F2F2">
                    Сделать основным
                  </Typography>
                </Box>
              </Flex>
            </ButtonWrapper>
          </Content>
        </Center>
      </BottomSheet>
    </Layout>
  );
};
