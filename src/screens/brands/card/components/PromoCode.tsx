import {Typography} from '@components';
import {PromoCodeWrapper, PromoCodeClose} from './style';
import {CloseIcon} from '@assets/svg';
import {PropsWithChildren, useState} from 'react';

interface Props {
  promocode?: string;
  sale?: number;
}

export const PromoCode = ({promocode, sale}: PropsWithChildren<Props>) => {
  const [closePromocode, setClosePromocode] = useState(false);

  if (closePromocode) {
    return null;
  }
  return (
    <PromoCodeWrapper source={require('@assets/images/modaPromoCode.png')}>
      <PromoCodeClose onPress={() => setClosePromocode(true)}>
        <CloseIcon color="#F2F2F2" />
      </PromoCodeClose>
      <Typography
        fontWeight={500}
        lineHeight={16}
        align="center"
        marginTop={9}
        marginRight={33}
        marginLeft={33}
        size={13}
        color="#7F7F7F">
        Ваш промокод на скидку{' '}
        <Typography
          fontWeight={500}
          lineHeight={16}
          align="center"
          size={13}
          color="#F2F2F2">
          {sale}%
        </Typography>
      </Typography>
      <Typography
        fontWeight={400}
        marginRight={8}
        marginLeft={8}
        lineHeight={16}
        marginTop={6}
        align="center"
        size={13}
        color="#7F7F7F">
        Посетив бренд, продиктуйте код и по вашим {"\n"}
        услугам будет применена скидка
      </Typography>

      <Typography
        fontWeight={700}
        lineHeight={20}
        align="center"
        marginTop={40}
        size={18}
        color="#F2F2F2">
        {promocode}
      </Typography>
    </PromoCodeWrapper>
  );
};
