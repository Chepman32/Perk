import {Typography} from '@components';
import {InputWrapper, InputIconBox, InputBox} from './style';
import {FilterIcon, SearchIcon} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';

export const Search = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <InputWrapper onPress={() => navigation.navigate(Screens.SEARCH_CATALOG)}>
      <InputIconBox disabled>
        <SearchIcon color="#F2F2F2" />
      </InputIconBox>
      <InputBox>
        <Typography lineHeight={20} size={15} color="#7F7F7F">
          Поиск в Москве
        </Typography>
      </InputBox>
      <InputIconBox disabled></InputIconBox>
    </InputWrapper>
  );
};
