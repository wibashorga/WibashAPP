import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

function Members(props) {
  return (
    <View style={styles.container}>
      <Text>Membres</Text>
    </View>
  );
}
export default MembersScreen = ({navigation, route})=>(<Members navigation = {navigation} route={route}/>)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
