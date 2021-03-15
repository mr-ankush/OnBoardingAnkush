import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid, BackHandler, Alert } from 'react-native';
import { Headline, TextInput, Button, Text, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const LoginActivity = ({navigation}) => {
    const [] = useState('');
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.multiGet(['EMAIL', 'PASSWORD'])
            .then( response  => {
                setEmailData(response[0][1]);
                setPassData(response[1][1]);
                setEmail('');
                setPass('');
                // console.log(response[0][0]) // Key1
                // console.log(response[0][1]) // Value1
                // console.log(response[1][0]) // Key2
                // console.log(response[1][1]) // Value2
            })        
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    // const backActionHandler = () => {
    //     Alert.alert("Exit EST?", "Are you sure you want to go back?", [
    //         {
    //             text: "Cancel",
    //             onPress: () => null,
    //             style: "cancel"
    //         },
    //         { 
    //             text: "YES",
    //             onPress: () => BackHandler.exitApp()
    //         }
    //     ]);
    //     return true;
    // };
    
    // useEffect(() => {
    //     // Add event listener for hardware back button press on Android
    //     BackHandler.addEventListener("hardwareBackPress", backActionHandler);
    //     return () =>
    //     // clear/remove event listener
    //     BackHandler.removeEventListener("hardwareBackPress", backActionHandler);
    // }, []);
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
    //     return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    // }, []);

    const [emailData, setEmailData] = useState('');
    const [passData, setPassData] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailText, setErrorEmailText] = useState('');
    const [errorPass, setErrorPass] = useState(false);
    const [errorPassText, setErrorPassText] = useState('');
    const [passHide, setPassHide] = useState(true);
    const [passIcon, setPassIcon] = useState('eye');
    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [isErrorPass, setIsErrorPass] = useState(false);
    const keyboardDismiss = () =>{
        // Keyboard.dismiss();
        if(!email){
            setErrorEmailText('');
            setIsErrorEmail(false);
        }
        if(!pass){
            setErrorPassText('');
            setIsErrorPass(false);
        }
    }
    const changeIcon = (icon) => {
        // let value = icon === 'eye' ? 'eye-off' : 'eye';
        setPassIcon(icon === 'eye' ? 'eye-off' : 'eye');
        setPassHide(passHide === true ? false : true)
    }
    const login = (email, pass) => {
        if( validateEmailId(email) && validatePasswordId(pass) ){
            if(email && pass){
                if(email==emailData && pass==passData){
                    setEmail('');
                    setPass('');
                    AsyncStorage.setItem('KEY','1'); // 1 for log-in
                    ToastAndroid.show("Login Successfully.", ToastAndroid.SHORT);
                    navigation.replace('ProfileActivity');
                }
                else{
                    ToastAndroid.show("Email or Password not matched.", ToastAndroid.SHORT);
                }
            }
        }
    }
    const validateEmailId = (email) => {
        const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email && emailReg.test(email) === false){
            // alert("Enter valid email.");
            setErrorEmail(true);
            setErrorEmailText('Enter valid email.');
            setIsErrorEmail(true);
            return false;
        }
        else{
            setErrorEmail(false);
            setErrorEmailText('');
            setIsErrorEmail(false);
        }

        if(!email){
            // alert("Email is required.");
            setErrorEmail(true);
            setErrorEmailText('Email is required.');
            setIsErrorEmail(true);
            return false;
        }
        else{
            setErrorEmail(false);
            setErrorEmailText('');
            setIsErrorEmail(false);
        }
        setErrorEmail(false);
        setErrorEmailText('');
        setIsErrorEmail(false);
        return true;
    }
    const validatePasswordId = (pass) => {
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
        if(pass && passwordReg.test(pass) === false){
            // alert("Password must contain minimum 7 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character.")
            setErrorPass(true);
            setErrorPassText('Password must contain minimum 7 and maximum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
            setIsErrorPass(true);
            return false;
        }
        else{
            setErrorPass(false);
            setErrorPassText('');
            setIsErrorPass(false);
        }

        if(!pass){
            // alert("Password is required.");
            setErrorPass(true);
            setErrorPassText('Password is required.');
            setIsErrorPass(true);
            return false;
        }
        else{
            setErrorPass(false);
            setErrorPassText('');
            setIsErrorPass(false);
        }
        setErrorPass(false);
        setErrorPassText('');
        setIsErrorPass(false);
        return true;
    }
    return(
        <View style={styles.container} onTouchStart={ () => keyboardDismiss() }>
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.subContainer} >
                    <Headline style={styles.heading}>LogIn</Headline>
                </View>
                <View style={styles.textInputView}>
                    <View style={styles.textInputField}>
                        <TextInput
                            autoCompleteType="email"
                            label="Email ID"
                            mode="outlined"
                            placeholder="Email Id"
                            blurOnSubmit={true}
                            autoCapitalize='none'
                            // autoFocus
                            keyboardType="email-address"
                            error={isErrorEmail}
                            value={email}
                            onChangeText={ (text) => { setEmail(text); validateEmailId(text); } }
                            left={ <TextInput.Icon name="email" color={"darkblue"} disabled={true} />}
                        />
                        <HelperText type="error" visible={errorEmail}>{errorEmailText}</HelperText>
                    </View>
                    <View style={styles.textInputField}>
                        <TextInput
                                autoCompleteType="password"
                                label="Password"
                                mode="outlined"
                                placeholder="Password"
                                blurOnSubmit={true}
                                secureTextEntry={passHide}
                                autoCorrect={false}
                                textContentType={'password'}
                                multiline={false}
                                error={isErrorPass}
                                value={pass}
                                onChangeText={ (text) => { setPass(text); validatePasswordId(text); } }
                                left={ <TextInput.Icon name="key-variant" color={"darkblue"} disabled={true} />}
                                right={ <TextInput.Icon name={passIcon} color={"darkblue"} disabled={false} onPress={ () => changeIcon(passIcon) } />}
                            />
                            <HelperText type="error" visible={errorPass}>{errorPassText}</HelperText>
                    </View>
                    <View style={styles.submitButton} >
                        <Button 
                            style={styles.loginButton}
                            icon="login"
                            mode="contained"
                            onPress={ () => login(email,pass) }
                            >
                            LOGIN
                        </Button>
                    </View>
                    <View style={styles.newAccount}>
                        <Text style={styles.signupText} onPress={ () => navigation.navigate('SignupActivity') }>Don't have an account? Create one new</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer:{
        flex: 1,
    },
    subContainer:{
        padding:25,
        paddingTop:85,
    },
    heading: {
      color: "black",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      padding:25,
      color:'mediumblue',
    },
    textInputView:{
        flex:1,
        padding:30,
    },
    textInputField:{
        marginBottom:5,
    },
    submitButton:{
        marginTop:80,
        alignSelf:'center',
    },
    loginButton:{
        borderRadius:10,
        fontWeight:'bold'
    },
    newAccount:{
        alignSelf:'center',
        paddingTop:25,
    },
    signupText:{
        borderRadius:15,
        fontWeight:'bold',
        color:'mediumblue'
    },
  });
export default LoginActivity;