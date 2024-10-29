import {Button, Flex, Input, Typography} from '@components';
import {
  InputWrapper,
  InputIconBox,
  InputBox,
  Wrapper,
  SortWrapper,
} from './style';
import {FilterIcon, SearchIcon, SortIcon, StrokeIcon} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';

export const Header = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Wrapper>
      <InputWrapper>
        <InputIconBox disabled>
          <SearchIcon color="rgba(242, 242, 242, 1)" />
        </InputIconBox>
        <InputBox>
          <Input
            background="transparent"
            borderNone
            paddingLeft={5}
            placeholder="Поиск в Москве"
            xValue={64}
          />
        </InputBox>
        <InputIconBox margin="0 2px 0 0">
          <FilterIcon />
        </InputIconBox>
      </InputWrapper>

      <SortWrapper>
        <Button
          // opacity={0}
          borderRadius={8}
          background="rgba(255, 255, 255, 0.08)"
          fixedWidth="126px"
          height={32}>
          <Flex justifyContent="center">
            <SortIcon />
            <Typography
              marginLeft={7}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              По рейтингу
            </Typography>
          </Flex>
        </Button>

        <Button
          borderRadius={8}
          background="rgba(255, 255, 255, 0.08)"
          fixedWidth="126px"
          onPress={() => navigation.goBack()}
          height={32}>
          <Flex justifyContent="center">
            <StrokeIcon />
            <Typography
              marginLeft={7}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              Списком
            </Typography>
          </Flex>
        </Button>
      </SortWrapper>
    </Wrapper>
  );
};
