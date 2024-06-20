import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import { UserContext } from "./UserContext";
import { ViagemContext } from "./ViagensContext";
import AppBar from "./AppBarComponent";
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";
import BottomBar from './BottomBarComponent';

export function AcompanharViagem({ navigation, showAppBar = true, showBottomBar = true, home = true, }) {
    const { user } = useContext(UserContext);
    const { viagem } = useContext(ViagemContext);
    const [partida, setPartida] = useState(null);
    const [destino, setDestino] = useState(null);
    const [passengers, setPassengers] = useState(null);
    const [solicitacoes, setSolicitacoes] = useState([]);

    const [tripDriver, setTripDriver] = useState(null);

    useEffect(() => {
        const fetchTripDriver = async () => {
            try {
                const response = await fetch(`http://192.168.0.10:3000/tripDriver/${user?._id}`);
                const data = await response.json();
                setTripDriver(data.tripDrivers[0]);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (viagem || user) {
            fetchTripDriver();
        }
    }, [viagem]);

    useEffect(() => {
        const fetchTripSolicitation = async () => {
            try {
                const response = await fetch(`http://192.168.0.10:3000/tripDriver/solicitacoes/verificar/${tripDriver._id}`);
                const data = await response.json();
                if (data.tripSolicitations) {
                    setSolicitacoes(data.tripSolicitations);
                }
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (solicitacoes.length === 0 && tripDriver) {
            fetchTripSolicitation();
        }
    }, [tripDriver]);


    useEffect(() => {
        const fetchFromAddress = async () => {
            try {
                const response = await fetch(`http://192.168.0.10:3000/address/${tripDriver[0]?.fromAddressId}`);
                const data = await response.json();
                setPartida(data);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (!partida && tripDriver) {
            fetchFromAddress();
        }
    }, [partida]);

    useEffect(() => {
        const fetchToAddress = async () => {
            try {
                const response = await fetch(`http://192.168.0.10:3000/address/${tripDriver[0]?.destinationAddressId}`);
                const data = await response.json();
                setDestino(data);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (!destino && tripDriver) {
            fetchToAddress();
        }
    }, [destino]);

    useEffect(() => {
        const fetchTripPassengers = async () => {
            try {
                const response = await fetch(`http://192.168.0.10:3000/tripPassenger/${viagem?._id}`);
                const data = await response.json();
                setPassengers(data);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (!passengers) {
            fetchTripPassengers();
        }
    }, [passengers]);

    const nome = 'João';
    const cargo = 'Professor';
    const avaliacao = '4.8';
    const empresa = 'FAC SENAC';

    return (
        <View style={styles.container}>
            {showAppBar && <AppBar imgPerfil={true} menu={true} />}
            <ScrollView>
                {home &&
                    <View style={styles.top}>
                        <BotaoComponent
                            texto={"INICIAR VIAGEM"}
                            onPress={() => { navigation.navigate('resumoViagem') }}
                            estilo={styles.botaoSolicitarCarona}
                            estiloTexto={styles.solicitarCaronaTexto}
                        />
                    </View>
                }
            </ScrollView>
            <View style={styles.mid}>
                <ScrollView>

                    <CustomText style={styles.titulo}>{"ACOMPANHE SUA VIAGEM"}</CustomText>
                    <View style={styles.midViagem}>
                        <CustomText style={styles.topInfoTextTipoValor}>{tripDriver?.oneWay ? "IDA" : "IDA E VOLTA"} - R$ {tripDriver?.price}</CustomText>
                        <CustomText style={styles.midViagemTextoVagas}>VAGAS DISPONÍVEIS: {tripDriver?.availableSeats}</CustomText>
                        <CustomText style={styles.midViagemTextoHorario}>{tripDriver?.startTime}</CustomText>
                        <CustomText style={styles.midViagemTextoPartida}>DE: {partida?.addresss?.street}</CustomText>
                        <CustomText style={styles.midViagemTexto}>{partida?.addresss?.street}, {(partida?.addresss?.number) ? partida?.addresss?.number : "S/N"} — {partida?.addresss?.city}, {partida?.addresss?.state}</CustomText>
                        <CustomText style={styles.midViagemTextoDestino}>PARA: {destino?.addresss?.street}</CustomText>
                        <CustomText style={styles.midViagemTexto}>{destino?.addresss?.street}, {(destino?.addresss?.number) ? destino?.addresss?.number : "S/N"} — {destino?.addresss?.city}, {destino?.addresss?.state}</CustomText>
                    </View>
                    <CustomText style={styles.tituloBottom}>{"SOLICITAÇÕES DE PASSAGEIROS"}</CustomText>
                </ScrollView>
                <FlatList
                    data={solicitacoes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={[styles.midPassageiros, { marginBottom: 50, }]}>
                            <View style={styles.midPassageirosInfoImg}>
                                <View style={styles.midPassageirosInfo}>
                                    <CustomText style={styles.topInfoText}>{item.userInfo}</CustomText>
                                    <CustomText style={styles.topInfoText}>{item.company.position} - {item.company.name}</CustomText>
                                    <CustomText style={styles.topInfoText}>{avaliacao}</CustomText>
                                </View>
                                <TouchableOpacity>
                                    <Image
                                        source={{ uri: `${item.userId.profilePictureAddress}` }}
                                        style={styles.midPassageirosImage}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.continuar}>
                                <BotaoComponent
                                    texto={"Recusar"}
                                    onPress={() => { console.log("Recusou a solicitação de", item.userInfo) }}
                                    estilo={styles.botaoRecusar}
                                    estiloTexto={styles.botaoTexto}
                                />
                                <BotaoComponent
                                    texto={"Aceitar"}
                                    onPress={() => { console.log("Aceitou a solicitação de", item.userInfo) }}
                                    estilo={styles.botaoAceitar}
                                    estiloTexto={styles.botaoTexto}
                                />
                            </View>
                        </View>
                    )}
                />
            </View>
            {showBottomBar && <BottomBar navigation={navigation} />}
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
        marginBottom: 30
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
    },
    midPassageiros: {
        backgroundColor: "#EEE",
        padding: 20,
        borderRadius: 10,
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

export default AcompanharViagem;