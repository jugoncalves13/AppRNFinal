import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Objeto from '../Components/Objeto';
import Stories from '../Components/Stories';


export default function Home() {

  const [objetos, setObjetos] = useState([]);

  async function getObjetos() {
    await fetch('http://10.139.75.13:5251/api/Objeto/GetAllObjeto/', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(json => setObjetos(json))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getObjetos();
  }, [])


  return (
    <View style={css.container}>
      {objetos.length > 0 ? 
        <>
          <Stories objetos={objetos} />
          <FlatList
            data={objetos}
            renderItem={({ item }) => 
            <Objeto 
            title={item.objetoNome} 
            price={item.price} 
            objetoFoto={item.objetoFoto}
            objetoCor={item.objetoCor}
            objetoObservacoes={item.objetoObservacoes}
            objetoLocalDesaparecimento={item.objetoLocalDesaparecimento}
            objetoDtDesaparecimento={item.objetoDtDesaparecimento}
            objetoDtEncontro={item.objetoDtEncontro}
            />}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ height: (objetos.length * 800) + 110 }}
            
          />
        </>
        :
        <Text style={css.text}>Carregando produtos...</Text>
      }
      <TouchableOpacity style={css.btnObservacão} >
                <Text style={css.btnObsText}>Nova Observação</Text>
            </TouchableOpacity>
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
  }, 
  btnObservacão: {
      width: "60%",
      height: 50,
      borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "black"
  },
  btnObsText: {
    color: "white",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
  }
})