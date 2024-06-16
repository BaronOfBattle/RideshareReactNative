import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";
import BottomBar from "./BottomBarComponent";

export function SolicitarCarona({ navigation }) {

    const [confirmacao, setConfirmacao] = useState(0);
    const textoBotao = ["SOLICITAR CARONA", "AGUARDANDO CONFIRMAÇÃO", "CARONA CONFIRMADA"];

    const handlePress = () => {
        if (confirmacao === 2) {
            navigation.navigate('avaliarMotorista');
        }
        setConfirmacao(confirmacao + 1);
    };

    const nome = 'João';
    const cargo = 'Professor';
    const empresa = 'FAC SENAC';
    const avaliacao = '4.8';
    const tipoCarona = 'IDA';
    const valor = '4,00';
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
                <View style={styles.top}>
                    <View style={styles.topImage}>
                    </View>
                    <View style={styles.topInfo}>
                        <CustomText style={styles.topInfoText}>{nome}</CustomText>
                        <CustomText style={styles.topInfoText}>{cargo} - {empresa}</CustomText>
                        <CustomText style={styles.topInfoText}>{avaliacao}</CustomText>
                        <CustomText style={styles.topInfoTextTipoValor}>{tipoCarona} - R$ {valor}</CustomText>
                        <CustomText style={styles.topInfoText}>{marcaCarro} {modeloCarro}</CustomText>
                    </View>
                </View>
                <View style={styles.mid}>
                    <View style={styles.midViagem}>
                        <CustomText style={styles.midViagemTextoHorario}>HORÁRIO DE SAÍDA: {horaSaida}</CustomText>
                        <CustomText style={styles.midViagemTextoPartida}>DE: {enderecoPartida}</CustomText>
                        <CustomText style={styles.midViagemTexto}>{enderecoPartidaEndereco}</CustomText>
                        <CustomText style={styles.midViagemTextoDestino}>PARA: {enderecoDestino}</CustomText>
                        <CustomText style={styles.midViagemTexto}>{enderecoDestinoEndereco}</CustomText>
                        <CustomText style={styles.midViagemTextoVagas}>VAGAS: {vagas}</CustomText>
                    </View>
                </View>
                <View style={styles.continuar}>
                    <BotaoComponent
                        texto={textoBotao[confirmacao]}
                        onPress={handlePress}
                        estilo={confirmacao === 1 ? styles.botaoSolicitarCaronaConfirmacao : styles.botaoSolicitarCarona}
                        estiloTexto={styles.solicitarCaronaTexto}
                    />
                    <BotaoComponent
                        texto={confirmacao === 2 ? "ENVIE UMA MENSAGEM ": "VOLTAR"}
                        onPress={() => {
                            if (confirmacao === 2) {
                              navigation.navigate('Chat');
                            } else {
                              navigation.navigate('solicitarViagem');
                            }
                          }}
                        estilo={styles.botaoVoltar}
                        estiloTexto={styles.voltarTexto}
                    />
                </View>
            </ScrollView>
            <BottomBar navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    top: {
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 35,
        borderBottomColor: "#EEE",
        borderBottomWidth: 1,
    },
    topImage: {
        width: 85,
        height: 80,
        backgroundColor: "#EEE",
        borderRadius: 45,
    },
    topInfoText: {
        textAlign: 'right',
    },
    topInfoTextTipoValor: {
        color: "#79c61e",
        textAlign: "right",
        fontSize: 17,
        fontWeight: 'bold',
    },
    mid: {
        flexDirection: 'column',
        padding: 30,
    },
    midText: {
        color: "#043F2D",
        fontSize: 20,
        fontWeight: 'bold',
    },
    midViagem: {
        backgroundColor: "#EEE",
        padding: 20,
        borderRadius: 10,
    },
    midViagemTextoHorario: {
        fontSize: 16,
        fontWeight: 'bold',
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
        color: "#79c61e",
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
    },
    continuar: {
        marginTop: 50,
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
    },
    botaoSolicitarCarona: {
        marginHorizontal: 40,
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
        backgroundColor: "#CDE5B0",
        marginBottom: 80, 
    },
    voltarTexto: {
        color: "#000",
    },
});

export default SolicitarCarona;