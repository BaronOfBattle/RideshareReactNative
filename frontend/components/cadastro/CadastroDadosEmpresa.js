import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native'
import AppBar from '../AppBarComponent';
import { CustomText } from '../CustomTextComponent';
import BotaoComponent from '../BotaoComponent';

const DadosEmpresa = ({ route, navigation }) => {
    const { userDetails } = route.params;
    const [updatedUserDetails, setUpdatedUserDetails] = useState(userDetails);
    const selectedOption = route.params;

    const [nomeEmpresa, setNomeEmpresa] = useState('');
    const [cargo, setCargo] = useState('');
    const [codigo, setCodigo] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');


    useEffect(() => {
        return () => {
            selectedOption;
        };
    }, []);

    const handleContinue = () => {
        const newDetails = {
            ...updatedUserDetails,
            nomeEmpresa,
            cargo,
            codigo,
            endereco,
            cep,
            numero
        };
        console.log(newDetails);
        navigation.navigate("cadastroMotorista", { userDetails: newDetails, selectedOption: selectedOption });
    };
    


    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"} />
            <View style={styles.dadosForm}>
                <CustomText style={styles.titulo}>Dados da empresa</CustomText>
                <TextInput
                    style={styles.textInput}
                    placeholder='Nome da empresa'
                    onChangeText={setNomeEmpresa}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Cargo'
                    onChangeText={setCargo}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Código'
                    onChangeText={setCodigo}
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='Endereço'
                    onChangeText={setEndereco}
                />
                <View style={styles.cepNum}>
                    <TextInput
                        style={styles.textInputCEP}
                        placeholder='CEP'
                        onChangeText={setCep}
                    />
                    <TextInput
                        style={styles.textInputNum}
                        placeholder='Número'
                        onChangeText={setNumero}
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