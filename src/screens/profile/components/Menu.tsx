import {Typography} from '@components';
import {
  MenuItem,
  MenuItemIcon,
  MenuItemText,
  MenuLine,
  MenuWrapper,
} from './style';
import {NotificationIcon, DocumentIcon, InfoIcon} from '@assets/svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';

export const Menu = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();

  return (
    <MenuWrapper>
      {/* <MenuItem
        onPress={() => navigation.navigate(Screens.NOTIFICATION_SETTINGS)}>
        <MenuItemIcon>
          <NotificationIcon />
        </MenuItemIcon>
        <MenuItemText>
          <Typography lineHeight={20} size={15} color="#F2F2F2">
            Настроить уведомления
          </Typography>
        </MenuItemText>
      </MenuItem> */}
      <MenuLine />
      <MenuItem>
        <MenuItemIcon>
          <DocumentIcon />
        </MenuItemIcon>
        <MenuItemText>
          <Typography lineHeight={20} size={15} color="#F2F2F2">
            Пользовательское соглашение
          </Typography>
        </MenuItemText>
      </MenuItem>
      <MenuLine />
      <MenuItem>
        <MenuItemIcon>
          <InfoIcon />
        </MenuItemIcon>
        <MenuItemText>
          <Typography lineHeight={20} size={15} color="#F2F2F2">
            О приложении
          </Typography>
        </MenuItemText>
      </MenuItem>
    </MenuWrapper>
  );
};
