import {Center, Content} from '@assets/styles/globals';
import {EditPenIcon, TrashIcon} from '@assets/svg';
import {
  Box,
  ButtonWrapper,
  Flex,
  Header,
  Layout,
  ReviewItem,
  Typography,
} from '@components';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useCallback, useRef, useState} from 'react';
import {EmptyReview} from './empty-review';
import {ReviewsService} from '@services';
import {useAuth} from '@shared/hooks';
import {ReviewsList} from './components/style';
import {Alert} from 'react-native';
import {Screens} from '@shared/enums';
import {useFocusEffect} from '@react-navigation/native';

export const MyReviews: React.FC = ({navigation}: any) => {
  const {reviews, reviewDelete} = ReviewsService;
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [reviewsList, setReviewsList] = useState([]);
  const [reviewId, setReviewId] = useState('');
  const {jwt} = useAuth();

  const getReviews = async () => {
    try {
      const response = await reviews(jwt);
      if (response) {
        setReviewsList(response?.items);
      }
    } catch (error) {}
  };

  const handleDeleteReview = async () => {
    bottomSheetRef.current?.close();
    try {
      const response = await reviewDelete(jwt, reviewId);

      if (response) {
        Alert.alert('Отзыв удален');
        getReviews();
      }
    } catch (error) {}
  };

  const handleMenu = (item: any) => {
    setReviewId(item?._id);
    bottomSheetRef.current?.snapToIndex(1);
  };

  const reviewFilter = () => {
    return reviewsList.filter((item: any) => item?._id == reviewId)?.at(0);
  };

  const handleEditReview = () => {
    bottomSheetRef.current?.close();
    navigation.navigate(Screens.EDIT_MY_REVIEW, {
      item: reviewFilter(),
    });
  };

  useFocusEffect(
    useCallback(() => {
      getReviews();
    }, []),
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        onPress={() => bottomSheetRef.current?.close()}
        {...props}
      />
    ),
    [],
  );

  if (reviewsList.length == 0) {
    return (
      <Layout statusBarColor="#040404" chidlrenBackground="#040404">
        <Header
          title="Мои отзывы"
          background="#040404"
          handleNavigateBack={() => navigation.goBack()}
        />
        <EmptyReview />
      </Layout>
    );
  }

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        title="Мои отзывы"
        background="#040404"
        handleNavigateBack={() => navigation.goBack()}
      />
      <ReviewsList
        data={reviewsList}
        renderItem={({item}) => {
          return (
            <ReviewItem
              item={item}
              handle={() => handleMenu(item)}
              isBrandReview
              marginTop={8}
            />
          );
        }}
      />

      <BottomSheet
        snapPoints={[0.1, 140]}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backdropComponent={renderBackdrop}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        ref={bottomSheetRef}>
        <Center>
          <Content>
            <ButtonWrapper handle={handleEditReview}>
              <Flex marginTop={20}>
                <Box fixedWidth="24px">
                  <EditPenIcon />
                </Box>
                <Box subtractScreenWidth={65}>
                  <Typography
                    fontWeight={500}
                    lineHeight={20}
                    size={15}
                    color="#F2F2F2">
                    Изменить отзыв
                  </Typography>
                </Box>
              </Flex>
            </ButtonWrapper>
            <ButtonWrapper handle={handleDeleteReview}>
              <Flex marginTop={20}>
                <Box fixedWidth="24px">
                  <TrashIcon color="#C53830" />
                </Box>
                <Box subtractScreenWidth={65}>
                  <Typography
                    fontWeight={500}
                    lineHeight={20}
                    size={15}
                    color="#C53830">
                    Удалить отзыв
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
