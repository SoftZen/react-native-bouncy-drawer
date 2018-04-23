# react-native-bouncy-drawer
Customizable bouncy drawer for React Native

![alt text](https://github.com/SoftZen/react-native-bouncy-drawer/blob/master/resources/example.gif?raw=true "example drawer")

Installation
---
```javascript
$ npm install react-native-bouncy-drawer --save
```
then
```javascript
import BouncyDrawer from 'react-native-bouncy-drawer'
/*...*/
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
<BouncyDrawer
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
```
Refer to the Example


## Available props:

| prop | type | description |default|
| ------ | ------ | ------ | ------ |
|headerHeight | number |Height of the header|ios: 60, android: 50|
|renderContent|funtion|Content of the drawer|
|openButtonContent|React element|Custom button for opening the drawer|
|closeButtonContent|React element|Custom button for closing the drawer|
|openButtonStyle|object|Style for the button opening the drawer|
|closeButtonStyle|object|Style for the button closing the drawer|
|openedHeaderStyle|object|Style for the header inside the drawer|
|closedHeaderStyle|object|Style for the header when the drawer closed|
|openedHeaderContent|React element|Custom header inside the drawer|
|defaultOpenButtonIconColor|string|Hamburger color|#373737|
|defaultCloseButtonIconColor|string|Close icon color|#000|
|defaultOpenButtonIconSize|number|Hamburger size|26|
|defaultCloseButtonIconSize|number|Close icon size|30|
|title|string|Header title when the drawer is closed|
|titleStyle|object|Header title style when the drawer is closed|
|openFriction|number|Friction to open animation|
|openTension|number|Tension to open animation|
|openSpeed|number|Speed to open animation|
|openBounciness|number|Bounciness to open animation|
|closeFriction|number|Friction to close animation|
|closeTension|number|Tension to close animation|
|closeSpeed|number|Speed to close animation|
|closeBounciness|number|Bounciness to close animation|
|openButtonPosition|('left',right)|Position of the open button|'left'|
|closeButtonPosition|('left',right)|Position of the close button|'left'|


License
----

MIT
