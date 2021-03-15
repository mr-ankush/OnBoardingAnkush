import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid, BackHandler, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Headline, TextInput, Button, Text, HelperText, Divider, RadioButton, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditPasswordActivity = ({navigation}) => {
    const [] = useState('');
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            AsyncStorage.multiGet(['PASSWORD', 'IMAGE' ])
            .then( response  => {
                setPass(response[0][1]);
                setImage(response[1][1]);
            })
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    const keyboardDismiss = () =>{
      // Keyboard.dismiss();
      if(!oldPass){
          setErrorOldPassText('');
          setIsErrorOldPass(false);
      }
      if(!newPass){
          setErrorNewPassText('');
          setIsErrorNewPass(false);
      }
      if(!newPassConf){
          setErrorNewPassConfText('');
          setIsErrorNewPass(false);
      }
    }
    const [pass, setPass] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [errorOldPass, setErrorOldPass] = useState(false);
    const [errorOldPassText, setErrorOldPassText] = useState('');
    const [oldPassHide, setOldPassHide] = useState(true);
    const [oldPassIcon, setOldPassIcon] = useState('eye');
    const [isErrorOldPass, setIsErrorOldPass] = useState(false);

    const [newPass, setNewPass] = useState('');
    const [errorNewPass, setErrorNewPass] = useState(false);
    const [errorNewPassText, setErrorNewPassText] = useState('');
    const [newPassHide, setNewPassHide] = useState(true);
    const [newPassIcon, setNewPassIcon] = useState('eye');
    const [isErrorNewPass, setIsErrorNewPass] = useState(false);

    const [newPassConf, setNewPassConf] = useState('');
    const [errorNewPassConf, setErrorNewPassConf] = useState(false);
    const [errorNewPassConfText, setErrorNewPassConfText] = useState('');
    const [newPassConfHide, setNewPassConfHide] = useState(true);
    const [newPassConfIcon, setNewPassConfIcon] = useState('eye');
    const [isErrorNewPassConf, setIsErrorNewPassConf] = useState(false);   
    
    const [passConfType, setPassConfType] = useState('error');

    const [image, setImage] = useState('https://i.ibb.co/CJGmnGg/default.png');

    const changeOldPassIcon = (icon) => {
        setOldPassIcon(icon === 'eye' ? 'eye-off' : 'eye');
        setOldPassHide(oldPassHide === true ? false : true)
    }
    const changeNewPassIcon = (icon) => {
        setNewPassIcon(icon === 'eye' ? 'eye-off' : 'eye');
        setNewPassHide(newPassHide === true ? false : true)
    }
    const changeNewPassConfIcon = (icon) => {
        setNewPassConfIcon(icon === 'eye' ? 'eye-off' : 'eye');
        setNewPassConfHide(newPassConfHide === true ? false : true)
    }

    const validateOldPass = (oldPass) => {
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
        if(oldPass && passwordReg.test(oldPass) === false){
            // alert("Password must contain minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character.")
            setErrorOldPass(true);
            setErrorOldPassText('Password must contain minimum 7 and maximum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
            setIsErrorOldPass(true);
            return false;
        }
        else{
            setErrorOldPass(false);
            setErrorOldPassText('');
            setIsErrorOldPass(false);
        }

        if(!oldPass){
            // alert("Password is required.");
            setErrorOldPass(true);
            setErrorOldPassText('Password is required.');
            setIsErrorOldPass(true);
            return false;
        }
        else{
            setErrorOldPass(false);
            setErrorOldPassText('');
            setIsErrorOldPass(false);
        }
        setErrorOldPass(false);
        setErrorOldPassText('');     
        setIsErrorOldPass(false);
        return true;
    }
    const validateNewPass = (newPass) => {
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
        if(newPass && passwordReg.test(newPass) === false){
            // alert("Password must contain minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character.")
            setErrorNewPass(true);
            setErrorNewPassText('Password must contain minimum 7 and maximum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
            setIsErrorNewPass(true);
            return false;
        }
        else{
            setErrorNewPass(false);
            setErrorNewPassText('');
            setIsErrorNewPass(false);
        }

        if(!newPass){
            // alert("Password is required.");
            setErrorNewPass(true);
            setErrorNewPassText('Password is required.');
            setIsErrorNewPass(true);
            return false;
        }
        else{
            setErrorNewPass(false);
            setErrorNewPassText('');
            setIsErrorNewPass(false);
        }
        setErrorNewPass(false);
        setErrorNewPassText('');     
        setIsErrorNewPass(false);
        return true;
    }
    const validateNewPassConf = (newPassConf) => {
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
        if(newPassConf && passwordReg.test(newPassConf) === false){
            // alert("Password must contain minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character.")
            setErrorNewPassConf(true);
            setErrorNewPassConfText('Password must contain minimum 7 and maximum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character.');
            setIsErrorNewPassConf(true);
            return false;
        }
        else{
            setErrorNewPassConf(false);
            setErrorNewPassConfText('');
            setIsErrorNewPassConf(false);
        }

        if(!newPass){
            // alert("Password is required.");
            setErrorNewPassConf(true);
            setErrorNewPassConfText('Password is required.');
            setIsErrorNewPassConf(true);
            return false;
        }
        else{
            setErrorNewPassConf(false);
            setErrorNewPassConfText('');
            setIsErrorNewPassConf(false);
        }
        setErrorNewPassConf(false);
        setErrorNewPassConfText('');     
        setIsErrorNewPassConf(false);
        return true;
    }

    const updateData = (pass,oldPass, newPass, newPassConf) => {
        if( validateOldPass(oldPass) && validateNewPass(newPass) && validateNewPassConf(newPassConf) ){
            
            if(pass==oldPass){
                if(oldPass==newPass){
                    setErrorNewPass(true);
                    setErrorNewPassText('New password must differ from your previous password.');
                    setIsErrorNewPass(true);
                    return false;
                }
                else{
                    if(newPass==newPassConf){
                        alert("New password will take effect after the log-out session.");
                        AsyncStorage.setItem('PASSWORD', newPass);
                        navigation.replace('ProfileActivity');
                        ToastAndroid.show("Password Updated.", ToastAndroid.LONG);           
                    }
                    else{
                        setErrorNewPassConf(true);
                        setErrorNewPassConfText('Confirm password is incorrect.');
                        setIsErrorNewPassConf(true);
                        return false;
                    }
                }
            }
            else{
                // alert("Old Password is incorrect.");
                setErrorOldPass(true);
                setErrorOldPassText('Old Password is incorrect.');
                setIsErrorOldPass(true);
                return false;
            }
        }
    }

    return(
        <View style={styles.mainContainer} onTouchStart={ () => keyboardDismiss() }>
            <ScrollView style={styles.container}>
              <Divider style={styles.headingDivider}></Divider>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.imageEditView}>
                      <Icon name="check" size={30} color="#fff" style={styles.imageEdit} 
                          onPress={ () => updateData(pass,oldPass, newPass, newPassConf ) }/>
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
                    <View style={styles.baseContainerView}>
                        <TextInput
                            autoCompleteType="password"
                            label="Old Password"
                            mode="outlined"
                            placeholder="Old Password"
                            blurOnSubmit={true}
                            secureTextEntry={oldPassHide}
                            autoCorrect={false}
                            textContentType={'password'}
                            multiline={false}
                            // value={oldPass}
                            error={isErrorOldPass}
                            onChangeText={ (text) => { setOldPass(text); validateOldPass(text); } }
                            left={ <TextInput.Icon name="key-variant" color={"darkblue"} disabled={true} />}
                            right={ <TextInput.Icon name={oldPassIcon} color={"darkblue"} disabled={false} onPress={ () => changeOldPassIcon(oldPassIcon) } />}
                        />
                        <HelperText type="error" visible={errorOldPass}>{errorOldPassText}</HelperText>
                    </View>
                    <View style={styles.baseContainerView}>
                        <TextInput
                            autoCompleteType="password"
                            label="New Password"
                            mode="outlined"
                            placeholder="New Password"
                            blurOnSubmit={true}
                            secureTextEntry={newPassHide}
                            autoCorrect={false}
                            textContentType={'password'}
                            multiline={false}
                            value={newPass}
                            error={isErrorNewPass}
                            onChangeText={ (text) => { setNewPass(text); validateNewPass(text); } }
                            left={ <TextInput.Icon name="key-variant" color={"darkblue"} disabled={true} />}
                            right={ <TextInput.Icon name={newPassIcon} color={"darkblue"} disabled={false} onPress={ () => changeNewPassIcon(newPassIcon) } />}
                        />
                        <HelperText type="error" visible={errorNewPass}>{errorNewPassText}</HelperText>
                    </View>
                    <View style={styles.baseContainerView}>
                        <TextInput
                            autoCompleteType="password"
                            label="Confirm Password"
                            mode="outlined"
                            placeholder="Confirm Password"
                            blurOnSubmit={true}
                            secureTextEntry={newPassConfHide}
                            autoCorrect={false}
                            textContentType={'password'}
                            multiline={false}
                            value={newPassConf}
                            error={isErrorNewPassConf}
                            onChangeText={ (text) => { setNewPassConf(text); validateNewPassConf(text); } }
                            left={ <TextInput.Icon name="key-variant" color={"darkblue"} disabled={true} />}
                            right={ <TextInput.Icon name={newPassConfIcon} color={"darkblue"} disabled={false} onPress={ () => changeNewPassConfIcon(newPassConfIcon) } />}
                        />
                        <HelperText type={passConfType} visible={errorNewPassConf}>{errorNewPassConfText}</HelperText>
                    </View>
                    <Divider style={styles.headingDividerBase}></Divider>
                    <View style={styles.noticeView}>
                        <Text style={styles.notice}>New password will take effect after log-out current session.</Text>
                    </View>
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
    imageEditView:{
      position:'absolute',
      top:15,
      right:15,
    },
    imageEdit:{
      
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
    baseContainerRadioView:{
      padding:5,
      flexDirection:'row',
    },
    textInputFieldRadio:{
      marginBottom:5,
      flexDirection:'row',
    },
    textInputFieldRadioButtonView:{
        marginBottom:5,
        flexDirection:'row',
        marginRight:25,
    },
    textInputFieldRadioButton:{

    },
    textInputFieldRadioButtonText:{
        fontWeight:'500'
    },
    noticeView:{
        flex:1,
        justifyContent:'center',
    },
    notice:{
        color:'darkgray',
        fontSize:14,
        textAlign:'center'
    },
});
export default EditPasswordActivity;