/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

var NavigatorBarRouteMapper = {
  LeftButton: function (route, navigator, index) {
    if (index == 0) {
      return null;
    }
    return (
      <TouchableHighlight onPress={() => {
        if (index > 0) {
          navigator.pop();
        }
      }}>
        <Text style={{marginTop: 10, marginLeft: 20, color: '#007AFF'}}> Back</Text>
      </TouchableHighlight>
    )
  },
  RightButton: function (route, navigator, index) {
    return null;
  },
  Title: function (route, navigator, index) {
    if (route.name == 'Login') {
      return null;
    }
    return (
      <Text style={{marginTop: 10, color: '#007AFF'}}> { route.name }</Text>
    )
  }
}

const Login = require('./src/components/loginView');
const Dashboard = require('./src/components/dashboardView');
const Details = require('./src/components/comicDetailView');

class App1 extends Component {

  renderScene (route, navigator){
    switch (route.name) {
      case 'Login':
        return(
          <Login navigator={navigator} route={route}/>
        );
      case 'Dashboard':
        return(
          <Dashboard navigator={navigator} route={route}/>
        );
      case 'Details':
      return(
          <Details {...route.props} navigator={navigator} route={route} />
        );
    }
  }

  render() {
    return (
      <Navigator style={{backgroundColor: '#FFFFFF'}}
        initialRoute={{name:'Login'}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if(route.sceneConfig){
            return route.sceneConfig
          }
          return Navigator.SceneConfigs.FloatFromRight
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigatorBarRouteMapper}/>
        }/>
    )
  }
}

AppRegistry.registerComponent('App1', () => App1);
