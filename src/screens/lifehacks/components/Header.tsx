import {BackArrow, CloseIcon, SearchIcon} from '@assets/svg';
import {
  HeaderWrapper,
  ButtonBack,
  HeaderTitle,
  HeaderSearchButton,
  HeaderMarkName,
  CloseInputBox,
} from './style';
import {Center} from '@assets/styles/globals';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Flex, Input, Typography} from '@components';
import {PropsWithChildren, useState} from 'react';
import {scale} from 'react-native-size-matters';

interface Props {
  handleMark?: () => void;
  onChangeText?: (value: string) => void;
  selectedMarkName?: string;
  clearInput: () => void;
}

export const Header = ({
  handleMark,
  onChangeText,
  selectedMarkName,
  clearInput,
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const [showSearch, setShowSearch] = useState(false);

  const handleClearInput = () => {
    clearInput();
    setShowSearch(false);
  };

  return (
    <Center>
      <HeaderWrapper>
        {showSearch ? (
          <Flex>
            <Input
              height={scale(32)}
              background="#040404"
              borderNone
              onChangeText={onChangeText}
              subtractScreenWidth={60}
            />
            <CloseInputBox onPress={handleClearInput}>
              <CloseIcon color={'#fff'} width={16} height={16} />
            </CloseInputBox>
          </Flex>
        ) : (
          <>
            <Flex widthAuto>
              <ButtonBack onPress={() => navigation.goBack()}>
                <BackArrow />
              </ButtonBack>
              <HeaderTitle>
                <Typography
                  fontWeight={600}
                  lineHeight={24}
                  size={18}
                  color="#F2F2F2">
                  Лайфхаки
                </Typography>
              </HeaderTitle>
            </Flex>
            <Flex widthAuto>
              <HeaderSearchButton onPress={() => setShowSearch(true)}>
                <SearchIcon height={16} width={16} />
              </HeaderSearchButton>
              <HeaderMarkName onPress={handleMark}>
                <Typography
                  fontWeight={500}
                  lineHeight={16}
                  size={13}
                  color="#F2F2F2">
                  {selectedMarkName || 'Все марки'}
                </Typography>
              </HeaderMarkName>
            </Flex>
          </>
        )}
      </HeaderWrapper>
    </Center>
  );
};
