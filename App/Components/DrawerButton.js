import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import styles from './Styles/DrawerButtonStyles'

class DrawerButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func
  }

  render() {
    const { onPress, text } = this.props
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

export default DrawerButton
