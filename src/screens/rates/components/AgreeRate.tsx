import {Typography} from '@components';
import {
  AgreeTariffCheckBox,
  AgreeTariffWrapper,
  AgreeTariffText,
} from './style';

export const AgreeRate = () => {
  return (
    <AgreeTariffWrapper>
      <AgreeTariffCheckBox></AgreeTariffCheckBox>
      <AgreeTariffText>
        <Typography
          marginLeft={12}
          fontWeight={400}
          lineHeight={16}
          size={13}
          color="#7F7F7F">
          Я соглашаюсь с{' '}
          <Typography
            textDecorationLine="underline"
            fontWeight={400}
            lineHeight={16}
            size={13}
            color="#7F7F7F">
            Условиями тарифа
          </Typography>
        </Typography>
      </AgreeTariffText>
    </AgreeTariffWrapper>
  );
};
