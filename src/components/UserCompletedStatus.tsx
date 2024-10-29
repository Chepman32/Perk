import {PropsWithChildren, useEffect, useState} from 'react';
import {Box} from './Box';
import {Flex} from './Flex';
import {Typography} from './Typography';
import styled from 'styled-components/native';

const Progress = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
`;

const Status = styled.View<PropsWithChildren<Props>>`
  flex-direction: row;
  margin: 2px 1px;
  background: ${({disable}) =>
    disable ? '#040404' : `rgba(242, 242, 242, 1)`};
  flex: 8;
  height: 8px;
  border-radius: 8px;
`;

interface Props {
  background?: string;
  marginTop?: number;
  userInfo?: any;
  disable?: boolean;
}

export const UserCompletedStatus = ({
  marginTop,
  userInfo,
}: PropsWithChildren<Props>) => {
  const [progress, setProgress] = useState(0);

  const checkField = () => {
    if (userInfo?.hasOwnProperty('firstName')) {
      if (userInfo?.firstName?.length !== 0) {
        setProgress(prev => prev + 1);
      }
    }
    if (userInfo?.hasOwnProperty('phone')) {
      if (userInfo?.phone?.length !== 0) {
        setProgress(prev => prev + 1);
      }
    }
    if (userInfo?.hasOwnProperty('lastName')) {
      if (userInfo?.lastName?.length !== 0) {
        setProgress(prev => prev + 1);
      }
    }
    if (userInfo?.hasOwnProperty('middleName')) {
      if (userInfo?.middleName?.length !== 0) {
        setProgress(prev => prev + 1);
      }
    }
    if (userInfo?.hasOwnProperty('email')) {
      if (userInfo?.email?.length !== 0) {
        setProgress(prev => prev + 1);
      }
    }
    if (userInfo?.hasOwnProperty('birthday')) {
      if (userInfo?.birthday?.length !== 0) {
        setProgress(prev => prev + 1);
      }
    }
    if (userInfo?.hasOwnProperty('city')) {
      if (userInfo?.city?.length !== 0) {
        setProgress(prev => prev + 1);
      }
    }
    if (userInfo?.hasOwnProperty('driverSince')) {
      if (userInfo?.driverSince?.length !== 0) {
        setProgress(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    setProgress(0);
    checkField();
  }, [userInfo]);

  return (
    <Flex marginTop={marginTop} subtractScreenWidth={32}>
      <Typography
        fontWeight={400}
        lineHeight={15}
        size={12}
        color="#F2F2F2"
        marginRight={8}>
        Заполнено {progress} из 8
      </Typography>
      <Progress>
        {Array.from({length: progress}).map((i, k) => {
          return <Status key={k} />;
        })}
        {Array.from({length: 8 - progress}).map((i, k) => {
          return <Status key={k} disable />;
        })}
      </Progress>
    </Flex>
  );
};
