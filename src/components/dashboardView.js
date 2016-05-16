'use strict'

import React, { Component } from 'react';
import {
	View,
  	Text,
  	StyleSheet,
  	ListView,
  	Image,
  	TouchableHighlight
} from 'react-native'

// var crypto = require('crypto-js');

const comicDetail = require('./comicDetailView');
// const REQUEST_URL = "http://gateway.marvel.com:80/v1/public/characters";
const REQUEST_URL = "https://www.tablerig.com/tables/calpaterson/pokemon-with-images";

class dashboardView extends Component {

  constructor(props){
    super(props)
    // this.timestamp = 1;
    // this.public_key = 'db79a62318174b343878889924cb9da4';
    // this.private_key = 'd7b1c4c1de5de2bc560f447dea98abbc3e69621f';
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      loaded: false
    }
    this.renderPokemon  = this.renderPokemon.bind(this);
  }

  componentDidMount(){
    this.fetchData();
  }

  fetchData(){
  	// var hash = crypto.MD5(this.timestamp+this.private_key+this.public_key);
    // fetch(REQUEST_URL+'?ts='+this.timestamp+'&apikey='+this.public_key+'&hash='+hash)
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        // dataSource: this.state.dataSource.cloneWithRows(responseData.data.results),
        dataSource: this.state.dataSource.cloneWithRows(responseData.body),
        loaded: true,
      });
    })
    .done();
  }

  renderLoadingView(){
    return(
      <View style={styles.container}>
        <Text style={styles.cargando}>Loading pokemons...</Text>
      </View>
    )
  }


  renderPokemon(pokemon){
    return(
      <TouchableHighlight onPress={() => this.onPokemonPressed(pokemon)}>
        <Image source={{uri: pokemon['image-url']}} style={styles.backgroundImage}>
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{pokemon['pokemon-name']}</Text>
            <Text style={styles.available}>{pokemon['national-pokedex-number']}</Text>
          </View>
        </Image>
      </TouchableHighlight>
    )
  }


  render(){
      if(!this.state.loaded){
        return this.renderLoadingView();
      }

      return(
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPokemon.bind(this)}
          style={styles.listview}/>
      )
  }

  onPokemonPressed(pokemon){
      this.props.navigator.push({
          name: 'Details',
          title: pokemon['pokemon-name'],
          passProps: {pokemon: pokemon},
      });
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  backgroundImage:{
    justifyContent: 'center',
     alignItems: 'center',
     alignSelf: 'stretch',
     height:150,
  },
  rightContainer: {
    backgroundColor:'rgba(52,52,52,0.5)',
    alignSelf: 'stretch',
    paddingTop:30,
    height: 150,

  },
  title: {
    fontSize: 27,
    marginBottom: 8,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor: 'rgba(52,52,52,0)',
  },
  available: {
    fontSize:18,
    textAlign: 'center',
    color: '#FFFFFF',
    backgroundColor:'rgba(52,52,52,0)',
  },
  listView: {
    paddingTop: 64,
    marginBottom: 49,

  },
  cargando:{
    marginTop: 40,
    paddingBottom: 20
  }
});

module.exports = dashboardView;