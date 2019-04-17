import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableOpacity } from 'react-native'
import styles from './Styles/DrawerButtonStyles'
import { addComponentExample } from '../Services/ExamplesRegistry'

// Note that this file (App/Components/DrawerButton) needs to be
// imported in your app somewhere, otherwise your component won't be
// compiled and added to the examples dev screen.

// Ignore in coverage report
/* istanbul ignore next */
addComponentExample('Drawer Button', () => (
  <DrawerButton
    text="Example left drawer button"
    onPress={() => console.tron.log('Your drawers are showing')}
  />
))

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
