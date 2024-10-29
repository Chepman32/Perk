import {InvteStarIcon} from '@assets/svg';
import {
  Typography,
  KeyboardAvoidingWrapper,
  Button,
  Header,
  Input,
  Layout,
} from '@components';
import {InvteStarIconWrapper} from './style';
import {InviteModeration} from './InviteModeration';

export const InviteBrand: React.FC = ({navigation}: any) => {
  //   return <InviteModeration />;
  return (
    <Layout>
      <KeyboardAvoidingWrapper
        bottom={
          <Button subtractScreenWidth={32}>
            <Typography
              align="center"
              lineHeight={20}
              size={15}
              color="#1D1D1D">
              Отправить
            </Typography>
          </Button>
        }>
        <Header
          title="Приглашайте бренды"
          handleNavigateBack={() => navigation.goBack()}
        />
        <InvteStarIconWrapper>
          <InvteStarIcon />
        </InvteStarIconWrapper>
        <Typography
          marginTop={20}
          marginLeft={16}
          marginRight={16}
          align="center"
          lineHeight={24}
          fontWeight={600}
          size={18}
          color="#F2F2F2">
          Рекомендуйте Perk
        </Typography>
        <Typography
          marginTop={12}
          align="center"
          lineHeight={20}
          marginLeft={16}
          marginRight={16}
          fontWeight={400}
          size={15}
          color="#7F7F7F">
          Посоветуйте нам свою любимую автокомпанию, и вы получите специальную
          скидку на услуги автосервиса этого бренда.
        </Typography>
        <Typography
          marginTop={7}
          align="center"
          lineHeight={20}
          marginLeft={16}
          marginRight={16}
          fontWeight={400}
          size={15}
          color="#7F7F7F">
          Мы стремимся удовлетворить ваши потребности, и ваше мнение имеет
          большое значение для нас.
        </Typography>
        <Input placeholder="Название" subtractScreenWidth={32} marginTop={20} />
        <Input placeholder="Адрес" subtractScreenWidth={32} marginTop={12} />
        <Input
          placeholder="Комментарий"
          height={100}
          paddingTop={16}
          multiline
          subtractScreenWidth={32}
          marginTop={12}
        />
      </KeyboardAvoidingWrapper>
    </Layout>
  );
};
