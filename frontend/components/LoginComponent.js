import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from './UserContext';
import AppBar from './AppBarComponent';
import { CustomText } from './CustomTextComponent';
import BotaoComponent from './BotaoComponent';


export function LoginComponent({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [hidePassword, setHidePassword] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.0.10:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const userData = await response.json();

      if (response.status === 200) {
        setUser(userData);
        navigation.navigate('Inicio');
      } else {
        console.error('Falha no login:', userData.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };


  const handleContinue = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <View style={styles.container}>
      <AppBar texto={"Precisa de Ajuda?"}/>
    <View style={styles.loginForm}>
      <TextInput
        style={styles.textInput}
        placeholder='E-mail ou telefone'
        keyboardType='email-address'
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.textInputPassword}>
        <TextInput
          style={styles.textInput}
          placeholder='Senha'
          secureTextEntry={hidePassword}
          autoCorrect={false}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity style={styles.toggler} onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <CustomText style={styles.esqueciSenha}>Esqueceu a senha?</CustomText>
      <BotaoComponent
        texto={"INICIAR"}
        onPress={handleLogin}
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