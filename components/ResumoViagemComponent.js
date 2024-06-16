import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { CustomText } from "./CustomTextComponent";
import StarRating from "./StarRatingComponent";
import BottomBar from './BottomBarComponent';

export function ResumoViagem({ navigation }) {

    const nome = 'João';
    const cargo = 'Professor';
    const tipoCarona = 'IDA';
    const valor = '4,00';
    const empresa = 'FAC SENAC';

    const horaSaida = '17:30';
    const enderecoPartida = 'Faculdade SENAC';
    const enderecoPartidaEndereco = 'R. do Pombal, 57 — Santo Amaro — Recife';
    const enderecoDestino = 'TI Pelópidas';
    const enderecoDestinoEndereco = 'Terminal Integrado Pelópidas — Paulista';

    const vagas = "2/3";

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.mid}>
                    <CustomText style={styles.titulo}>VIAGEM</CustomText>
                    <View style={styles.midViagem}>
                        <CustomText style={styles.topInfoTextTipoValor}>{tipoCarona} - R$ {valor}</CustomText>
                        <CustomText style={styles.midViagemTextoVagas}>VAGAS OCUPADAS: {vagas}</CustomText>
                        <CustomText style={styles.midViagemTextoHorario}>{horaSaida}</CustomText>
                        <CustomText style={styles.midViagemTextoPartida}>DE: {enderecoPartida}</CustomText>
                        <CustomText style={styles.midViagemTexto}>{enderecoPartidaEndereco}</CustomText>
                        <CustomText style={styles.midViagemTextoDestino}>PARA: {enderecoDestino}</CustomText>
                        <CustomText style={styles.midViagemTexto}>{enderecoDestinoEndereco}</CustomText>
                    </View>
                    <CustomText style={styles.tituloBottom}>AVALIE OS PASSAGEIROS</CustomText>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('avaliar') }}
                    >
                        <View style={styles.midPassageiro}>
                            <View style={styles.passageiroInfo}>
                                <View style={styles.passageiroInfoText}>
                                    <CustomText style={styles.infoTextNome}>{nome}</CustomText>
                                    <CustomText style={styles.infoTextCargoEmpresa}>{cargo} — {empresa}</CustomText>
                                </View>
                                <View style={styles.midPassageirosInfoImg}>
                                    <View style={styles.midPassageirosImage}>

                                    </View>
                                </View>
                            </View>
                            <View style={styles.avaliacao}>
                                <CustomText>
                                    <StarRating totalStars={5} rating={0} onRating={(rate) => null} />
                                </CustomText>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('avaliar') }}
                    >
                        <View style={[styles.midPassageiro, { marginTop: 25, marginBottom: 50, }]}>
                            <View style={styles.passageiroInfo}>
                                <View style={styles.passageiroInfoText}>
                                    <CustomText style={styles.infoTextNome}>Maria</CustomText>
                                    <CustomText style={styles.infoTextCargoEmpresa}>PROFESSORA - FAC SENAC</CustomText>
                                </View>
                                <View style={styles.midPassageirosInfoImg}>
                                    <View style={styles.midPassageirosImage}>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.avaliacao}>
                                <CustomText>
                                    <StarRating totalStars={5} rating={0} onRating={(rate) => null} />
                                </CustomText>
                            </View>
                        </View>
                    </TouchableOpacity>
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
        fontFamily: "Poppins",
    },
    top: {
        flexDirection: 'row',
        justifyContent: "space-between",
        paddingHorizontal: 35,
        borderBottomColor: "#EEE",
        borderBottomWidth: 1,
    },
    titulo: {
        color: "#79c61e",
        fontSize: 18,
        marginBottom: 20,
        padding: 3,
        fontFamily: 'Poppins',
    },
    topInfoTextTipoValor: {
        color: "#79c61e",
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
        marginTop: 20,
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

export default ResumoViagem;