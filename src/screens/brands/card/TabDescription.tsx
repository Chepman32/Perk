import {Center} from '@assets/styles/globals';
import {Description, PromoCode, Services, News, Address} from './components';
import {PropsWithChildren} from 'react';

interface Props {
  handleSchedule?: () => void;
  brandIdItem: any;
  servicesId?: any;
  schedule?: any;
}

export const TabDescription = ({
  handleSchedule,
  brandIdItem,
  servicesId,
  schedule,
}: PropsWithChildren<Props>) => {
  return (
    <>
      <Center>
        <Description description={brandIdItem?.description} />
        <PromoCode
          sale={brandIdItem?.sale}
          promocode={brandIdItem?.promocode}
        />
      </Center>
      <Services servicesId={servicesId} />
      {/* <News /> */}
      <Center>
        <Address
          schedule={schedule}
          brandIdItem={brandIdItem}
          handle={handleSchedule}
        />
      </Center>
    </>
  );
};
