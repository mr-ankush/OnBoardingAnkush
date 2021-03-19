import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid, BackHandler, Alert,
       Image, TouchableOpacity, Dimensions } from 'react-native';
import { Headline, Button, Text, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNImageFilter from 'react-native-image-filter';
const ImageFilter = ({route,navigation}) => {
    const WIN_WIDTH = Dimensions.get('window').width;
    const WIN_HEIGHT = Dimensions.get('window').height;
    const [image, setImage] = useState(route.params.image);
    const [imageValue, setImageValue] = useState('');
    const [click, setClick] = useState(-1);
    const [filterType, setFilterType] = useState(route.params.filter_type);
    
    useEffect(() => {
        if(filterType=='0'){ setClick(0); }
        else if(filterType=='1'){ setClick(1); }
        else if(filterType=='2'){ setClick(2); }
        else if(filterType=='3'){ setClick(3); }
        else if(filterType=='4'){ setClick(4); }
        else if(filterType=='5'){ setClick(5); }
        else if(filterType=='6'){ setClick(6); }
        else if(filterType=='7'){ setClick(7); }
        else if(filterType=='8'){ setClick(8); }
        else if(filterType=='9'){ setClick(9); }
        else if(filterType=='10'){ setClick(10); }
        else if(filterType=='11'){ setClick(11); }
        else if(filterType=='12'){ setClick(12); }
        else if(filterType=='13'){ setClick(13); }
        else if(filterType=='14'){ setClick(14); }
        else if(filterType=='15'){ setClick(15); }
        else if(filterType=='16'){ setClick(16); }
        else if(filterType=='17'){ setClick(17); }
        else if(filterType=='18'){ setClick(18); }
        else if(filterType=='19'){ setClick(19); }
        else if(filterType=='20'){ setClick(20); }
        else if(filterType=='21'){ setClick(21); }
        // else { setClick(-1); }
        console.log("fil==> "+click);
        RNImageFilter.getSourceImage(
            {
                imageSource: route.params.path,
                dataType: "Path",
                filterType: click,
            },
            (source) => {
                setImage("data:image/jpeg;base64,"+source.base64);
                setFilterType(click);
                // console.log("==>"+image);
            }
        );
    }, [click]);

    // useEffect(() => {
    //     RNImageFilter.getSourceImage(
    //         {
    //             imageSource: route.params.path,
    //             dataType: "Path",
    //             filterType: click,
    //         },
    //         (source) => {
    //             setImage("data:image/jpeg;base64,"+source.base64);
    //             setFilterType(click);
    //             console.log("==>"+image);
    //         }
    //     );
    // }, [click]);

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerRight: () => (
    //         <Icon name="check" size={40} color="#fff" style={styles.imageEdit} 
    //         onPress={ () => updateImage(image) } />
    //       ),
    //     });
    // }, [navigation]);

    const updateImage = async() => {
        try {
            // console.log("1");
            await AsyncStorage.removeItem('IMAGE');
            await AsyncStorage.setItem('IMAGE', image);
            await AsyncStorage.setItem('FILTER_TYPE', ""+filterType);
            console.log("filter "+filterType);
            ToastAndroid.show("Image Updated.", ToastAndroid.LONG);
            navigation.replace('ProfileActivity');
        } catch (error) {
            console.log(error);
        }
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
                    { 
                        URL.map((item, key)=>
                            (
                                <View style={styles.imagePreview} key={key} >
                                    <TouchableOpacity onPress={ () => {setClick(key-1); setFilterType(key-1);}  }>
                                        <Image
                                            style={styles.preview} 
                                            source={ { uri : item } }
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        )
                    }
                </ScrollView>    
            </View>
            <View style={styles.submitButton} >
                <Button 
                    style={styles.imageButton}
                    icon="login"
                    mode="contained"
                    onPress={ () => updateImage() }
                    >
                    SAVE
                </Button>
            </View>
            {/* <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={ () => updateImage() }>
                    <Text style={{ fontSize:20, fontWeight:'bold', backgroundColor:'lightgreen', padding:15, borderRadius:10 }}>UPDATE IMAGE</Text>
                </TouchableOpacity>
            </View> */}
        </View>
    );
}
var URL = [
    "https://i.ibb.co/FmYsXtj/none-icon.png",
    "https://i.ibb.co/mXMYCsL/image.png",
    "https://i.ibb.co/TPRJksb/1.png",
    "https://i.ibb.co/0DqK11f/2.png",
    "https://i.ibb.co/7SxvdGX/3.png",
    "https://i.ibb.co/VMwbLrV/4.png",
    "https://i.ibb.co/mDfNRLJ/5.png",
    "https://i.ibb.co/RpR8fy0/6.png",
    "https://i.ibb.co/zXZktms/7.png",
    "https://i.ibb.co/bJq658v/8.png",
    "https://i.ibb.co/HGR0TmY/9.png",
    "https://i.ibb.co/RTtRKsK/10.png",
    "https://i.ibb.co/nCZYT8D/11.png",
    "https://i.ibb.co/HPb4LTd/12.png",
    "https://i.ibb.co/LxFhX04/13.png",
    "https://i.ibb.co/fGFnbGF/14.png",
    "https://i.ibb.co/FW22F1T/15.png",
    "https://i.ibb.co/3dKvr6D/16.png",
    "https://i.ibb.co/yy1L69W/17.png",
    "https://i.ibb.co/2vfGw4Y/18.png",
    "https://i.ibb.co/2PJYkbm/19.png",
    "https://i.ibb.co/T1wG7v6/20.png",
    "https://i.ibb.co/CPCZmVG/21.png"
] ;
const styles = StyleSheet.create({
    container:{
        flex:1,
        // backgroundColor:'#0c1b32',
    },
    header:{
        height:'70%',
        backgroundColor:'#0c1b32',
        // flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20
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
        width: '100%', 
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
        padding:2, 
        backgroundColor:'white',
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
        borderRadius:10,
        borderWidth:2,
        borderColor:'#e9ff00'
    },
    previewContainer:{
        height:125,
        padding:6,
        backgroundColor:'#0c1b32',
    },
    imagePreview:{
        padding:6,
        width:110,
    },
    preview:{
        padding:10,
        height:100,
        width:100,
        borderColor:'orange',
        borderWidth:2,
    },
    submitButton:{
        alignSelf:'center',
        position:'absolute',
        bottom:30,
    },
    imageButton:{
        borderRadius:10,
        fontWeight:'bold'
    },
})
export default ImageFilter;