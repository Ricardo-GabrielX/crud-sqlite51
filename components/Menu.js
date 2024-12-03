import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContent from './drawerContent';
import { HomeScreen, AdicionarScreen, EditarScreen, VisualizarScreen, Atualizar } from './screen';

const Drawer = createDrawerNavigator();

export default function Menu() {
  return (
    
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerContent={DrawerContent}>
              <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Adicionar" component={AdicionarScreen} />
        <Drawer.Screen name="Editar" component={EditarScreen} />
        <Drawer.Screen name="Visualizar" component={VisualizarScreen} />
                <Drawer.Screen name="Atualizar" component={Atualizar} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

