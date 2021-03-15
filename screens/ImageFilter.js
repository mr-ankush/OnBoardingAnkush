import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid, BackHandler, Alert,
       Image, TouchableOpacity, PermissionsAndroid, Animated, Easing, Dimensions, TouchableNativeFeedback} from 'react-native';
import { Headline, Button, Text, Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const ImageFilter = ({route,navigation}) => {
    const [] = useState('');
    const [image, setImage] = useState('https://i.ibb.co/CJGmnGg/default.png');
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setImage(route.params.path);
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    return(
        <View>
            <Image source={ { uri : image } } style={{ resizeMode: "contain", height: 200, width: 200 }} />
        </View>
    );
}
export default ImageFilter;