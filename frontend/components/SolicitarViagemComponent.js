import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { UserContext } from "./UserContext";
import { ViagemContext } from "./ViagensContext";
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppBar from "./AppBarComponent";
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";
import BottomBar from "./BottomBarComponent";

const apiUrl = Constants.manifest2.extra.expoClient.extra.apiUrl;

export function SolicitarViagem({ navigation }) {
    const { user } = useContext(UserContext);
    const { setViagem } = useContext(ViagemContext);

    const [localPartida, setLocalPartida] = useState('');
    const [destino, setDestino] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [region, setRegion] = useState({
        latitude: -8.047562,
        longitude: -34.877051,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [timePickerVisible, setTimePickerVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [formattedSelectedTime, setFormattedSelectedTime] = useState('');
    const [tipoVeiculo, setTipoVeiculo] = useState("Carro");


    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocalPartida(`${location.coords.latitude}, ${location.coords.longitude}`);
    };

    const onRegionChange = (newRegion) => {
        setDestino({
            latitude: newRegion.latitude,
            longitude: newRegion.longitude,
        });
    };

    const onTimeChange = (event, selectedTime) => {
        setTimePickerVisible(false);
        if (selectedTime) {
            const currentTime = selectedTime || new Date();
            const formattedTime = currentTime.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            setSelectedTime(currentTime);
            setFormattedSelectedTime(formattedTime);
        }
    };

    const submitData = async () => {

        const viagem = {
            "fromAddressId": localPartida,
            "destinationAddressId": destino,
            "startTime": formattedSelectedTime,
            "vehicleType": tipoVeiculo,
            "userId": user._id
        };

        try {
            const response = await fetch(`${apiUrl}tripPassenger/cadastro`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(viagem),
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                setViagem(jsonResponse.data);
                navigation.navigate('solicitarCarona', { showAppBar: true, viagem: jsonResponse.data });
            } else {
                console.error('Failed to submit data:', response);
            }
        } catch (error) {
            console.error('Failed to submit data:', error);
        }
    };

    return (
        <View style={styles.container}>
            <AppBar imgPerfil={true} menu={true} />
            <View style={styles.viagem}>
                <CustomText style={styles.titulo}>Solicitar Viagem: </CustomText>
                <CustomText style={styles.texto}>Preencha os dados da sua viagem.</CustomText>
                <View style={modalVisible ? styles.backdrop : styles.backdropNone} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <MapView
                                style={styles.map}
                                initialRegion={region}
                                onRegionChangeComplete={onRegionChange}
                            >
                            </MapView>
                            {destino && (
                                <View style={styles.centeredMarker}>
                                    <Image source={require('../assets/favicon.png')} style={styles.markerImage} />
                                </View>
                            )}
                            <TouchableOpacity
                                style={styles.readyButton}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <TouchableOpacity style={styles.botaoProntoModalGreen}
                                    onPress={() => setModalVisible(!modalVisible)}
                                >
                                    <CustomText style={styles.botaoProntoModalTextoGreen}>PRONTO</CustomText>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.formViagem}>
                    <View style={styles.options}>
                        <TouchableOpacity style={styles.option} onPress={getLocation}>
                            <CustomText style={styles.optionCircle}> </CustomText>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Local da partida"
                                value={localPartida}
                                onChangeText={setLocalPartida}
                            />
                            <Image source={require("../assets/favicon.png")} style={styles.imageButton} onPress={getLocation} />
                        </TouchableOpacity>
                        <View style={styles.optionLine}><Text></Text></View>
                        <TouchableOpacity style={styles.option} onPress={null}>
                            <CustomText style={styles.optionCircle}> </CustomText>
                            <TextInput
                                style={styles.textInputDestino}
                                placeholder="Local de destino"
                                value={destino ? `${destino.latitude}, ${destino.longitude}` : ''}
                                onChangeText={setDestino}
                            />
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Image source={require("../assets/favicon.png")} style={styles.imageButtonDestino} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <View style={styles.optionLine}><Text></Text></View>
                        <TouchableOpacity style={styles.option} onPress={() => setTimePickerVisible(true)}>
                            <CustomText style={styles.optionCircle}> </CustomText>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Horário de saída"
                                value={formattedSelectedTime}
                                editable={false}
                            />

                        </TouchableOpacity>
                        {timePickerVisible && (
                            <DateTimePicker
                                value={selectedTime}
                                mode="time"
                                is24Hour={true}
                                display="default"
                                onChange={onTimeChange}
                            />
                        )}
                        <View style={styles.optionLine}><Text></Text></View>
                        {user && <TouchableOpacity style={styles.option} onPress={null}>
                            <CustomText style={styles.optionCircle}> </CustomText>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={setTipoVeiculo}
                                placeholder="Selecione o veículo"
                            >
                            </TextInput>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
            {!modalVisible && <View style={styles.continuar}>
                <BotaoComponent
                    texto={"Solicitar"}
                    // onPress={() => { navigation.navigate("solicitarCarona") }}
                    onPress={submitData}
                    estilo={styles.botaoContinuar}
                    estiloTexto={styles.botaoContinuarTexto}
                />
            </View>}
            <BottomBar navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },

    backdrop: {
        ...StyleSheet.absoluteFill,
        backgroundColor: 'rgba(0,0,0,0.7)',
        height: 2000
    },
    backdropNone: {

    },
    modalView: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: 100,
        paddingVertical: 100,
        paddingHorizontal: 25,
        height: 600,
        shadowColor: "#000",
        shadowOffset: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
    centeredMarker: {
        position: 'absolute',
        top: '75%',
        left: '50%',
        marginTop: -48,
    },
    markerImage: {
        width: 23,
        height: 39,
    },
    botaoProntoModalGreen: {
        backgroundColor: "#79C61E",
        padding: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
        width: 150,
    },
    botaoProntoModalTextoGreen: {
        textAlign: 'center',
        color: "#FFF",
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
    imageButton: {
        width: 15,
        height: 25,
    },
    textInputDestino: {
        backgroundColor: "#EEE",
        color: "#111",
        fontFamily: "Poppins",
        paddingLeft: 20,
        width: 245,
        marginBottom: 0,
    },
    imageButtonDestino: {
        width: 15,
        height: 25,
        marginLeft: 25
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