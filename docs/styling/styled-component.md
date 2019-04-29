## Styled-components

Below creates two styled react components (`<Title>`, `<Wrapper>`) and renders them
as children of the `<Header>` component:

```js
import React from 'react'
import styled from 'styled-components'

// Create a <Title> react component that renders an <Text> which is
// centered, palevioletred and sized at 1.5em
const Title = styled.Text`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`

// Create a <Wrapper> react component that renders a <View> with
// some padding and a papayawhip background
const Wrapper = styled.View`
  padding: 4em;
  background: papayawhip;
`

// Use them like any other React component – except they're styled!
function Button() {
  return (
    <Wrapper>
      <Title>
        Hello {this.props.name}, this is your first styled component!
      </Title>
      ...
    </Wrapper>
  )
}
```

> For more information about `styled-components` see https://github.com/styled-components/styled-components
