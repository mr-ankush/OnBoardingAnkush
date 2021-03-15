import { StepLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import required components
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid,
    ScrollView
} from 'react-native';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome5';
import StyleSheetContainer from '../StyleSheetContainer';


const ProfileScreen = ({ navigation }) => {
    const IMAGE_KEY = '@image';
    const [] = useState('');

    const EMAIL_KEY = '@save_email';
    const PASSWORD_KEY = '@save_passwprd';
    const MOBILE_KEY = '@mobile';
    const FIRST_NAME = '@first_name';
    const LAST_NAME = '@last_name';

    const [UserFirstName, setUserFirstName] = useState('');
    const [UserLastName, setUserLastName] = useState('');
    const [UserEmail, setUserEmail] = useState('');
    const [UserMobile, setUserMobile] = useState('');
    const [file, setFile] = useState('https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg');


    const [] = useState('');

    AsyncStorage.multiGet([FIRST_NAME, LAST_NAME, EMAIL_KEY, MOBILE_KEY, IMAGE_KEY])
        .then(responce => {
            setUserFirstName(responce[0][1]);
            setUserLastName(responce[1][1]);
            setUserEmail(responce[2][1]);
            setUserMobile(responce[3][1]);
            setFile(responce[4][1]);
            // alert("Load");

        })

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
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };


    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
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
            setFile(response.uri);
            // alert("" + response.uri);
            AsyncStorage.setItem(IMAGE_KEY, response.uri);
        });
    };

    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.imageVIEW}>
                            <Image
                                source={file == "none" ? { uri: 'https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg' } : { uri: file }}
                                style={styles.imageStyle} />
                        </View>

                        <Icon style={StyleSheetContainer.imagestyle} name='camera' size={20}
                            onPress={() => chooseFile('photo')} />
                    </View>
                </View>
                <View style={StyleSheetContainer.container}>
                    <Text style={StyleSheetContainer.textProfile}>{UserFirstName} </Text>
                    <Text style={StyleSheetContainer.textProfile}>{UserEmail} </Text>
                    <Text style={StyleSheetContainer.textProfile}>{UserMobile} </Text>
                    <TouchableOpacity style={StyleSheetContainer.btnchane}
                        onPress={() => { navigation.navigate('Edit') }}>
                        <Text style={StyleSheetContainer.signbtntext} >Edite Profile </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={StyleSheetContainer.btnchane}
                        onPress={() => { navigation.navigate('Change') }}>
                        <Text style={StyleSheetContainer.signbtntext} >Change Passsword </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={StyleSheetContainer.btnchane}
                        onPress={() => { navigation.navigate('Delete') }}>
                        <Text style={StyleSheetContainer.signbtntext} >Delete Account </Text>
                    </TouchableOpacity>


                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#0e1724',
        alignItems: 'center',
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 20,
        width: '100%',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
    },
    textStyle: {
        padding: 10,
        color: 'black',
        textAlign: 'center',
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 5,
        marginVertical: 10,
        width: 250,
    },
    imageVIEW: {
        width: 170,
        borderRadius: 100,
        height: 170,
        padding: 10,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: 135,
        borderRadius: 100,
        height: 135,
    },
});