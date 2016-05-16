'use strict'

import React, { Component } from 'react';
import {
	View,
  	Text,
	StyleSheet,
  	Image
} from 'react-native'


class comicDetailView extends Component {
  constructor(props) {
      super(props);
      this.passProps= this.props.route.passProps;
      // this.modified = this.passProps.comic.modified.slice(0, 10);
  }

  render() {
    return (
      <View style={styles.container}>

        <Image
          source={{uri: this.passProps.pokemon['image-url']}}
          style={styles.image} />
  		<Text
        	style={styles.title}>{this.passProps.pokemon['pokemon-name']}</Text>
        <Text
        	style={styles.description}>{this.passProps.pokemon['pokemon-name']}</Text>
		<Text
            style={styles.description}>Available:{this.passProps.pokemon['national-pokedex-number']}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 63,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  title:{
    fontSize:23,
    color: '#007AFF',
    padding: 20
  },
  description:{
    marginTop:10,
    fontSize: 16,
    padding: 20
  },
  modified:{
    marginTop: 10,
    fontSize:16,
    color: '#007AFF',
  },
  image: {
    alignSelf: 'stretch',
    height: 300,
  },
});

module.exports = comicDetailView;