/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {createThumbnail} from 'react-native-create-thumbnail';


const VideoRow = ({title, url, thumb, onPlay, onCast}) => {
  const [thumbnail, setThumbnail] = useState(null);

  const getThumbnail = useCallback(() => {
    // if (thumb) {
    //   setThumbnail(thumb);
    // }
    return createThumbnail({
      url: url,
      timeStamp: 10000,
    })
      .then(response => {
        setThumbnail(response.path);
      })
      .catch(err => console.log({err}));
  }, []);

  useEffect(() => {
    getThumbnail();
  }, []);

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onPlay}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
        }}>
        <View
          style={{
            width: 80,
            height: 40,
            alignItems: 'center',
          }}>
          <Image
            resizeMode="contain"
            width={70}
            height={40}
            source={{uri: thumbnail}}
            style={{width: 70, height: 40}}
          />
        </View>
        <Text style={styles.TitleText}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    height: 250,
    width: '100%',
    backgroundColor: '#000',
    position: 'relative',
  },
  backgroundVideo: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute',
  },
  row: {
    position: 'relative',
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  TitleText: {
    flex: 2,
    color: 'black',
    fontSize: 15,
    marginStart: 10,
  },
  watchBtn: {
    width: 70,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoRow;
