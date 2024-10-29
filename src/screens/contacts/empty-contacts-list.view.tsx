import {Typography} from '@components';
import {BlackListIcon} from '@assets/svg';
import {Wrapper} from '@assets/styles/globals';

export const EmptyContacts: React.FC = () => {
  return (
    <Wrapper justifyContent="center">
      <BlackListIcon />
      <Typography
        marginLeft={16}
        marginRight={16}
        marginTop={24}
        align="center"
        lineHeight={24}
        fontWeight={600}
        size={18}
        color="#F2F2F2">
        Cписок контактов пуст
      </Typography>
    </Wrapper>
  );
};
