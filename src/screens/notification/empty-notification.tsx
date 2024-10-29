import {Typography} from '@components';
import {FavoriteIcon, NotificationIcon} from '@assets/svg';
import {Wrapper} from '@assets/styles/globals';

export const EmptyNotification: React.FC = () => {
  return (
    <Wrapper justifyContent="center">
      <NotificationIcon width={60} height={60} />
      <Typography
        marginLeft={16}
        marginRight={16}
        marginTop={24}
        align="center"
        lineHeight={24}
        fontWeight={600}
        size={18}
        color="#F2F2F2">
        Пока нет уведомлений
      </Typography>
    </Wrapper>
  );
};
