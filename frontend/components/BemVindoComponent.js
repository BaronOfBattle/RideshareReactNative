import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { CustomText } from './CustomTextComponent';

const BemVindo = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Inicio');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <CustomText style={styles.bemVindo}>Bem vindo ao</CustomText>
      <Image
        source={require("../logo.png")}
        style={{ height: 65, width: 360 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bemVindo: {
    marginBottom: 15, 
  }, 
});

export default BemVindo;
