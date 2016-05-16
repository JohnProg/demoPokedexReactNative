'use strict'

import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

class heroesView extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Soy el Component heroesView!</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
	    flex: 1,
	    alignItems: 'center'
	},
	title: {
		marginTop: 100,
		fontSize: 20
	}
})

module.exports = heroesView;