import {View, Dimensions, Image} from 'react-native';
import React from 'react';
import {IImgFullProps} from './ImgFull.types';

const {width, height} = Dimensions.get('window');

const ImgFull = ({route, navigation}: IImgFullProps) => {
  return (
    <View>
      <Image
        source={{uri: route.params.uri}}
        style={{width: width * 0.9, height: height * 0.7, alignSelf: 'center'}}
        resizeMode="center"
      />
    </View>
  );
};

export default ImgFull;
