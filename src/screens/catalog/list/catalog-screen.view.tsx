import {Wrapper, ScrollVertical, Content} from '@assets/styles/globals';
import {Search, List, SortModalChildren} from './components';
import {useCallback, useEffect, useRef, useState} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {Button, Flex, Layout, Typography} from '@components';
import {SortIcon, StrokeIcon, TileIcon} from '@assets/svg';
import {Categories} from '@services';
import {useAuth} from '@shared/hooks';
import {scale} from 'react-native-size-matters';
import {alphabeticalSorting} from '@shared/utils/list';
import {useDispatch, useSelector} from '@store/store';
import {getCategory, setCategoryTypeSlice} from '@slices';

export const Catalog: React.FC = () => {
  const {categories} = Categories;
  const {jwt} = useAuth();
  const {categoryType} = useSelector(getCategory);
  const dispatch = useDispatch();
  const [type, setType] = useState(false);
  const [list, setList] = useState([]);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const getCategories = async (block?: string) => {
    const response = await categories(jwt, block);

    if (response) {
      setList(alphabeticalSorting(response, 'title'));
    }
  };

  const handleResetFilter = () => {
    dispatch(setCategoryTypeSlice(null));
  };

  useEffect(() => {
    if (categoryType) {
      getCategories(categoryType);
    } else {
      getCategories();
    }
  }, [categoryType]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        onPress={() => bottomSheetRef.current?.close()}
        {...props}
      />
    ),
    [],
  );

  return (
    <Layout
      chidlrenBackground="#040404"
      statusBarColor="#040404"
      edges={['right', 'left', 'top']}>
      <Wrapper>
        <ScrollVertical>
          <Content>
            <Search />
            <Flex marginTop={12}>
              {/* <Button
                borderRadius={8}
                onPress={() => {
                  bottomSheetRef.current?.snapToIndex(1)
                }}
                background="rgba(255, 255, 255, 0.08)"
                fixedWidth={`${scale(148)}px`}
                height={32}>
                <Flex justifyContent="center">
                  <SortIcon />
                  <Typography
                    marginLeft={+`${scale(6)}`}
                    lineHeight={16}
                    size={13}
                    color="#F2F2F2">
                    По популярности
                  </Typography>
                </Flex>
              </Button> */}
              <Button
                opacity={categoryType ? 1 : 0}
                disabled={categoryType ? false : true}
                borderRadius={8}
                onPress={handleResetFilter}
                background="rgba(255, 255, 255, 0.11)"
                fixedWidth="170px"
                height={32}>
                <Typography
                  marginLeft={7}
                  lineHeight={16}
                  size={13}
                  color="#F2F2F2">
                  Сбросить фильтры
                </Typography>
              </Button>

              <Button
                onPress={() => setType(!type)}
                borderRadius={8}
                background="rgba(255, 255, 255, 0.08)"
                fixedWidth={`${scale(40)}px`}
                height={32}>
                {type ? <TileIcon /> : <StrokeIcon />}
              </Button>
            </Flex>
          </Content>

          <List list={list} type={type} />
        </ScrollVertical>
      </Wrapper>
      <BottomSheet
        snapPoints={[0.1, 180]}
        index={-1}
        handleIndicatorStyle={{backgroundColor: '#fff'}}
        backdropComponent={renderBackdrop}
        backgroundStyle={{backgroundColor: '#1D1D1D'}}
        ref={bottomSheetRef}>
        <SortModalChildren />
      </BottomSheet>
    </Layout>
  );
};
