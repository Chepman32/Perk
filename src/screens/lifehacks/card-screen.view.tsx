import {DotsVerticalIcon} from '@assets/svg';
import Markdown from 'react-native-markdown-display';
import {ButtonWrapper, Header, Layout, Loading, Typography} from '@components';
import {
  LifehacksCardImage,
  LifehacksCardTag,
  LifehacksCardWrapper,
} from './components/style';
import {Center, Content, ScrollVertical} from '@assets/styles/globals';
import {LifehacksService} from '@services';
import {useAuth} from '@shared/hooks';
import {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {dateFormatFromISO} from '@shared/utils/date';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Screens} from '@shared/enums';
import {useNavigation} from '@react-navigation/native';

export const LifehacksCard: React.FC = ({navigation, route}: any) => {
  const {lifehackId} = LifehacksService;
  const {jwt} = useAuth();
  const [item, setItem] = useState<any>({});
  const [content, setContent] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const {navigate} = useNavigation<any>();

  const getLifehackId = async () => {
    try {
      setLoading(true);
      const response = await lifehackId(jwt, route.params?.lifehackId);

      if (response) {
        setContent(response.content?.split('![image]('));
        setItem(response);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLifehackId();
  }, []);

  if (loading) {
    return (
      <Layout statusBarColor="#040404" chidlrenBackground="#040404">
        <Header
          handleNavigateBack={() => navigation.goBack()}
          background="#040404"
        />
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout statusBarColor="#040404" chidlrenBackground="#040404">
      <Header
        handleNavigateBack={() => navigation.goBack()}
        title={item?.title}
        numberOfLines={1}
        background="#040404"
      />
      <LifehacksCardWrapper>
        <ScrollVertical>
          <Center>
            <Content>
              <TouchableOpacity
                onPress={() => {
                  navigate(Screens.GALLERY, {
                    images: [
                      {
                        url: item?.cover?.url,
                      },
                    ],
                  });
                }}>
                <LifehacksCardImage source={{uri: item?.cover?.url}} />
              </TouchableOpacity>
              <Typography
                lineHeight={24}
                marginTop={12}
                size={18}
                fontWeight={600}
                color="#F2F2F2">
                {item?.title}
              </Typography>

              <Typography
                lineHeight={16}
                size={13}
                marginTop={12}
                fontWeight={400}
                color="#7F7F7F">
                {dateFormatFromISO(item?.createdAt)}
              </Typography>
            </Content>
          </Center>

          <ScrollView
            contentContainerStyle={{marginTop: 12}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {item?.tags &&
              item?.tags.map((item: string, index: number) => {
                return (
                  <LifehacksCardTag index={index} key={index}>
                    <Typography
                      lineHeight={16}
                      size={13}
                      fontWeight={500}
                      color="#F2F2F2">
                      {item}
                    </Typography>
                  </LifehacksCardTag>
                );
              })}
          </ScrollView>

          <Center>
            <Content>
              {content?.map((el: string) => (
                <View
                  style={{
                    marginTop: 16,
                  }}>
                  {!!el.includes('.jpeg') &&
                    el.match(/https:\/\/[^\s\Z]+/i)?.[0] && (
                      <TouchableOpacity
                        onPress={() => {
                          navigate(Screens.GALLERY_ZOOM, {
                            uri: el
                            .match(/https:\/\/[^\s\Z]+/i)?.[0]
                            .slice(0, -1),
                          });
                        }}>
                        <Image
                          source={{
                            uri: el
                              .match(/https:\/\/[^\s\Z]+/i)?.[0]
                              .slice(0, -1),
                          }}
                          style={{
                            aspectRatio: 3 / 2,
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    )}
                  <Markdown
                    style={{
                      body: {
                        color: '#fff',
                        fontSize: 15,
                        lineHeight: 20,
                      },
                    }}>
                    {el
                      .replace(/(https?\:\/\/)?(www\.)?[^\s]+\.[^\s]+/g, '')
                      .trim()}
                  </Markdown>
                </View>
              ))}
            </Content>
          </Center>
        </ScrollVertical>
      </LifehacksCardWrapper>
    </Layout>
  );
};
