import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CustomText } from './CustomTextComponent';

export function BotaoComponent({ texto, onPress, estilo, estiloTexto, children }) {
    return (
        <TouchableOpacity style={[styles.botaoLogin, estilo]} onPress={onPress}>
            <CustomText style={[styles.textoBotao, estiloTexto]}>{texto}</CustomText>
            {children}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  botaoLogin: {
    backgroundColor: "#EEE",
    height: 45,
    width: 330, 
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  textoBotao: {
    color: '#79c61e', 
    fontSize: 16, 
  },
});

export default BotaoComponent;