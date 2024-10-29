import {CloseIcon} from '@assets/svg';
import {
  ModalHeaderWrapper,
  ModalHeaderTitle,
  ModalHeaderClear,
  ModalHeaderIcon,
} from './style';
import {Typography} from '@components';
import {PropsWithChildren} from 'react';

interface Props {
  title?: string;
  handleReset?: () => void;
  handleClose?: () => void;
}

export const ModalHeader = ({
  title,
  handleReset,
  handleClose,
}: PropsWithChildren<Props>) => {
  return (
    <ModalHeaderWrapper>
      <ModalHeaderIcon onPress={handleClose}>
        <CloseIcon width={17} height={17} color="#F2F2F2" />
      </ModalHeaderIcon>
      <ModalHeaderTitle>
        <Typography
          marginLeft={20}
          lineHeight={24}
          size={18}
          fontWeight={600}
          color="#F2F2F2">
          {title}
        </Typography>
      </ModalHeaderTitle>
      <ModalHeaderClear onPress={handleReset}>
        {/* <Typography lineHeight={20} size={15} fontWeight={400} color="#F2F2F2">
          Сбросить
        </Typography> */}
      </ModalHeaderClear>
    </ModalHeaderWrapper>
  );
};
