import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CustomText } from './CustomTextComponent';
import BotaoComponent from './BotaoComponent';


export function LoginComponent({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);

  const handleContinue = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
    <View style={styles.loginForm}>
      <TextInput
        style={styles.textInput}
        placeholder='E-mail ou telefone'
        keyboardType='email-address'
      />
      <View style={styles.textInputPassword}>
        <TextInput
          style={styles.textInput}
          placeholder='Senha'
          secureTextEntry={hidePassword}
          autoCorrect={false}
        />
        <TouchableOpacity style={styles.toggler} onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <CustomText style={styles.esqueciSenha}>Esqueceu a senha?</CustomText>
      <BotaoComponent
        texto={"INICIAR"}
        onPress={() => {navigation.navigate('Perfil');}}
        estilo={styles.botaoLogin}
      />
    </View>
      <View style={styles.cadastrar}>
        <BotaoComponent
          texto={"CADASTRAR-SE"}
          onPress={handleContinue}
          estilo={styles.botaoCadastrar}
          estiloTexto={styles.textoBotaoCadastrar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'flex-start',
  },
  loginForm: {
    marginVertical: 60,
    marginHorizontal: 40,
    marginBottom: 300,
    width: 330,
  },
  textInput: {
    backgroundColor: "#EEE",
    color: "#111",
    fontFamily: "Poppins", 
    paddingLeft: 20,
    paddingVertical: 13,
    width: 330,
  },
  textInputPassword: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  toggler: {
    position: 'absolute',
    right: 10,
  },
  esqueciSenha: {
    alignSelf: 'flex-end',
    marginTop: 15,
    fontSize: 13,
  },
  cadastrar: {
    borderTopWidth: 1.2, 
    borderTopColor: "#EEE", 
  }, 
  botaoCadastrar: {
    width: 190, 
    marginHorizontal: 40, 
  },
  textoBotaoCadastrar: {
    fontSize: 17, 
  },
});

export default LoginComponent;