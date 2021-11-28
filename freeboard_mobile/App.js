/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {WebView} from 'react-native-webview';
import {Button, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

GoogleSignin.configure({
  webClientId:
    '917648282533-8ug5cqvv8pmfifg4b5qhhi2lqru5uner.apps.googleusercontent.com',
});

const App: () => Node = () => {
  // fetch('https://koreanjson.com/posts/1')

  const aaa = async () => {
    try {
      const usersCollection = await firestore()
        .collection('Users')
        .add({name: '철수', age: 8, school: '다람쥐초등학교'});
      console.log(usersCollection);
    } catch (error) {
      console.log(error);
    }
  };

  const bbb = async () => {
    try {
      const users = await firestore().collection('Users').get();
      console.log(users.docs.forEach(el => console.log(el.data())));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button title="가져오기" onPress={bbb} />
    // <Button title="보내기" onPress={aaa}/>
    // <Button title="소셜로그인123" onPress={async () => {
    //   try {
    //     const {idToken} = await GoogleSignin.signIn()
    //     console.log(idToken)
    //   } catch(error){
    //     console.log(error)
    //   }
    // }}/>
  );
};

export default App;
