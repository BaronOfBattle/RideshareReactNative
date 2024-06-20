import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { UserContext } from './UserContext';
import Constants from 'expo-constants';
import AppBar from "./AppBarComponent";
import { CustomText } from "./CustomTextComponent";
import { useCustomBackButton } from "./CustomBackButtonComponent";
import BotaoComponent from "./BotaoComponent";
import BottomBar from './BottomBarComponent';

const apiUrl = Constants.manifest2.extra.expoClient.extra.apiUrl;

export function Perfil({ navigation }) {
    useCustomBackButton(navigation);
    const { user } = useContext(UserContext);
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetch(`${apiUrl}company/company/user/${user?._id}`);
                const data = await response.json();
                setCompany(data.company);
            } catch (error) {
                console.error('Erro ao buscar dados', error);
            }
        };

        if (user) {
            fetchCompany();
        }
    }, [company]);

    const nome = user.fullName;
    const avaliacao = '4.8';
    const cargo = 'Professor';
    const empresa = 'FAC SENAC';
    const corridas = '56';
    const caronas = '6';
    const fotoPerfil = user.profilePictureAddres;

    return (
        <View style={styles.container}>
            <AppBar menu={true} />
            <ScrollView>
                <View style={styles.top}>
                    <TouchableOpacity>
                        <Image
                            source={{ uri: `${user.profilePictureAddress}` }}
                            style={styles.topImage}
                        />
                    </TouchableOpacity>
                    <View style={styles.topInfo}>
                        <CustomText style={styles.topInfoText}>{user.fullName}</CustomText>
                        <CustomText style={styles.topInfoText}>{avaliacao}</CustomText>
                        <CustomText style={styles.topInfoText}>{company?.position} - {company?.name}</CustomText>
                        <CustomText style={styles.topInfoText}>{corridas} Corridas - {caronas} Caronas</CustomText>
                    </View>
                </View>
                <View style={styles.mid}>
                    <CustomText style={styles.midText}>Viagens</CustomText>
                    <View style={styles.midViagem}>
                        <CustomText style={styles.midViagemTexto}>17 de abr - 17:30</CustomText>
                        <CustomText style={styles.midViagemTexto}>R. do Pombal, 57 – Santo Amaro</CustomText>
                        <CustomText style={styles.midViagemTexto}>Terminal Integrado Pelópidas</CustomText>
                    </View>
                    <View style={styles.midViagem}>
                        <CustomText style={styles.midViagemTexto}>17 de abr - 17:30</CustomText>
                        <CustomText style={styles.midViagemTexto}>R. do Pombal, 57 – Santo Amaro</CustomText>
                        <CustomText style={styles.midViagemTexto}>Terminal Integrado Pelópidas</CustomText>
                    </View>
                    <View style={styles.midViagem}>
                        <CustomText style={styles.midViagemTexto}>17 de abr - 17:30</CustomText>
                        <CustomText style={styles.midViagemTexto}>R. do Pombal, 57 – Santo Amaro</CustomText>
                        <CustomText style={styles.midViagemTexto}>Terminal Integrado Pelópidas</CustomText>
                    </View>
                    <View style={styles.midViagem}>
                        <CustomText style={styles.midViagemTexto}>17 de abr - 17:30</CustomText>
                        <CustomText style={styles.midViagemTexto}>R. do Pombal, 57 – Santo Amaro</CustomText>
                        <CustomText style={styles.midViagemTexto}>Terminal Integrado Pelópidas</CustomText>
                    </View>
                    <View style={styles.midViagem}>
                        <CustomText style={styles.midViagemTexto}>17 de abr - 17:30</CustomText>
                        <CustomText style={styles.midViagemTexto}>R. do Pombal, 57 – Santo Amaro</CustomText>
                        <CustomText style={styles.midViagemTexto}>Terminal Integrado Pelópidas</CustomText>
                    </View>
                    <View style={styles.midViagem}>
                        <CustomText style={styles.midViagemTexto}>17 de abr - 17:30</CustomText>
                        <CustomText style={styles.midViagemTexto}>R. do Pombal, 57 – Santo Amaro</CustomText>
                        <CustomText style={styles.midViagemTexto}>Terminal Integrado Pelópidas</CustomText>
                    </View>
                </View>
                {/*<BotaoComponent
                    texto={"Solicitar Viagem"}
                    onPress={() => { navigation.navigate('solicitarViagem'); }}
                    estilo={styles.botaoSolicitarViagem}
                />
                 <BotaoComponent
texto={"Anunciar Viagem"}
onPress={() => { navigation.navigate('anunciarViagem'); }}
estilo={styles.botaoSolicitarViagem}
/> */}
                <View style={styles.margin}></View>
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
    mid: {
        flexDirection: 'column',
        padding: 35,
    },
    midText: {
        color: "#043F2D",
        fontSize: 20,
        fontWeight: 'bold',
    },
    midViagem: {
        backgroundColor: "#EEE",
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    midViagemTexto: {
        margin: 3,
    },
    margin: {
        marginBottom: 50
    }, 
    botaoSolicitarViagem: {
        marginLeft: 40,
        marginBottom: 80,
    },
});

export default Perfil;