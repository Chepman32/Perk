import {CloseIcon} from '@assets/svg';
import {ModalHeaderWrapper, ModalHeaderTitle, ModalHeaderIcon} from './style';
import {Typography} from '@components';
import {PropsWithChildren} from 'react';

interface Props {
  title?: string;
  handleClose?: () => void;
}

export const ModalHeader = ({title, handleClose}: PropsWithChildren<Props>) => {
  return (
    <ModalHeaderWrapper>
      <ModalHeaderTitle>
        <Typography lineHeight={24} size={18} fontWeight={600} color="#F2F2F2">
          {title}
        </Typography>
      </ModalHeaderTitle>
      {handleClose && (
        <ModalHeaderIcon onPress={handleClose}>
          <CloseIcon width={17} height={17} color="#F2F2F2" />
        </ModalHeaderIcon>
      )}
    </ModalHeaderWrapper>
  );
};
