import React, { useState, useRef } from "react";
import { View, StyleSheet, ScrollView, TextInput } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomText } from "./CustomTextComponent";
import BotaoComponent from "./BotaoComponent";

export function Chat({ navigation }) {
    const [mensagens, setMensagens] = useState([]);
    const [mensagemAtual, setMensagemAtual] = useState("");

    const scrollViewRef = useRef();

    const enviarMensagem = () => {
        if (mensagemAtual.trim().length > 0) {
            setMensagens([...mensagens, { text: mensagemAtual, isUser: true }]);
            setMensagemAtual("");
            setTimeout(() => {
                setMensagens(mensagens => [...mensagens, { text: "Lorem ipsum dolor sit amet...", isUser: false }]);
                scrollViewRef.current.scrollToEnd({ animated: true });
            }, 500);
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
                <ScrollView 
                ref={scrollViewRef}
                style={styles.mensagens}>
                    {mensagens.map((msg, index) => (
                        <View style={msg.isUser ? styles.mensagemUsuarioBackground : styles.respostaTextoBackground} key={index}>
                            <CustomText style={msg.isUser ? styles.mensagemUsuarioTexto : styles.respostaTexto}>{msg.text}</CustomText>
                        </View>
                    ))}

                </ScrollView>
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
        paddingHorizontal: 10,
        flex: 1,
        height: 100
    },
    info: {
        alignItems: "center",
        marginTop: 10,
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
    mensagens: {
        marginBottom: 10,
        paddingHorizontal: 0,
    },
    mensagemUsuarioBackground: {
        alignSelf: "flex-end",
        backgroundColor: "#EEE",
        borderRadius: 25,
        marginBottom: 10,
        padding: 10,
        maxWidth: 250,
    },
    mensagemUsuarioTexto: {
        textAlign: "right",
    },
    respostaTextoBackground: {
        alignSelf: "flex-start",
        backgroundColor: "#D3D3D3",
        borderRadius: 25,
        marginVertical: 20,
        padding: 10,
        maxWidth: 250,
    },
    respostaTexto: {
        textAlign: "left",
    },
    inputView: {
        paddingHorizontal: 30,
        alignItems: "center"
    },
    textInput: {
        backgroundColor: "#EEE",
        color: "#111",
        fontFamily: "Poppins",
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingLeft: 20,
        width: 380,
        borderRadius: 20,
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 50,
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