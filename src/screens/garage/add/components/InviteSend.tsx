import {Button, Typography} from '@components';
import {ClockWaitIcon} from '@assets/svg';
import {Wrapper} from '@assets/styles/globals';

export const InviteSend: React.FC = () => {
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
        Приглашение отправлено!
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
        Статус отображения контакта вы можете отслеживать в гараже во вкладке
        Водители.
      </Typography>
      <Button
        fixedWidth="200px"
        marginTop={24}
        background="rgba(255, 255, 255, 0.08)">
        <Typography
          align="center"
          lineHeight={16}
          fontWeight={500}
          size={13}
          color="#F2F2F2">
          Вернуться в профиль
        </Typography>
      </Button>
    </Wrapper>
  );
};
