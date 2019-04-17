import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundedButtonStyles'
import { addComponentExample } from '../Services/ExamplesRegistry'

// Note that this file (App/Components/RoundedButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
addComponentExample('Rounded Button', () => (
  <RoundedButton
    text="real buttons have curves"
    onPress={() => console.tron.log('Rounded Button Pressed!')}
  />
))

export default class RoundedButton extends Component {
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
