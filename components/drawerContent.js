import * as React from 'react';
import { Drawer, Text, PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// A principal mudança está aqui no tema
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#99883f',         
    secondaryContainer: '#99883f', 
    onSecondaryContainer: '#ffffff', 
  },
};

const DrawerContent = () => {
  const navigation = useNavigation();
  const [active, setActive] = React.useState('');

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <View style={styles.container}>
          {/* Cabeçalho com o título do menu */}
          <Drawer.Section style={styles.drawerSection}>
            <Text style={styles.headerText}>Bem vindo</Text>
          </Drawer.Section>

          {/* Itens do menu */}
          <Drawer.Section style={styles.itemsSection}>
            <Drawer.Item
              icon="home"
              label="Home"
              active={active === 'Home'}
              onPress={() => {
                setActive('Home');
                navigation.navigate('Home');
              }}
            />
            <Drawer.Item
              icon="plus-circle"
              label="Adicionar"
              active={active === 'Adicionar'}
              onPress={() => {
                setActive('Adicionar');
                navigation.navigate('Adicionar');
              }}
            />
            <Drawer.Item
              icon="pencil"
              label="Editar"
              active={active === 'Editar'}
              onPress={() => {
                setActive('Editar');
                navigation.navigate('Editar');
              }}
            />
            <Drawer.Item
              icon="eye"
              label="Visualizar"
              active={active === 'Visualizar'}
              onPress={() => {
                setActive('Visualizar');
                navigation.navigate('Visualizar');
              }}
            />
          </Drawer.Section>
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 40,
  },
  drawerSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', 
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#99883f', 
  },
  itemsSection: {
    marginTop: 16,
  },
});

export default DrawerContent;