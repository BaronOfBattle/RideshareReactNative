import React, { useRef } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { CustomText } from '../CustomTextComponent';
import BotaoComponent from '../BotaoComponent';


export function ConfirmarEmailComponent({ navigation }) {

    const handleContinue = () => {
        navigation.navigate("selecCategoria");
    };

    const refs = Array(4).fill().map(() => useRef(null));

    const handleInput = (text, index) => {
        if (text && index < 3) {
            refs[index + 1].current.focus();
        }
    };

    const handleKeyPress = ({ nativeEvent }, index) => {
        if (nativeEvent.key === 'Backspace' && index > 0) {
            refs[index - 1].current.focus();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inserirCodigo}>
                <CustomText style={styles.textoInserirCodigo}>Insira o códgio enviado para o E-mail informado:</CustomText>
                <View style={styles.codigo}>
                    {refs.map((ref, index) => (
                        <TextInput
                            key={index}
                            ref={ref}
                            style={styles.codigoInput}
                            keyboardType='numeric'
                            maxLength={1}
                            onChangeText={text => handleInput(text, index)}
                            onKeyPress={event => handleKeyPress(event, index)}
                        />
                    ))}
                </View>
                <CustomText style={styles.naoRecebido}>Não recebeu o código?</CustomText>
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
    inserirCodigo: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 180,
    },
    textoInserirCodigo: {
        fontSize: 16,
        fontWeight: '600',
        width: 250,
        textAlign: 'center',
    },
    codigo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    codigoInput: {
        borderBottomColor: "#000",
        borderBottomWidth: 1.3,
        textAlign: 'center',
        fontFamily: "Poppins", 
        width: 50,
        marginTop: 80,
        marginBottom: 50,
        marginRight: 5
    },
    naoRecebido: {
        marginBottom: 180,
        color: '#79c61e',
        fontWeight: 'bold',
        fontSize: 16,
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
        marginTop: 10,
    },
    botaoContinuar: {
        marginHorizontal: 40,
    },
});

export default ConfirmarEmailComponent;