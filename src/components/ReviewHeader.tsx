import {PropsWithChildren} from 'react';
import {Typography} from './Typography';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import styled from 'styled-components/native';
import {Flex} from './Flex';
import {SvgUri} from 'react-native-svg';

const Wrapper = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.Image`
  width: 36px;
  height: 36px;
  border-radius: 36px;
  border-color: rgba(255, 255, 255, 0.08);
  border-width: 1px;
`;

const BrandImage = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border-color: rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0);
  border-width: 1px;
  align-items: center;
  justify-content: center;
`;

const NameText = styled.View`
  margin-left: 8px;
  width: ${({theme}) => theme.screenWidth - 210}px;
`;

interface Props {
  image: string;
  title?: string;
  createdAt?: string;
  rating?: number;
  address?: string;
}

export const ReviewHeader = ({
  image,
  title,
  createdAt,
  address,
  rating,
}: PropsWithChildren<Props>) => {
  return (
    <Wrapper>
      <Flex widthAuto justifyContent="flex-start">
        <BrandImage>
          <SvgUri width="42" height="42" uri={image} />
        </BrandImage>
        <NameText>
          <Typography
            fontWeight={600}
            lineHeight={20}
            size={15}
            marginBottom={4}
            color="#F2F2F2">
            {title?.trim()}
          </Typography>
          <Typography
            fontWeight={400}
            numberOfLines={1}
            lineHeight={20}
            size={15}
            color="#7F7F7F">
            {address}
          </Typography>
        </NameText>
      </Flex>

      <Flex widthAuto justifyContent="flex-end" marginBottom={22}>
        <StarRatingDisplay
          rating={rating ? rating : 0}
          starSize={17}
          starStyle={{marginHorizontal: 1}}
          color="#FFD439"
        />
        <Typography
          fontWeight={500}
          lineHeight={20}
          marginLeft={4}
          size={15}
          color="#F2F2F2">
          {rating}
        </Typography>
      </Flex>
    </Wrapper>
  );
};
