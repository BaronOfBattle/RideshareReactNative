import React, { useState } from "react";
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";

export function Chat({ navigation }) {
    const [mensagens, setMensagens] = useState([]);
    const [mensagemAtual, setMensagemAtual] = useState("");

    const enviarMensagem = () => {
        if (mensagemAtual.trim().length > 0) {
            setMensagens([...mensagens, mensagemAtual]);
            setMensagemAtual("");
        }
    };


    return (
        <KeyboardAwareScrollView
    style={styles.container}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={styles.content}
    scrollEnabled={false}
>
            <View style={styles.content}>
                <View style={styles.info}>
                    <View style={styles.imagem}>
                    </View>
                    <CustomText style={styles.nome}>João</CustomText>
                </View>
                <View style={styles.mensagensView}>
                <ScrollView style={styles.mensagens}>
                    {mensagens.map((msg, index) => (
                        <CustomText style={styles.mensagemTexto} key={index}>{msg}</CustomText>
                    ))}
                </ScrollView>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Digitar..."
                        value={mensagemAtual}
                        onChangeText={setMensagemAtual}
                        onSubmitEditing={enviarMensagem}
                    />
                </View>
            </View>
            <View style={styles.continuar}>
                <BotaoComponent
                    texto={"VOLTAR"}
                    onPress={() => { navigation.navigate('Perfil') }}
                    estilo={styles.botaoVoltar}
                    estiloTexto={styles.voltarTexto}
                />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    content: {
        padding: 30,
    },
    info: {
        alignItems: "center"
    },
    imagem: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#EEE",
    },
    nome: {
        color: "#043F2D",
        marginBottom: 15, 
    },
    mensagensView: {
        marginBottom: 30,
        minHeight: 400,
        alignItems: "flex-end"
    },
    mensagemTexto: {
        textAlign: "right",
        backgroundColor: "#EEE",
        borderRadius: 500,
        marginBottom: 10,
        padding: 10,
        maxWidth: 250,
    },
    inputView: {

    },
    textInput: {
        backgroundColor: "#EEE",
        color: "#111",
        fontFamily: "Poppins",
        marginTop: 10,
        paddingLeft: 20,
        paddingVertical: 10,
        width: 330,
        borderRadius: 150,
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
    },
    botaoVoltar: {
        marginHorizontal: 40,
        backgroundColor: "#CDE5B0"
    },
    voltarTexto: {
        color: "#000",
    },
});

export default Chat;