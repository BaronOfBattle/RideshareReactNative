import React, { useRef } from "react";
import { View, StyleSheet, TextInput, ScrollView } from "react-native";
import { CustomText } from "./CustomTextComponent";
import StarRating from "./StarRatingComponent";
import BotaoComponent from "./BotaoComponent";
import BottomBar from './BottomBarComponent';

export function AvaliarPassageiros({ navigation }) {

    const nome = 'João';
    const cargo = 'Professor';
    const avaliacao = '4.8';
    const empresa = 'FAC SENAC';


    return (
        <View style={styles.container}>
            <ScrollView style={styles.content}>
                <CustomText style={styles.titulo}>AVALIAR PASSAGEIROS</CustomText>
                <View style={styles.midPassageiro}>
                    <View style={styles.passageiroInfo}>
                        <View style={styles.passageiroInfoText}>
                            <CustomText style={styles.infoTextNome}>{nome}</CustomText>
                            <CustomText style={styles.infoTextCargoEmpresa}>{cargo} — {empresa}</CustomText>
                        </View>
                        <View style={styles.midPassageirosInfoImg}>
                            <View style={styles.midPassageirosImage}>

                            </View>
                        </View>
                    </View>
                    <View style={styles.avaliacao}>
                        <CustomText>
                            <StarRating totalStars={5} rating={0} onRating={(rate) => null} />
                        </CustomText>
                    </View>
                </View>
                <View style={[styles.midPassageiro, { marginTop: 25, }]}>
                    <View style={styles.passageiroInfo}>
                        <View style={styles.passageiroInfoText}>
                            <CustomText style={styles.infoTextNome}>Maria</CustomText>
                            <CustomText style={styles.infoTextCargoEmpresa}>PROFESSORA - FAC SENAC</CustomText>
                        </View>
                        <View style={styles.midPassageirosInfoImg}>
                            <View style={styles.midPassageirosImage}>
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
                    onPress={() => { navigation.goBack() }}
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
    midPassageiro: {
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

export default AvaliarPassageiros;