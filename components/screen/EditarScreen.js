import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { TextInput, Button, Text } from 'react-native-paper'; 

import { consultarPessoa, atualizarPessoa } from '../sqlite/Pessoa'; 

const Atualizar = ({ navigation }) => {
  const [inputUserId, setInputUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [userAge, setUserAge] = useState(''); 

  const searchUser = async () => {
    try {
      const res = await consultarPessoa(inputUserId);
      if (res) {
        setUserName(res.nome);
        setUserContact(res.profissao);
        setUserAddress(res.email);
        setUserAge(String(res.idade));
      } else {
        Alert.alert('Erro', 'Usuário não encontrado!');
        setUserName('');
        setUserContact('');
        setUserAddress('');
        setUserAge('');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar usuário.');
      console.error(error);
    }
  };

  const updateUser = async () => {
    try {
      const pessoaAtualizada = {
        id: inputUserId,
        nome: userName,
        profissao: userContact,
        email: userAddress,
        idade: parseInt(userAge),
      };

      const result = await atualizarPessoa(pessoaAtualizada);

      if (result) {
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!', [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('HomeScreen'),
          },
        ]);
      } else {
        Alert.alert('Erro', 'Falha ao atualizar o usuário.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao atualizar usuário.');
      console.error('Erro na atualização:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            
            {/* Filtro de Usuário */}
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
              Filtro de Usuário
            </Text>
            
          
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="user" size={20} color="#99883f" style={{ marginRight: 10 }} />
              <TextInput
                label="Código do Usuário"
                mode="outlined"
                value={inputUserId}
                onChangeText={(text) => setInputUserId(text)}
                style={{ flex: 1 }}
                theme={{ colors: { primary: '#99883f' } }} 
              />
            </View>

            <Button 
              mode="contained" 
              onPress={searchUser} 
              style={{ marginVertical: 20, backgroundColor: '#99883f' }}
              icon={() => <Icon name="search" size={20} color="white" />}
            >
              Buscar Usuário
            </Button>

            {/* Campos de Dados do Usuário */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                label="Nome"
                mode="outlined"
                value={userName}
                onChangeText={(text) => setUserName(text)}
                style={{ flex: 1, marginBottom: 10 }}
                theme={{ colors: { primary: '#99883f' } }}
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                label="Idade"
                mode="outlined"
                value={userAge}
                keyboardType="numeric"
                onChangeText={(text) => setUserAge(text)}
                style={{ flex: 1, marginBottom: 10 }}
                theme={{ colors: { primary: '#99883f' } }} 
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                label="Profissão"
                mode="outlined"
                value={userContact}
                onChangeText={(text) => setUserContact(text)}
                style={{ flex: 1, marginBottom: 10 }}
                theme={{ colors: { primary: '#99883f' } }} 
              />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                label="Email"
                mode="outlined"
                value={userAddress}
                onChangeText={(text) => setUserAddress(text)}
                style={{ flex: 1, marginBottom: 10 }}
                theme={{ colors: { primary: '#99883f' } }} 
              />
            </View>

            <Button 
              mode="contained" 
              onPress={updateUser} 
              style={{ marginTop: 20, backgroundColor: '#99883f' }}
              icon={() => <Icon name="save" size={20} color="white" />}
            >
              Atualizar Usuário
            </Button>
            
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Atualizar;
