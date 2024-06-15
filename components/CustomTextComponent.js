import React from 'react';
import { Text, StyleSheet } from 'react-native';

export function CustomText(props) {
  return <Text style={[styles.estiloPadrao, props.style]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  estiloPadrao: {
    fontFamily: 'Poppins',
  },
});
