import {Asset} from 'react-native-image-picker';

export type IGallaryProps = {
  imgs: Asset[];
  onPress: (uri?: string) => void;
};
