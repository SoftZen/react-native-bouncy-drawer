import React, { Component } from 'react'
import {
    Animated,
    Dimensions,
    TouchableOpacity,
    Platform,
    Text
} from 'react-native'
import View from 'react-native-view'
import PropTypes from 'prop-types';
import MAIcon from 'react-native-vector-icons/MaterialIcons'
const { width, height } = Dimensions.get('window')

const HEADER_HEIGHT = Platform.select({
    ios: 60,
    android: 50
})

export default class Header extends Component {

    state = {
        open: false
    }

    componentWillMount() {
        this.rotation = new Animated.Value(-90)
    }

    onToggle = () => {
        const { open } = this.state
        if (!open) {
            this.setState(() => ({ open: true }), () => {
                this.props.willOpen()
                this.open()
            })
        } else {
            this.props.willClose()
            this.close()
        }
    }

    open = () => {
        const { openFriction, openTension, openSpeed, openBounciness } = this.props
        const rotationAnimation = Animated.spring(this.rotation, {
            toValue: 0,
            useNativeDriver: true,
            friction: openFriction,
            tension: openTension,
            speed: openSpeed,
            bounciness: openBounciness
        })
        rotationAnimation.start(() => this.props.didOpen())
    }

    close = () => {
        const { closeFriction, closeTension, closeSpeed, closeBounciness } = this.props
        const rotationAnimation = Animated.spring(this.rotation, {
            toValue: -90,
            useNativeDriver: true,
            friction: closeFriction,
            tension: closeTension,
            speed: closeSpeed,
            bounciness: closeBounciness
        })
        rotationAnimation.start(() => {
            this.setState(() => ({ open: false }), () => {
                this.props.didClose()
            })
        })
    }

    render() {
        const { open } = this.state
        const { headerHeight, openButtonStyle, closeButtonStyle, openedHeaderStyle, closedHeaderStyle,
            openedHeaderContent, defaultOpenButtonIconColor, defaultCloseButtonIconColor, title,
            titleStyle, defaultOpenButtonIconSize, defaultCloseButtonIconSize } = this.props
        const rotation = this.rotation.interpolate({
            inputRange: [-90, 0],
            outputRange: ['-90deg', '0deg']
        })
        const paddingTop = this.rotation.interpolate({
            inputRange: [-90, 0],
            outputRange: [-height, -height - headerHeight / 2]
        })
        const paddingLeft = this.rotation.interpolate({
            inputRange: [-90, 0],
            outputRange: [-width - headerHeight / 2, -width - headerHeight]
        })

        const openButtonContent = <MAIcon name="menu" size={defaultOpenButtonIconSize} color={defaultOpenButtonIconColor} />
        const closeButtonContent = <MAIcon name="close" size={defaultCloseButtonIconSize} color={defaultCloseButtonIconColor} />
        const openButton = (
            <View style={{ ...openButtonStyle, position: 'absolute', left: 8, top: 14, transform: [{ rotate: '90deg' }] }}>
                <TouchableOpacity onPress={this.onToggle}>
                    {this.props.openButtonContent || openButtonContent}
                </TouchableOpacity>
            </View>
        )
        const closeButton = (
            <TouchableOpacity onPress={this.onToggle} style={{ ...closeButtonStyle, marginLeft: 12, marginTop: Platform.OS == 'ios' ? 28 : 18 }}>
                {this.props.closeButtonContent || closeButtonContent}
            </TouchableOpacity>
        )
        const titleComponent = title ? (
            <View style={{ transform: [{ rotate: '90deg' }] }}>
                <Text style={{ fontSize: 18, color: '#000', ...titleStyle, width: width + headerHeight / 2, textAlign: 'center', marginTop: Platform.OS == 'ios' ? 15 : 5 }}>{title}</Text>
            </View>
        ) : null
        return (
            <Animated.View style={{ position: 'absolute', top: 0, left: 0, maxHeight: open ? height : headerHeight + 5, overflow: 'hidden' }}>
                <Animated.View style={{ height: height * 2 + headerHeight, width: width * 2 + headerHeight, transform: [{ translateY: paddingTop }, { translateX: paddingLeft }, { rotate: rotation }] }}>
                    <View style={{ flex: 1 }} />
                    <View row style={{ flex: 1 }}>
                        <View style={{ flex: 1 }} />
                        <View style={{ width: headerHeight }}>
                            <View style={{ ...styles.header, ...styles.closedHeader, ...closedHeaderStyle, flex: 1, height: width }}>
                                {titleComponent}
                                {openButton}
                            </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: "#fff" }}>
                            <View row style={{ height: headerHeight, ...openedHeaderStyle }}>
                                {closeButton}
                                {openedHeaderContent}
                            </View>
                            <View style={{ flex: 1 }}>
                                {this.props.renderContent ? this.props.renderContent() : null}
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
        )
    }
}

const styles = {
    closedHeader: {
        shadowOpacity: 0.21,
        shadowOpacity: 1,
        shadowRadius: 2,
        shadowOffset: { height: 0, width: 0 },
        elevation: 3,
        backgroundColor: '#fff',
    },
}

Header.propTypes = {
    headerHeight: PropTypes.number,
    renderContent: PropTypes.func,
    openButtonContent: PropTypes.element,
    closeButtonContent: PropTypes.element,
    openButtonStyle: PropTypes.object,
    closeButtonStyle: PropTypes.object,
    openedHeaderStyle: PropTypes.object,
    closedHeaderStyle: PropTypes.object,
    openedHeaderContent: PropTypes.element,
    defaultOpenButtonIconColor: PropTypes.string,
    defaultCloseButtonIconColor: PropTypes.string,
    defaultOpenButtonIconSize: PropTypes.number,
    defaultCloseButtonIconSize: PropTypes.number,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    openFriction: PropTypes.number,
    openTension: PropTypes.number,
    openSpeed: PropTypes.number,
    openBounciness: PropTypes.number,
    closeFriction: PropTypes.number,
    closeTension: PropTypes.number,
    closeSpeed: PropTypes.number,
    closeBounciness: PropTypes.number,
};

Header.defaultProps = {
    headerHeight: HEADER_HEIGHT,
    renderContent: () => null,
    openButtonStyle: {},
    closeButtonStyle: {},
    defaultOpenButtonIconColor: "#373737",
    defaultCloseButtonIconColor: "#000",
    defaultOpenButtonIconSize: 26,
    defaultCloseButtonIconSize: 30,
}