import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput } from 'react-native'
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
    const [rua, setRua] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');
    const [cep, setCep] = useState('');
    const [numero, setNumero] = useState('');


    useEffect(() => {
        return () => {
            selectedOption;
        };
    }, []);

    const handleContinue = () => {

        if (nomeEmpresa && cargo && codigo && rua && cidade && estado && pais && cep && numero) {
            const dadosEndereco = { "rua": rua, "cidade": cidade, "estado": estado, "pais": pais, "cep": cep, "numero": numero };
            const dadosEmpresa = { "nomeEmpresa": nomeEmpresa, "cargo": cargo, "codigo": codigo, "dadosEndereco": dadosEndereco };

            updatedUserDetails.dadosEmpresa.data = dadosEmpresa;
            updatedUserDetails.dadosEmpresa.status = 'Etapa concluída';
            navigation.navigate("cadastroMotorista", { userDetails: updatedUserDetails, selectedOption: "dadosEmpresa" });
        } else {
            alert("Por favor, preencha todos os campos!");
        }
    };



    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"} />
            <ScrollView>

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
                        placeholder='Rua'
                        onChangeText={setRua}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Cidade'
                        onChangeText={setCidade}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Estado'
                        maxLength={2}
                        onChangeText={(text) => setEstado(text.toUpperCase())}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='País'
                        maxLength={2}
                        onChangeText={(text) => setPais(text.toUpperCase())}
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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    dadosForm: {
        paddingTop: 30,
        paddingHorizontal: 30,
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
        marginTop: 0,
    },
    botaoContinuar: {
        marginHorizontal: 40,
    },
});

export default DadosEmpresa;