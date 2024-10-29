import {ButtonWrapper, Typography} from '@components';
import {
  ModalChildrenCarItem,
  ModalChildrenCarIcon,
  ModalChildrenCarText,
  ModalChildrenRadio,
} from './style';
import {RadioIcon} from '@assets/svg';
import {PropsWithChildren} from 'react';

interface Props {
  item?: any;
  selectedMarkId?: string;
  handleSelectRadio?: (item: any) => void;
  handleSelectItem?: (item: any) => void;
  showRadio?: boolean;
  color?: string;
  handleRadio?: () => void;
}

export const ModalChildrenCar = ({
  item,
  handleSelectRadio,
  selectedMarkId,
  showRadio,
  handleSelectItem,
  color,
  handleRadio,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <ModalChildrenCarItem
        onPress={handleSelectItem}
        disabled={!handleSelectItem}>
        {/* <ModalChildrenCarIcon></ModalChildrenCarIcon> */}
        <ModalChildrenCarText>
          <Typography
            lineHeight={20}
            size={15}
            fontWeight={400}
            color={color ? color : '#F2F2F2'}>
            {item?.name || item?.mark?.name}
          </Typography>
        </ModalChildrenCarText>
        {showRadio &&
          (selectedMarkId && selectedMarkId == item?._id ? (
            <ButtonWrapper disabled={!handleRadio} handle={handleRadio}>
              <RadioIcon />
            </ButtonWrapper>
          ) : (
            <ModalChildrenRadio
              disabled={!handleSelectRadio}
              onPress={() =>
                handleSelectRadio ? handleSelectRadio(item) : null
              }
            />
          ))}
      </ModalChildrenCarItem>
    </>
  );
};
