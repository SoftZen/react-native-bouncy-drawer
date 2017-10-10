import React, { Component } from 'react';
import {
  Text,
} from 'react-native'
import View from 'react-native-view'
import Header from 'react-native-bouncy-drawer'
import MAIcon from 'react-native-vector-icons/MaterialIcons'

export default class App extends Component {

  renderItem = (text, color, iconName) => (
    <View smp row vcenter>
      <View lgpr>
        <MAIcon name={iconName} color={color} size={26}/>
      </View>
      <Text style={{ fontSize: 16, color, fontWeight: '600' }}>{text}</Text>
    </View>
  )

  renderContent = () => (
    <View flex hcenter mdpr style={{ backgroundColor: '#3F3C4C' }}>
      <View flex>
        <View style={{ flex: 1 }} />
        {this.renderItem("PROFILE", "#fff", "person-outline")}
        {this.renderItem("FRIENDS", "#fff", "people-outline")}
        {this.renderItem("ACTIVITY", "#2FCACE", "public")}
        <View mdp/>
        {this.renderItem("SETTINGS", "#fff", "settings")}
        <View style={{ flex: 3 }} />
      </View>
    </View>
  )


  render() {
    return (
      <View flex>
        <Header
          willOpen={() => console.log('will open')}
          didOpen={() => console.log('did open')}
          willClose={() => console.log('will close')}
          didClose={() => console.log('did close')}
          title="Activity"
          titleStyle={{ color: '#fff', fontFamily: 'Helvetica Neue', fontSize: 20, marginLeft: -3 }}
          closedHeaderStyle={{ backgroundColor: '#3F3C4C' }}
          defaultOpenButtonIconColor="#fff"
          defaultCloseButtonIconColor="#fff"
          renderContent={this.renderContent}
          openedHeaderStyle={{ backgroundColor: '#3F3C4C' }}
        />
      </View>
    );
  }
}
