import React, {useState} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';

const ActivityIndicatorElement = () => {
  return (
    <View style={styles.activityIndicatorStyle}>
      <ActivityIndicator
        color=  "red"//"#009688"
        size="large"
      />
    </View>
  );
};
const TermsConditionActivity = () => {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState('https://www.termsfeed.com/blog/terms-conditions-small-business/');
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <WebView
          style={styles.view}
          //Loading URL
          source={{uri: url}}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          onLoadStart={() => setVisible(true)}
          onLoad={() => setVisible(false)}
        />
        {visible ? <ActivityIndicatorElement /> : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea:{
    flex: 1,
  },
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
  },
  header:{
    flexDirection:'row',
    margin:5,
  },
  urlView:{
    padding:0,
    flex: 1,
    alignItems: 'stretch',
  },
  searchView:{
    padding:5,
    position:'absolute',
    justifyContent:'center',
    alignSelf:'center',
    right:0,
  },
  searchText:{
    fontWeight:'bold'
  },
  urlText:{
    paddingLeft:10,
    borderRadius:1,
    borderColor:'black',
    // width:310,
  },
  activityIndicatorStyle: {
    flex: 1,
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
export default TermsConditionActivity;