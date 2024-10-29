import {createStackNavigator} from '@react-navigation/stack';
import {Screens} from '@shared/enums';
import {RootParamList} from '@shared/types/navigation';
import {Phone, Code, Name} from '@screens/authorization';
import {
  YourGarage,
  ListCarItems,
  AddCar,
  Card,
  Characteristics,
  NotificationGarage,
  AddDriver,
  EditCar,
} from '@screens/garage';
import {RoutesOptions} from './options';
import {Tabs} from './Tabs';
import {Rates, RateConditions, RatePayment} from '@screens/rates';
import {Support} from '@screens/support';
import {Service} from '@screens/service';
import {
  BrandCard,
  BrandsList,
  InviteBrand,
  MapList,
  PromoCode,
  ReviewBrand,
} from '@screens/brands';
import {Gallery} from '@screens/gallery';
import {SearchCatalog} from '@screens/search';
import {AddRecord, EditRecord, Entry, History} from '@screens/serviceHistory';
import {Analytics, Period} from '@screens/analytics';
import {CalendarList} from '@screens/calendar';
import {
  ProfileCode,
  EditProfile,
  ProfilePhone,
  ProfileCodeVerification,
  ProfileFavorite,
  MyReviews,
  EditMyReview,
  BlackList,
  NotificationSettings,
} from '@screens/profile';
import {
  ContactAdd,
  ContactList,
  ContactSettings,
  PhoneContactList,
} from '@screens/contacts';
import {
  NotificationInviteId,
  NotificationList,
  NotificationReviewId,
  NotificationServiceId,
  NotificationSubscripteId,
} from '@screens/notification';
import {Filter} from '@screens/filter/filter-screen.view';
import {Loading} from '@components';
import {LifehacksCard, LifehacksList} from '@screens/lifehacks';
import {Report} from '@screens/report';
import GalleryZoom from 'src/components/GalleryZoom';

const Stack = createStackNavigator<RootParamList>();

export const Routes = () => {
  return (
    <Stack.Navigator screenOptions={RoutesOptions}>
      <Stack.Screen name={Screens.LOADING} component={Loading} />
      <Stack.Screen name={Screens.PHONE} component={Phone} />
      <Stack.Screen name={Screens.NAME} component={Name} />
      <Stack.Screen name={Screens.CODE} component={Code} />
      <Stack.Screen name={Screens.YOUR_GARAGE_LIST} component={YourGarage} />
      <Stack.Screen name={Screens.LIST_CAR_ITEMS} component={ListCarItems} />
      <Stack.Screen name={Screens.TABS} component={Tabs} />
      <Stack.Screen name={Screens.RATES} component={Rates} />
      <Stack.Screen name={Screens.RATE_CONDITIONS} component={RateConditions} />
      <Stack.Screen name={Screens.RATE_PAYMENT} component={RatePayment} />
      <Stack.Screen name={Screens.SUPPORT} component={Support} />
      <Stack.Screen name={Screens.ADD_CAR} component={AddCar} />
      <Stack.Screen name={Screens.EDIT_CAR} component={EditCar} />
      <Stack.Screen name={Screens.SEARCH_CATALOG} component={SearchCatalog} />
      <Stack.Screen name={Screens.FILTER} component={Filter} />
      <Stack.Screen name={Screens.SERVICE} component={Service} />
      <Stack.Screen name={Screens.BRANDS_LIST} component={BrandsList} />
      <Stack.Screen name={Screens.BRANDS_LIST_MAP} component={MapList} />
      <Stack.Screen name={Screens.INVITE} component={InviteBrand} />
      <Stack.Screen name={Screens.REVIEW_BRAND} component={ReviewBrand} />
      <Stack.Screen name={Screens.GARAGE_CARD} component={Card} />
      <Stack.Screen name={Screens.BRAND_CARD} component={BrandCard} />
      <Stack.Screen name={Screens.GALLERY} component={Gallery} />
      <Stack.Screen name={Screens.GALLERY_ZOOM} component={GalleryZoom} />
      <Stack.Screen
        name={Screens.CAR_CHARACTERISTICS}
        component={Characteristics}
      />
      <Stack.Screen name={Screens.SERVICE_HISTORY} component={History} />
      <Stack.Screen name={Screens.SERVICE_ENTRY} component={Entry} />
      <Stack.Screen name={Screens.SERVICE_EDIT_RECORD} component={EditRecord} />

      <Stack.Screen name={Screens.SERVICE_ADD_RECORD} component={AddRecord} />
      <Stack.Screen name={Screens.ANALYTICS} component={Analytics} />
      <Stack.Screen name={Screens.ANALYTICS_PERIOD} component={Period} />
      <Stack.Screen
        name={Screens.NOTIFICATION_GARAGE}
        component={NotificationGarage}
      />
      <Stack.Screen
        name={Screens.CONTACT_SETTINGS}
        component={ContactSettings}
      />
      <Stack.Screen name={Screens.LIFEHACKS_CARD} component={LifehacksCard} />
      <Stack.Screen name={Screens.LIFEHACKS_LIST} component={LifehacksList} />
      <Stack.Screen name={Screens.ADD_DRIVER} component={AddDriver} />
      <Stack.Screen name={Screens.CALENDAR} component={CalendarList} />
      <Stack.Screen name={Screens.PROMO_CODE} component={PromoCode} />
      <Stack.Screen name={Screens.EDIT_PROFILE} component={EditProfile} />
      <Stack.Screen name={Screens.PROFILE_CODE} component={ProfileCode} />
      <Stack.Screen name={Screens.PROFILE_PHONE} component={ProfilePhone} />
      <Stack.Screen name={Screens.CONTACT_ADD} component={ContactAdd} />
      <Stack.Screen
        name={Screens.PROFILE_CODE_VERIFICATION}
        component={ProfileCodeVerification}
      />
      <Stack.Screen
        name={Screens.PROFILE_FAVORITE}
        component={ProfileFavorite}
      />
      <Stack.Screen name={Screens.CONTACT_LIST} component={ContactList} />
      <Stack.Screen name={Screens.MY_REVIEWS} component={MyReviews} />
      <Stack.Screen name={Screens.EDIT_MY_REVIEW} component={EditMyReview} />
      <Stack.Screen
        name={Screens.NOTIFICATION_SETTINGS}
        component={NotificationSettings}
      />
      <Stack.Screen
        name={Screens.NOTIFICATION_LIST}
        component={NotificationList}
      />
      <Stack.Screen
        name={Screens.NOTIFICATION_INVITE_ID}
        component={NotificationInviteId}
      />
      <Stack.Screen
        name={Screens.NOTIFICATION_SERVICE_ID}
        component={NotificationServiceId}
      />
      <Stack.Screen
        name={Screens.NOTIFICATION_SUBSCRIPTE_ID}
        component={NotificationSubscripteId}
      />
      <Stack.Screen
        name={Screens.NOTIFICATION_REVIEW_ID}
        component={NotificationReviewId}
      />
      <Stack.Screen
        name={Screens.PHONE_CONTACTS_LIST}
        component={PhoneContactList}
      />
      <Stack.Screen name={Screens.BLACK_LIST} component={BlackList} />
      <Stack.Screen name={Screens.REPORT} component={Report} />
    </Stack.Navigator>
  );
};
