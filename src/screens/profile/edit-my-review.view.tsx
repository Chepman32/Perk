import {MessageAddIcon, MessageIcon, MessageMinusIcon} from '@assets/svg';
import {
  Typography,
  KeyboardAvoidingWrapper,
  Button,
  Header,
  Input,
  Layout,
  Attachment,
} from '@components';
import {useEffect, useState} from 'react';
import StarRating from 'react-native-star-rating-widget';
import {useAuth} from '@shared/hooks';
import {ReviewsService} from '@services';
import {Box, InputTitle} from '@screens/brands/review/style';
import {Alert, View} from 'react-native';
import {useAttachment} from '@shared/hooks/useAttachment';
import {scale} from 'react-native-size-matters';

export const EditMyReview: React.FC = ({navigation, route}: any) => {
  const {jwt} = useAuth();
  const {reviewEdit} = ReviewsService;
  const [rating, setRating] = useState(route.params?.item?.rating);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState(route.params?.item?.comment);
  const [plus, setPlus] = useState(route.params?.item?.plus);
  const [minus, setMinus] = useState(route.params?.item?.minus);
  const {attachments, handleDeleteAttach, setAttachments, handleImageAttach} =
    useAttachment();

  useEffect(() => {
    if (route.params?.item?.attachments?.length) {
      setAttachments(
        route.params?.item?.attachments?.map(
          (el: {url: string; mimetype: string; _id: string}) => ({
            id: el._id,
            file: {
              mime: el.mimetype,
              path: el.url,
            },
          }),
        ),
      );
    }
  }, []);

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

      const response = await reviewEdit(jwt, route?.params?.item?._id, data);

      if (response) {
        Alert.alert('Отзыв отредактирован');
        navigation.goBack();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

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
          value={comment}
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
          value={plus}
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
          marginBottom={20}
          value={minus}
        />
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
