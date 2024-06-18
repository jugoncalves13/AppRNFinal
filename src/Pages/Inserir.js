import {Text, StyleSheet,  ScrollView, TextInput, TouchableOpacity, View} from 'react-native'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

export default function Inserir() {

    const { setCadastro } = useContext( AuthContext )
    
    const[ nome, setNome ] = useState( "" );
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [erro, setErro ] = useState(false);
    const [sucesso, setSucesso ] = useState(false);
    
    async function Cadastro()
    {
        await fetch('http://10.139.75.13:5251/api/Usuario/GetAllUsuario' , {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    senha: senha,
                    nome: nome,
                    telefone: telefone
                }
                
            )
           
        })
        .then( res => (res.ok == true) ? res.json () : false)
        .then(json =>{
            setSucesso((json.id) ? true : false);
            setErro((json.id) ? false : true);

        } )
        .catch(err => console.log(true))
    }


    return (
        <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center', 
        height: '100%', backgroundColor: '#B0C4DE'}}>
           
            <View style={css.caixatexto}>
              <Text style={css.textcadastro}>Cadastre-Se</Text>
            </View> 
            { sucesso ? <Text>Cadastro Realizado!</Text> :
            <> 
            <TextInput style={css.input}
                placeholder=" Nome" 
                placeholderTextColor={'black'} 
                onChangeText={(digitado) => setNome(digitado)} 
                TextInput={nome}
            />
            <TextInput style={css.input}
                placeholder=" Telefone" 
                placeholderTextColor={'black'} 
                onChangeText={(digitado) => setTelefone(digitado)} 
                TextInput={telefone}
            />
            <TextInput style={css.input}
                placeholder=" Email" 
                placeholderTextColor={'black'} 
                onChangeText={(digitado) => setEmail(digitado)} 
                TextInput={email}
            />
            <TextInput style={css.input}
                placeholder=" Senha" 
                placeholderTextColor={'black'} 
                onChangeText={(digitado) => setSenha(digitado)} 
                TextInput={senha}
            />
            </> 
            }
            { erro && <Text>ERRADO</Text>}
    
          <TouchableOpacity style={css.btnLogin} onPress={Cadastro}>
            <Text style={css.btnText}>Realizar Cadastro</Text>
            </TouchableOpacity>
          <TouchableOpacity style={css.btnCadastrar} onPress={() => setCadastro( false ) }>
            <Text style={css.btnText} >Voltar para o Login</Text>
            </TouchableOpacity>
        </ScrollView>
      )
    }
    
const css = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: "#B0C4DE",
        alignItems: "center"
    },
    input: {
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginBottom: 20,
        backgroundColor: "white",
        color:"black"
    },
    btnCadastrar: {
        width: "80%",
        height: 50,
        backgroundColor: "black",
        borderRadius: 5,
        marginBottom: 10
    },
    btnLogin: {
        width: "80%",
        height: 50,
        backgroundColor: "black",
        borderRadius: 5,
        marginBottom: 10
    },
    btnText: {
        fontSize: 15,
        lineHeight: 50,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    sucessoText: {
        fontWeight: "bold",
        fontSize: 17
    }
})