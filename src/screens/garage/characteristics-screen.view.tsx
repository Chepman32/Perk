import {Wrapper} from '@assets/styles/globals';
import {
  Box,
  ButtonWrapper,
  Flex,
  Frame,
  Header,
  Layout,
  Loading,
  Typography,
} from '@components';
import {Screens} from '@shared/enums';
import {sectionListFormat} from '@shared/utils/list';
import {useEffect, useState} from 'react';
import {SectionList, View} from 'react-native';

export const Characteristics: React.FC = ({navigation, route}: any) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    if (route.params?.item?.specifications) {
      setList(
        sectionListFormat(route.params?.item?.specifications, 'group', 'specs'),
      );
    }
  }, []);

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        paddingHorizontal={10}
        handleNavigateBack={() => navigation.goBack()}
        title="Характеристики"
        rightBigContent={
          <ButtonWrapper
            handle={() =>
              navigation.navigate(Screens.EDIT_CAR, {
                carId: route.params?.item?._id,
              })
            }>
            <Typography
              fontWeight={400}
              lineHeight={20}
              size={15}
              color="#F2F2F2">
              Изменить
            </Typography>
          </ButtonWrapper>
        }
      />
      <Wrapper>
        <Frame>
          <SectionList
            sections={list}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => {
              return (
                <Flex marginTop={12}>
                  <Box fixedWidth="50%">
                    <Typography
                      fontWeight={400}
                      lineHeight={16}
                      size={13}
                      color="#7F7F7F">
                      {item.title}
                    </Typography>
                  </Box>
                  <Box fixedWidth="50%">
                    <Typography
                      fontWeight={400}
                      align="right"
                      lineHeight={16}
                      size={13}
                      color="#F2F2F2">
                      {item.value}
                    </Typography>
                  </Box>
                </Flex>
              );
            }}
            renderSectionHeader={({section: {title}}) => (
              <Typography
                fontWeight={600}
                lineHeight={20}
                marginTop={12}
                size={15}
                color="#F2F2F2">
                {title}
              </Typography>
            )}
          />
        </Frame>
      </Wrapper>
    </Layout>
  );
};
