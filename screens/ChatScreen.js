import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ChatScreen = () => {
    const navigation = useNavigation()
    return (
    <SafeAreaView>
      <Text>ChatScreen</Text>
      <Button title='Go To HomeScreen' onPress={()=> {navigation.navigate('Home')}} />
    </SafeAreaView>
  )
}

export default ChatScreen