import {View, Text, Image} from 'react-native';
import React from 'react';
import {IGallaryProps} from './Gallary.types';
import {styles} from './Gallare.styles';

const Gallary = ({imgs}: IGallaryProps) => {
  return (
    <>
      {imgs.map(img => (
        <View key={img.fileName} style={styles.viewContainer}>
          <Image
            style={styles.imgContainer}
            source={{uri: img.uri}}
            resizeMode="contain"
          />
        </View>
      ))}
    </>
  );
};

export default Gallary;
