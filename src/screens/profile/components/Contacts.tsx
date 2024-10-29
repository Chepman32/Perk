import {Flex, Typography} from '@components';
import {
  ContactsWrapper,
  ContactsRigthArrowBox,
  ContactsSlider,
  ContactsBox,
  ContactsBoxImage,
} from './style';
import {RigthArrow} from '@assets/svg';
import {StackNavigationProp} from '@react-navigation/stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {RootParamList} from '@shared/types/navigation';
import {Screens} from '@shared/enums';
import {ContactsService} from '@services';
import {useAuth} from '@shared/hooks';
import {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {alphabeticalSorting} from '@shared/utils/list';

export const Contacts = () => {
  const navigation = useNavigation<StackNavigationProp<RootParamList>>();
  const {contacts} = ContactsService;
  const {jwt} = useAuth();
  const [contactsList, setContactsList] = useState([]);

  const getContacts = async () => {
    try {
      const response = await contacts(jwt);
      if (response) {
        setContactsList(alphabeticalSorting(response, 'firstName'));
      }
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getContacts();
    }, []),
  );

  return (
    <ContactsWrapper>
      <Flex>
        <Flex widthAuto>
          <Typography lineHeight={20} size={15} color="#F2F2F2">
            Контакты
          </Typography>
        </Flex>
        <ContactsRigthArrowBox
          onPress={() => navigation.navigate(Screens.CONTACT_LIST)}>
          <RigthArrow />
        </ContactsRigthArrowBox>
      </Flex>
      {contactsList.length !== 0 && (
        <ContactsSlider>
          {contactsList.map((item: any, index) => {
            return (
              <ContactsBox
                onPress={() =>
                  navigation.navigate(Screens.CONTACT_SETTINGS, {
                    contactId: item?._id,
                  })
                }
                key={index}>
                {item?.image ? (
                  <ContactsBoxImage
                    source={require('@assets/images/temp/Avatar.png')}
                  />
                ) : (
                  <LinearGradient
                    colors={['#343434', '#1E1E1E']}
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: 'rgba(255, 255, 255, 0.08)',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Typography
                      fontWeight={400}
                      lineHeight={24}
                      size={17}
                      color="#7F7F7F">
                      {item?.firstName?.[0]}
                    </Typography>
                  </LinearGradient>
                )}
                <Typography
                  marginTop={5}
                  align="center"
                  lineHeight={16}
                  numberOfLines={1}
                  size={11}
                  color="#F2F2F2">
                  {item?.firstName}
                </Typography>
              </ContactsBox>
            );
          })}
        </ContactsSlider>
      )}
    </ContactsWrapper>
  );
};
