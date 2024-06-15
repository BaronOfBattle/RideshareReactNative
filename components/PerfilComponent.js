import React from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";

export function Perfil({ navigation }) {
    const nome = 'João Silva';
    const avaliacao = '4.8';
    const cargo = 'Professor';
    const empresa = 'FAC SENAC';
    const corridas = '56';
    const caronas = '6';

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.top}>
                    <View style={styles.topImage}>
                    </View>
                    <View style={styles.topInfo}>
                        <CustomText style={styles.topInfoText}>{nome}</CustomText>
                        <CustomText style={styles.topInfoText}>{avaliacao}</CustomText>
                        <CustomText style={styles.topInfoText}>{cargo} - {empresa}</CustomText>
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
                <BotaoComponent
                    texto={"Solicitar Viagem"}
                    onPress={() => { navigation.navigate('solicitarViagem'); }}
                    estilo={styles.botaoSolicitarViagem}
                />
                <BotaoComponent
                    texto={"Anunciar Viagem"}
                    onPress={() => { navigation.navigate('anunciarViagem'); }}
                    estilo={styles.botaoSolicitarViagem}
                />
            </ScrollView>
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
    botaoSolicitarViagem: {
        marginLeft: 40, 
        marginBottom: 40, 
    }, 
});

export default Perfil;