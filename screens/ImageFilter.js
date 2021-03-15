import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid, BackHandler, Alert,
       Image, TouchableOpacity, PermissionsAndroid, Animated, Easing, Dimensions, TouchableNativeFeedback} from 'react-native';
import { Headline, Button, Text, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNImageFilter from 'react-native-image-filter';
const ImageFilter = ({route,navigation}) => {
    const WIN_WIDTH = Dimensions.get('window').width;
    const [] = useState('');
    const [image, setImage] = useState('https://i.ibb.co/CJGmnGg/default.png');
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setImage(route.params.path);
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <Icon name="check" size={40} color="#fff" style={styles.imageEdit} 
            onPress={ () => updateImage() }/>
          ),
        });
    }, [navigation]);
    const updateImage = () => {
        alert("HEY");
    }
    return(
        <View style={styles.container}>
            <Divider style={styles.headingDivider}></Divider>
           <View style={styles.header}>
                {/* <TouchableOpacity style={styles.imageEditView}>
                    <Icon name="check" size={30} color="#fff" style={styles.imageEdit} 
                        onPress={ () => updateData(pass,oldPass, newPass, newPassConf ) }/>
                </TouchableOpacity> */}
                <CardView
                    cardElevation={5}
                    cardMaxElevation={5}
                    cornerRadius={10}
                    style={styles.cardViewStyle}
                >
                    <Image
                        style={styles.tinyLogo}
                        source={ { uri : image } }
                    />
                </CardView>
            </View>
            <View style={styles.previewContainer}>
                <ScrollView  horizontal={true} >  
                    <View style={styles.imagePreview}>
                        <Image
                            style={styles.preview}
                            source={ { uri : 'https://i.ibb.co/FmYsXtj/none-icon.png' } }
                        />
                    </View>
                    <View style={styles.imagePreview}>
                        <Image
                            style={styles.preview}
                            source={ { uri : image } }
                        />
                    </View>
                    <View style={styles.imagePreview}>
                        <Image
                            style={styles.preview}
                            source={ { uri : image } }
                        />
                    </View>
                    <View style={styles.imagePreview}>
                        <Image
                            style={styles.preview}
                            source={ { uri : image } }
                        />
                    </View>
                </ScrollView>    
            </View> 
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        height:350,
        // backgroundColor:'#0c1b32',
        backgroundColor:'#0c1b32',
        // flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imageEditView:{
        position:'absolute',
        top:15,
        right:15,
    },
    imageEdit:{
        marginRight:10,
    },
    cardViewStyle:{
        width:325, 
        height:325,  
        justifyContent:'center',
        alignItems:'center'
    },
    tinyLogo: {
        width: 320,
        height: 320,
        borderRadius:10,
    },
    previewContainer:{
        height:125,
        padding:2,
        backgroundColor:'#0c1b32',
    },
    imagePreview:{
        padding:10,
        width:110,
    },
    preview:{
        padding:10,
        height:100,
        width:100,
    },
})
export default ImageFilter;