import {
  FavoriteBorderIcon,
  MessageAddIcon,
  MessageIcon,
  MessageMinusIcon,
} from '@assets/svg';
import {
  Typography,
  KeyboardAvoidingWrapper,
  Button,
  Header,
  Input,
  Layout,
  Attachment,
} from '@components';
import {ReviewModeration} from './ReviewModeration';
import {
  AddFavorite,
  Box,
  BoxRow,
  BrandInfo,
  BrandInfoImage,
  BrandInfoText,
  HideName,
  InputTitle,
} from './style';
import {Alert, Switch, View} from 'react-native';
import {useEffect, useState} from 'react';
import StarRating from 'react-native-star-rating-widget';
import {useAuth} from '@shared/hooks';
import {Brands} from '@services';
import {DarkCloseIcon} from '@assets/svg/DarkClose';
import {useAttachment} from '@shared/hooks/useAttachment';
import {scale} from 'react-native-size-matters';

export const ReviewBrand: React.FC = ({navigation, route}: any) => {
  const {jwt} = useAuth();
  const {brandReviewsIdCreate, brandId, brandEdit} = Brands;
  const [isEnabled, setIsEnabled] = useState(false);
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [plus, setPlus] = useState('');
  const [minus, setMinus] = useState('');
  const [reviewModeration, setReviewModeration] = useState(false);
  const [brandIdItem, setBrandIdItem] = useState<any>({});
  const {attachments, handleDeleteAttach, setAttachments, handleImageAttach} =
    useAttachment();

  const handleSendReview = async () => {
    try {
      setLoading(true);
      const data = {
        rating: rating,
        comment: comment,
        plus: plus,
        minus: minus,
      };

      if (attachments?.length) {
        data.attachments = attachments?.map(el => el.id);
      }

      const response = await brandReviewsIdCreate(
        jwt,
        route?.params?.brandId,
        data,
      );

      if (response) {
        setReviewModeration(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getBrandId = async () => {
    try {
      const response = await brandId(jwt, route?.params?.brandId);

      if (response) {
        setBrandIdItem(response);
      }
    } catch (error) {}
  };

  const handleAdd = async (type: string) => {
    try {
      const status = type == 'favorite' ? 1 : 0;
      const response = await brandEdit(jwt, route.params?.brandId, status);

      if (response) {
        Alert.alert(
          status ? 'Добавлен в избранное' : 'Добавлен в чёрный список',
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    getBrandId();
  }, []);

  if (reviewModeration) {
    return <ReviewModeration />;
  }

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <KeyboardAvoidingWrapper
        bottom={
          <Button
            loader={loading}
            disabled={loading || !comment}
            opacity={loading || !comment ? 0.5 : 1}
            onPress={handleSendReview}
            subtractScreenWidth={32}>
            <Typography
              align="center"
              lineHeight={20}
              size={15}
              color="#1D1D1D">
              Отправить
            </Typography>
          </Button>
        }>
        <Header title="Отзыв" handleNavigateBack={() => navigation.goBack()} />
        <Box>
          <BrandInfo>
            <BrandInfoImage
              source={{
                uri: brandIdItem?.avatar?.url,
              }}
            />
            <BrandInfoText>
              <Typography
                marginLeft={12}
                lineHeight={20}
                fontWeight={500}
                size={15}
                color="#F2F2F2">
                {brandIdItem?.title}
              </Typography>
              <Typography
                marginLeft={12}
                marginTop={4}
                lineHeight={16}
                fontWeight={400}
                size={13}
                color="#7F7F7F">
                {brandIdItem?.address}
              </Typography>
            </BrandInfoText>
          </BrandInfo>
        </Box>
        <Box>
          <BoxRow>
            {rating < 3 ? (
              <AddFavorite onPress={() => handleAdd('blackList')}>
                <DarkCloseIcon />
                <Typography
                  marginLeft={8}
                  lineHeight={16}
                  fontWeight={500}
                  size={13}
                  color="#F2F2F2">
                  Добавить в чёрный список
                </Typography>
              </AddFavorite>
            ) : (
              <AddFavorite onPress={() => handleAdd('favorite')}>
                <FavoriteBorderIcon />
                <Typography
                  marginLeft={8}
                  lineHeight={16}
                  fontWeight={500}
                  size={13}
                  color="#F2F2F2">
                  Добавить в избранное
                </Typography>
              </AddFavorite>
            )}
          </BoxRow>
        </Box>
        <Box>
          <Typography
            marginTop={24}
            lineHeight={16}
            fontWeight={400}
            size={13}
            color="#F2F2F2">
            Ваша оценка
          </Typography>
          <StarRating
            rating={rating}
            onChange={setRating}
            starSize={55}
            starStyle={{marginHorizontal: 1, marginTop: 8}}
            color="#FFD439"
          />
        </Box>
        <Box>
          <Typography
            size={13}
            lineHeight={16}
            color="#f2f2f2"
            marginTop={+`${scale(16)}`}
            marginBottom={+`${scale(8)}`}
            fontWeight={400}>
            До 5 фотографий, каждая не более 10 Мб
          </Typography>

          <View style={{marginLeft: -8}}>
            <Attachment
              scale
              type={'image'}
              setAttachments={setAttachments}
              attachments={attachments}
              handleDeleteAttach={handleDeleteAttach}
              handleImageAttach={handleImageAttach}
            />
          </View>
        </Box>

        <Box>
          <InputTitle>
            <MessageIcon />
            <Typography
              marginLeft={6}
              lineHeight={16}
              fontWeight={400}
              size={13}
              color="#F2F2F2">
              Комментарий
            </Typography>
          </InputTitle>
        </Box>
        <Input
          height={100}
          paddingTop={16}
          multiline
          onChangeText={value => setComment(value)}
          subtractScreenWidth={32}
          marginTop={8}
        />
        <Box>
          <InputTitle>
            <MessageAddIcon />
            <Typography
              marginLeft={6}
              lineHeight={16}
              fontWeight={400}
              size={13}
              color="#F2F2F2">
              Плюсы
            </Typography>
          </InputTitle>
        </Box>
        <Input
          height={100}
          paddingTop={16}
          multiline
          onChangeText={value => setPlus(value)}
          subtractScreenWidth={32}
          marginTop={8}
        />
        <Box>
          <InputTitle>
            <MessageMinusIcon />
            <Typography
              marginLeft={6}
              lineHeight={16}
              fontWeight={400}
              size={13}
              color="#F2F2F2">
              Минусы
            </Typography>
          </InputTitle>
        </Box>

        <Input
          height={100}
          paddingTop={16}
          multiline
          onChangeText={value => setMinus(value)}
          subtractScreenWidth={32}
          marginTop={8}
        />

        <Box>
          <HideName>
            <Typography
              lineHeight={16}
              fontWeight={400}
              size={13}
              color="#F2F2F2">
              Не показывать мое имя и аватар
            </Typography>
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
          </HideName>
        </Box>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
