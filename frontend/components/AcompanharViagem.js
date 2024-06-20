import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import { UserContext } from "./UserContext";
import { ViagemContext } from "./ViagensContext";
import Constants from 'expo-constants';
import AppBar from "./AppBarComponent";
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";
import BottomBar from './BottomBarComponent';

const apiUrl = Constants.manifest2.extra.expoClient.extra.apiUrl;

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
                const response = await fetch(`${apiUrl}tripDriver/${user?._id}`);
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
                const response = await fetch(`${apiUrl}tripDriver/solicitacoes/verificar/${tripDriver._id}`);
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
                const response = await fetch(`${apiUrl}address/${tripDriver?.fromAddressId}`);
                const data = await response.json();
                setPartida(data.address);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (!partida && tripDriver) {
            fetchFromAddress();
        }
    }, [tripDriver]);

    useEffect(() => {
        const fetchToAddress = async () => {
            try {
                const response = await fetch(`${apiUrl}address/${tripDriver?.destinationAddressId}`);
                const data = await response.json();
                setDestino(data.address);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (!destino && tripDriver) {
            fetchToAddress();
        }
    }, [tripDriver]);

    useEffect(() => {
        const fetchTripPassengers = async () => {
            try {
                const response = await fetch(`${apiUrl}tripPassenger/${tripDriver?._id}`);
                const data = await response.json();
                setPassengers(data);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (!passengers && tripDriver) {
            fetchTripPassengers();
        }
    }, [tripDriver]);

    const nome = 'João';
    const cargo = 'Professor';
    const avaliacao = '4.8';
    const empresa = 'FAC SENAC';

    return (
        <View style={styles.container}>
            {showAppBar && <AppBar imgPerfil={true} menu={true} />}
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
            <View style={styles.mid}>
                <ScrollView>

                    <CustomText style={styles.titulo}>{(tripDriver) ? "ACOMPANHE SUA VIAGEM" : "INICIE UMA VIAGEM"}</CustomText>
                    {tripDriver ? <View style={styles.midViagem}>
                        <CustomText style={styles.topInfoTextTipoValor}>{tripDriver?.oneWay ? "IDA" : "IDA E VOLTA"} - R$ {tripDriver?.price}</CustomText>
                        <CustomText style={styles.midViagemTextoVagas}>VAGAS DISPONÍVEIS: {tripDriver?.availableSeats}</CustomText>
                        <CustomText style={styles.midViagemTextoHorario}>{tripDriver?.startTime}</CustomText>
                        <CustomText style={styles.midViagemTextoPartida}>DE: {partida?.street}</CustomText>
                        <CustomText style={styles.midViagemTexto}>{partida?.street}, {(partida?.number) ? partida?.number : "S/N"} — {partida?.city}, {partida?.state}</CustomText>
                        <CustomText style={styles.midViagemTextoDestino}>PARA: {destino?.street}</CustomText>
                        <CustomText style={styles.midViagemTexto}>{destino?.street}, {(destino?.number) ? destino?.number : "S/N"} — {destino?.city}, {destino?.state}</CustomText>
                    </View> : <View style={styles.anunciarViagem}>
                        <CustomText>Você não possui nenhuma viagem ativa.</CustomText>
                        <CustomText>Inicie uma nova Viagem: </CustomText>
                        <BotaoComponent
                                    texto={"Iniciar nova viagem"}
                                    onPress={() => { navigation.navigate("anunciarViagem") }}
                                    estilo={styles.botaoAnunciarViagem}
                                    estiloTexto={styles.botaoTextoAnunciarViagem}
                                />
                    </View>
                    }
                </ScrollView>
                    <CustomText style={styles.tituloBottom}>{tripDriver ? "SOLICITAÇÕES DE PASSAGEIROS" : null}</CustomText>
                { tripDriver && 
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
                />}
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
    anunciarViagem: {
        flexDirection: 'column',
        alignItems: "center",
        marginTop: 250
    }, 
    botaoAnunciarViagem: {
        backgroundColor: "#79C61E",
        width: 200,
        borderRadius: 12,
    }, 
    botaoTextoAnunciarViagem: {
        marginHorizontal: 5,
        color: "#000",
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