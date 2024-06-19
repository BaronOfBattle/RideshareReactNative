import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { UserContext } from "./UserContext";
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppBar from "./AppBarComponent";
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";
import BottomBar from './BottomBarComponent';

export function AnunciarViagem({ navigation }) {
    const { user } = useContext(UserContext);
    const [idaSelected, setIdaSelected] = useState(false);
    const [idaVoltaSelected, setIdaVoltaSelected] = useState(false);
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





    return (
        <View style={styles.container}>
            <AppBar imgPerfil={true} menu={true} />
            <ScrollView>

                <View style={styles.viagem}>
                    <CustomText style={styles.titulo}>Anunciar Viagem: </CustomText>
                    <CustomText style={styles.texto}>Preencha os dados da sua viagem.</CustomText>
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
                                    <CustomText style={styles.readyButtonText}>Pronto!</CustomText>
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
                            <View style={styles.option} onPress={null}>
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
                            </View>
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
                            <TouchableOpacity style={styles.option} onPress={null}>
                                <CustomText style={styles.optionCircle}> </CustomText>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Vagas disponíveis"
                                    keyboardType="number-pad"
                                    textContentType="telephoneNumber"
                                    maxLength={1}
                                    ></TextInput>
                            </TouchableOpacity>
                            <View style={styles.optionLine}><Text></Text></View>
                            { user && <TouchableOpacity style={styles.option} onPress={null}>
                                <CustomText style={styles.optionCircle}> </CustomText>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Selecione o veículo"></TextInput>
                            </TouchableOpacity>}
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
                        <TouchableOpacity style={styles.botaoLocalizacao} onPress={getLocation}>
                            <CustomText style={styles.botaoLocalizacaoTexto}>Usar Localização Atual</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <CustomText>Escolher no Mapa</CustomText>
                        </TouchableOpacity>
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
            </ScrollView>
            <BottomBar navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    map: {
        width: "100%",
        height: 400,
    },
    centeredMarker: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
    },
    markerImage: {
        width: 35,
        height: 57,
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
        width: 270,
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
    botaoLocalizacao: {
        backgroundColor: "#DEE1DC",
        padding: 13,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 10,
        width: 350,
    },
    botaoLocalizacaoTexto: {
        textAlign: "center",
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