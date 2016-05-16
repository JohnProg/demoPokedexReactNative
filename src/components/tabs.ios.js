'use strict'

import React, { Component } from 'react';
import {
	TabBarIOS,
	View,
	Text,
	StyleSheet
} from 'react-native'

const iconDashBoard = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACNElEQVRYR+3WT6sSURgG8OeciBb9IbhEOpOIRLRWiTZFtLyGG6HBhYuBWRghYl+jIFCYhZsBBRFkkBDkfoEoWkzroDaSjhAIUcsc3ziQMY125jYzYIvrVuc8P99533MOw4E/7MD5OAP8/xVotVo9AFeS6BUietNut1/41wqtQLPZ/ALgWhIAAHan03ksBTQajZznede3P+KcnwC4mhTANE05oF6vmwBUAEtfKGeMcSK6CeBhDIzd7XblAMMwTCIaWpb1OhhkGEYVwDAqgIhsy7LkAF3Xzc1mM+z3+zsAXderAhcVIHqg1+vJAbVa7SURaQB+iCDG2EUi2jbrBQCX4wAGg4EcEFxc07TPAG7ECPU/ao9Go38DVCqVRAHj8VgOKJfLGmPsvo+tA7iUVAUmk4kcUCqVxBS845y/D4YS0TGA51ExjDF7Op3KAYVCwWSMDR3H2ZmCfD5fFd/FATiOIwfkcjmxEX0loo97gu4CeBIVIPaB2WwmB2Sz2UeMsTvbECJ6ltRhJPaBUEDw32UymcSmQFRgPp/LK1AsFs+vVqtzW8h6vf7062yIWvk/9oFQgKqqogkfAPi+J/EIwK0YkvAKCIDY713X3ZkCRVFiTYHogcViIX8FiqKIKfgrIO5puFwuTwW4B+DbnlKLm9HtqK9ANGEoQFXVI8/zfp94nPO3AFJRQ/3PnQoQDEqn04mNoeiB0AoEAalU6innPJFbMYAPruu+8meE3oqTKL1sjTPAwSvwE1ZM1iGqYnIlAAAAAElFTkSuQmCC'
const iconHeroes = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACSUlEQVRYR+2WMYjTUBjH/6+PEhHqpI1pQ4lQnAQnuc1FsVAoyIkWhCIidLBDew5OgtkVa6mDtloEBcGgFjs5nSLcVvBwcWusNs3g0EWrts0n7+hBFe4uaRNvuW9M3vt+v3zvfR9h2OVgu8zHnsBeBQKtQLFYTA2Hw/e1Wu3HVpc9EAFd1/cNBoO7RPSqUqm82a7TfBcolUraZDIxAKxVq9XiTm3uq0ChUEgDeEJEfUmSTpTL5eF/EdB1PdTv928S0Q0AYyJaqtfrH3aCi/cLVyCfzx8cjUZPAaQ2EjJ2vdFo3HIDX1ggl8stEdFzAIkp8G0ymTyl67oTuEA2m70K4A4AaQobOI5z3DCMrlv4XBXIZDL7Oef3GWO5WRARXWw2m8+8wD0LpNPpo5zzFwCO/QP6AuBMq9X6FJhAKpU6zRgT8ANbQAjAOwAPIpHIS8MwfruR8dIFIU3TTjLGzgNYBnB4KxEiWjFNs+K3wGw+rmlahohERUIzL74T0eVutysmoavwUoG/EiYSiccALs08NDnnZzudzror8nTRXAKqqoojEF+/GauO41ywLOubF7jnLhAbotGoHA6HPwI4tJGAsXuyLF9rt9sjr/C5BOLx+GsAGQC/iKhgWdajecCbezwdQSwWuwLgIQAbwDnLstYWgXuqgCzLRzjn64wxMWyWe73e10XhXgRCiqKsAvgsSVLeNM2ffsBdCyiKskJE3Lbt236BXd8BVVXj4/E4adu2GLO+h5tLKNaIOR9IuBEIBOz6CAKl+/FPuKjgHywAtyG9W2tYAAAAAElFTkSuQmCC'

const Dashboard = require('./dashboardView');
const Heroes = require('./heroesView');

class Tabs extends React.Component {

	constructor(props){
		super (props)

		this.state = {
			selectedTab: 'dashboard',
			notifCount: 0,
      		presses: 0,
		}
	}

	_renderContent(color: string, pageText: string, num?: number) {
	    return (
	      <View style={[styles.tabContent, {backgroundColor: color}]}>
	        <Text style={styles.tabText}>{pageText}</Text>
	        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
	      </View>
	    );
	  }
	render() {
		return (
			<TabBarIOS 
				style={{backgroundColor: '#FFFFFF'}}
				tintColor="white"
        		barTintColor="darkslateblue">
				
				<TabBarIOS.Item 
					title='DashBoard'
					selected={this.state.selectedTab === 'dashboard'}
					icon={{ uri: iconDashBoard}}
					onPress={() => {
						this.setState({
							selectedTab: 'dashboard'
						})
					}}>
					<Dashboard navigator={this.props.navigator}/>
				</TabBarIOS.Item>

				<TabBarIOS.Item 
					title='Heroes'
          			badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
					selected={this.state.selectedTab === 'heroes'}
					icon={{ uri: iconHeroes}}
					onPress={() => {
						this.setState({
							selectedTab: 'heroes',
							notifCount: this.state.notifCount + 1,
						})
					}}>
					{this._renderContent('#783E33', 'Red Tab', this.state.notifCount)}
				</TabBarIOS.Item>

			</TabBarIOS>
		)
	}
}

var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
});

module.exports = Tabs

