import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, ToastAndroid, BackHandler, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Headline, TextInput, Button, Text, HelperText, Divider, RadioButton, Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfileActivity = ({navigation}) => {
    const [] = useState('');
    useEffect(() => {
        const unsubscriber = navigation.addListener('focus', () => {
            AsyncStorage.multiGet([ 'FIRST_NAME', 'LAST_NAME', 'GENDER', 'EMAIL', 'IMAGE' ])
            .then( response  => {
                setFirstName(response[0][1]);
                setLastName(response[1][1]);
                setGender(response[2][1]);
                setEmail(response[3][1]);
                setImage(response[4][1]);
            })
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscriber;
    }, [navigation]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');

    const [image, setImage] = useState('https://i.ibb.co/CJGmnGg/default.png');

    const [isErrorFirstName, setIsErrorFirstName] = useState(false);
    const [isErrorLastName, setIsErrorLastName] = useState(false);
    const [isErrorEmail, setIsErrorEmail] = useState(false);

    const [errorFirstName, setErrorFirstName] = useState(false);
    const [errorLastName, setErrorLastName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    const [errorFirstNameText, setErrorFirstNameText] = useState('');
    const [errorLastNameText, setErrorLastNameText] = useState('');
    const [errorEmailText, setErrorEmailText] = useState('');
    
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
  const emailNotice = () => {
    alert("Email updation also reflect on login process.");   
  }
  const updateData = (firstName, lastName, gender, email) => {
    if( validateFirstName(firstName) && validateLastName(lastName) && validateEmail(email) ){
      AsyncStorage.setItem('FIRST_NAME', firstName);
      AsyncStorage.setItem('LAST_NAME', lastName);
      AsyncStorage.setItem('GENDER', gender);
      AsyncStorage.setItem('EMAIL', email);
      navigation.replace('ProfileActivity');
      ToastAndroid.show("Profile Updated.", ToastAndroid.LONG);
    }
  }

    return(
        <View style={styles.mainContainer} onTouchStart={ () => keyboardDismiss() }>
            <ScrollView style={styles.container}>
              <Divider style={styles.headingDivider}></Divider>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.imageEditView}>
                      <Icon name="check" size={30} color="#fff" style={styles.imageEdit} 
                          onPress={ () => updateData(firstName, lastName, gender, email ) }/>
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
                            left={ <TextInput.Icon name="account-key" color={"darkblue"} disabled={true} />}
                        />
                        <HelperText type="error" visible={errorFirstName}>{errorFirstNameText}</HelperText>
                    </View>
                    <View style={styles.baseContainerView}>
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
                            left={ <TextInput.Icon name="account-key" color={"darkblue"} disabled={true} />}
                        />
                        <HelperText type="error" visible={errorLastName}>{errorLastNameText}</HelperText>
                    </View>
                    <View style={styles.baseContainerRadioView}>
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
                    <View style={styles.baseContainerView}>
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
                            onFocus={ () => emailNotice() }
                            onChangeText={ (text) => { setEmail(text); validateEmail(text); } }
                            left={ <TextInput.Icon name="account-key" color={"darkblue"} disabled={true} />}
                        />
                        <HelperText type="error" visible={errorEmail}>{errorEmailText}</HelperText>
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
});
export default EditProfileActivity;