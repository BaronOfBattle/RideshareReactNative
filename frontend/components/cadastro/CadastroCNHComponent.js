import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TextInput, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AppBar from '../AppBarComponent';
import { CustomText } from "../CustomTextComponent";
import BotaoComponent from '../BotaoComponent';

const CadastroCNH = ({ route, navigation }) => {
    const { userDetails } = route.params;
    const [updatedUserDetails, setUpdatedUserDetails] = useState(userDetails);
    const selectedOption = route.params;

    const [registroCNH, setRegistroCNH] = useState('');
    const [cpf, setCpf] = useState('');


    useEffect(() => {
        return () => {
            selectedOption;
        };
    }, []);

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 16],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [16, 16],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleContinue = () => {
        if (registroCNH && cpf && image) {
            const dadosCNH = { "registroCNH": registroCNH, "cpf": cpf, "fotoCNH": image };
            updatedUserDetails.cadastroCNH.data = dadosCNH;
            updatedUserDetails.cadastroCNH.status = 'Etapa concluída';

            navigation.navigate("cadastroMotorista", { userDetails: updatedUserDetails, selectedOption: "cadastroCNH" });
        } else {
            alert("Para prosseguir você deve preencher todos os campos e selecionar a foto da sua CNH!");
        }
    };



    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"} />
            <ScrollView>

                <View style={styles.dadosForm}>
                    <CustomText style={styles.titulo}>Carteira Nacional de Habilitação (CNH)</CustomText>
                    <CustomText style={styles.texto}>Informe o número de registro da CNH e seu CPF.</CustomText>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Registro da CNH'
                        onChangeText={setRegistroCNH}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='CPF'
                        onChangeText={setCpf}
                    />
                    <CustomText style={styles.texto}>Agora inclua uma foto do seu documento CNH.</CustomText>
                    {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, }} />}
                    <BotaoComponent
                        onPress={pickImage}
                        estilo={styles.botaoAddFoto}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
                            <MaterialIcons name="photo-library" size={24} color="black" />
                            <CustomText>  Selecionar da Galeria</CustomText>
                        </View>
                    </BotaoComponent>

                    <BotaoComponent
                        onPress={takePhoto}
                        estilo={styles.botaoAddFoto}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
                            <MaterialIcons name="photo-camera" size={24} color="black" />
                            <CustomText>  Tirar Foto</CustomText>
                        </View>
                    </BotaoComponent>
                </View>
                <View style={styles.continuar}>
                    <BotaoComponent
                        texto={"CONTINUAR"}
                        onPress={handleContinue}
                        estilo={styles.botaoContinuar}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    dadosForm: {
        padding: 30,
    },
    titulo: {
        color: "#79c61e",
        fontSize: 25,
        fontWeight: '600',
        marginBottom: 30,
    },
    texto: {
        fontSize: 16,
        marginBottom: 30,
    },
    textInput: {
        backgroundColor: "#EEE",
        color: "#111",
        fontFamily: "Poppins",
        marginBottom: 25,
        paddingLeft: 20,
        paddingVertical: 10,
        width: 350,
    },
    botaoAddFoto: {
        marginLeft: 10,
        alignItems: 'center',
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
        marginBottom: 50, 
    },
    botaoContinuar: {
        marginHorizontal: 40,
    },
});

export default CadastroCNH;