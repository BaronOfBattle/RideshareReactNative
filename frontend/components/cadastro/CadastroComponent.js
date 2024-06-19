import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AppBar from '../AppBarComponent';
import { Ionicons } from '@expo/vector-icons';
import { CustomText } from '../CustomTextComponent';
import BotaoComponent from '../BotaoComponent';


export function CadastroComponent({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const [checked, setChecked] = useState(false);
    const [showError, setShowError] = useState(false);

    const [userDetails, setUserDetails] = useState({
        nome: '',
        email: '',
        dataNascimento: '',
        pronome: '',
        senha: '',
    });

    const handleInputChange = (name, value) => {
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleContinue = () => {
        if (checked && userDetails.senha === userDetails.confirmarSenha) {
          navigation.navigate('selecCategoria', { userDetails });
          setShowError(false);
        } else {
          setShowError(true);
          if (!checked) {
            Alert.alert('Erro', 'Você precisa aceitar os termos e condições.');
          } else if (userDetails.senha !== userDetails.confirmarSenha) {
            Alert.alert('Erro', 'As senhas não coincidem.');
          }
        }
      };
      

    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"} />
            <View style={styles.cadastroForm}>
                <TextInput
                    style={styles.textInput}
                    placeholder='Nome e Sobrenome'
                    onChangeText={(text) => handleInputChange('nome', text)}
                    value={userDetails.nome}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='E-mail'
                    keyboardType='email-address'
                    onChangeText={(text) => handleInputChange('email', text)}
                    value={userDetails.email}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Data de nascimento'
                    onChangeText={(text) => handleInputChange('dataNascimento', text)}
                    value={userDetails.dataNascimento}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Pronome que você se identifica'
                    onChangeText={(text) => handleInputChange('pronome', text)}
                    value={userDetails.pronome}
                />
                <View style={styles.textInputPassword}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Senha'
                        secureTextEntry={hidePassword}
                        autoCorrect={false}
                        onChangeText={(text) => handleInputChange('senha', text)}
                        value={userDetails.senha}
                    />
                    <TouchableOpacity style={styles.toggler} onPress={() => setHidePassword(!hidePassword)}>
                        <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
                <View style={styles.textInputPassword}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Confirmar senha'
                        secureTextEntry={hideConfirmPassword}
                        autoCorrect={false}
                        onChangeText={(text) => handleInputChange('confirmarSenha', text)}
                        value={userDetails.confirmarSenha}
                    />
                    <TouchableOpacity style={styles.toggler} onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
                        <Ionicons name={hideConfirmPassword ? 'eye-off' : 'eye'} size={20} color="gray" />
                    </TouchableOpacity>
                </View>
                <View style={[styles.checkBox, showError && !checked && styles.checkBoxError]}>
                    <CheckBox
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                    />
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, flexWrap: 'wrap' }}>
                        <CustomText>Li e concordo com os
                            <CustomText style={{ color: 'blue' }} onPress={() => { Alert.alert('Termos', 'Hello') }}> Termos e Condições de Uso. </CustomText>
                            Os termos estarão disponíveis para consulta dentro do app.</CustomText>
                    </View>
                </View>
            </View>
            <View style={styles.continuar}>
                <BotaoComponent
                    texto={"CONTINUAR"}
                    onPress={handleContinue}
                    estilo={styles.botaoContinuar}
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
    cadastroForm: {
        marginVertical: 60,
        marginHorizontal: 40,
        marginBottom: 10,
        width: 330,
    },
    textInput: {
        backgroundColor: "#EEE",
        color: "#111",
        fontFamily: "Poppins",
        paddingLeft: 20,
        paddingVertical: 13,
        width: 330,
        marginBottom: 30,
    },
    textInputPassword: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 0,
    },
    toggler: {
        position: 'absolute',
        right: 10,
        top: 12,
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 330,
    },
    checkBoxError: {
        borderLeftColor: 'red',
        borderLeftWidth: 1,
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
    },
    botaoContinuar: {
        marginHorizontal: 40,
    },
});

export default CadastroComponent;