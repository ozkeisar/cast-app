/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import GoogleCast, {
  useRemoteMediaClient,
  useCastSession,
  useDevices,
  CastButton,
} from 'react-native-google-cast';
import VideoRow from './src/components/VideoRow';
import {VideoList} from './src/consts/index';

const backgroundStyle = {
  backgroundColor: '#fff',
};
interface VideoItem {
  description: string;
  sources: string[];
  subtitle: string;
  thumb: string;
  title: string;
}
const App = () => {
  const videoRef = useRef(null);
  const client = useRemoteMediaClient();
  const castSession = useCastSession();
  const devices = useDevices();
  const [activeItem, setActiveItem] = useState<VideoItem | undefined>(undefined);

  useEffect(()=>{
    const discoveryManager = GoogleCast.getDiscoveryManager()
    discoveryManager.startDiscovery()
  },[])

  if (client && activeItem?.sources) {
    // Send the media to your Cast device as soon as we connect to a device
    // (though you'll probably want to call this later once user clicks on a video or something)
    client.loadMedia({
      mediaInfo: {
        contentUrl: activeItem.sources[0],
        contentType: 'video/mp4',
      },
    });
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          height: '100%',
        }}>
        <View style={styles.playerContainer}>
           
          {!!activeItem && (
            <Video
              resizeMode="contain"
              source={{
                uri: activeItem?.sources?.[0],
                type: 'mp4'
              }}
              ref={videoRef}
              style={styles.backgroundVideo}
              paused={false}
              controls
              repeat={true}
            />
          )}
        </View>
        <View style={{
          height: 50,
          paddingVertical: 10,
          width: '100%',
          justifyContent:'center',
          paddingHorizontal: 10,
        }}>
          <View>
            <Text style={{color:'black', fontSize: 18}}>{activeItem?.title}</Text>
            <Text style={{color:'black', fontSize: 14}}>{activeItem?.subtitle}</Text>
          </View>
          {!!activeItem?.sources && (
              <View
                style={styles.castBtn}>
                <CastButton
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: '#000',
                    marginStart: 10,
                  }}
                />
              </View>
            )} 
        </View>
        <View
          style={{
            flex: 1,
            overflow: 'hidden',
            width: '100%',
          }}>
          <FlatList
            style={{
              height: '100%',
              width: '100%',
            }}
            data={VideoList}
            renderItem={({item}) => {
              return (
                <VideoRow
                  url={item.sources[0]}
                  title={item.title}
                  thumb={item.thumb}
                  onPlay={() => {
                    setActiveItem(item);
                  }}
                />
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    height: 250,
    width: '100%',
    backgroundColor: 'black',
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
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  TitleText: {
    flex: 2,
  },
  watchBtn: {
    width: 110,
    height: 45,
    backgroundColor: 'red',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  castBtn: {
    position:'absolute',
    top: 10,
    right: 10,
    zIndex:1,
  }
});

export default App;
