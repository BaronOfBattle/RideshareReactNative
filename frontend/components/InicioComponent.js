import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from "react-native";
import { UserContext } from "./UserContext";
import { ViagemContext } from "./ViagensContext";
import Constants from 'expo-constants';
import AppBar from "./AppBarComponent";
import { CustomText } from "./CustomTextComponent";
import AcompanharViagem from "./AcompanharViagem";
import BotaoComponent from "./BotaoComponent";
import BottomBar from './BottomBarComponent';

const apiUrl = Constants.manifest2.extra.expoClient.extra.apiUrl;

export function Inicio({ navigation }) {
    const { user } = useContext(UserContext);
    const { viagem } = useContext(ViagemContext);
    const [passageiroSelected, setpassageiroSelected] = useState(false);
    const [motoristaSelected, setmotoristaSelected] = useState(user.userCategory);
    const [tripPassenger, setTripPassenger] = useState(null);
    const [caronas, setCaronas] = useState([]);
    const [isCaronaSelecionada, setIsCaronaSelecionada] = useState(false);
    const [caronaSelecionada, setCaronaSelecionada] = useState(null);

    const [isIda, setIsIda] = useState(0);
    const titulo = ["IDA", "VOLTA", "IDA E VOLTA"];

    useEffect(() => {
        const fetchTripPassenger = async () => {
            try {
                const response = await fetch(`${apiUrl}tripPassenger/${user?._id}`);
                const data = await response.json();
                setTripPassenger(data.tripPassengers[0]);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (user) {
            fetchTripPassenger();
        }
    }, [user]);

    useEffect(() => {
        const fetchCarona = async () => {
            if (viagem) {
                try {
                    const response = await fetch(`${apiUrl}tripDriver/${viagem?._id}/${viagem?.destinationAddressId}`);
                    const data = await response.json();
                    const caronasWithDriversAndAddresses = data.tripDrivers?.map(tripDriver => ({
                        ...tripDriver,
                        motoristas: data.drivers.filter(driver => driver._id === tripDriver.tripDriver.userId),
                        veiculos: data.vehicles.filter(vehicle => vehicle.userId === tripDriver.tripDriver.userId),
                        enderecosFrom: data.addressesFrom.filter(address => address._id === tripDriver.tripDriver.fromAddressId),
                        enderecosDestination: data.addressesDestination.filter(address => address._id === tripDriver.tripDriver.destinationAddressId)
                    }));
                    setCaronas(caronasWithDriversAndAddresses);
                } catch (error) {
                    console.error('Sem dados');
                }
            } else {
                try {
                    const response = await fetch(`${apiUrl}tripDriver/${tripPassenger?._id}/${tripPassenger?.destinationAddressId}`);
                    const data = await response.json();
                    const caronasWithDriversAndAddresses = data.tripDrivers?.map(tripDriver => ({
                        ...tripDriver,
                        motoristas: data.drivers.filter(driver => driver._id === tripDriver.tripDriver.userId),
                        veiculos: data.vehicles.filter(vehicle => vehicle.userId === tripDriver.tripDriver.userId),
                        enderecosFrom: data.addressesFrom.filter(address => address._id === tripDriver.tripDriver.fromAddressId),
                        enderecosDestination: data.addressesDestination.filter(address => address._id === tripDriver.tripDriver.destinationAddressId)
                    }));
                    setCaronas(caronasWithDriversAndAddresses);
                } catch (error) {
                    console.error('Sem dados');
                }

            }
        }

        if (viagem || tripPassenger) {
            fetchCarona();
        }
    }, [viagem, tripPassenger]);

    const solicitarCarona = async () => {
        if (caronaSelecionada?.availableSeats) {
            (caronaSelecionada.availableSeats > 0) ? caronaSelecionada.availableSeats -= 1 : null;
            try {
                const response = await fetch(`${apiUrl}tripDriver/update/${caronaSelecionada?._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(caronaSelecionada),
                });
                if (response.ok) {
                } else {
                    console.error("Failed to submit data:", response);
                }
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }

            try {
                const response = await fetch(`${apiUrl}tripPassenger/pedirCarona/${user?._id}/${caronaSelecionada?._id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                }
                if (!response.ok) {
                    const errorBody = await response.text();
                    throw new Error(`Failed to submit data: ${errorBody}`);
                }
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        }

    };
    const handleSetIsIda = () => {
        setIsIda((isIda + 1) % 3);
    }

    const handleSelecionarCarona = (carona, key) => {
        setCaronaSelecionada(carona);
        setIsCaronaSelecionada(key);
        solicitarCarona();
    }
    const [isCarro, setIsCarro] = useState(true);


    return (
        <View style={styles.container}>
            <AppBar imgPerfil={true} menu={true} />
            {(user.userCategory === "2") && 
                (user.userCategory === "2") &&
                    <View style={styles.tipoViagem}>
                        <TouchableOpacity style={passageiroSelected ? styles.tipoViagemIdaGreen : styles.tipoViagemIda}
                            onPress={() => { setpassageiroSelected(true), setmotoristaSelected(false) }}
                        >
                            <CustomText style={passageiroSelected ? styles.tipoViagemIdaTextoGreen : styles.tipoViagemIdaTexto}>PASSAGEIRO</CustomText></TouchableOpacity>
                        <TouchableOpacity style={motoristaSelected ? styles.tipoViagemIdaVoltaGreen : styles.tipoViagemIdaVolta}
                            onPress={() => { setmotoristaSelected(true), setpassageiroSelected(false) }}
                        >
                            <CustomText style={motoristaSelected ? styles.tipoViagemIdaTextoGreen : styles.tipoViagemIdaTexto}>MOTORISTA</CustomText></TouchableOpacity>
                    </View>}

            {(((user.userCategory === "0")) || (user.userCategory === "2" && passageiroSelected)) &&
                <ScrollView>

                    <View style={styles.passageiroView}>
                        <View style={styles.mid}>
                            <View style={styles.titulos}>
                                <TouchableOpacity
                                    onPress={handleSetIsIda}
                                >
                                    <CustomText style={styles.titulo}>{titulo[isIda]}</CustomText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { setIsCarro(true) }}
                                >
                                    <CustomText style={isCarro ? styles.titulo : styles.tituloDisabled}>CARRO </CustomText>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { setIsCarro(false) }}
                                >
                                    <CustomText style={!isCarro ? styles.titulo : styles.tituloDisabled}>MOTO</CustomText>
                                </TouchableOpacity>
                            </View>
                            {tripPassenger ?
                                <View>
                                    {(caronas) ?
                                        caronas?.map((carona, index) => (
                                            ((carona?.veiculos[index]?.type === "Carro" || carona?.veiculos[index]?.type === "carro") && isCarro) ?
                                                <View>
                                                    <TouchableOpacity style={(isCaronaSelecionada === index) ? styles.midViagemBorderGreen : styles.midViagem} onPress={() => { (isCaronaSelecionada === index) ? setIsCaronaSelecionada(false) : handleSelecionarCarona(carona?.tripDriver, index) }}>

                                                        <View>
                                                            <React.Fragment key={index}>

                                                                <View style={styles.infoNomeEFoto}>
                                                                    <View>
                                                                        <CustomText style={styles.infoTextNome}>{carona?.motoristas[index]?.fullName}</CustomText>
                                                                        <CustomText style={styles.topInfoTextTipoValor}>{(carona?.tripDriver?.oneWay) ? "IDA" : "IDA E VOLTAS"} - R$ {carona.tripDriver.price}</CustomText>
                                                                        <CustomText style={styles.infoTextCarro}>{carona?.veiculos[index]?.brand} {carona?.veiculos[index]?.model}</CustomText>
                                                                        <CustomText style={styles.midViagemTextoHorario}>{carona?.tripDriver?.startTime}</CustomText>
                                                                    </View>
                                                                    <View style={styles.midMotoristaInfoImg}>
                                                                        <TouchableOpacity>
                                                                            <Image
                                                                                source={{ uri: `${carona?.motoristas[index]?.profilePictureAddress}` }}
                                                                                style={styles.midMotoristaImage}
                                                                            />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                                <CustomText style={styles.midViagemTextoPartida}>{carona?.enderecosFrom[index]?.street}</CustomText>
                                                                <CustomText style={styles.midViagemTexto}>{carona?.enderecosFrom[index]?.street}, {(carona?.enderecosFrom[index]?.number) ? carona?.enderecosFrom[index]?.number : "S/N"} — {carona?.enderecosFrom[index]?.city}</CustomText>
                                                                <CustomText style={styles.midViagemTextoDestino}>{carona?.enderecosDestination[index]?.street}</CustomText>
                                                                <CustomText style={styles.midViagemTexto}>{carona?.enderecosDestination[index]?.street}, {(carona?.enderecosDestination[index]?.number) ? carona?.enderecosDestination[index]?.number : "S/N"} — {carona?.enderecosDestination[index]?.city}</CustomText>
                                                            </React.Fragment>
                                                        </View>
                                                        {(isCaronaSelecionada === index) &&
                                                            <BotaoComponent
                                                                texto={"Solicitar carona"}
                                                                onPress={() => { navigation.navigate("resumoViagem") }}
                                                                estilo={styles.botaoSolicitarCarona}
                                                                estiloTexto={styles.botaoTextoSolicitarCarona}
                                                            />
                                                        }
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                ((carona?.veiculos[index]?.type === "Moto" || carona?.veiculos[index]?.type === "moto") && isCarro) &&
                                                <View>
                                                    <TouchableOpacity style={(isCaronaSelecionada === index) ? styles.midViagemBorderGreen : styles.midViagem} onPress={() => { (isCaronaSelecionada === index) ? setIsCaronaSelecionada(false) : handleSelecionarCarona(index) }}>

                                                        <View>
                                                            <React.Fragment key={index}>

                                                                <View style={styles.infoNomeEFoto}>
                                                                    <View>
                                                                        <CustomText style={styles.infoTextNome}>{carona?.motoristas[index]?.fullName}</CustomText>
                                                                        <CustomText style={styles.topInfoTextTipoValor}>{(carona?.tripDriver?.oneWay) ? "IDA" : "IDA E VOLTAS"} - R$ {carona.tripDriver.price}</CustomText>
                                                                        <CustomText style={styles.infoTextCarro}>{carona?.veiculos[index]?.brand} {carona?.veiculos[index]?.model}</CustomText>
                                                                        <CustomText style={styles.midViagemTextoHorario}>{carona?.tripDriver?.startTime}</CustomText>
                                                                    </View>
                                                                    <View style={styles.midMotoristaInfoImg}>
                                                                        <TouchableOpacity>
                                                                            <Image
                                                                                source={{ uri: `${carona?.motoristas[index]?.profilePictureAddress}` }}
                                                                                style={styles.midMotoristaImage}
                                                                            />
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                </View>
                                                                <CustomText style={styles.midViagemTextoPartida}>{carona?.enderecosFrom[index]?.street}</CustomText>
                                                                <CustomText style={styles.midViagemTexto}>{carona?.enderecosFrom[index]?.street}, {(carona?.enderecosFrom[index]?.number) ? carona?.enderecosFrom[index]?.number : "S/N"} — {carona?.enderecosFrom[index]?.city}</CustomText>
                                                                <CustomText style={styles.midViagemTextoDestino}>{carona?.enderecosDestination[index]?.street}</CustomText>
                                                                <CustomText style={styles.midViagemTexto}>{carona?.enderecosDestination[index]?.street}, {(carona?.enderecosDestination[index]?.number) ? carona?.enderecosDestination[index]?.number : "S/N"} — {carona?.enderecosDestination[index]?.city}</CustomText>
                                                            </React.Fragment>
                                                        </View>
                                                        {(isCaronaSelecionada === index) &&
                                                            <BotaoComponent
                                                                texto={"Solicitar carona"}
                                                                onPress={() => { navigation.navigate("resumoViagem") }}
                                                                estilo={styles.botaoSolicitarCarona}
                                                                estiloTexto={styles.botaoTextoSolicitarCarona}
                                                            />
                                                        }
                                                    </TouchableOpacity>
                                                </View>
                                        ))
                                        :
                                        <View>
                                            <CustomText style={{ textAlign: 'center', marginVertical: 15 }}>Não há motoristas com viagesn cadastradas!</CustomText>
                                        </View>
                                    } 
                                </View>
                                :
                                <View>
                                    <CustomText style={{ textAlign: 'center', marginVertical: 15 }}>Você não possui nenhuma viagem cadastrada!</CustomText>
                                </View>
                            }
                        </View>
                    </View>
                </ScrollView>
            }
            {
                (((user.userCategory === "1")) || (user.userCategory === "2" && motoristaSelected)) &&
                <AcompanharViagem navigation={navigation} showAppBar={false} showBottomBar={false} home={false} />
            }
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
    botaoSolicitarCarona: {
        backgroundColor: "#79C61E",
        width: 170,
        borderRadius: 12,
    },
    botaoTextoSolicitarCarona: {
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