import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Keyboard, ScrollView, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { Headline, TextInput, Button, Text, HelperText, Divider, RadioButton, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const SignupActivity = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('Male');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passConf, setPassConf] = useState('');
    const [allow, setAllow] = useState(false);

    const [errorFirstName, setErrorFirstName] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [errorPassConf, setErrorPassConf] = useState(false);

    const [errorFirstNameText, setErrorFirstNameText] = useState('');
    const [errorLastNameText, setErrorLastNameText] = useState('');
    const [errorEmailText, setErrorEmailText] = useState('');
    const [errorPassText, setErrorPassText] = useState('');
    const [errorPassConfText, setErrorPassConfText] = useState('');

    const [passHide, setPassHide] = useState(true);
    const [passConfHide, setPassConfHide] = useState(true);
    const [passIcon, setPassIcon] = useState('eye');
    const [passConfIcon, setPassConfIcon] = useState('eye');

    const [isErrorFirstName, setIsErrorFirstName] = useState(false);
    const [isErrorLastName, setIsErrorLastName] = useState(false);
    const [isErrorEmail, setIsErrorEmail] = useState(false);
    const [isErrorPass, setIsErrorPass] = useState(false);
    const [isErrorPassConf, setIsErrorPassConf] = useState(false);
    
    const [passConfType, setPassConfType] = useState('error');
    
    const keyboardHide = () =>{
        Keyboard.dismiss();
    }

    const keyboardDismiss = () =>{
        // Keyboard.dismiss();
        if(!firstName){
            setErrorFirstNameText('');
            setIsErrorFirstName(false);
        }
        if(!lastName){
            setErrorLastNameText('');
            setIsErrorLastName(false);
        }
        if(!email){
            setErrorEmailText('');
            setIsErrorEmail(false);
        }
        if(!pass){
            setErrorPassText('');
            setIsErrorPass(false);
        }
        if(!passConf){
            setErrorPassConfText('');
            setIsErrorPassConf(false);
        }
    }
    const changePassIcon = (icon) => {
        // let value = icon === 'eye' ? 'eye-off' : 'eye';
        setPassIcon(icon === 'eye' ? 'eye-off' : 'eye');
        setPassHide(passHide === true ? false : true)
    }
    const changePassConfIcon = (icon) => {
        // let value = icon === 'eye' ? 'eye-off' : 'eye';
        setPassConfIcon(icon === 'eye' ? 'eye-off' : 'eye');
        setPassConfHide(passConfHide === true ? false : true)
    }
    
    const validateEmail = (email) => {          
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
        else if(email.length>0){
            setErrorEmail(false);
            setErrorEmailText('');
            setIsErrorEmail(false);
        }
        setErrorEmail(false);
        setErrorEmailText('');
        setIsErrorEmail(false);       
        return true;
    }
    const validatePassword = (pass) => {
        const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,12}$/;
        if(pass && passwordReg.test(pass) === false){
            // alert("Password must contain minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character.")
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
    const validatePasswordConf = (passConf) => {
        if(!passConf){
            // alert("Password is required.");
            setErrorPassConf(true);
            setErrorPassConfText('Confirm Password is required.');
            setIsErrorPassConf(true);
            return false;
            
        }
        else{
            setErrorPassConf(false);
            setErrorPassConfText('');
            setIsErrorPassConf(false);
        }
        setIsErrorPassConf(false);
        setErrorPassConfText('');
        setErrorPassConf(false);
        return true;
    }
    const validateFirstName = (firstName) => {
        if(!firstName){
            // alert("First Name is required.");
            setErrorFirstName(true);
            setErrorFirstNameText('First Name is required.');
            setIsErrorFirstName(true);
            return false;
        }
        else{
            setErrorFirstName(false);
            setErrorFirstNameText('');
            setIsErrorFirstName(false);
        }
        setErrorFirstName(false);
        setErrorFirstNameText('');
        setIsErrorFirstName(false);
        return true;
    }
    const validateLastName = (lastName) => {
        if(!lastName){
            // alert("Last Name is required.");
            setErrorLastName(true);
            setErrorLastNameText('Last Name is required.');
            setIsErrorLastName(true);
            return false;
        }
        else{
            setErrorLastName(false);
            setErrorLastNameText('');
            setIsErrorLastName(false);
        }
        setErrorLastName(false);
        setErrorLastNameText('');
        setIsErrorLastName(false);
        return true;
    }
    const passwordChecker = (pass, passConf) => {
        if(passConf){
            if(pass == passConf){
                setPassConfType('info');
                setErrorPassConf(true);
                setIsErrorPassConf(false);
                setErrorPassConfText('Password matched.');
                // alert("P matched");
            }
            else{
                setPassConfType('error');
                setErrorPassConf(true);
                setErrorPassConfText('Password not matched.');
                setIsErrorPassConf(true);
                // alert("P not matched");
                return false;
            }
        }
        setIsErrorPassConf(false);
        setErrorPassConfText('');
        setErrorPassConf(false);
        return true;
    }

    const signup = (firstName, lastName, gender, email, pass, passConf) => {
        if( validateFirstName(firstName) && validateLastName(lastName) && validateEmail(email) 
            && validatePassword(pass) && validatePasswordConf(passConf) && passwordChecker(pass, passConf) ){
            if(allow){
                // alert("Allow: "+allow);
                // alert("Name: "+firstName+" "+lastName+"\nGender: "+gender+"\nEmail: "+email+"\nPassword: "+pass)
                AsyncStorage.setItem('FIRST_NAME', firstName);
                AsyncStorage.setItem('LAST_NAME', lastName);
                AsyncStorage.setItem('GENDER', gender);
                AsyncStorage.setItem('EMAIL', email);
                AsyncStorage.setItem('PASSWORD', pass);
                AsyncStorage.setItem('KEY','0'); // 0 for log-out
                AsyncStorage.setItem('BASE64','none');
                AsyncStorage.setItem('FILTER','false');
                AsyncStorage.setItem('FILTER_TYPE','');
                setFirstName('');
                setLastName('');
                setEmail('');
                setPass('');
                setPassConf('');
                setAllow(false);
                if(gender=="Male"){
                    AsyncStorage.setItem('IMAGE', 'https://i.ibb.co/CJGmnGg/default.png');
                }
                else{
                    AsyncStorage.setItem('IMAGE', 'https://i.ibb.co/CJGmnGg/default.png');
                }
                
                AsyncStorage.getItem('EMAIL').then((Email)=>{
                    Alert.alert("Sign Up Successfully !", "Your account is successfully created by Email Id: \n"+Email,
                        [
                            {
                                text: "Stay on Sign-Up Page",
                                onPress: () => { },
                                style: "cancel"
                            },
                            {
                                
                            },
                            { 
                                text: "Log In",
                                onPress: () => navigation.navigate('LoginActivity'),
                                style:"destructive"
                            }
                        ],
                        { cancelable: false }
                    )
                })
            }
            else{
                // alert("Not Allow: "+allow);
                Alert.alert("Terms & Condition", "Accept terms and conditions to signup.",
                    [
                        {
                            text: "Read Rules",
                            onPress: () => navigation.navigate('TermsConditionActivity'),
                            style:"default"
                        },
                        {
                            text: "Cancel",
                            onPress: () => { },
                            style: "cancel"
                        },
                        { 
                            text: "Agree",
                             onPress: () => { setAllow(true) },
                             style:"destructive"
                        }
                    ],
                    { cancelable: false }
                );
            }
            
            
        }
    }

    return(
        <View style={styles.container} onTouchStart={ () => keyboardDismiss() }>
            <ScrollView style={styles.scrollContainer} >
                <View style={styles.subContainer} >
                    <Headline style={styles.heading}>SignUp</Headline>
                    <Text style={styles.headingText}>Please fill in this form to create an account!</Text>
                    <Divider style={styles.headingDivider}/>
                </View>
                <View style={styles.textInputView}>
                    <View style={styles.textInputField}>
                        <TextInput
                            autoCompleteType="name"
                            label="First Name"
                            mode="outlined"
                            placeholder="First Name"
                            blurOnSubmit={true}
                            autoCapitalize='words'
                            // autoFocus
                            error={isErrorFirstName}
                            value={firstName}
                            onChangeText={ (text) => { setFirstName(text); validateFirstName(text); } }
                            left={ <TextInput.Icon name="account" color={"darkblue"} disabled={true} />}
                        />
                        <HelperText type="error" visible={errorFirstName}>{errorFirstNameText}</HelperText>
                    </View>
                    <View style={styles.textInputField}>
                        <TextInput
                            autoCompleteType="name"
                            label="Last Name"
                            mode="outlined"
                            placeholder="Last Name"
                            blurOnSubmit={true}
                            autoCapitalize='words'
                            // autoFocus
                            error={isErrorLastName}
                            value={lastName}
                            onChangeText={ (text) => { setLastName(text); validateLastName(text); } }
                            left={ <TextInput.Icon name="account" color={"darkblue"} disabled={true} />}
                        />
                        <HelperText type="error" visible={errorLastName}>{errorLastNameText}</HelperText>
                    </View>
                    <View style={styles.textInputFieldRadio}>
                        <View style={styles.textInputFieldRadioButtonView}>
                            <RadioButton style={styles.textInputFieldRadioButton}
                                value="first"
                                status={ gender === 'Male' ? 'checked' : 'unchecked' }
                                color="black"
                                uncheckedColor="gray"
                                onPress={() => setGender('Male')}
                            />
                            <Text style={styles.textInputFieldRadioButtonText}>Male</Text>
                        </View>
                        <View style={styles.textInputFieldRadioButtonView}>
                            <RadioButton style={styles.textInputFieldRadioButton}
                                value="second"
                                status={ gender === 'Female' ? 'checked' : 'unchecked' }
                                color="black"
                                uncheckedColor="gray"
                                onPress={() => setGender('Female')}
                            />
                            <Text style={styles.textInputFieldRadioButtonText}>Female</Text>
                        </View>
                    </View>
                    <View style={styles.textInputField}>
                        <TextInput
                            autoCompleteType="email"
                            label="Email ID"
                            mode="outlined"
                            placeholder="Email Id"
                            blurOnSubmit={true}
                            autoCapitalize='none'
                            keyboardType="email-address"
                            // autoFocus
                            error={isErrorEmail}
                            value={email}
                            onChangeText={ (text) => { setEmail(text); validateEmail(text); } }
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
                                value={pass}
                                error={isErrorPass}
                                onChangeText={ (text) => { setPass(text); validatePassword(text); } }
                                left={ <TextInput.Icon name="key-variant" color={"darkblue"} disabled={true} />}
                                right={ <TextInput.Icon name={passIcon} color={"darkblue"} disabled={false} onPress={ () => changePassIcon(passIcon) } />}
                            />
                            <HelperText type="error" visible={errorPass}>{errorPassText}</HelperText>
                    </View>
                    <View style={styles.textInputField}>
                        <TextInput
                                autoCompleteType="password"
                                label="Confirm Password"
                                mode="outlined"
                                placeholder="Confirm Password"
                                blurOnSubmit={true}
                                secureTextEntry={passConfHide}
                                autoCorrect={false}
                                textContentType={'password'}
                                multiline={false}
                                value={passConf}
                                error={isErrorPassConf}
                                onTextInput={ () => { passwordChecker(pass,passConf); validatePasswordConf(passConf); }}
                                onChangeText={ (text) => { setPassConf(text); validatePasswordConf(passConf); } }
                                left={ <TextInput.Icon name="key-variant" color={"darkblue"} disabled={true} />}
                                right={ <TextInput.Icon name={passConfIcon} color={"darkblue"} disabled={false} onPress={ () => changePassConfIcon(passConfIcon) } />}
                            />
                            <HelperText type={passConfType} visible={errorPassConf}>{errorPassConfText}</HelperText>
                    </View>
                    <View style={styles.terms}>
                        <CheckBox
                            value={allow}
                            onValueChange={setAllow}
                        />
                        <Text>I read agree to&nbsp;</Text>
                        <Text style={styles.termsText} onTouchStart={ () => navigation.navigate('TermsConditionActivity') }>Terms &amp; Conditions.</Text>
                    </View>
                    <View style={styles.submitButton} >
                        <Button 
                            style={styles.signupButton}
                            icon="login"
                            mode="contained"
                            onPress={ () => signup(firstName,lastName,gender,email,pass,passConf) }
                            >
                            SIGNUP
                        </Button>
                    </View>
                    <View style={styles.newAccount}>
                        <Text style={styles.loginText} onPress={ () => navigation.navigate('LoginActivity') }>Already have an account! Login</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
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
        alignSelf:'center',
    },
    heading: {
      color: "black",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
      padding:25,
      paddingBottom:5,
      color:'mediumblue',
    },
    headingText:{
        color:'gray',
    },
    textInputView:{
        flex:1,
        padding:30,
    },
    headingDivider:{
        backgroundColor:'gray',
        height:1,
    },
    textInputField:{
        marginBottom:5,
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
    terms:{
        flex:1,
        flexDirection:'row'
    },
    termsText:{
        fontWeight:'bold',
        color:'navy',
    },
    submitButton:{
        marginTop:45,
        alignSelf:'center',
    },
    signupButton:{
        borderRadius:10,
        fontWeight:'bold'
    },
    newAccount:{
        alignSelf:'center',
        paddingTop:10,
    },
    loginText:{
        borderRadius:15,
        fontWeight:'bold',
        color:'mediumblue'
    },
  });
export default SignupActivity;