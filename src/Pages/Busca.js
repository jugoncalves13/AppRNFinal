import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";


 export default function Busca() {

    const[ usuarios, setUsuarios ] = useState([]);
    const[ error, setError ] = useState(false);
    const[ edicao, setEdicao] = useState(false);
    const[ usuarioId, setUsuarioId ] = useState(0);
    const[ usuarioNome, setNome] = useState();
    const[ usuarioEmail, setEmail ] = useState();
    const[ usuarioSenha, setSenha ] = useState();
    const[ deleteResposta, setResposta ] = useState(false);

    
    async function getUsuarios () {
        await fetch('http://10.139.75.14:5251/api/Usuario/GetAllUsuario' , {
            method: 'GET',
            headers: {
                'content-type' : 'application/json'
            }           
        })
        .then( res => res.json())        
        .then(json => setUsuarios( json ))
        .catch(err => setError(true))
    }

    async function getUsuario(id) {
        await fetch('http://10.139.75.14:5251/api/Usuario/GetUsuarioId/' + id, {
            method: 'GET',
            headers: {
                'content-type' : 'application/json; charset=UTF=8',
            },
        })
        .then((response) => response.json())
        .then(json => {
            setUsuarioId(json.usuarioId);
            setNome(json.usuarioNome);
            setEmail(json.usuarioEmail);
            setSenha(json.usuarioSenha);
        });
    }

    async function editUser() {
        console.log(usuarioId, usuarioEmail, usuarioSenha, usuarioNome);
        await fetch('http://10.139.75.14:5251/api/Usuario/UpdateUsuario/' + usuarioId, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                usuarioId: usuarioId,
                usuarioEmail: usuarioEmail,
                usuarioPassword: usuarioSenha,
                usuarioName: usuarioNome
            })
        })
        .then((response) => response.json())
        .catch( err => console.log( err ) );
        getUsuarios();
        setEdicao(false);
    }
    function showAlert(id, usuarioNome){
        Alert.alert(
            '',
            'Deseja realmente excluir esse usuário?',
            [
                {text: 'Sim', onPress: () => deleteUsuario(id, usuarioNome)},
                {text: 'Não', onPress: () =>('')},
            ],
            {cancelable: false }
        );
    }

    async function deleteUsuario(id, usuarioNome){
        await fetch('http://10.139.75.14:5251/api/Users/DeleteUser/' + id, {
            method: 'DELETE',
            headers: {
                'Content-type' : 'application/json; charset=UTF-8',
            },
        })
        .then(rs => res.json())
        .then(json => setResposta(json))
        .catch( err => setError(true))

        if(deleteResposta == true)
        {
            Alert.alert(
                '',
                'Usuario' + usuarioNome + 'excluido com sucesso',
                [
                    {text: '', onPress: () =>('')},
                    {text: 'Ok', onPress: () =>('')},
                ],
                {cancelable: false }
            );
            getUsuarios();
        }
        else
        {
            Alert.alert(
                '',
                'Usuario' + usuarioNome + 'não foi excluido',
                [
                    {text: '', onPress: () =>('')},
                    {text: 'Ok', onPress: () =>('')},
                ],
                {cancelable: false }
            );
            getUsuarios();
        }
    };

    useEffect( () => {
        getUsuarios();
    }, [] )

    useFocusEffect(
        React.useCallback(() => {
            getUsuarios();
        }, [])
    );

    return(
        <View style={css.container}>
            {edicao == false ?
            <FlatList
            style={css.flat}
            data={usuarios}
            keyExtractor={(item) => item.usuarioId}
            renderItem={({ item }) => (
                <Text style={css.text}>
                    {item.usuarioNome}
                    <TouchableOpacity style={css.btnEdit} onPress={() => { setEdicao(true); getUsuario(item.usuarioId) }}>
                        <Text style={css.btnTextEditar}>EDITAR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={css.btnDelete} onPress={() => showAlert(item.usuarioId, item.usuarioNome)}>
                        <Text style={css.btnText}>EXCLUIR</Text>
                    </TouchableOpacity>
                </Text>
            )}
            />
            :
            <View style={css.editar}>
                <TextInput
                inputMode="text"
                style={css.input}
                value={usuarioNome}
                onChangeText={(digitado) => setNome(digitado)}
                placeholderTextColor="black"               
                />
                <TextInput
                inputMode="email"
                style={css.input}
                value={usuarioEmail}
                onChangeText={(digitado) => setEmail(digitado)}
                placeholderTextColor="black"               
                />
                <TextInput
                inputMode="text"
                style={css.input}
                value={usuarioSenha}
                onChangeText={(digitado) => setSenha(digitado)}
                placeholderTextColor="black"               
                />
                <TouchableOpacity style={css.btnCreate} onPress={() => editUser()}>
                    <Text style={css.btnText}>SALVAR</Text>
                </TouchableOpacity>
            </View>
             }
            </View>
               )}
  
 const css = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        justifyContent: "center",
        width: "100%",
        backgroundColor: "#B0C4DE",
        alignItems: "center",
        color:"black !important",
    },
    editar: {
        flex: 1,
        flexGrow: 1,
        width: "80%",
        backgroundColor: "#B0C4DE",
        alignItems: "center",
        color:"black",
    },
    btnCreate: {
        width: "70%",
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
    input: {
        width: "70%",
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginBottom: 25,
        backgroundColor: "white",
        color:"black"
    },
    btnEdit: {
        width: "70%",
        height: 50,
        backgroundColor: "black",
        borderRadius: 5,
        marginBottom: 15,
    },
    btnTextEditar: {
        color: "white"
    },
    btnDelete: {
        width: "70%",
        height: 50,
        backgroundColor: "red",
        borderRadius: 5,
        marginBottom: 10
    },
    
})