import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { Pessoa } from './sqlite';

const MySnack = () => {
  const [visible, setVisible] = React.useState(false);

  const handleStartDatabase = () => {
    Pessoa.iniciar();  
    setVisible(true);   
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <View style={styles.container}>
      <Button onPress={handleStartDatabase}>
        Iniciar
      </Button>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
           
          },
        }}
      >
        Oi, você iniciou o banco ;)
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    padding: 16,
    backgroundColor: '#99883f',
    color: '#fff',
    borderRadius: 30
  },
});

export default MySnack;
