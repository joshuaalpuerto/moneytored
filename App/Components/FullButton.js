import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, Text } from 'react-native'

import FullButtonStyles from './Styles/FullButtonStyles'

export default class FullButton extends PureComponent {
  static propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    styles: PropTypes.object
  }

  render() {
    const { styles, onPress, text } = this.props
    return (
      <TouchableOpacity
        style={[FullButtonStyles.button, styles]}
        onPress={onPress}
      >
        <Text style={FullButtonStyles.buttonText}>
          {text && text.toUpperCase()}
        </Text>
      </TouchableOpacity>
    )
  }
}
