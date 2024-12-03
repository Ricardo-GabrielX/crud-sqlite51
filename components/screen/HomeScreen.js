
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TelaSQLite from '../tela/TelaSQLite';

import { Card, Text, PaperProvider, DefaultTheme } from 'react-native-paper';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff', 
    accent: '#99883f', 
    background: '#99883f', 
    surface: '#99883f', 
    text: '#000000', 
    disabled: '#f0f0f0',
    placeholder: '#a0a0a0', 
    backdrop: '#99883f', 
  },
};

const ComponentSection = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

export default function App() {
  return (
    <PaperProvider theme={MyTheme}>
    <SafeAreaProvider>
    <SafeAreaView style={styles.container}>  
      <ScrollView contentContainerStyle={styles.scrollContainer}>    
        <Card>    
          <ComponentSection title="">
            <TelaSQLite />
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
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
