import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid, BackHandler, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Headline, Button, Text, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditImageActivity = ({navigation}) => {
    const [] = useState('');
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.getItem('IMAGE').then((Image)=>{
                setImage(Image);
            });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
        })
    }, [navigation]);
    const [image, setImage] = useState('https://i.ibb.co/CJGmnGg/default.png');

    const [i1, setI1] = useState('https://i.ibb.co/XF10F9j/m1.png');
    const [i2, setI2] = useState('https://i.ibb.co/x2FJBHg/m2.webp');
    const [i3, setI3] = useState('https://i.ibb.co/mh0CCXS/m3.webp');
    const [i4, setI4] = useState('https://i.ibb.co/PWNZ3qv/m4.webp');
    const [i5, setI5] = useState('https://i.ibb.co/RbSdjLw/m5.webp');
    const [i6, setI6] = useState('https://i.ibb.co/yyNNw5W/m6.jpg');
    const [i7, setI7] = useState('https://i.ibb.co/hZH4jx8/f1.png');
    const [i8, setI8] = useState('https://i.ibb.co/DRv0hkX/f2.jpg');
    const [i9, setI9] = useState('https://i.ibb.co/cJbn2x7/f3.jpg');
    const [i10, setI10] = useState('https://i.ibb.co/Dt523jC/Pretty-girl-avatar-Flat-cartoon-style-Vector-Illustration.jpg');
    const [i11, setI11] = useState('https://i.ibb.co/HgxPFhR/f5.jpg');
    const [i12, setI12] = useState('https://i.ibb.co/BVKBKzS/f6.webp');

    const updateImage = () => {
        AsyncStorage.setItem('IMAGE', image);
        navigation.replace('ProfileActivity');
        ToastAndroid.show("Image Updated.", ToastAndroid.LONG);
    }
    return(
        <View style={styles.mainContainer}>
            <ScrollView style={styles.container}>
              <Divider style={styles.headingDivider}></Divider>
                <View style={styles.header}>
                  <TouchableOpacity style={styles.imageEditView}>
                    <Icon name="check" size={30} color="#fff" style={styles.imageEdit} onPress={ () => updateImage() }/>
                  </TouchableOpacity>
                    <CardView
                      cardElevation={5}
                      cardMaxElevation={5}
                      cornerRadius={100}
                      style={styles.cardViewStyle}
                    >
                        <Image
                          style={styles.tinyLogo}
                          source={ { uri : image } }
                        />
                    </CardView>
                    
                </View>
                <View style={styles.baseContainer}>
                    <TouchableOpacity onPress={ () => setImage(i1) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i1 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setImage(i2) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i2 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setImage(i3) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i3 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                </View>
                <View style={styles.baseContainer}>
                    <TouchableOpacity onPress={ () => setImage(i4) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i4 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setImage(i5) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i5 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setImage(i6) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i6 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                </View>
                <View style={styles.baseContainer}>
                    <TouchableOpacity onPress={ () => setImage(i7) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i7 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setImage(i8) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i8 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setImage(i9) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i9 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                </View>
                <View style={styles.baseContainer}>
                    <TouchableOpacity onPress={ () => setImage(i10) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i10 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setImage(i11) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i11 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setImage(i12) }>
                        <CardView
                            cardElevation={5}
                            cardMaxElevation={5}
                            cornerRadius={100}
                            style={styles.baseCardViewStyle}
                            >
                                <Image
                                style={styles.logo}
                                source={ { uri : i12 } }
                                />
                        </CardView>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
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
      width:160, 
      height:160,  
      justifyContent:'center',
      alignItems:'center'
    },
    tinyLogo: {
        width: 155,
        height: 155,
        borderRadius:100,
    },
    imageEditView:{
      position:'absolute',
      top:15,
      right:15,
    },
    imageEdit:{
      
    },
    textEditView:{
      position:'absolute',
      top:25,
      right:25,
      backgroundColor:'gray',
      borderWidth:2,
      borderColor:'lightgray',
      borderRadius:25,
    },
    textEdit:{
      color:'white'
    },
    baseContainer:{
      flex:1,
      padding:30,
      paddingBottom:10,
      paddingTop:10,
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
    },
    baseContainerView:{
      padding:5,
    },
    baseCardViewStyle:{
      margin:15,
      width:75, 
      height:75,  
      justifyContent:'center',
      alignItems:'center'
    },
    logo: {
        width: 60,
        height: 60,
    },
});
export default EditImageActivity;






// cardViewStyle:{
//   width: '90%', 
//   height: '95%',

// },
// cardView_InsideText:{
//   fontSize: 20, 
//   color: '#000', 
//   textAlign: 'center', 
//   marginTop: 10,
//   fontWeight:'bold',
//   color:'navy'
// },

// bodyView:{
//   padding:15,
// },
// bodyHeading:{
//   fontSize: 18,
//   textDecorationLine:'underline',
// },
// bodyText:{
//   fontSize: 20,
//   fontWeight:'bold',
//   marginLeft:30,
//   width:'100%'
// },
// bottomView:{
//   flex:1,
// },
// bottomNavigation:{
//   backgroundColor:'red',
//   height:'15%',
// }