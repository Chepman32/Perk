import {Button, Frame, Header, Layout, Typography} from '@components';
import {HeaderId} from './components';
import {Center, Content} from '@assets/styles/globals';

export const NotificationSubscripteId: React.FC = ({navigation}: any) => {
  return (
    <Layout statusBarColor="#121212">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Уведомление"
        background="#121212"
      />
      <HeaderId
        title="Подписка"
        description="12:00, 28 января будет списана плата за тариф 150 000 ₽. Проверьте остаток средств на вашей карте"
        date="25.02 в 18:09"
      />
      <Center>
        <Frame marginTop={8} subtractScreenWidth={32}>
          <Typography
            lineHeight={16}
            fontWeight={400}
            size={11}
            color="#7F7F7F">
            Дата списания
          </Typography>
          <Typography
            lineHeight={20}
            marginTop={2}
            fontWeight={400}
            size={15}
            color="#F2F2F2">
            12:00, 28 января
          </Typography>
        </Frame>
        <Frame marginTop={8} subtractScreenWidth={32}>
          <Typography
            lineHeight={16}
            fontWeight={400}
            size={11}
            color="#7F7F7F">
            Сумма списания
          </Typography>
          <Typography
            lineHeight={20}
            marginTop={2}
            fontWeight={400}
            size={15}
            color="#F2F2F2">
            150 000 ₽/мес
          </Typography>
        </Frame>
        <Content>
          <Button
            marginTop={12}
            background="#F2F2F2"
            height={44}
            borderRadius={12}
            fixedWidth="100%">
            <Typography
              lineHeight={16}
              fontWeight={500}
              size={13}
              color="#1D1D1D">
              К бренду
            </Typography>
          </Button>
        </Content>
      </Center>
    </Layout>
  );
};
