import {StarWhiteIcon} from '@assets/svg';
import {Layout, Typography} from '@components';
import {Brands} from '@services';
import {useAuth} from '@shared/hooks';
import {getCategory} from '@slices';
import {useSelector} from '@store/store';
import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SvgUri} from 'react-native-svg';
import YaMap, {Marker} from 'react-native-yamap';
import {Header} from './components';
import {Image} from 'react-native';
import {Screens} from '@shared/enums';
import {isSvg} from '@shared/utils/list';

export const MapList: React.FC = ({navigation}: any) => {
  const {getBrands} = Brands;
  const {jwt} = useAuth();
  const {service} = useSelector(getCategory);
  const [brandsList, setBrandList] = useState<any>([]);

  const brands = async () => {
    try {
      const response: any = await getBrands(jwt, 1, service?._id);

      if (response) {
        setBrandList(response?.items);
      }
    } catch (error) {}
  };

  const handle = (_id: string) => {
    navigation.navigate(Screens.BRAND_CARD, {brandId: _id});
  };

  useEffect(() => {
    brands();
  }, []);

  return (
    <Layout>
      <Header />
      <YaMap
        userLocationIcon={{
          uri: 'https://www.clipartmax.com/png/middle/180-1801760_pin-png.png',
        }}
        initialRegion={{
          lat: 55.751426,
          lon: 37.618879,
          zoom: 11,
          azimuth: 0,
          tilt: 0,
        }}
        zoomGesturesEnabled
        nightMode
        style={{flex: 1}}>
        {brandsList.map((item: any) => {
          return (
            <Marker
              key={item._id}
              scale={1}
              onPress={() => handle(item?._id)}
              anchor={{x: 0.3, y: 0.5}}
              point={{lat: item?.latitude, lon: item?.longitude}}>
              <TouchableOpacity style={styles.container}>
                <View style={styles.imageContainer}>
                  {item?.avatar?.url && isSvg(item?.avatar?.url) ? (
                    <SvgUri height={35} width={35} uri={item?.avatar?.url} />
                  ) : (
                    <Image
                      style={{width: 35, height: 35}}
                      source={{uri: item?.avatar?.url}}
                    />
                  )}
                </View>

                <View style={styles.textContainer}>
                  <Typography
                    lineHeight={16}
                    fontWeight={500}
                    size={13}
                    color="#1D1D1D"
                    numberOfLines={1}
                    style={styles.title}>
                    {item?.title}
                  </Typography>
                  <StarWhiteIcon color="#1D1D1D" />
                  <Typography
                    lineHeight={16}
                    fontWeight={500}
                    size={11}
                    color="#1D1D1D">
                    {item?.rating?.toFixed(1)}
                  </Typography>
                </View>
              </TouchableOpacity>
            </Marker>
          );
        })}
      </YaMap>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignItems: 'center'},
  imageContainer: {
    backgroundColor: '#ffd439',
    borderRadius: 40,
    padding: 2,
    zIndex: 2,
    overflow: 'hidden',
  },
  textContainer: {
    marginLeft: -12,
    paddingLeft: 16,
    paddingRight: 8,
    height: 30,
    borderRadius: 4,
    backgroundColor: '#ffd439',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {flexWrap: 'wrap', maxWidth: 200},
});
