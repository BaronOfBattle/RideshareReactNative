import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { UserContext } from "./UserContext";
import { ViagemContext } from "./ViagensContext";
import Constants from 'expo-constants';
import AppBar from "./AppBarComponent";
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";
import BottomBar from "./BottomBarComponent";

const apiUrl = Constants.manifest2.extra.expoClient.extra.apiUrl;

export function SolicitarCarona({ navigation }) {
    const { user } = useContext(UserContext);
    const { viagem } = useContext(ViagemContext);
    const [company, setCompany] = useState(null);
    const [partida, setPartida] = useState(null);
    const [destino, setDestino] = useState(null);
    const [caronas, setCaronas] = useState([]);
    const [enderecosCaronaFrom, setEnderecosCaronaFrom] = useState([]);
    const [enderecosCaronaDestination, setEnderecosCaronaDestination] = useState([]);
    const [caronaSelecionada, setCaronaSelecionada] = useState(null);

    const [confirmacao, setConfirmacao] = useState(0);
    const textoBotao = ["SOLICITAR CARONA", "AGUARDANDO CONFIRMAÇÃO", "CARONA CONFIRMADA"];

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetch(`${apiUrl}company/user/${user?._id}`);
                const data = await response.json();
                setCompany(data.company);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (user && !company) {
            fetchCompany();
        }
    }, [company]);

    useEffect(() => {
        const fetchFromAddress = async () => {
            try {
                const response = await fetch(`${apiUrl}address/${viagem?.fromAddressId}`);
                const data = await response.json();
                setPartida(data);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (!partida) {
            fetchFromAddress();
        }
    }, [partida]);

    useEffect(() => {
        const fetchToAddress = async () => {
            try {
                const response = await fetch(`${apiUrl}address/${viagem?.destinationAddressId}`);
                const data = await response.json();
                setDestino(data);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (!destino) {
            fetchToAddress();
        }
    }, [destino]);

    useEffect(() => {
        const fetchCarona = async () => {
            try {
                const response = await fetch(`${apiUrl}tripDriver/${viagem?._id}/${viagem?.destinationAddressId}`);
                const data = await response.json();
                const caronasWithAddresses = data.tripDrivers.map(tripDriver => ({
                    ...tripDriver,
                    enderecosFrom: data.addressesFrom.filter(address => address._id === tripDriver.tripDriver.fromAddressId),
                    enderecosDestination: data.addressesDestination.filter(address => address._id === tripDriver.tripDriver.destinationAddressId)
                }));
                setCaronas(caronasWithAddresses);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (!caronas.length && viagem) {
            fetchCarona();
        }
    }, [caronas]);

    const solicitarCarona = async () => {
        if (confirmacao === 2) {
            navigation.navigate('avaliarMotorista');
        }

        (caronaSelecionada.availableSeats > 0) ? caronaSelecionada.availableSeats -= 1 : null;
        try {
            const response = await fetch(`${apiUrl}tripDriver/update/${caronaSelecionada._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(caronaSelecionada),
            });
            if (response.ok) {
                setConfirmacao((confirmacao + 1) % 3);
            } else {
                console.error("Failed to submit data:", response);
            }
        } catch (error) {
            console.error('Erro ao buscar dados', error);
        }

        try {
            const response = await fetch(`${apiUrl}tripPassenger/pedirCarona/${user._id}/${caronaSelecionada._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                setConfirmacao((confirmacao + 1) % 3);
            }
            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Failed to submit data: ${errorBody}`);
            }
        } catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    };

    const handleSelecionarCarona = (key) => {
        setCaronaSelecionada(caronas[key].tripDriver)
    }


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
            <AppBar imgPerfil={true} menu={true} />
            <View style={styles.top}>
                <TouchableOpacity>
                    <Image
                        source={{ uri: `${user.profilePictureAddress}` }}
                        style={styles.topImage}
                    />
                </TouchableOpacity>
                <View style={styles.topInfo}>
                    <CustomText style={styles.topInfoText}>{user?.fullName}</CustomText>
                    <CustomText style={styles.topInfoText}>{company?.position} - {company?.name}</CustomText>
                    <CustomText style={styles.topInfoText}>{avaliacao}</CustomText>
                    {/*<CustomText style={styles.topInfoTextTipoValor}>{tipoCarona} - R$ {valor}</CustomText>*/}
                    {/*<CustomText style={styles.topInfoText}>{marcaCarro} {modeloCarro}</CustomText>*/}
                </View>
            </View>
            <ScrollView>
                <View style={styles.mid}>
                    {caronas?.map((carona, index) => (
                        <React.Fragment key={index}>
                            <TouchableOpacity style={(caronaSelecionada === carona.tripDriver) ? styles.midViagemBorderGreen : styles.midViagem} onPress={() => { handleSelecionarCarona(index) }}>
                                <CustomText style={styles.midViagemTextoHorario}>HORÁRIO DE SAÍDA: {carona.tripDriver.startTime}</CustomText>
                                <CustomText style={styles.midViagemTextoTipoValor}>{tipoCarona} - R$ {carona.tripDriver.price}</CustomText>
                                {carona.enderecosFrom.map((endereco, index) => (
                                    <React.Fragment key={index}>
                                        <CustomText style={styles.midViagemTextoPartida}>DE: {endereco?.street}</CustomText>
                                        <CustomText style={styles.midViagemTexto}>
                                            {endereco?.street}, {(endereco?.number) ? endereco?.number : "S/N"} — {endereco?.city}, {endereco?.state}
                                        </CustomText>
                                    </React.Fragment>
                                ))}

                                {carona.enderecosDestination.map((endereco, index) => (
                                    <React.Fragment key={index}>
                                        <CustomText style={styles.midViagemTextoDestino}>PARA: {endereco?.street}</CustomText>
                                        <CustomText style={styles.midViagemTexto}>
                                            {endereco?.street}, {(endereco?.number) ? endereco?.number : "S/N"} — {endereco?.city}, {endereco?.state}
                                        </CustomText>
                                    </React.Fragment>
                                ))}

                                <CustomText style={styles.midViagemTextoVagas}>VAGAS: {carona.tripDriver.availableSeats}</CustomText>
                            </TouchableOpacity>
                        </React.Fragment>
                    ))}
                </View>
            </ScrollView >
            <View style={styles.continuar}>
                <BotaoComponent
                    texto={textoBotao[confirmacao]}
                    onPress={solicitarCarona}
                    estilo={confirmacao === 1 ? styles.botaoSolicitarCaronaConfirmacao : styles.botaoSolicitarCarona}
                    estiloTexto={styles.solicitarCaronaTexto}
                />
                <BotaoComponent
                    texto={confirmacao === 2 ? "ENVIE UMA MENSAGEM " : "VOLTAR"}
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
            <BottomBar navigation={navigation} />
        </View >
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
        marginBottom: 30,
    },
    midViagemBorderGreen: {
        backgroundColor: "#EEE",
        padding: 20,
        borderRadius: 10,
        borderWidth: 1.8,
        borderColor: "#79c61e",
        marginBottom: 30,
    },
    midViagemTextoHorario: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    midViagemTextoTipoValor: {
        color: "#79c61e",
        fontSize: 17,
        marginVertical: 5,
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
        marginTop: 0,
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