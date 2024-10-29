import {Button, Typography} from '@components';
import {ClockWaitIcon} from '@assets/svg';
import {Wrapper} from '@assets/styles/globals';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';

export const ReviewModeration: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <Wrapper justifyContent="center">
      <ClockWaitIcon />
      <Typography
        marginLeft={16}
        marginRight={16}
        marginTop={24}
        align="center"
        lineHeight={24}
        fontWeight={600}
        size={18}
        color="#F2F2F2">
        Спасибо!
      </Typography>
      <Typography
        marginTop={12}
        marginLeft={16}
        marginRight={16}
        align="center"
        lineHeight={20}
        fontWeight={400}
        size={15}
        color="#F2F2F2">
        Отзыв отправлен на модерацию.{'\n'}
        Статус публикации отзыва вы можете{'\n'}
        отслеживать в вашем профиле.
      </Typography>
      <Button
        subtractScreenWidth={190}
        marginTop={24}
        height={44}
        borderRadius={12}
        onPress={() => navigation.goBack()}
        background="rgba(255, 255, 255, 0.08)">
        <Typography
          align="center"
          lineHeight={16}
          fontWeight={500}
          size={13}
          color="#F2F2F2">
          Вернуться к бренду
        </Typography>
      </Button>
    </Wrapper>
  );
};
