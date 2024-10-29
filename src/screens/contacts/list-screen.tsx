import {HelpIcon, RigthArrow} from '@assets/svg';
import {
  ButtonFixed,
  Box,
  Button,
  ButtonWrapper,
  ContactItem,
  Flex,
  Header,
  Layout,
  Typography,
  Loading,
} from '@components';
import {Screens} from '@shared/enums';
import {ContactCarImage, ContactWrapper} from './components/style';
import {ContactsService} from '@services';
import {useAuth} from '@shared/hooks';
import {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {EmptyContacts} from './empty-contacts-list.view';
import {useFocusEffect} from '@react-navigation/native';
import {alphabeticalSorting} from '@shared/utils/list';
import {scale} from 'react-native-size-matters';
import {useDispatch} from '@store/store';
import {clearPhoneContact} from '@slices';

export const ContactList: React.FC = ({navigation}: any) => {
  const {contacts} = ContactsService;
  const dispath = useDispatch();
  const {jwt} = useAuth();
  const [loading, setLoading] = useState(false);
  const [contactsList, setContactsList] = useState([]);

  const getContactsList = async () => {
    try {
      setLoading(true);
      const response = await contacts(jwt);

      if (response) {
        setContactsList(response);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleNavigateAddContact = () => {
    navigation.navigate(Screens.CONTACT_ADD);
    dispath(clearPhoneContact());
  };

  useFocusEffect(
    useCallback(() => {
      getContactsList();
    }, []),
  );

  if (loading) {
    return (
      <Layout statusBarColor="#040404" chidlrenBackground="#040404">
        <Header
          handleNavigateBack={() => navigation.goBack()}
          title="Контакты"
          background="#040404"
        />
        <Loading />
      </Layout>
    );
  }

  if (contactsList.length == 0) {
    return (
      <Layout statusBarColor="#040404" chidlrenBackground="#040404">
        <Header
          handleNavigateBack={() => navigation.goBack()}
          title="Контакты"
          background="#040404"
        />
        <EmptyContacts />
        <ButtonFixed handle={() => navigation.navigate(Screens.CONTACT_ADD)} />
      </Layout>
    );
  }

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title="Контакты"
        background="#040404"
        // rightContent={
        //   <ButtonWrapper>
        //     <HelpIcon />
        //   </ButtonWrapper>
        // }
      />
      <FlatList
        contentContainerStyle={{alignItems: 'center'}}
        data={alphabeticalSorting(contactsList, 'firstName')}
        renderItem={({item}: any) => {
          return (
            <ButtonWrapper
              key={item?._id}
              handle={() =>
                navigation.navigate(Screens.CONTACT_SETTINGS, {
                  contactId: item?._id,
                })
              }>
              <ContactWrapper>
                <ContactItem
                  rightContent={
                    <Button
                      fixedWidth={`${scale(28)}px`}
                      height={28}
                      borderRadius={28}
                      background="rgba(255, 255, 255, 0.08)">
                      <RigthArrow />
                    </Button>
                  }
                  phone={item?.phone}
                  image={item?.avatar?.path}
                  firstName={item?.firstName}
                />
                {item.sharedCars.map((i: any, k: number) => {
                  return (
                    <Flex key={k} marginTop={14}>
                      {/* <Box fixedWidth="24px">
                        <ContactCarImage
                          source={require('@assets/images/temp/Volkswagen.png')}
                        />
                      </Box> */}
                      <Box subtractScreenWidth={64}>
                        <Typography
                          fontWeight={400}
                          lineHeight={20}
                          size={15}
                          color="#F2F2F2">
                          {i.mark?.name} {i.model?.name}
                        </Typography>
                      </Box>
                    </Flex>
                  );
                })}
              </ContactWrapper>
            </ButtonWrapper>
          );
        }}
      />
      <ButtonFixed handle={handleNavigateAddContact} />
    </Layout>
  );
};
