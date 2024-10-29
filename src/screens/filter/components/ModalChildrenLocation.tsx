import {Typography} from '@components';
import {
  ModalChildrenLocationItem,
  ModalChildrenLocationText,
  ModalChildrenIcon,
  ModalChildrenRadioEmpty,
} from './style';
import {ClockIcon, GpsIcon, RadioIcon} from '@assets/svg';
import {PropsWithChildren} from 'react';

interface Props {
  handle: (city: string) => void;
}

export const ModalChildrenLocation = ({handle}: PropsWithChildren<Props>) => {
  return (
    <>
      {/* <ModalChildrenLocationItem>
        <ModalChildrenIcon>
          <GpsIcon />
        </ModalChildrenIcon>
        <ModalChildrenLocationText>
          <Typography
            lineHeight={20}
            marginLeft={16}
            size={15}
            fontWeight={400}
            color="#F2F2F2">
            Мое местоположение
          </Typography>
        </ModalChildrenLocationText>
        <RadioIcon />
      </ModalChildrenLocationItem> */}
      <ModalChildrenLocationItem onPress={() => handle('Москва')}>
        <ModalChildrenIcon />
        <ModalChildrenLocationText>
          <Typography
            lineHeight={20}
            marginLeft={16}
            size={15}
            fontWeight={400}
            color="#F2F2F2">
            Москва
          </Typography>
        </ModalChildrenLocationText>
        <ModalChildrenRadioEmpty />
      </ModalChildrenLocationItem>
    </>
  );
};
