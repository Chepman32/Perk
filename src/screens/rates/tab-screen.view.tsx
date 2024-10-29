import {ScrollVertical, Wrapper} from '@assets/styles/globals';
import {
  CarIcon,
  ClockIcon,
  ClubIcon,
  KeyIcon,
  StarBorderIcon,
} from '@assets/svg';
import {Item} from './components';

const temp = [
  {
    id: 1,
    rating: 1,
    title: 'Авто консьерж (1 уровень)',
    price: '60 000 ₽/мес',
    list: [
      {
        icon: <ClockIcon />,
        text: 'Выбрать для вас наилучший вариант записи',
      },
      {
        icon: <ClubIcon />,
        text: 'Организовать ваше участие в закрытых клубах',
      },
      {
        icon: <CarIcon />,
        text: 'Организовать вам эксклюзивный тест-драйв',
      },
    ],
    background: 'rgba(29, 29, 29, 1)',
  },
  {
    id: 2,
    rating: 2,
    title: 'Консьерж full (2 уровень)',
    price: '150 000 ₽/мес',
    list: [
      {
        icon: <ClockIcon />,
        text: 'Записать в автосервис',
      },
      {
        icon: <KeyIcon />,
        text: 'Забрать автомобиль, эвакуировать \nего на сервис и вернуть вымытым',
      },
      {
        icon: <ClubIcon />,
        text: 'Организовать ваше участие в закрытых клубах',
      },
      {
        icon: <CarIcon />,
        text: 'Организовать вам эксклюзивный тест-драйв',
      },
    ],
    background: 'rgba(52, 52, 52, 1)',
  },
  {
    id: 3,
    rating: 3,
    title: 'Консьерж VIP (3 уровень)',
    price: '300 000 ₽/мес',
    list: [
      {
        icon: <ClockIcon />,
        text: 'Записать в автосервис',
      },
      {
        icon: <KeyIcon />,
        text: 'Забрать автомобиль, эвакуировать\nего на сервис и вернуть вымытым',
      },
      {
        icon: <ClubIcon />,
        text: 'Организовать ваше участие в закрытых клубах',
      },
      {
        icon: <CarIcon />,
        text: 'Организовать вам эксклюзивный тест-драйв',
      },
      {
        icon: <StarBorderIcon />,
        text: 'Покупать билеты в театр/кино, привозить\nцветы, услуга трезвого водителя и т.д.',
      },
    ],
    background: 'rgba(255, 227, 126, 0.16)',
    border: 'rgba(255, 212, 57, 0.5)',
  },
];

export const TabScreen: React.FC = () => {
  return (
    <ScrollVertical>
      <Wrapper>
        {temp.map((item, index) => {
          return <Item key={index} item={item} />;
        })}
      </Wrapper>
    </ScrollVertical>
  );
};
