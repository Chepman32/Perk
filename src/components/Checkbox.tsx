import {CheckSquareIcon} from '@assets/svg';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

type CheckboxType = {
  onChange: () => void;
  checked: boolean;
};

const Checkbox: React.FC<CheckboxType> = ({onChange, checked}) => {
  return (
    <TouchableOpacity onPress={onChange}>
      {checked ? (
        <CheckSquareIcon />
      ) : (
        <View
          style={{
            width: 24,
            height: 24,
            backgroundColor: '#2c2c2c',
            borderRadius: 4,
            borderWidth: 1,
            borderColor: '#5c5c5c',
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default Checkbox;
