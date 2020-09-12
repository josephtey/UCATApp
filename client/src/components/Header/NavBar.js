import React, { useEffect } from 'react';
import {
  Flex,
  Text,
  Box,
  Link,
} from 'rebass'

const NavBar = (props) => {

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