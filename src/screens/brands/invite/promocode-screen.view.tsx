import {Center, Content} from '@assets/styles/globals';
import {Typography, Header, Layout, Flex, Box} from '@components';
import {PromoCodeWrapper} from './style';
import {BrandInfo, BrandInfoImage, BrandInfoText} from '../review/style';
import {HelpIcon} from '@assets/svg';

export const PromoCode: React.FC = ({navigation, route}: any) => {
  return (
    <Layout chidlrenBackground="#040404" statusBarColor="#040404">
      <Header title="Промокод" handleNavigateBack={() => navigation.goBack()} />

      <Center>
        <Content>
          <BrandInfo>
            <BrandInfoImage
              source={{
                uri: route.params?.brandIdItem?.avatar?.url,
              }}
            />
            <BrandInfoText>
              <Typography
                marginLeft={12}
                lineHeight={20}
                fontWeight={500}
                size={15}
                numberOfLines={1}
                color="#F2F2F2">
                {route.params?.brandIdItem?.address}
              </Typography>
              <Typography
                marginLeft={12}
                marginTop={4}
                lineHeight={16}
                fontWeight={400}
                size={13}
                color="#7F7F7F">
                {route.params?.brandIdItem?.address}
              </Typography>
            </BrandInfoText>
          </BrandInfo>
          <Typography
            fontWeight={400}
            lineHeight={20}
            marginTop={24}
            size={15}
            color="#7F7F7F">
            Ваш промокод на скидку{' '}
            <Typography
              fontWeight={400}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              {route.params?.brandIdItem?.sale}%
            </Typography>
          </Typography>
          <PromoCodeWrapper
            source={require('@assets/images/modaPromoCode.png')}>
            <Typography
              fontWeight={700}
              marginLeft={8}
              lineHeight={32}
              marginTop={35}
              align="center"
              size={24}
              color="#F2F2F2">
              {route.params?.brandIdItem?.promocode}
            </Typography>
          </PromoCodeWrapper>
          <Flex alignItems="flex-start" marginTop={24}>
            <Box fixedWidth="24px">
              <HelpIcon color="#F2F2F2" />
            </Box>

            <Box subtractScreenWidth={60}>
              <Typography
                fontWeight={600}
                lineHeight={20}
                size={15}
                color="#F2F2F2">
                Как воспользоваться
              </Typography>
              <Typography
                fontWeight={400}
                marginTop={4}
                lineHeight={16}
                size={13}
                color="#F2F2F2">
                Чтобы активировать промокод, покажите его на сервисе до
                дата-дата-дата. Скидкой могут воспользоваться все, у кого есть
                доступ к вашему PERK-гаражу. Классно, когда хорошие люди
                встречают хороших людей. Чаще всего их сталкивает случай или
                добрая рекомендация. Мы хотим, чтобы еще одной силой для таких
                встреч стал PERK. Поэтому мы очень внимательны к идеям наших
                пользователей. Рекомендуя ваши любимые сервисы или приложение
                PERK, вы помогаете нам стать лучше и собрать единомышленников. В
                качестве благодарности за ваше участие, мы дадим промокоды вам и
                тому, кому вы порекомендуете этот бренд.
              </Typography>
            </Box>
          </Flex>
        </Content>
      </Center>

      {/* <Typography
        marginTop={20}
        marginLeft={16}
        marginRight={16}
        align="center"
        lineHeight={24}
        fontWeight={600}
        size={18}
        color="#F2F2F2">
        Рекомендуйте Perk
      </Typography> */}
    </Layout>
  );
};
