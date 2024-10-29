import {BrandItemHorizotal, Layout, Loading} from '@components';
import {Header, Tabs} from './components';
import {FlatList} from 'react-native-gesture-handler';
import {Center} from '@assets/styles/globals';
import {Screens} from '@shared/enums';
import {Cars, LifehacksService} from '@services';
import {useAuth} from '@shared/hooks';
import {useCallback, useEffect, useRef, useState} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {ModalChildrenCar, ModalHeader} from '@screens/filter/components';
import {dateFormatFromISO} from '@shared/utils/date';
import {lifehacksTags} from '@shared/data/lifehacksTags';
import {View} from 'react-native';

const bottomSheetStyle = {
  bottomSheet: {backgroundColor: '#1D1D1D'},
  indicatorStyle: {backgroundColor: '#fff'},
};

export const LifehacksList: React.FC = ({navigation}: any) => {
  const {lifehacks, lifehacksSearch, lifehacksMark, lifehackChangeStatus} =
    LifehacksService;
  const {carMarks} = Cars;
  const carRef = useRef<BottomSheet>(null);
  const {jwt} = useAuth();
  const [list, setList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [marksList, setMarksList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMark, setSelectedMark] = useState<any>({
    _id: '1',
    name: 'Все марки',
  });

  const getLifehacks = async () => {
    try {
      setLoading(true);
      const response = await lifehacks(jwt);

      if (response) {
        setList(response?.items);
        setTempList(response?.items);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getMarks = async () => {
    try {
      const response = await carMarks(jwt);

      if (response) {
        setMarksList([{_id: '1', name: 'Все марки'}, ...response?.items]);
      }
    } catch (error) {}
  };

  const handleGetLifehackTag = async (value: string) => {
    try {
      setLoading(true);
      if (value == lifehacksTags[0]) {
        const response = await lifehacks(jwt);

        if (response) {
          setList(response?.items);
        }
      } else {
        const response = await lifehacks(jwt, value);

        if (response) {
          setList(response?.items);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSearchLifehacks = async (query: string) => {
    try {
      setLoading(true);
      if (query.trim().length > 3) {
        const response = await lifehacksSearch(jwt, query);
        if (response) {
          setList(response?.items);
        }
      } else {
        setList(tempList);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleMarksLifehacks = async (mark: any) => {
    try {
      carRef.current?.close();
      setSelectedMark(mark);
      setLoading(true);

      if (mark?.name == 'Все марки') {
        const response = await lifehacks(jwt);

        if (response) {
          setList(response?.items);
        }
      } else {
        const response = await lifehacksMark(jwt, mark?._id);

        if (response) {
          setList(response?.items);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLifehacks();
    getMarks();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} />,
    [],
  );

  const addToFavorite =  (id: string, isUserFavorite: boolean) => {
    return async () => {
      try {
        const response = await lifehackChangeStatus(
          jwt,
          id,
          isUserFavorite ? -1 : 1,
        );
      } catch (error) {}
    };
  };

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        onChangeText={handleSearchLifehacks}
        clearInput={() => setList(tempList)}
        selectedMarkName={selectedMark?.name}
        handleMark={() => carRef.current?.snapToIndex(1)}
      />
      <Tabs handleSelectTag={handleGetLifehackTag} />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(i: any) => String(i?._id)}
          data={list}
          renderItem={({item}) => {
            return (
              <Center>
                <BrandItemHorizotal
                  rightIcon={<></>}
                  isUserFavorite={item?.isUserFavorite}
                  image={item?.cover?.url}
                  address={dateFormatFromISO(item?.createdAt)}
                  title={item?.title}
                  handle={() =>
                    navigation.navigate(Screens.LIFEHACKS_CARD, {
                      lifehackId: item?._id,
                    })
                  }
                  addToFavorite={addToFavorite(item?._id, item?.isUserFavorite)}
                />
              </Center>
            );
          }}
        />
      )}
      <BottomSheet
        snapPoints={[0.1, 432]}
        index={-1}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={bottomSheetStyle.indicatorStyle}
        backgroundStyle={bottomSheetStyle.bottomSheet}
        ref={carRef}>
        <FlatList
          data={marksList}
          ListHeaderComponent={
            <ModalHeader
              handleClose={() => carRef.current?.close()}
              title="Выберите авто"
            />
          }
          renderItem={({item}) => {
            return (
              <ModalChildrenCar
                selectedMarkId={selectedMark?._id}
                handleSelectRadio={handleMarksLifehacks}
                item={item}
                showRadio
              />
            );
          }}
        />
      </BottomSheet>
    </Layout>
  );
};
