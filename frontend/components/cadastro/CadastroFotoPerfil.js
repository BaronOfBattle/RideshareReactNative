import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AppBar from '../AppBarComponent';
import { CustomText } from '../CustomTextComponent';
import BotaoComponent from '../BotaoComponent';

const FotoPerfil = ({ route, navigation }) => {
    const { userDetails } = route.params;
    const [updatedUserDetails, setUpdatedUserDetails] = useState(userDetails);
    const { selectedOption } = route.params;

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
        if (image) {
            updatedUserDetails.fotoPerfil.data = image;
            updatedUserDetails.fotoPerfil.status = 'Etapa concluída';
            navigation.navigate("cadastroMotorista", { userDetails: updatedUserDetails, selectedOption: "fotoPerfil" });
        } else {
            alert("Por favor, selecione uma foto de perfil para continuar.");
        }
    };


    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"} />
            <View style={styles.perfil}>
                <CustomText style={styles.titulo}>Perfil do Usuário</CustomText>
                <CustomText style={styles.texto}>Adicione uma foto ao seu perfil para facilitar o reconhecimento pelos outros usuários.</CustomText>
                <CustomText style={styles.texto}>1. Certifique-se de estar de frente para a câmera.</CustomText>
                <CustomText style={styles.texto}>2. Escolha um ambiente bem iluminado.</CustomText>
                <CustomText style={styles.textoTres}>3. Qualidade: verifique se a foto está nítida para uma representação clara e precisa.</CustomText>
                {image && <Image source={{ uri: image }} style={{ width: 70, height: 70, borderRadius: 35, }} />}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    perfil: {
        padding: 30,
    },
    titulo: {
        color: "#79c61e",
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    texto: {
        fontSize: 16,
        marginBottom: 30,
    },
    textoTres: {
        fontSize: 16,
        marginBottom: 20,
    },
    botaoAddFoto: {
        marginLeft: 10,
        alignItems: 'center',
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
    },
    botaoContinuar: {
        marginHorizontal: 40,
    },
});

export default FotoPerfil;