import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import AppBar from '../AppBarComponent';
import { CustomText } from '../CustomTextComponent';
import BotaoComponent from '../BotaoComponent';

const DadosEmpresa = ({ route, navigation }) => {
    const selectedOption = route.params;

    useEffect(() => {
        return () => {
            selectedOption;
        };
    }, []);

    const handleContinue = () => {
        navigation.navigate("cadastroMotorista", {selectedOption});
    };


    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"}/>
            <View style={styles.dadosForm}>
                <CustomText style={styles.titulo}>Dados da empresa</CustomText>
                <TextInput
                    style={styles.textInput}
                    placeholder='Nome da empresa'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Cargo'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Código'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Endereço'
                />
                <View style={styles.cepNum}>
                    <TextInput
                        style={styles.textInputCEP}
                        placeholder='CEP'
                    />
                    <TextInput
                        style={styles.textInputNum}
                        placeholder='Número'
                    />
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
        backgroundColor: "#FFF",
    },
    dadosForm: {
        padding: 30,
    },
    titulo: {
        color: "#79c61e",
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 30,
    },
    textInput: {
        backgroundColor: "#EEE",
        color: "#111",
        fontFamily: "Poppins", 
        marginBottom: 25,
        paddingLeft: 20,
        paddingVertical: 10,
        width: 350,
    },
    cepNum: {
        flexDirection: "row",
    },
    textInputCEP: {
        backgroundColor: "#EEE",
        color: "#111",
        fontFamily: "Poppins", 
        marginBottom: 25,
        paddingLeft: 20,
        paddingVertical: 10,
        width: 169,
        marginRight: 20,
    },
    textInputNum: {
        backgroundColor: "#EEE",
        color: "#111",
        fontFamily: "Poppins", 
        marginBottom: 25,
        paddingLeft: 20,
        paddingVertical: 10,
        width: 160,
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
        marginTop: 120,
    },
    botaoContinuar: {
        marginHorizontal: 40,
    },
});

export default DadosEmpresa;