import {Typography} from '@components';
import {
  NewsWrapper,
  NewsBox,
  NewsHeaderBox,
  NewsHeaderDate,
  NewsHeaderText,
} from './style';

export const News = () => {
  return (
    <NewsWrapper>
      {[1, 2, 3].map((_, index) => {
        return (
          <NewsBox
            source={require('@assets/images/brand-list.png')}
            marginLeft={index == 0 ? 16 : 0}
            key={index}>
            <NewsHeaderBox>
              <NewsHeaderText>
                <Typography
                  fontWeight={600}
                  lineHeight={20}
                  size={15}
                  color="#F2F2F2">
                  Весенняя ревизия
                </Typography>
              </NewsHeaderText>
              <NewsHeaderDate>
                <Typography
                  fontWeight={400}
                  lineHeight={16}
                  align="center"
                  size={11}
                  color="#F2F2F2">
                  до 05.04
                </Typography>
              </NewsHeaderDate>
            </NewsHeaderBox>

            <Typography
              fontWeight={400}
              lineHeight={16}
              marginTop={8}
              size={13}
              color="#F2F2F2">
              Получите бесплатную диагностику и 15% скидку на запчасти и
              обслуживание вашего автомобиля!"
            </Typography>
          </NewsBox>
        );
      })}
    </NewsWrapper>
  );
};
