//The MIT License (MIT)
//
//Copyright (c) 2020 INTUZ
//
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import React, { Component } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeViewController from "./app/routes/HomeViewController";
import LoginViewController from "./app/routes/LoginViewController";

const AuthNavigator =
  createStackNavigator({
    Login: LoginViewController,
    Home: HomeViewController,
  })

const AppNavigator =
  createStackNavigator({
    Home: HomeViewController,
    Login: LoginViewController,
  })

const AuthContainer = createAppContainer(AuthNavigator)
const AppContainer = createAppContainer(AppNavigator)

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userInfo: null,
    }
  }

  componentDidMount() {
    this.checkOnBoarding()
  }

  async checkOnBoarding() {
    try {
      const value = await AsyncStorage.getItem('userInfo')
      if (value !== null) {
        this.setState({
          userInfo: value
        })
      }
    } catch (e) {
      // error reading value
    }
  }

  render() {
    if (this.state.userInfo != null) {
      return (
        <AppContainer />
      );
    } else {
      return (
        <AuthContainer />
      );
    }
  }
};

export default App;