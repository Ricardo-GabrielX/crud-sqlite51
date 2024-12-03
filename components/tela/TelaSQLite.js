import { Text, View} from 'react-native';
import { Pessoa } from '../sqlite';
import styles from '../style';
import MySnack from '../MySnack';


export default TelaSQLite = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Usando banco SQLite
      </Text>
      
       <MySnack />
    </View>
  );
};

