import {useCallback, forwardRef, useEffect, useState} from 'react';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetBackdrop,
  BottomSheetFooter,
} from '@gorhom/bottom-sheet';
import {ModalHeader} from './components';
import {Typography, Button, ContactItem} from '@components';
import {Center} from '@assets/styles/globals';
import {useAuth} from '@shared/hooks';
import {ContactsService} from '@services';

export const ContactsModal = forwardRef(({}, ref: any) => {
  const {jwt} = useAuth();
  const {contacts} = ContactsService;
  const [list, setList] = useState([]);

  const getContacts = async () => {
    try {
      const response = await contacts(jwt);

      if (response) {
        setList(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getContacts();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} appearsOnIndex={1} />,
    [],
  );

  const footerContacts = useCallback(
    (props: any) => (
      <BottomSheetFooter style={{alignItems: 'center'}} {...props}>
        <Button height={44} subtractScreenWidth={32}>
          <Typography
            lineHeight={16}
            size={13}
            fontWeight={500}
            color="#1D1D1D">
            Отправить
          </Typography>
        </Button>
      </BottomSheetFooter>
    ),
    [],
  );

  return (
    <BottomSheet
      snapPoints={[0.1, 325]}
      footerComponent={footerContacts}
      backdropComponent={renderBackdrop}
      index={-1}
      handleIndicatorStyle={{backgroundColor: '#fff'}}
      backgroundStyle={{backgroundColor: '#1D1D1D'}}
      ref={ref}>
      <ModalHeader
        handleClose={() => ref.current?.close()}
        title="Поделиться с контактами"
      />
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 50}}>
        <Center>
          {list.map((_, index) => {
            return <ContactItem marginTop={10} key={index} />;
          })}
        </Center>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});
