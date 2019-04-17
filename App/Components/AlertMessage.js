import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import styles from './Styles/AlertMessageStyles'

export default class AlertMessage extends Component {
  static defaultProps = { show: true }

  static propTypes = {
    title: PropTypes.string,
    style: PropTypes.object,
    show: PropTypes.bool
  }

  render() {
    const { title, show, style } = this.props
    const messageComponent = null
    if (show) {
      return (
        <View style={[styles.container, style]}>
          <View style={styles.contentContainer}>
            <Text allowFontScaling={false} style={styles.message}>
              {title && title.toUpperCase()}
            </Text>
          </View>
        </View>
      )
    }

    return messageComponent
  }
}
