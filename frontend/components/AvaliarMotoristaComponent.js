import React, { useRef } from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import AppBar from "./AppBarComponent";
import { CustomText } from "./CustomTextComponent";
import StarRating from "./StarRatingComponent";
import BotaoComponent from "./BotaoComponent";
import BottomBar from "./BottomBarComponent";

export function AvaliarMotorista({ navigation }) {

    const nome = 'Gabriel';
    const cargo = 'PROFESSOR';
    const empresa = 'FAC SENAC';
    const tipoCarona = 'IDA';
    const valor = '4,00';
    const marcaCarro = 'FIAT';
    const modeloCarro = 'UNO 1.0 FIRE FLEX';


    return (
        <View style={styles.container}>
            <AppBar imgPerfil={true} menu={true}/>
            <ScrollView style={styles.content}>
                <CustomText style={styles.titulo}>AVALIAR O MOTORISTA</CustomText>
                <View style={styles.midMotorista}>
                    <View style={styles.motoristaInfo}>
                        <View style={styles.motoristaInfoText}>
                            <CustomText style={styles.infoTextNome}>{nome}</CustomText>
                            <CustomText style={styles.infoTextCargoEmpresa}>{cargo} — {empresa}</CustomText>
                            <CustomText style={styles.infoTextTipoValor}>{tipoCarona} - R$ {valor}</CustomText>
                        <CustomText style={styles.infoTextCarro}>{marcaCarro} {modeloCarro}</CustomText>
                        </View>
                        <View style={styles.midMotoristaInfoImg}>
                            <View style={styles.midMotoristaImage}>

                            </View>
                        </View>
                    </View>
                    <View style={styles.avaliacao}>
                        <CustomText>
                            <StarRating totalStars={5} rating={0} onRating={(rate) => null} />
                        </CustomText>
                    </View>
                </View>
                <View style={styles.continuar}>
                <BotaoComponent
                    texto={"Concluído"}
                    onPress={() => { navigation.navigate("Perfil") }}
                    estilo={styles.botaoContinuar}
                    estiloTexto={styles.botaoContinuarTexto}
                />
            </View>
            </ScrollView>
            <BottomBar navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        fontFamily: "Poppins",
    },
    content: {
        padding: 30,
    },
    titulo: {
        color: "#79c61e",
        fontSize: 18,
        marginBottom: 20,
        padding: 3,
        fontFamily: 'Poppins',
    },
    midMotorista: {
        flexDirection: 'column',
        backgroundColor: "#EEE",
        padding: 20,
        borderRadius: 10,
    },
    motoristaInfo: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    motoristaInfoText: {
        flexDirection: 'column',
    },
    infoTextNome: {
        fontSize: 17, 
        color: "#043F2D"
    }, 
    infoTextCargoEmpresa: {
        fontSize: 13, 
    }, 
    infoTextTipoValor: {
        marginTop: 8, 
        color: "#79c61e",
        fontSize: 17,
    },
    infoTextCarro: {
        fontSize: 13, 
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
    avaliacao: {
        flexDirection: 'row', 
    }, 
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
        marginTop: 200,
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

export default AvaliarMotorista;