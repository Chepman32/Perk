import {PropsWithChildren} from 'react';
import {NameWrapper, NameImage} from './style';
import {Flex, Typography} from '@components';

interface Props {
  name: string;
  image?: string;
  background?: string;
}

export const Name = ({name, image, background}: PropsWithChildren<Props>) => {
  return (
    <NameWrapper background={background}>
      <Flex widthAuto>
        {image && (
          <NameImage
            source={{
              uri: 'https://ss.sport-express.ru/userfiles/materials/199/1993102/volga.jpg',
            }}
          />
        )}

        <Typography
          marginLeft={image ? 4 : 0}
          fontWeight={500}
          lineHeight={16}
          size={13}
          color="#F2F2F2">
          {name}
        </Typography>
      </Flex>
    </NameWrapper>
  );
};
