import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginActivity from './screens/LoginActivity';
import SplashActivity from './screens/SplashActivity';
import SignupActivity from './screens/SignupActivity';
import TermsConditionActivity from './screens/TermsConditionActivity';
import ProfileActivity from './screens/ProfileActivity';
import EditImageActivity from './screens/EditImageActivity';
import EditProfileActivity from './screens/EditProfileActivity';
import EditPasswordActivity from './screens/EditPasswordActivity';

const Stack = createStackNavigator();  
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="SplashActivity" component={SplashActivity} />
        <Stack.Screen options={{ headerShown: false }} name="LoginActivity" component={LoginActivity} />
        <Stack.Screen options={{ headerShown: false }} name="SignupActivity" component={SignupActivity} />
        <Stack.Screen options={{ title: 'Terms & Condition' }} name="TermsConditionActivity" component={TermsConditionActivity} />
        <Stack.Screen options={
          {
            title: 'Profile Dashboard', 
            headerStyle:{backgroundColor:'#0c1b32'},
            headerLeft: null,
            headerTintColor:"#fff",
          }
          } name="ProfileActivity" component={ProfileActivity} 
        />
        <Stack.Screen options={
          {
            title: 'Edit Profile', 
            headerStyle:{backgroundColor:'#0c1b32'},
            headerTintColor:"#fff",
          }
          } name="EditImageActivity" component={EditImageActivity} 
        />
        <Stack.Screen options={
          {
            title: 'Edit Profile', 
            headerStyle:{backgroundColor:'#0c1b32'},
            headerTintColor:"#fff",
          }
          } name="EditProfileActivity" component={EditProfileActivity} 
        />
        <Stack.Screen options={
          {
            title: 'Edit Password', 
            headerStyle:{backgroundColor:'#0c1b32'},
            headerTintColor:"#fff",
          }
          } name="EditPasswordActivity" component={EditPasswordActivity} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;