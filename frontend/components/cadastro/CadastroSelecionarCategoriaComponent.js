import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppBar from '../AppBarComponent';
import { CustomText } from '../CustomTextComponent';
import BotaoComponent from '../BotaoComponent';

export function SelecionarCategoria({ navigation }) {
    const [selectedCategoria, setSelectedCategoria] = useState(null);

    const handleOptionPress = (option) => {
        setSelectedCategoria(option);
    };

    const handleContinue = () => {
        navigation.navigate("cadastroMotorista", { selectedCategoria });
    };

    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"}/>
            <View style={styles.categoria}>
                <CustomText style={styles.textoCategoria}>Selecione uma categoria</CustomText>
                <CustomText style={styles.textoCategoriaModificada}>A opção escolhida pode ser modificada a qualquer momento</CustomText>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('motorista')}>
                        <CustomText style={selectedCategoria === 'motorista' ? styles.optionCircleGreen : styles.optionCircle}> </CustomText>
                        <CustomText style={selectedCategoria === 'motorista' ? styles.optionTextMotoGreen : styles.optionTextMoto}>Motorista</CustomText>
                    </TouchableOpacity>
                    <View style={styles.optionLine}>
                        <Text></Text>
                    </View>
                    <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('passageiro')}>
                        <CustomText style={selectedCategoria === 'passageiro' ? styles.optionCircleGreen : styles.optionCircle}> </CustomText>
                        <CustomText style={selectedCategoria === 'passageiro' ? styles.optionTextPassGreen : styles.optionTextPass}>Passageiro (a)</CustomText>
                    </TouchableOpacity>
                    <View style={styles.optionLine}>
                        <Text></Text>
                    </View>
                    <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('ambos')}>
                        <CustomText style={selectedCategoria === 'ambos' ? styles.optionCircleGreen : styles.optionCircle}> </CustomText>
                        <CustomText style={selectedCategoria === 'ambos' ? styles.optionTextAmbGreen : styles.optionTextAmb}>Ambos</CustomText>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'flex-start',
    },
    categoria: {
        padding: 30,
        marginBottom: 230,
    },
    textoCategoria: {
        fontSize: 24,
        color: "#79c61e",
        marginBottom: 10,
    },
    textoCategoriaModificada: {
        fontSize: 16,
    },
    options: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 50,
    },
    option: {
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: "#EEE",
        width: 220,
        paddingVertical: 18,
    },
    optionCircle: {
        backgroundColor: "#CCC",
        height: 15,
        width: 15,
        borderRadius: 7.5,
    },
    optionCircleGreen: {
        backgroundColor: "#79c61e",
        height: 15,
        width: 15,
        borderRadius: 7.5,
    },
    optionTextMoto: {
        textAlign: 'center',
        marginLeft: 40,
        marginRight: 60,
    },
    optionTextMotoGreen: {
        textAlign: 'center',
        marginLeft: 40,
        marginRight: 60,
        color: "#79c61e",
    },
    optionTextPass: {
        textAlign: 'center',
        marginLeft: 29,
        marginRight: 33,
    },
    optionTextPassGreen: {
        textAlign: 'center',
        marginLeft: 29,
        marginRight: 33,
        color: "#79c61e",
    },
    optionTextAmb: {
        textAlign: 'center',
        marginLeft: 45,
        marginRight: 70,
    },
    optionTextAmbGreen: {
        textAlign: 'center',
        marginLeft: 45,
        marginRight: 70,
        color: "#79c61e",
    },
    optionLine: {
        backgroundColor: "#FFF",
        borderLeftColor: "#EEE",
        borderLeftWidth: 3,
        marginRight: 170,
        height: 10, 
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
        marginTop: 10,
    },
    botaoContinuar: {
        marginHorizontal: 40,
    },
});

export default SelecionarCategoria;