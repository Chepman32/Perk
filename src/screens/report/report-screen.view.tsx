import {Content} from '@assets/styles/globals';
import {
  Header,
  Input,
  Layout,
  KeyboardAvoidingWrapper,
  Typography,
  Button,
  Attachment,
  AttachPhoto,
} from '@components';
import {useState} from 'react';
import {scale} from 'react-native-size-matters';
import {ReportBrand, ReportBrandImage, ReportBrandInner} from './style';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Brands} from '@services';
import {useAuth} from '@shared/hooks';
import {Alert} from 'react-native';
import {useAttachment} from '@shared/hooks/useAttachment';
import {ScrollView} from 'react-native-gesture-handler';

export const Report: React.FC = () => {
  const {jwt} = useAuth();
  const {params} = useRoute<any>();
  const {attachments, setAttachments, handleUploadAttach, handleDeleteAttach} =
    useAttachment();
  const {goBack} = useNavigation<StackNavigationProp<RootParamList>>();
  const {brandError} = Brands;
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendReport = async () => {
    try {
      setLoading(true);

      let body = {};

      if (attachments.length !== 0) {
        body = {
          attachments: attachments,
          comment: value,
        };
      } else {
        body = {
          comment: value,
        };
      }

      const response = await brandError(jwt, params?.brandId, body);

      if (response) {
        Alert.alert('Сообщение об ошибке отправленно');
        setAttachments([]);
        setValue('');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <Layout
      edges={['right', 'left', 'top']}
      statusBarColor="#040404"
      chidlrenBackground="#040404">
      <Header
        title="Сообщить об ошибке"
        background="#040404"
        handleNavigateBack={() => goBack()}
      />
      <KeyboardAvoidingWrapper
        bottom={
          <Button
            onPress={handleSendReport}
            loader={loading}
            disabled={value.trim().length == 0 || loading}
            subtractScreenWidth={32}>
            <Typography
              fontWeight={500}
              marginLeft={8}
              lineHeight={20}
              size={15}
              color="#1D1D1D">
              Применить
            </Typography>
          </Button>
        }>
        <Content>
          <ReportBrand>
            <ReportBrandImage
              source={{
                uri: params?.image,
              }}
            />
            <ReportBrandInner>
              <Typography
                numberOfLines={1}
                size={15}
                lineHeight={20}
                maxWidth={'90%'}
                color="#f2f2f2"
                marginBottom={+`${scale(4)}`}
                fontWeight={500}>
                {params?.legalName}
              </Typography>

              <Typography
                size={13}
                lineHeight={16}
                maxWidth={'90%'}
                color="#7f7f7f"
                marginBottom={+`${scale(8)}`}
                fontWeight={400}>
                {params?.address}
              </Typography>
            </ReportBrandInner>
          </ReportBrand>
          <Input
            multiline
            onChangeText={value => setValue(value)}
            placeholder="Комментарий"
            value={value}
            height={100}
            subtractScreenWidth={32}
            marginBottom={+`${scale(16)}`}
            xValue={42}
          />
          <Typography
            size={13}
            lineHeight={16}
            color="#f2f2f2"
            marginBottom={+`${scale(8)}`}
            fontWeight={400}>
            До 5 файлов, каждый не более 10 Мб
          </Typography>

          <ScrollView horizontal>
            <AttachPhoto
              marginTop={8}
              disabled={
                attachments?.length >= 5 ||
                attachments?.some(el => el.id === null)
              }
              handle={handleUploadAttach}
            />
            {!!attachments.length && (
              <Attachment
                scale
                attachments={attachments}
                handleDeleteAttach={handleDeleteAttach}
              />
            )}
          </ScrollView>
        </Content>
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
