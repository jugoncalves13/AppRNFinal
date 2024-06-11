import {Text, StyleSheet,  ScrollView, TextInput, TouchableOpacity, View} from 'react-native'
import React, { useState } from 'react'


export default function Inserir() {
    
    const[ nome, setNome ] = useState( "" );
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [erro, setErro ] = useState(false);
    const [sucesso, setSucesso ] = useState(false);
    

    async function Cadastro()
    {
        await fetch('http://10.139.75.14:5251/api/Usuario/GetAllUsuario' , {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(
                {
                    email: email,
                    password: senha,
                    name:{
                        firstname: nome,
                    },
                    phone: telefone
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

        <ScrollView contentContainerStyle={css.container}>
            {sucesso ? 
            <Text style={css.sucessoText}>Obrigado por se cadastrar!</Text>
        : 
        <>
            <TextInput
             placeholder='Nome:'
             placeholderTextColor="black"
             style={css.input}
             onChangeText={(digitado) => setNome(digitado) }
             value={nome}
           
            />
             <TextInput
            placeholder='Email'
            placeholderTextColor="black"
            onChangeText={(digitado) => setEmail(digitado) }
            value={email}
            style={css.input}
            />
             
            <TextInput
             placeholder='Senha'
             placeholderTextColor="black"
             onChangeText={(digitado) => setSenha(digitado) }
             value={senha}
             style={css.input}
            />
            <TextInput
             placeholder='Telefone:'
             placeholderTextColor="black"
             style={css.input}
             onChangeText={(digitado) => setTelefone(digitado) }
             value={telefone}
            />
            
            <TouchableOpacity style={css.btnCadastrar} onPress={Cadastro}>
                <Text style={css.btnText}>CADASTRAR</Text>
            </TouchableOpacity>
            {erro && 
            <View style={css.error} >
                <Text style={css.errorText}>Revise os campos. Tente novamente!</Text>
            </View>
            }
            </> 
        }
        </ScrollView>
        
    )
}
const css = StyleSheet.create({
    container: 
    {
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
        backgroundColor: "#E6E6FA",
        borderRadius: 5,
        marginBottom: 10
    },
    btnText: {
        fontSize: 15,
        lineHeight: 50,
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    errorText: {
        color: "white",
        fontWeight: "bold",
    },
    sucessoText: {
        fontWeight: "bold",
        fontSize: 17
    }
})