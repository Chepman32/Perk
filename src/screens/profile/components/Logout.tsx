import {Center, Content} from '@assets/styles/globals';
import {LogoutBorder, LogoutWrapper} from './style';
import {Box, ButtonWrapper, Flex, Typography} from '@components';
import {ExitIcon, TrashIcon} from '@assets/svg';
import {useAuth} from '@shared/hooks';
import {useState} from 'react';
import {Modal, TouchableOpacity, View} from 'react-native';
import {
  ModalDeleteRecord,
  ModalDeleteWrapper,
} from '@screens/serviceHistory/components/style';
import {User} from '@services';
import { useDispatch } from 'react-redux';
import { setClearGarageSlice } from '@slices';

export const Logout = () => {
  const {userDeleteAccount} = User;
  const {handleLogout, jwt} = useAuth();
  const dispatch = useDispatch()
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onDelete = async () => {
    handleLogout();
    dispatch(setClearGarageSlice())
    setShowDeleteModal(false);
    const res = await userDeleteAccount(jwt);
  };

  return (
    <LogoutWrapper>
      <Modal animationType="fade" transparent={true} visible={showDeleteModal}>
        <ModalDeleteWrapper>
          <ModalDeleteRecord>
            <Typography
              fontWeight={600}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              Удалить аккаунт?
            </Typography>

            <Typography
              marginTop={8}
              fontWeight={400}
              lineHeight={16}
              size={13}
              color="#7F7F7F">
              Вы уверены, что хотите удалить аккаунт? {'\n'}Восстановить его
              будет невозможно.
            </Typography>

            <Flex marginTop={12} justifyContent="flex-end">
              <View
                style={{
                  height: 44,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: 176,
                  justifyContent: 'space-between',
                  paddingHorizontal: 8,
                  marginBottom: -12,
                }}>
                <ButtonWrapper
                  handle={() => {
                    setShowDeleteModal(false);
                  }}>
                  <Typography
                    fontWeight={500}
                    lineHeight={16}
                    marginRight={12}
                    size={13}
                    color="#F2F2F2">
                    Отмена
                  </Typography>
                </ButtonWrapper>
                <ButtonWrapper handle={onDelete}>
                  <Typography
                    fontWeight={500}
                    lineHeight={16}
                    size={13}
                    color="#C53830">
                    Удалить
                  </Typography>
                </ButtonWrapper>
              </View>
            </Flex>
          </ModalDeleteRecord>
        </ModalDeleteWrapper>
      </Modal>

      <Center>
        <Content>
          <ButtonWrapper handle={() => {
            handleLogout();
            dispatch(setClearGarageSlice());
          }}>
            <Flex marginTop={10} marginBottom={10}>
              <Box fixedWidth="20px">
                <ExitIcon />
              </Box>
              <Box subtractScreenWidth={60}>
                <Typography lineHeight={20} size={15} color="#7F7F7F">
                  Выйти из аккаунта
                </Typography>
              </Box>
            </Flex>
          </ButtonWrapper>
        </Content>
      </Center>
      <LogoutBorder />
      <Center>
        <Content>
          <ButtonWrapper>
            <Flex marginTop={10} marginBottom={10}>
              <Box fixedWidth="20px">
                <TrashIcon color="#7F7F7F" />
              </Box>
              <Box subtractScreenWidth={60}>
                <TouchableOpacity
                  onPress={() => {
                    setShowDeleteModal(true);
                  }}>
                  <Typography lineHeight={20} size={15} color="#7F7F7F">
                    Удалить аккаунт
                  </Typography>
                </TouchableOpacity>
              </Box>
            </Flex>
          </ButtonWrapper>
        </Content>
      </Center>
    </LogoutWrapper>
  );
};
