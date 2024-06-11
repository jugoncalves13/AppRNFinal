import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Detalhes() {
  return (
    <View style={css.container}>
      <Text style={css.text}>Detalhes</Text>
    </View>
    
  )
}
const css = StyleSheet.create({
  container: {
    backgroundColor: "#B0C4DE",
    flexGrow: 1,
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: "white"
  }
})