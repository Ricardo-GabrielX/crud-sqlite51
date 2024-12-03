import * as React from 'react';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Menu from './components/Menu';
import TelaWeb from './components/tela/TelaWeb'
import { Platform } from 'react-native';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200ee',
    background: '#f6f6f6',
    accent: '#03dac4',
    surface: '#ffffff',
    text: '#000000',
    error: '#B00020',
  },
};

export default function App() {
   if(Platform.OS === 'web'){
          return (
          <TelaWeb />
        );
        }
          return (
            <PaperProvider theme={theme}>
              <SafeAreaProvider>
                <Menu />
            </SafeAreaProvider>
            </PaperProvider>
        );
 
}
