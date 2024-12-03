import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons'; // Importe o FontAwesome
import { listarPessoas, excluirPessoa } from '../sqlite/Pessoa';

export default function VisualizarPessoasScreen() {
  const [pessoas, setPessoas] = useState([]);

  // Função para listar pessoas e atualizar o estado
  const fetchData = async () => {
    const lista = await listarPessoas();
    setPessoas(lista);
  };

  // Chamar a função fetchData ao carregar o componente
  useEffect(() => {
    fetchData();
  }, []);

  // Função para excluir uma pessoa e atualizar a lista
  const handleDelete = async (id) => {
    await excluirPessoa(id);
    fetchData(); // Atualiza a lista após excluir
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Botão de Refresh com ícone */}
      <Button 
        mode="contained" 
        onPress={fetchData} 
        style={styles.refreshButton}
        buttonColor="#99883f"
        icon={() => <FontAwesome name="refresh" size={20} color="white" />}
      >
        Refresh
      </Button>
      
      {/* Lista de usuários */}
      <ScrollView>
        {pessoas.map((pessoa, index) => (
          <View key={index} style={styles.card}>
            <Text>Id: {pessoa.id}</Text>
            <Text>Nome: {pessoa.nome}</Text>
            <Text>Profissão: {pessoa.profissao}</Text>
            <Text>Email: {pessoa.email}</Text>
            <Text>Idade: {pessoa.idade}</Text>
            
            {/* Botão de Excluir com ícone */}
            <Button 
              mode="contained" 
              buttonColor="#99883f" 
              onPress={() => handleDelete(pessoa.id)}
              icon={() => <FontAwesome name="trash" size={20} color="white" />}
            >
              Excluir
            </Button>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  refreshButton: { margin: 10 },
  card: { padding: 10, margin: 10, backgroundColor: '#fff', borderRadius: 5 },
});
