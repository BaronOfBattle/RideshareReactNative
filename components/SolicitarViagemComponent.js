import React from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";

export function SolicitarViagem({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.viagem}>
                <CustomText style={styles.titulo}>Solicitar Viagem: </CustomText>
                <CustomText style={styles.texto}>Preencha os dados da sua viagem.</CustomText>
                <View style={styles.formViagem}>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.option} onPress={null}>
                            <CustomText style={styles.optionCircle}> </CustomText>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Local da partida"></TextInput>
                        </TouchableOpacity>
                        <View style={styles.optionLine}><Text></Text></View>
                        <TouchableOpacity style={styles.option} onPress={null}>
                            <CustomText style={styles.optionCircle}> </CustomText>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Local de destino"></TextInput>
                        </TouchableOpacity>
                        <View style={styles.optionLine}><Text></Text></View>
                        <TouchableOpacity style={styles.option} onPress={null}>
                            <CustomText style={styles.optionCircle}> </CustomText>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Horário de saída"></TextInput>
                        </TouchableOpacity>
                        <View style={styles.optionLine}><Text></Text></View>
                        <TouchableOpacity style={styles.option} onPress={null}>
                            <CustomText style={styles.optionCircle}> </CustomText>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Selecione o veículo"></TextInput>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.continuar}>
                <BotaoComponent
                    texto={"Solicitar"}
                    onPress={() => {navigation.navigate("solicitarCarona")}}
                    estilo={styles.botaoContinuar}
                    estiloTexto={styles.botaoContinuarTexto}
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
    viagem: {
        padding: 35,
    },
    titulo: {
        color: "#79c61e",
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    texto: {
        fontSize: 16,
        marginBottom: 50,
    },
    options: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    option: {
        flexDirection: 'row',
        backgroundColor: "#EEE",
        alignItems: 'flex-start',
        padding: 10,
    },
    optionCircle: {
        backgroundColor: "#CCC",
        height: 15,
        width: 15,
        borderRadius: 7.5,
        marginTop: 7,
        marginLeft: 10,
    },
    textInput: {
        backgroundColor: "#EEE",
        color: "#111",
        fontFamily: "Poppins", 
        paddingLeft: 20,
        width: 280,
        marginBottom: 0,
    },
    optionLine: {
        backgroundColor: "#FFF",
        borderLeftColor: "#EEE",
        borderLeftWidth: 3,
        marginRight: 270,
        height: 10, 
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoContinuar: {
        backgroundColor: "#79C61E",
        width: 200,
        borderRadius: 12,
    },
    botaoContinuarTexto: {
        marginHorizontal: 40,
        color: "#000",
    },
});

export default SolicitarViagem;