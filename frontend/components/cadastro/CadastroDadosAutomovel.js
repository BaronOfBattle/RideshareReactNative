import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TextInput, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AppBar from '../AppBarComponent';
import { CustomText } from "../CustomTextComponent";
import BotaoComponent from '../BotaoComponent';
import RNPickerSelect from 'react-native-picker-select';

const DadosAutomovel = ({ route, navigation }) => {
    const { userDetails } = route.params;
    const [updatedUserDetails, setUpdatedUserDetails] = useState(userDetails);
    const selectedOption = route.params;

    const [tipoAutomovel, setTipoAutomovel] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [placa, setPlaca] = useState('');
    const [cor, setCor] = useState('');


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
        if (tipoAutomovel && marca && modelo && placa && cor && image) {
            const dadosAutomovel = { "tipoAutomovel": tipoAutomovel, "marca": marca, "modelo": modelo, "placa": placa, "cor": cor, "fotoDocumento": image };
            updatedUserDetails.dadosAutomovel.data = dadosAutomovel;
            updatedUserDetails.dadosAutomovel.status = 'Etapa concluída';
            navigation.navigate("cadastroMotorista", { userDetails: updatedUserDetails, selectedOption: "dadosAutomovel" });
        } else {
            alert("Para prosseguir você deve preencher todos os campos e selecionar a foto do documento do seu veículo!")
        }
    };



    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"} />
            <ScrollView>
                <View style={styles.dadosForm}>
                    <CustomText style={styles.titulo}>Dados do automóvel</CustomText>

                    <RNPickerSelect
                        onValueChange={(value) => setTipoAutomovel(value)}
                        items={[
                            { label: 'Carro', value: 'carro' },
                            { label: 'Moto', value: 'moto' },
                            { label: 'Ambos', value: 'ambos' },
                        ]}
                        style={pickerSelectStyles}
                        placeholder={{
                            label: 'Tipo de automóvel',
                            value: null,
                        }}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Marca'
                        onChangeText={setMarca}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Modelo'
                        onChangeText={setModelo}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Placa'
                        onChangeText={setPlaca}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder='Cor'
                        onChangeText={setCor}
                    />
                    <CustomText style={styles.texto}>Agora, inclua uma foto do documento do veículo.</CustomText>
                    {image && <Image source={{ uri: image }} style={{ width: 50, height: 50, borderRadius: 25, }} />}
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
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 15,
    },
    texto: {
        fontSize: 16,
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      marginBottom: 25, 
      paddingVertical: 12,
      paddingHorizontal: 10,
      backgroundColor: "#EEE", 
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: '#111',
      fontFamily: "Poppins",
      paddingRight: 30, 
    },
    inputAndroid: {
      fontSize: 4,
      marginBottom: 25, 
      backgroundColor: "#EEE", 
      color: '#111',
      fontFamily: "Poppins",
      width: 350, 
    },
  });

export default DadosAutomovel;