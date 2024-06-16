import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AppBar from '../AppBarComponent';
import { CustomText } from "../CustomTextComponent";
import BotaoComponent from '../BotaoComponent';

const CadastroCNH = ({ route, navigation }) => {
    const selectedOption = route.params;

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

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleContinue = () => {
        navigation.navigate("cadastroMotorista", {selectedOption});
    };


    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"}/>
            <View style={styles.dadosForm}>
                <CustomText style={styles.titulo}>Carteira Nacional de Habilitação (CNH)</CustomText>
                <CustomText style={styles.texto}>Informe o número de registro da CNH e seu CPF.</CustomText>
                <TextInput
                    style={styles.textInput}
                    placeholder='Registro da CNH'
                />
                <TextInput
                    style={styles.textInput}
                    placeholder='CPF'
                />
                <CustomText style={styles.texto}>Agora inclua uma foto do seu documento CNH.</CustomText>
                {image && <Image source={{ uri: image }} style={{ width: 100, height: 100, borderRadius: 50, }} />}
                <BotaoComponent
                    onPress={pickImage}
                    estilo={styles.botaoAddFoto}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
                        <MaterialIcons name="photo-camera" size={24} color="black" />
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
        marginTop: 70,
    },
    botaoContinuar: {
        marginHorizontal: 40,
    },
});

export default CadastroCNH;