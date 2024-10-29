import {PropsWithChildren, ReactNode, useState} from 'react';
import styled from 'styled-components/native';
import {Typography} from './Typography';
import {BackArrow, CloseIcon} from '@assets/svg';
import {Input} from './Input';
import {scale} from 'react-native-size-matters';
import {Alert} from 'react-native';

const Container = styled.View<PropsWithChildren<Props>>`
  width: 100%;
  background: ${({background}) => background || 'transparent'};
  flex-direction: row;
  align-items: center;
  justify-content: ${({rightContent, rightBigContent}) =>
    rightContent || rightBigContent ? 'space-between' : 'flex-start'};
  padding-horizontal: ${({paddingHorizontal}) => paddingHorizontal || 10}px;
`;

const RightSmallBox = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<Props>`
  width: 25px;
  align-items: flex-end;
`;

const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 25px;
  height: 25px;
  align-items: flex-start;
  justify-content: center;
`;

const RightBigBox = styled.View`
  width: 95px;
  justify-content: center;
  align-items: flex-end;
`;

const Title = styled.View<PropsWithChildren<Props>>`
  width: ${({theme, rightBigContent}) =>
    theme.screenWidth - (rightBigContent ? 180 : 115)}px;
  justify-content: center;
  height: ${scale(56)}px;
`;

interface Props {
  handleNavigateBack?: () => void;
  handleSearchIcon?: () => void;
  handleSearchInput?: () => void;
  typeSearchInput?: string;
  onChangeText?: (value: string) => void;
  title?: string;
  background?: string;
  rightContent?: ReactNode;
  isSearchHeader?: boolean;
  rightBigContent?: ReactNode;
  placeholder?: string;
  paddingHorizontal?: number;
  initShowSearch?: boolean;
  numberOfLines?: number;
  paddingRight?: number;
  setSearch?: (search: string) => void;
  handleRightContent?: () => void;
}

export const Header = ({
  handleNavigateBack,
  handleRightContent,
  rightContent,
  title,
  background,
  isSearchHeader,
  rightBigContent,
  placeholder,
  paddingHorizontal = 20,
  initShowSearch,
  onChangeText,
  handleSearchIcon,
  typeSearchInput,
  handleSearchInput,
  numberOfLines,
  setSearch,
}: PropsWithChildren<Props>) => {
  const [isSearch, setIsSearch] = useState(false);
  const [isSearchFocus, setIsSearchFocus] = useState(false);

  const handleSearchIconToggle = () => {
    setSearch?.('');
    handleRightContent?.();
    if (isSearchHeader) {
      setIsSearch(!isSearch);
      setIsSearchFocus(!isSearchFocus);
      if (handleSearchIcon) {
        handleSearchIcon();
      }
    }
  };

  return (
    <Container
      style={{height: scale(56)}}
      rightBigContent={rightBigContent}
      paddingHorizontal={paddingHorizontal}
      rightContent={rightContent}
      background={background}>
      {handleNavigateBack && (
        <Button onPress={handleNavigateBack}>
          <BackArrow />
        </Button>
      )}
      <Title rightBigContent={rightBigContent}>
        {(isSearch || initShowSearch) && (
          <Input
            autoFocus={isSearchFocus}
            borderNone
            handle={handleSearchInput}
            type={typeSearchInput}
            background={background ? background : '#121212'}
            paddingLeft={5}
            placeholder={placeholder}
            onChangeText={onChangeText}
            disableLabel
          />
        )}

        {title && !isSearch && (
          <Typography
            lineHeight={24}
            fontWeight={600}
            numberOfLines={numberOfLines}
            size={18}
            color="#F2F2F2"
            marginLeft={5}>
            {title}
          </Typography>
        )}
      </Title>
      {isSearch && (
        <RightSmallBox onPress={handleSearchIconToggle} paddingRight={6}>
          <CloseIcon color="#F2F2F2" />
        </RightSmallBox>
      )}
      {rightContent && !isSearch && (
        <RightSmallBox onPress={handleSearchIconToggle} paddingRight={6}>
          {rightContent}
        </RightSmallBox>
      )}
      {rightBigContent && <RightBigBox>{rightBigContent}</RightBigBox>}
    </Container>
  );
};
