import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundedButtonStyles'

class RoundedButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    children: PropTypes.string
  }

  getText = () => {
    const { text, children } = this.props
    const buttonText = text || children || ''
    return buttonText.toUpperCase()
  }

  render() {
    const { onPress } = this.props
    return (
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}

export default RoundedButton
