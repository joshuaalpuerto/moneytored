import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'
import { addComponentExample } from '../Services/ExamplesRegistry'

// Note that this file (App/Components/FullButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
addComponentExample('Full Button', () => (
  <FullButton
    text="Hey there"
    onPress={() => console.tron.log('Full Button Pressed!')}
  />
))

export default class FullButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    styles: PropTypes.object
  }

  render() {
    const { styles, onPress, text } = this.props
    return (
      <TouchableOpacity style={[styles.button, styles]} onPress={onPress}>
        <Text style={styles.buttonText}>{text && text.toUpperCase()}</Text>
      </TouchableOpacity>
    )
  }
}
