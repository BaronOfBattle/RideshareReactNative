import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { CustomText } from "./CustomTextComponent";
import AcompanharViagem from "./AcompanharViagem";
import BotaoComponent from "./BotaoComponent";
import BottomBar from './BottomBarComponent';

export function Inicio({ navigation }) {
    const [passageiroSelected, setpassageiroSelected] = useState(true);
    const [motoristaSelected, setmotoristaSelected] = useState(false);

    const [isIda, setIsIda] = useState(0);
    const titulo = ["IDA", "VOLTA", "IDA E VOLTA"];

    const handleSetIsIda = () => {
        setIsIda((isIda + 1) % 3);
    }

    const [isCarro, setIsCarro] = useState(true);

    const nome = 'João';
    const cargo = 'Professor';
    const tipoCarona = 'IDA';
    const valor = '4,00';
    const empresa = 'FAC SENAC';
    const marcaCarro = 'FIAT';
    const modeloCarro = 'UNO 1.0 FIRE FLEX';

    const horaSaida = '17:30';
    const enderecoPartida = 'Faculdade SENAC';
    const enderecoPartidaEndereco = 'R. do Pombal, 57 — Santo Amaro — Recife';
    const enderecoDestino = 'TI Pelópidas';
    const enderecoDestinoEndereco = 'Terminal Integrado Pelópidas — Paulista';

    const vagas = "2/3";

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.tipoViagem}>
                    <TouchableOpacity style={passageiroSelected ? styles.tipoViagemIdaGreen : styles.tipoViagemIda}
                        onPress={() => { setpassageiroSelected(!passageiroSelected), setmotoristaSelected(false) }}
                    >
                        <CustomText style={passageiroSelected ? styles.tipoViagemIdaTextoGreen : styles.tipoViagemIdaTexto}>PASSAGEIRO</CustomText></TouchableOpacity>
                    <TouchableOpacity style={motoristaSelected ? styles.tipoViagemIdaVoltaGreen : styles.tipoViagemIdaVolta}
                        onPress={() => { setmotoristaSelected(!motoristaSelected), setpassageiroSelected(false) }}
                    >
                        <CustomText style={motoristaSelected ? styles.tipoViagemIdaTextoGreen : styles.tipoViagemIdaTexto}>MOTORISTA</CustomText></TouchableOpacity>
                </View>
                {passageiroSelected &&
                 <View style={styles.passageiroView}>
                    <View style={styles.formViagem}>
                        <View style={styles.options}>
                            <TouchableOpacity style={styles.option} onPress={null}>
                                <CustomText style={styles.optionCircle}> </CustomText>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Local da partida"></TextInput>
                            </TouchableOpacity>
                            <View style={styles.optionLine}><CustomText></CustomText></View>
                            <TouchableOpacity style={styles.option} onPress={null}>
                                <CustomText style={styles.optionCircle}> </CustomText>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Local de destino"></TextInput>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.mid}>
                        <View style={styles.titulos}>
                            <TouchableOpacity
                                onPress={handleSetIsIda}
                            >
                                <CustomText style={styles.titulo}>{titulo[isIda]}</CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setIsCarro(!isCarro) }}
                            >
                                <CustomText style={isCarro ? styles.titulo : styles.tituloDisabled}>CARRO </CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setIsCarro(!isCarro) }}
                            >
                                <CustomText style={!isCarro ? styles.titulo : styles.tituloDisabled}>MOTO</CustomText>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.midViagem}>
                            <View style={styles.infoNomeEFoto}>
                                <View>
                                    <CustomText style={styles.infoTextNome}>{nome}</CustomText>
                                    <CustomText style={styles.topInfoTextTipoValor}>{tipoCarona} - R$ {valor}</CustomText>
                                    <CustomText style={styles.infoTextCarro}>{marcaCarro} {modeloCarro}</CustomText>
                                    <CustomText style={styles.midViagemTextoHorario}>{horaSaida}</CustomText>
                                </View>
                                <View style={styles.midMotoristaInfoImg}>
                                    <View style={styles.midMotoristaImage}>
                                    </View>
                                </View>
                            </View>
                            <CustomText style={styles.midViagemTextoPartida}>{enderecoPartida}</CustomText>
                            <CustomText style={styles.midViagemTexto}>{enderecoPartidaEndereco}</CustomText>
                            <CustomText style={styles.midViagemTextoDestino}>{enderecoDestino}</CustomText>
                            <CustomText style={styles.midViagemTexto}>{enderecoDestinoEndereco}</CustomText>
                        </View>
                        <View style={styles.midViagem}>
                            <View style={styles.infoNomeEFoto}>
                                <View>
                                    <CustomText style={styles.infoTextNome}>Maria</CustomText>
                                    <CustomText style={styles.topInfoTextTipoValor}>{tipoCarona} - R$ {valor}</CustomText>
                                    <CustomText style={styles.infoTextCarro}>{marcaCarro} {modeloCarro}</CustomText>
                                    <CustomText style={styles.midViagemTextoHorario}>{horaSaida}</CustomText>
                                </View>
                                <View style={styles.midMotoristaInfoImg}>
                                    <View style={styles.midMotoristaImage}>
                                    </View>
                                </View>
                            </View>
                            <CustomText style={styles.midViagemTextoPartida}>{enderecoPartida}</CustomText>
                            <CustomText style={styles.midViagemTexto}>{enderecoPartidaEndereco}</CustomText>
                            <CustomText style={styles.midViagemTextoDestino}>{enderecoDestino}</CustomText>
                            <CustomText style={styles.midViagemTexto}>{enderecoDestinoEndereco}</CustomText>
                        </View>
                    </View>
                </View>}
                {motoristaSelected &&
                <AcompanharViagem navigation={navigation}/>
                }
            </ScrollView>
            <BottomBar navigation={navigation} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        fontFamily: "Poppins",
    },
    tipoViagem: {
        flexDirection: 'row',
        justifyContent: "space-around",
        padding: 10,
    },
    tipoViagemIda: {
        backgroundColor: "#DEE1DC",
        padding: 13,
        paddingHorizontal: 25,
        borderRadius: 10,
        marginTop: 10,
        width: 150,
    },
    tipoViagemIdaGreen: {
        backgroundColor: "#79C61E",
        padding: 13,
        paddingHorizontal: 25,
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
    options: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
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
    top: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 35,
        borderBottomColor: "#EEE",
        borderBottomWidth: 1,
    },
    titulos: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
    },
    titulo: {
        color: "#79c61e",
        fontSize: 18,
        marginBottom: 20,
        padding: 3,
        fontFamily: 'Poppins',
    },
    tituloDisabled: {
        color: "#EEE",
        fontSize: 18,
        marginBottom: 20,
        padding: 3,
        fontFamily: 'Poppins',
    },
    infoNomeEFoto: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    midMotoristaInfoImg: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    midMotoristaImage: {
        width: 85,
        height: 80,
        backgroundColor: "#CCC",
        borderRadius: 45,
    },
    topInfoTextTipoValor: {
        color: "#79c61e",
        fontSize: 17,
    },
    infoTextCarro: {
        fontSize: 13,
    },
    mid: {
        flexDirection: 'column',
        padding: 30,
    },
    midText: {
        color: "#043F2D",
        fontSize: 20,
    },
    midViagem: {
        backgroundColor: "#EEE",
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
    },
    midViagemTextoHorario: {
        fontSize: 16,
        marginTop: 3,
        marginBottom: 10,
    },
    midViagemTextoPartida: {
        marginTop: 8,
        fontSize: 15,
        fontWeight: '500',
    },
    midViagemTexto: {
        margin: 3,
    },
    midViagemTextoDestino: {
        margin: 3,
        marginTop: 20,
        fontSize: 15,
        fontWeight: '500',
    },
    midViagemTextoVagas: {
        fontSize: 13,
        fontFamily: 'Poppins',
    },
    tituloBottom: {
        color: "#79c61e",
        fontSize: 18,
        marginBottom: 20,
        padding: 3,
        marginTop: 20,
        fontFamily: 'Poppins',
    }, midPassageiro: {
        flexDirection: 'column',
        backgroundColor: "#EEE",
        padding: 20,
        borderRadius: 10,
    },
    passageiroInfo: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    passageiroInfoText: {
        flexDirection: 'column',
    },
    infoTextNome: {
        fontSize: 17,
        color: "#043F2D"
    },
    infoTextCargoEmpresa: {
        fontSize: 13,
    },
    midPassageirosInfoImg: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    midPassageirosImage: {
        width: 85,
        height: 80,
        backgroundColor: "#CCC",
        borderRadius: 45,
    },
    avaliacao: {
        flexDirection: 'row',
    },
    continuar: {
        flexDirection: "row",
    },
    botaoSolicitarCarona: {
        marginBottom: 20,
        backgroundColor: "#79C61E"
    },
    botaoSolicitarCaronaConfirmacao: {
        marginHorizontal: 40,
        backgroundColor: "#E2E2E2"
    },
    solicitarCaronaTexto: {
        color: "#000",
    },
    botaoVoltar: {
        marginHorizontal: 40,
        backgroundColor: "#CDE5B0"
    },
    voltarTexto: {
        color: "#000",
    },
    botaoRecusar: {
        backgroundColor: "#CDE5B0",
        width: 140,
        marginRight: 30,
        borderRadius: 12,
    },
    botaoTexto: {
        marginHorizontal: 20,
        color: "#000",
    },
    botaoAceitar: {
        backgroundColor: "#79C61E",
        width: 140,
        borderRadius: 12,
    },
});

export default Inicio;