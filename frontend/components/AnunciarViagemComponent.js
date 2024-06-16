import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import AppBar from "./AppBarComponent";
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";
import BottomBar from './BottomBarComponent';

export function AnunciarViagem({ navigation }) {
    const [idaSelected, setIdaSelected] = useState(false);
    const [idaVoltaSelected, setIdaVoltaSelected] = useState(false);

    return (
        <View style={styles.container}>
            <AppBar imgPerfil={true} menu={true}/>
            <View style={styles.viagem}>
                <CustomText style={styles.titulo}>Anunciar Viagem: </CustomText>
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
                                placeholder="Vagas disponíveis"></TextInput>
                        </TouchableOpacity>
                        <View style={styles.optionLine}><Text></Text></View>
                        <TouchableOpacity style={styles.option} onPress={null}>
                            <CustomText style={styles.optionCircle}> </CustomText>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Selecione o veículo"></TextInput>
                        </TouchableOpacity>
                        <View style={styles.optionLine}><Text></Text></View>
                        <TouchableOpacity style={styles.option} onPress={null}>
                            <CustomText style={styles.optionCircle}> </CustomText>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Valor"></TextInput>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tipoViagem}>
                        <TouchableOpacity style={idaSelected ? styles.tipoViagemIdaGreen : styles.tipoViagemIda}
                            onPress={() => { setIdaSelected(!idaSelected), setIdaVoltaSelected(false) }}
                        >
                            <CustomText style={idaSelected ? styles.tipoViagemIdaTextoGreen : styles.tipoViagemIdaTexto}>SÓ IDA</CustomText></TouchableOpacity>
                        <TouchableOpacity style={idaVoltaSelected ? styles.tipoViagemIdaVoltaGreen : styles.tipoViagemIdaVolta}
                            onPress={() => { setIdaVoltaSelected(!idaVoltaSelected), setIdaSelected(false) }}
                        >
                            <CustomText style={idaVoltaSelected ? styles.tipoViagemIdaTextoGreen : styles.tipoViagemIdaTexto}>IDA E VOLTA</CustomText></TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.continuar}>
                <BotaoComponent
                    texto={"Concluído"}
                    onPress={() => navigation.navigate('acompanharViagem', { showAppBar: true })}
                    estilo={styles.botaoContinuar}
                    estiloTexto={styles.botaoContinuarTexto}
                />
            </View>
            <BottomBar navigation={navigation}/>
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
        fontSize: 18,
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
    tipoViagem: {
        flexDirection: 'row',
        padding: 10,
    },
    tipoViagemIda: {
        backgroundColor: "#DEE1DC",
        padding: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
        width: 150,
    },
    tipoViagemIdaGreen: {
        backgroundColor: "#79C61E",
        padding: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
        width: 150,
    },
    tipoViagemIdaTexto: {
        textAlign: 'center',
    },
    tipoViagemIdaTextoGreen: {
        textAlign: 'center',
        color: "#FFF",
    },
    tipoViagemIdaVolta: {
        backgroundColor: "#DEE1DC",
        padding: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 20,
        width: 150,
    },
    tipoViagemIdaVoltaGreen: {
        backgroundColor: "#79c61e",
        padding: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
        marginLeft: 20,
        width: 150,
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
        marginBottom: 100,
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

export default AnunciarViagem;