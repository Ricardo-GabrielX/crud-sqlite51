import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Card, Text, PaperProvider, DefaultTheme, Button, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { cadastrarPessoa } from '../sqlite/Pessoa';

// Tema personalizado
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#99883f',
    accent: '#99883f',
    background: '#ffffff',
    surface: '#99883f',
    text: '#000000',
    disabled: '#f0f0f0',
    placeholder: '#a0a0a0',
    backdrop: '#99883f',
  },
};

// Componente para seção com título e ícone
const ComponentSection = ({ title, children }) => (
  <View style={styles.section}>
    <View style={styles.titleContainer}>
      <Icon name="user-plus" size={20} color="#99883f" style={styles.icon} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

export default function App() {
  const [name, setName] = useState('');
  const [idade, setIdade] = useState('');
  const [profissao, setProfissao] = useState('');
  const [email, setEmail] = useState('');


  const handleAddUser = () => {
    if (!name || !idade || !profissao || !email) {
      return Alert.alert("Preencha todos os campos.");
    }

    cadastrarPessoa({
      nome: name,
      profissao: profissao,
      email: email,
      idade: parseInt(idade, 10), 
    })
      .then(() => {
        Alert.alert("Usuário adicionado com sucesso");
        setName('');
        setIdade('');
        setProfissao('');
        setEmail('');
      })
      .catch((error) => Alert.alert("Erro ao adicionar usuário: " + error.message));
  };

  return (
    <PaperProvider theme={MyTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>  
          <ScrollView contentContainerStyle={styles.scrollContainer}>     
            <Card>    
              <ComponentSection title="Cadastro de Usuário">
                <TextInput
                  label="Nome"  
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  theme={{ colors: { primary: '#99883f', underlineColor: 'transparent' } }} 
                />
                <TextInput
                  label="Idade" 
                  value={idade}
                  onChangeText={setIdade}
                  keyboardType="numeric"
                  style={styles.input}
                  theme={{ colors: { primary: '#99883f', underlineColor: 'transparent' } }}
                />
                <TextInput
                  label="Profissão" 
                  value={profissao}
                  onChangeText={setProfissao}
                  style={styles.input}
                  theme={{ colors: { primary: '#99883f', underlineColor: 'transparent' } }}
                />
                <TextInput
                  label="Email"  
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  style={styles.input}
                  theme={{ colors: { primary: '#99883f', underlineColor: 'transparent' } }}
                />
                
                {/* Botão com ícone */}
                <Button
                  mode="contained"
                  onPress={handleAddUser}
                  color="#99883f"
                  style={styles.button}
                  icon={() => <Icon name="check" size={20} color="white" />}
                >
                  Adicionar Usuário
                </Button>
              </ComponentSection>
            </Card>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  scrollContainer: {
    padding: 8,
  },
  section: {
    marginVertical: 10,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#e8e8e8', 
    paddingLeft: 10,
  },
  button: {
    marginTop: 10,
  },
});
