import {Typography} from '@components';
import {
  ServicesWrapper,
  ServiceBox,
  ServiceBoxImage,
  BoxRow,
  ServiceBoxCounter,
} from './style';
import {PropsWithChildren} from 'react';
import {catalogImages} from '@shared/data/catalogImages';
import {filterCatalogImages, getNoun} from '@shared/utils/list';

interface Props {
  servicesId: any[];
}

export const Services = ({servicesId}: PropsWithChildren<Props>) => {
  return (
    <>
      <Typography
        fontWeight={600}
        lineHeight={20}
        marginTop={16}
        size={15}
        marginLeft={16}
        color="#F2F2F2">
        Услуги
      </Typography>
      <ServicesWrapper>
        {servicesId?.map((item, index) => {
          return (
            <ServiceBox marginLeft={index == 0 ? 16 : 0} key={index}>
              <BoxRow>
                <ServiceBoxImage
                  source={filterCatalogImages(
                    catalogImages,
                    item?.category?._id,
                  )}
                />
                <ServiceBoxCounter>
                  <Typography
                    fontWeight={400}
                    lineHeight={12}
                    size={11}
                    align="center"
                    color="#7F7F7F">
                    {item?.services?.length}
                    {'\n'}
                    {getNoun(
                      item?.services?.length,
                      'услуга',
                      'услуги',
                      'услуг',
                    )}
                  </Typography>
                </ServiceBoxCounter>
              </BoxRow>

              <Typography
                fontWeight={400}
                lineHeight={16}
                size={13}
                marginTop={8}
                color="#F2F2F2">
                {item?.category?.title}
              </Typography>
            </ServiceBox>
          );
        })}
      </ServicesWrapper>
    </>
  );
};
