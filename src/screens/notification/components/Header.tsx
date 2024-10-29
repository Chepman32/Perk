import {Flex, Typography} from '@components';
import {Type} from './style';
import {Center, Content} from '@assets/styles/globals';
import {PropsWithChildren} from 'react';

interface Props {
  title?: string;
  date?: string;
  description?: string;
}

export const HeaderId = ({
  title,
  date,
  description,
}: PropsWithChildren<Props>) => {
  return (
    <Center>
      <Content>
        <Flex marginTop={16}>
          <Flex>
            <Type>
              <Typography
                lineHeight={16}
                fontWeight={400}
                size={13}
                color="#F2F2F2">
                {title}
              </Typography>
            </Type>
            <Typography
              lineHeight={16}
              fontWeight={400}
              size={13}
              color="#7F7F7F">
              {date}
            </Typography>
          </Flex>
        </Flex>

        <Typography
            marginTop={12}
            lineHeight={20}
            fontWeight={400}
            size={15}
            color="#7F7F7F">
            {description}
          </Typography>
      </Content>
    </Center>
  );
};
