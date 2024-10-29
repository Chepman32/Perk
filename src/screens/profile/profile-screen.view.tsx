import {ScrollVertical, Wrapper} from '@assets/styles/globals';
import {
  UserName,
  Reminders,
  PaymentHistory,
  Contacts,
  Reviews,
  Menu,
} from './components';
import {Layout} from '@components';
import {User} from '@services';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {useAuth} from '@shared/hooks';
import {Rates} from '@screens/home/components';

export const Profile: React.FC = () => {
  const {jwt} = useAuth();
  const {userProfile} = User;
  const [userInfo, setUserInfo] = useState<any>({});

  const getProfile = async () => {
    try {
      const response = await userProfile(jwt);
      if (response) {
        setUserInfo(response);
      }
    } catch (error) {}
  };

  useFocusEffect(
    useCallback(() => {
      getProfile();
    }, []),
  );

  return (
    <Layout
      statusBarColor="#121212"
      chidlrenBackground="#040404"
      edges={['right', 'left', 'top']}>
      <ScrollVertical>
        <Wrapper>
          <UserName userInfo={userInfo} />
          <Reminders
            tasksCount={userInfo?.tasksCount}
            favoritesCount={userInfo?.favoritesCount}
          />
          {/* <PaymentHistory /> */}
          <Rates />
          <Contacts />
          <Reviews
            reviewsCount={userInfo?.reviewsCount}
            blacklistedCount={userInfo?.blacklistedCount}
          />
          <Menu />
        </Wrapper>
      </ScrollVertical>
    </Layout>
  );
};
