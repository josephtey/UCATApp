import React, { useEffect } from 'react';
import styled from 'styled-components'
import {
  Flex,
  Text,
  Box,
  Link,
  Button
} from 'rebass'
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

const NavBar = (props) => {

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <Flex
      px={2}
      color='white'
      bg='black'
      alignItems='center'
      style={{ padding: '15px' }}
    >
      <Text
        p={2}
        fontWeight='bold'
        onClick={() => {
          props.history.push('/')
        }}
        style={{ cursor: 'pointer' }}
      >
        UCAT Application
        </Text>
      <Box mx='auto' />
      <Link variant='nav' href='#!'>
        Profile
      </Link>
    </Flex>
  )
}

export default NavBar