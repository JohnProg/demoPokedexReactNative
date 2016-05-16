'use strict'

import React, { Component } from 'react';
import {
	TouchableHighlight,
	View,
	Text,
	Image,
	Alert,
	StyleSheet
} from 'react-native'

class loginView extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
		initialPosition: 'unknown',
      	lastPosition: 'unknown',
   	}
  }
  
  watchID: null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
        console.log(position.coords)
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition(
    	(position) => {
      		var lastPosition = JSON.stringify(position);
			this.setState({lastPosition});
			console.log(position.coords)
	    },
	    (error) => console.log(error.message)
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render () {
    return (
  		<Image source={{uri: 'https://images.unsplash.com/photo-1453781382334-20f5dfb0fb2e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=3862a51c3bdbbf8ca7790d0e7ca9a2e4'}} style={styles.container}>
	        <View>
	      		<Text style={styles.title}>MARVEL COMICS</Text>
				<TouchableHighlight onPress={(this._onLogin.bind(this))} style={styles.btn}>
					<Text style={styles.txtBtn}>Login</Text>
				</TouchableHighlight>
	      		<Text>
					<Text style={styles.title2}>Initial position: </Text>
		          	{this.state.initialPosition}
	        	</Text>
		        <Text>
		          	<Text style={styles.title2}>Current position: </Text>
		          	{this.state.lastPosition}
		        </Text>
	        </View>
      </Image>
    )
  }

  _onLogin () {
    Alert.alert(
      'Acceso',
      'Te has logeado',
      [
        {
          text: 'Aceptar',
          onPress: (this._accept.bind(this))
        },
        {
          text: 'Cancelar',
          onPress: (this._cancel.bind(this))
        }
      ]
    )
  }

  _accept () {
    this.props.navigator.replace ({
      title: 'Dashboard',
      name: 'Dashboard',
      passProps: {}
    })
  }

  _cancel () {
    console.log('Login cancelado')
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30
  },
  btn: {
    width: 300,
    height: 40,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'center'
  },
  txtBtn: {
    color: 'white'
  },
  title: {
    fontSize: 40,
    color: 'white',
    marginTop: 100,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title2: {
    fontWeight: '500',
  }
})

module.exports = loginView