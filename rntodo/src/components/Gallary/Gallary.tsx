import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {IGallaryProps} from './Gallary.types';
import {styles} from './Gallare.styles';

const Gallery = ({imgs, onPress}: IGallaryProps) => {
  return (
    <>
      {imgs.map(img => (
        <TouchableOpacity
          key={img.fileName}
          style={styles.viewContainer}
          onPress={() => onPress(img.uri)}>
          <Image
            style={styles.imgContainer}
            source={{uri: img.uri}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </>
  );
};

export default Gallery;
