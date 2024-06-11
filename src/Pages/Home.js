import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Produto from '../Components/Produto';
import Stories from '../Components/Stories';


export default function Home() {

  const [produtos, setProdutos] = useState([]);

  async function getProdutos() {
    await fetch('http://10.139.75.14:5251/api/Objeto/GetAllObjeto/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => setProdutos(json))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getProdutos();
  }, [])

  return (
    <View style={css.container}>
      {produtos ?
        <>
          <Stories produtos={produtos} />
          <FlatList
            data={produtos}
            renderItem={({ item }) => <Produto title={item.title} price={item.price} objetoFoto={item.objetoFoto} description={item.description} 
            category={item.category} rating={item.rating} />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ height: (produtos.length * 600) + 110 }}
          />
        </>
        :
        <Text style={css.text}>Carregando produtos...</Text>
      }
    </View>
  )
}
const css = StyleSheet.create({
  container: 
    {
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#B0C4DE",
    },
    text: {
        color: "white"
    },
  stories: {
    width: "100%",
    height: 100
  }
})