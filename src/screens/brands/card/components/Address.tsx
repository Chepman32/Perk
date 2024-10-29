import {
  ClockIcon,
  DownIcon,
  LocationIcon,
  PhoneBorderIcon,
  TelegramIcon,
  VkIcon,
  WhatsUpIcon,
} from '@assets/svg';
import {
  AddressWrapper,
  AddressFlexRow,
  AddressIcon,
  AddressText,
  SocialMediaBox,
  Schedule,
} from './style';
import {ButtonWrapper, Typography} from '@components';
import {PropsWithChildren} from 'react';
import {Linking} from 'react-native';
import {DateTime} from 'luxon';
import {openMaps} from '@shared/utils/list';

interface Props {
  handle?: () => void;
  brandIdItem?: any;
  schedule: any;
}

export const Address = ({
  handle,
  brandIdItem,
  schedule,
}: PropsWithChildren<Props>) => {
  const handleOpenLink = (link: string, type?: string) => {
    if (type == 'telegram') {
      const url = `http://t.me/@${link}`;
      Linking.openURL(url);
    }
    if (type == 'vk') {
      Linking.openURL(link);
    }
    Linking.openURL(link);
  };

  return (
    <AddressWrapper>
      <AddressFlexRow alignItems="flex-start">
        <AddressIcon>
          <LocationIcon color="#7F7F7F" width={24} height={24} />
        </AddressIcon>
        <AddressText>
          <Typography
            fontWeight={400}
            marginLeft={8}
            lineHeight={20}
            size={15}
            color="#F2F2F2">
            {brandIdItem?.address}
          </Typography>
          <ButtonWrapper
            handle={() =>
              openMaps(brandIdItem?.latitude, brandIdItem?.longitude, true)
            }>
            <Typography
              fontWeight={400}
              marginTop={4}
              textDecorationLine="underline"
              marginLeft={5}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              Посмотреть на карте
            </Typography>
          </ButtonWrapper>
        </AddressText>
      </AddressFlexRow>
      <AddressFlexRow>
        <AddressIcon>
          <PhoneBorderIcon width={24} height={24} />
        </AddressIcon>
        <AddressText>
          <Typography
            fontWeight={400}
            marginLeft={8}
            lineHeight={20}
            size={15}
            color="#F2F2F2">
            {brandIdItem?.phone}
          </Typography>
          <ButtonWrapper handle={() => handleOpenLink(brandIdItem?.site)}>
            <Typography
              fontWeight={400}
              marginTop={4}
              textDecorationLine="underline"
              marginLeft={5}
              lineHeight={16}
              size={13}
              color="#F2F2F2">
              {brandIdItem?.site}
            </Typography>
          </ButtonWrapper>
        </AddressText>
      </AddressFlexRow>

      <AddressFlexRow>
        <AddressIcon></AddressIcon>
        <AddressText>
          <AddressFlexRow paddingTop={0}>
            <SocialMediaBox
              onPress={() => handleOpenLink(brandIdItem?.telegram, 'telegram')}>
              <TelegramIcon />
            </SocialMediaBox>
            <SocialMediaBox>
              <WhatsUpIcon />
            </SocialMediaBox>
            <SocialMediaBox
              onPress={() => handleOpenLink(brandIdItem?.vk, 'vk')}>
              <VkIcon />
            </SocialMediaBox>
          </AddressFlexRow>
        </AddressText>
      </AddressFlexRow>

      <AddressFlexRow>
        <AddressIcon>
          <ClockIcon />
        </AddressIcon>
        <AddressText>
          <Typography
            fontWeight={400}
            marginLeft={5}
            lineHeight={20}
            size={15}
            color="#F2F2F2">
            {schedule &&
              schedule.filter(
                (i: any) => i?.day == DateTime.now().weekday - 1,
              )?.[0]?.closeAt}
          </Typography>
        </AddressText>
        <Schedule onPress={handle}>
          <Typography
            fontWeight={400}
            marginRight={4}
            lineHeight={16}
            size={13}
            color="#7F7F7F">
            График
          </Typography>
          <DownIcon width={16} heigth={16} />
        </Schedule>
      </AddressFlexRow>
    </AddressWrapper>
  );
};
