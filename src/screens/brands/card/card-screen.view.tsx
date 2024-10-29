import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {Title, TabsNavigation, Menu, Handle, Goods} from './components';
import {Gallery, Layout} from '@components';
import {TabDescription} from './TabDescription';
import {TabReview} from './TabReview';
import {Center} from '@assets/styles/globals';
import {ScheduleModal, OptionsModal} from './modals';
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

import {Brands} from '@services';
import {useAuth} from '@shared/hooks';

const bottomSheetStyle = {
  bottomSheet: {backgroundColor: '#121212'},
  indicator: {backgroundColor: '#fff'},
  scrollContainerStyle: {paddingBottom: 90},
};

export const BrandCard: React.FC = ({navigation, route}: any) => {
  const {brandId, brandServicesId, brandReviewsId} = Brands;
  const {jwt} = useAuth();
  const [tabIndex, setTabIndex] = useState(0);
  const [brandIdItem, setBrandIdItem] = useState<any>({});
  const [servicesId, setServicesId] = useState<any>([]);
  const [reviewsId, setReviewsIdItem] = useState<any>({});

  const initialSnapPoints = useMemo(() => ['67%', '100%'], []);
  const scheduleRef = useRef<BottomSheet>(null);
  const optionRef = useRef<BottomSheet>(null);
  const position = useSharedValue(0);

  const getBrandId = async () => {
    const response = await brandId(jwt, route.params.brandId);

    if (response) {
      setBrandIdItem(response);
    }
  };

  const getBrandServiceId = async () => {
    const response = await brandServicesId(jwt, route.params.brandId);

    if (response) {
      setServicesId(response);
    }
  };

  const getBrandReviewId = async () => {
    const response = await brandReviewsId(jwt, route.params.brandId);

    if (response) {
      setReviewsIdItem(response);
    }
  };

  useEffect(() => {
    getBrandId();
    getBrandServiceId();
    getBrandReviewId();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={1}
        {...props}
        pressBehavior={'none'}>
        <Gallery
          images={brandIdItem?.photos}
          avatar={brandIdItem?.avatar?.url}
          handleOption={() => optionRef.current?.snapToIndex(1)}
          showBrand
        />
      </BottomSheetBackdrop>
    ),
    [brandIdItem],
  );

  const handle = useCallback(
    () => (
      <>
        <Handle />
        <Center>
          <Title
            brandId={brandIdItem}
            animatedStyle={titleStyle}
            handle={() => navigation.goBack()}
          />
        </Center>
        <TabsNavigation
          reviewsIdLength={reviewsId?.items?.length}
          servicesIdLength={brandIdItem?.servicesCount}
          handle={index => setTabIndex(index)}
          index={tabIndex}
        />
      </>
    ),
    [tabIndex, brandIdItem, reviewsId],
  );
  const titleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      position.value,
      [0, 1],
      [1, 0],
      Extrapolate.CLAMP,
    );

    const height = interpolate(
      position.value,
      [0, 1],
      [45, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity: opacity,
      height: height,
    };
  });

  return (
    <Layout>
      <BottomSheet
        snapPoints={initialSnapPoints}
        index={0}
        animatedIndex={position}
        enableContentPanningGesture
        backgroundStyle={bottomSheetStyle.bottomSheet}
        handleIndicatorStyle={bottomSheetStyle.indicator}
        handleComponent={handle}
        backdropComponent={renderBackdrop}>
        {(tabIndex == 0 || tabIndex == 1) && (
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 100}}>
            {tabIndex == 0 && (
              <TabDescription
                brandIdItem={brandIdItem}
                schedule={brandIdItem?.schedule}
                servicesId={servicesId}
                handleSchedule={() => scheduleRef.current?.snapToIndex(1)}
              />
            )}
            {tabIndex == 1 && <Goods servicesId={servicesId} />}
          </BottomSheetScrollView>
        )}
        {tabIndex == 2 && (
          <TabReview brandIdItem={brandIdItem} reviewsId={reviewsId} />
        )}
      </BottomSheet>
      <ScheduleModal schedule={brandIdItem?.schedule} ref={scheduleRef} />
      {/* <ContactsModal ref={contactsRef} /> */}
      {/* <CategoryModal ref={categoryRef} /> */}
      <OptionsModal
        brandId={brandIdItem?._id}
        {...brandIdItem}
        ref={optionRef}
      />
      <Menu index={tabIndex} brandIdItem={brandIdItem} />
    </Layout>
  );
};
