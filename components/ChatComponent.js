import React from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";

export function Char({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.imagem}>
            </View>
            <CustomText style={styles.nome}>João</CustomText>
            <ScrollView>
                <CustomText>Mensagens</CustomText>
                <CustomText>Mensagens</CustomText>
                <CustomText>Mensagens</CustomText>
            </ScrollView>
            <View style={styles.inputView}>
                <TextInput placeholder="Digitar..."></TextInput>
            </View>
            <View style={styles.continuar}>
                    <BotaoComponent
                        texto={"VOLTAR"}
                        onPress={() => { navigation.navigate('Perfil') }}
                        estilo={styles.botaoVoltar}
                        estiloTexto={styles.voltarTexto}
                    />
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    }, 
    imagem: {
        width: 40, 
        height: 40, 
        backgroundColor: "#EEE", 
    }, 
    nome: {
        color: "#043F2D"
    }, 
    inputView: {

    }, 
    botaoVoltar: {
        marginHorizontal: 40,
        backgroundColor: "#CDE5B0"
    },
    voltarTexto: {
        color: "#000",
    },
});