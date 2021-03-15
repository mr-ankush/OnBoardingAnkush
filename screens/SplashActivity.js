import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const SplashActivity = ({navigation}) => {
    const [] = useState('');
    useEffect(() => {
        setTimeout(function(){  
            // alert("HELLO");
            AsyncStorage.getItem("KEY").then((key) => {
                if(key=='1'){
                    navigation.replace('ProfileActivity');
                }
                else{
                    navigation.replace('LoginActivity');
                }
            });
       }, 1500);
    });
    return(
        <View style={styles.SplashScreen_RootView}>  
            <View style={styles.SplashScreen_ChildView}>  
                <Image source={{uri:'https://i.ibb.co/Mhhdqmy/splash-icon.jpg'}}  
            style={{width:'100%', height: '100%', resizeMode: 'contain'}} />  
            </View>
        </View>
    );
}
const styles = StyleSheet.create( 
{  
    SplashScreen_RootView:  
    {  
        justifyContent: 'center',  
        flex:1,  
        margin: 10,  
        position: 'absolute',  
        width: '100%',  
        height: '100%',  
        backgroundColor: '#f5f5f7',
    },  
    SplashScreen_ChildView:  
    {  
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f7',
        flex:0.3,
    },  
});  
export default SplashActivity;