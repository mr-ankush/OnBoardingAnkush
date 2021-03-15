import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid, BackHandler, Alert,
       Image, TouchableOpacity, PermissionsAndroid, Animated, Easing, Dimensions, TouchableNativeFeedback} from 'react-native';
import { Headline, Button, Text, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const ProfileActivity = ({navigation}) => {
    let opacity = new Animated.Value(0.5);
    let opacitys = new Animated.Value(1);
    let BORDERS = new Animated.Value(100);
    let WIDTHS = new Animated.Value(160);
    let HEIGHTS = new Animated.Value(160);
    let BORDER = new Animated.Value(100);
    let WIDTH = new Animated.Value(155);
    let HEIGHT = new Animated.Value(155);
    const WIN_WIDTH = Dimensions.get('window').width;
    const WIN_HEIGHT = Dimensions.get('window').height;
    const [animState, setAnimState] = useState(false);
    // let SPACING = 70;
    const requestExternalWritePermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App needs write permission',
            },
          );
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          alert('Write permission err', err);
        }
        return false;
      } else return true;
    };
    const requestCameraPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'Camera Permission',
              message: 'App needs camera permission',
            },
          );
          // If CAMERA Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          return false;
        }
      } else return true;
    };
    const [] = useState('');
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.multiGet([ 'FIRST_NAME', 'LAST_NAME', 'GENDER', 'EMAIL', 'PASSWORD', 'IMAGE' ])
            .then( response  => {
                setFirstName(response[0][1]);
                setLastName(response[1][1]);
                setGender(response[2][1]);
                setEmail(response[3][1]);
                setPass(response[4][1]);
                setImage(response[5][1]);
            })
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    // useEffect(() => {
    //     const backAction = () => {
    //         Alert.alert("Hold On !", "Are you sure you want to go exit?", [
    //         {
    //           text: "Cancel",
    //           onPress: () => null,
    //           style: "cancel"
    //         },
    //         { text: "EXIT", onPress: () => BackHandler.exitApp() }
    //       ]);
    //       return true;
    //     };
    //     const backHandler = BackHandler.addEventListener(
    //       "hardwareBackPress",
    //       backAction
    //     );
    //     // return () => backHandler.remove();
    //     return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    // }, []);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [image, setImage] = useState('https://i.ibb.co/CJGmnGg/default.png');

    const changePassword = () => {
      navigation.navigate('EditPasswordActivity');
    }
    const logout = () => {
      Alert.alert("Do you want to log-out !", "There is no loss of information after log-out.",
          [
              {
                  text: "Cancel",
                  onPress: () => { },
                  style: "cancel",
              },
              {
                  
              },
              { 
                  text: "Log-Out",
                  onPress: () => {navigation.replace('LoginActivity'); AsyncStorage.setItem('KEY','0');}, // 0 for log-out
                  style:"destructive",
              }
          ],
          { cancelable: false }
      )
    }
    const deleteUser = () => {
      Alert.alert("Do you want to Delete Account !", "All information will be lost by deleting account.",
          [
              {
                  text: "Cancel",
                  onPress: () => { },
                  style: "cancel",
              },
              {
                  
              },
              { 
                  text: "Delete Account",
                  onPress: () => { navigation.replace('LoginActivity'); deleteData();},
                  style:"destructive",
              }
          ],
          { cancelable: false }
      )
    }
    const deleteData= () => {
      AsyncStorage.multiRemove(['FIRST_NAMEE','LAST_NAME','GENDER','EMAIL', 'PASSWORD','IMAGE','KEY']);
      alert("Your account has been deleted successfully.");
    }
    const chooseImageType = () => {
      Alert.alert("Select Profile Image !", "Choose profile photo either from Disk or Default Icon.",
      [
          {
              text: "Default Avtar",
              onPress: () => { navigation.navigate('EditImageActivity') },
              style: "default",
          },
          {
              text: "Camera",
              onPress: () => { chooseCamera('photo') },
              style: "default",
          },
          { 
              text: "SD Card",
              onPress: () => { chooseFile('photo') },
              style:"default",
          }
      ],
      { cancelable: true }
      )
    }
    const chooseFile = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                // alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                // alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                // alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            // setFile(response.uri);
            setImage(response.uri);
            AsyncStorage.setItem('IMAGE', response.uri);
        });
    };
    const chooseCamera = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                // alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                // alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                // alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            // setFile(response.uri);
            setImage(response.uri);
            AsyncStorage.setItem('IMAGE', response.uri);
        });
    };
    const AnimatedStyle = [
      styles.popupView, {
          opacity,
          width: WIN_WIDTH/4, 
          height: WIN_HEIGHT/7,
          top: 0,
          left:0,
      },
    ];
    const startAnimate = () => {
      startBackground();
      startPreview();
      setTimeout(function(){  
        animState == false ? setAnimState(true) : setAnimState(false);
      }, 500);
      function startBackground(){
        Animated.timing(
          WIDTHS, // The animated value to drive
          {
            toValue: WIN_WIDTH, // Animate to opacity: 1 (opaque)
            duration: 100, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          HEIGHTS, // The animated value to drive
          {
            toValue: 250, // Animate to opacity: 1 (opaque)
            duration: 100, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          BORDERS, // The animated value to drive
          {
            toValue: 0, // Animate to opacity: 1 (opaque)
            duration: 100, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        console.log("animation backview "+animState);
      }
      function startPreview() {
        Animated.timing(
          WIDTH, // The animated value to drive
          {
            toValue: 235, // Animate to opacity: 1 (opaque)
            duration: 500, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          HEIGHT, // The animated value to drive
          {
            toValue: 235, // Animate to opacity: 1 (opaque)
            duration: 500, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          BORDER, // The animated value to drive
          {
            toValue: 20, // Animate to opacity: 1 (opaque)
            duration: 500, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        console.log("animation view "+animState);
      }
    }
    const stopAnimate = (path) => {
      stopA();
      setTimeout(function(){
        path == true ? navigation.navigate('ImageFilter', {path: image} ) : {} ;
        animState == false ? setAnimState(true) : setAnimState(false);
      }, 250);
      function stopA(){
        Animated.timing(
          WIDTH, // The animated value to drive
          {
            toValue: 155, // Animate to opacity: 1 (opaque)
            duration: 250, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          HEIGHT, // The animated value to drive
          {
            toValue: 155, // Animate to opacity: 1 (opaque)
            duration: 250, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          BORDER, // The animated value to drive
          {
            toValue: 100, // Animate to opacity: 1 (opaque)
            duration: 250, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          WIDTHS, // The animated value to drive
          {
            toValue: 160, // Animate to opacity: 1 (opaque)
            duration: 200, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          HEIGHTS, // The animated value to drive
          {
            toValue: 160, // Animate to opacity: 1 (opaque)
            duration: 200, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          BORDERS, // The animated value to drive
          {
            toValue: 100, // Animate to opacity: 1 (opaque)
            duration: 200, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          opacity, // The animated value to drive
          {
            toValue: 0, // Animate to opacity: 1 (opaque)
            duration: 50, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        Animated.timing(
          opacitys, // The animated value to drive
          {
            toValue: 0, // Animate to opacity: 1 (opaque)
            duration: 50, // Make it take a while
            useNativeDriver: false,
          },
        ).start();
        console.log("animation false "+animState);
      }
    }
    return(
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container}>
              <Divider style={styles.headingDivider}></Divider>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.logoutEditView} onPress={ () => logout() }>
                        <Icon name="logout" size={30} color="#fff" style={styles.logoutEdit} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.imageEditView} onPress={ () => navigation.navigate('EditImageActivity') }>
                      <Icon name="image-edit" size={30} color="#fff" style={styles.imageEdit} />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.imageEditView} onPress={ () => chooseImageType() }>
                      <Icon name="image-edit" size={30} color="#fff" style={styles.imageEdit} />
                    </TouchableOpacity>
                    <Animated.View
                      // cardElevation={5}
                      // cardMaxElevation={5}
                      // cornerRadius={100}
                      style={{
                        width: WIDTHS,
                        height: HEIGHTS,
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'black',
                        borderRadius:BORDERS,
                      }}
                    >
                      { animState == true ? cancelAnimButton() : [] }
                      { animState == true ? filterAnim () : [] }
                      <TouchableNativeFeedback 
                        style={{
                          width: WIDTH,
                          height: HEIGHT,
                          borderRadius:BORDER,
                          backgroundColor:'black',
                        }}
                        onPress={ () => { animState == false ? startAnimate() : {} } }>
                        <Animated.Image 
                          style={{
                            width: WIDTH,
                            height: HEIGHT,
                            borderRadius:BORDER,
                            backgroundColor:'black',
                            borderColor:'white',
                            borderWidth:1,
                          }}
                          source={ { uri : image } }
                        />
                      </TouchableNativeFeedback>
                    </Animated.View>
                    
                </View>
                <View style={styles.baseContainer}>
                    <TouchableOpacity style={styles.textEditViewStyle} 
                        onPress={ () =>  navigation.navigate('EditProfileActivity') }> 
                            <Icon name="account-edit" size={30} color="black"  style={styles.textEdit}/>
                    </TouchableOpacity>
                    <View style={styles.baseContainerView}>
                        <Text style={styles.detailHeading}>Name</Text>
                        <Text style={styles.detailText}>{firstName}&nbsp;{lastName}</Text>
                    </View>
                    <Divider style={styles.headingDividerBase}></Divider>
                    <View style={styles.baseContainerView}>
                          <Text style={styles.detailHeading}>Gender</Text>
                          <Text style={styles.detailText}>{gender}</Text>
                    </View>
                    <Divider style={styles.headingDividerBase}></Divider>
                    <View style={styles.baseContainerView}>
                          <Text style={styles.detailHeading}>Email</Text>
                          <Text style={styles.detailText}>{email}</Text>
                    </View>
                    <Divider style={styles.headingDividerBaseBottom}></Divider>
                </View>
                <View style={styles.footerView}>
                  <TouchableOpacity onPress={ () => changePassword() }>
                    <Button>Change Password</Button>
                    <Divider style={styles.headingDividerBase}></Divider>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.deleteView} onPress={ () => deleteUser() }>
                    {/* <Icon name="delete" size={30} color='#Ba020a' style={styles.deleteEdit} /> */}
                    <Text style={styles.deleteEdit}>DELETE ACCOUNT</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
    function cancelAnimButton() {
      return (
        <Animated.View style={{position:'absolute',top:5,right:5,opacity:opacity,}}>
          <TouchableOpacity  onPress={ () => { stopAnimate(false); } }>
            <Icon name="close" size={30} color="#fff" />
          </TouchableOpacity>
        </Animated.View> 
        // <TouchableOpacity style={styles.cancelAnimButton} onPress={ () => { stopAnimate(); } }>
        //   <Icon name="close" size={30} color="#fff" style={ styles.cancelAnimButtonEdit } />
        // </TouchableOpacity>
      );
    } 
    function filterAnim() {
      return (
        <Animated.View style={{position:'absolute',bottom:10,left:10,opacity:opacitys,}}>
          <TouchableOpacity  onPress={ () => { stopAnimate(true); } }>
            <Icon name="creation" size={30} color="#fff" />
          </TouchableOpacity>
        </Animated.View> 
        // <TouchableOpacity style={styles.cancelAnimButton} onPress={ () => { stopAnimate(); } }>
        //   <Icon name="close" size={30} color="#fff" style={ styles.cancelAnimButtonEdit } />
        // </TouchableOpacity>
      );
    } 
}
const styles = StyleSheet.create({
 
    mainContainer: {
      flex: 1,
      // backgroundColor: '#F5FCFF',
      backgroundColor: 'white',
    },
    container:{
      flex:1,
    },
    header:{
      height:250,
      // backgroundColor:'#0c1b32',
      backgroundColor:'#0c1b32',
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    headingDivider:{
      backgroundColor:'gray',
      height:1,
    },
    cardViewStyle:{
      // width:160, 
      // height:160, 
      // justifyContent:'center',
      // alignItems:'center'
    },
    tinyLogo: {
      // width: 155,
      // height: 155,
      // borderRadius:100,
    },
    imageEditView:{
      position:'absolute',
      right:'25%',
      bottom:'10%',
      padding:5,
    },
    imageEdit:{
      
    },
    logoutEditView:{
      position:'absolute',
      top:15,
      right:15,
    },
    logoutEdit:{
      
    },
    deleteView:{
      // position:'absolute',
      // right:15,
      paddingTop:5,
      bottom:35,
      justifyContent:'center',
      alignSelf:'center',
    },
    deleteEdit:{
      color:'#b30000',
    },
    textEditViewStyle:{
      position:'absolute',
      top:15,
      right:15,
      padding:5,
      backgroundColor:'white',
      borderWidth:2,
      borderColor:'lightgray',
      borderRadius:25,
    },
    textEditView:{
      
    },
    textEdit:{
      color:'black'
    },
    baseContainer:{
      flex:1,
      padding:30,
    },
    baseContainerView:{
      padding:5,
    },
    detailHeading:{
      color:'gray',
      fontFamily:'sans-serif-medium',
      paddingBottom:5,
      fontSize:13,
    },
    detailText:{
      color:'black',
      fontWeight:'bold',
      fontFamily:'notoserif',
      paddingBottom:15,
      fontSize:15,
    },
    headingDividerBase:{
      backgroundColor:'darkgray',
      height:1,
      marginBottom:20,
    },
    headingDividerBaseBottom:{
      backgroundColor:'darkgray',
      height:1,
      marginBottom:10,
    },
    footerView:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      height:90,
    },
    popupView:{
      flex:1,
      // width: '100%',
      // height: '100%',
      // borderRadius:100,
      backgroundColor:'red',
      position:'absolute',
      backgroundColor:'green',
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
    },
    popup: {
      width: 100,
      height: 100,
      borderRadius:100,
      justifyContent:'center',
    },
    cancelAnimButton:{
      position:'absolute',
      top:5,
      right:5,
      opacity:0.3,
    },
    cancelAnimButtonEdit:{
      opacity: 0.3,
    },
});
export default ProfileActivity;