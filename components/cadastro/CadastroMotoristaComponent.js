import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppBar from '../AppBarComponent';
import { CustomText } from '../CustomTextComponent';
import BotaoComponent from '../BotaoComponent';

export function CadatroMotorista({ route, navigation }) {
    const options = ['fotoPerfil', 'dadosEmpresa'];
    const [selectedOption, setSelectedOption] = useState('null');
    const { selectedCategoria } = route.params;

    if (selectedCategoria !== 'passageiro') {
        options.push('dadosAutomovel', 'cadastroCNH');
    }
    options.push('termosDeSeguranca');

    const handleOptionPress = (option) => {
        setSelectedOption(option);
        navigation.navigate(option, { selectedOption });
    };

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                if (route.params) {
                    setSelectedOption(route.params.selectedOption);
                }
            });

            return unsubscribe;
        }, [navigation])
    );

    const handleContinue = () => {
        navigation.navigate("bemVindo");
    };

    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"}/>
            <View style={styles.categoria}>
                <CustomText style={styles.titulo}>Cadastro de motoristas</CustomText>
                <CustomText style={styles.texto}>Preencha os campos para continuar</CustomText>
                <View style={styles.options}>
                    <View style={styles.option} onPress={() => handleOptionPress('fotoPerfil')}>
                        <View style={styles.optionCircleLine}>
                            {options.map((option, index) => (
                                <React.Fragment key={option}>
                                    <CustomText style={options.slice(0, options.indexOf(selectedOption) + 1).includes(option) ? styles.optionCircleGreen : styles.optionCircle}> </CustomText>
                                    {index < options.length - 1 && <View style={
                                        options.slice(0, options.indexOf(selectedOption) + 1).includes(option) ? styles.optionLineGreen : styles.optionLine}><CustomText></CustomText>
                                        </View>}
                                </React.Fragment>
                            ))}
                        </View>
                        <View style={styles.etapa}>
                            <TouchableOpacity onPress={() => handleOptionPress('fotoPerfil')}>
                                <CustomText style={selectedOption === 'fotoPerfil' ? styles.optionTextUsuarioGreen : styles.optionTextUsuario}>Perfil de Usuário</CustomText>
                                <CustomText style={styles.textoMenor}>Etapa concluída</CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionPress('dadosEmpresa')}>
                                <CustomText style={selectedOption === 'dadosEmpresa' ? styles.optionTextEmpresaGreen : styles.optionTextEmpresa}>Dados da empresa</CustomText>
                                <CustomText style={styles.textoMenor}>Etapa concluída</CustomText>
                            </TouchableOpacity>
                            {selectedCategoria !== 'passageiro' &&
                                <>
                                    <TouchableOpacity onPress={() => handleOptionPress('dadosAutomovel')}>
                                        <CustomText style={selectedOption === 'dadosAutomovel' ? styles.optionTextAutomovelGreen : styles.optionTextAutomovel}>Automóvel</CustomText>
                                        <CustomText style={styles.textoMenor}>Etapa concluída</CustomText>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleOptionPress('cadastroCNH')}>
                                        <CustomText style={selectedOption === 'cadastroCNH' ? styles.optionTextCNHGreen : styles.optionTextCNH}>Carteira Nacional de Habilitação (CNH)</CustomText>
                                        <CustomText style={styles.textoMenor}>Etapa concluída</CustomText>
                                    </TouchableOpacity>
                                </>
                            }
                            <TouchableOpacity onPress={() => handleOptionPress('termosDeSeguranca')}>
                                <CustomText style={selectedOption === 'termosDeSeguranca' ? styles.optionTextTermosGreen : styles.optionTextTermos}>Termos de uso e segurança</CustomText>
                                <CustomText style={styles.textoMenor}>Etapa concluída</CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    },
    titulo: {
        fontSize: 24,
        color: "#79c61e",
        marginBottom: 10,
    },
    texto: {
        fontSize: 16,
    },
    options: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: 30,
    },
    option: {
        flexDirection: 'row',
        justifyContent: "center",
        width: 230,
        paddingVertical: 13,
    },
    optionCircleLine: {
        flexDirection: "column",
        marginRight: 40,
        marginLeft: 50,
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
    etapa: {
        flexDirection: 'column',
    },
    optionTextUsuario: {
        textAlign: 'left',
        fontSize: 18,
        marginRight: 18,
    },
    textoMenor: {
        textAlign: 'left',
        marginRight: 50,
    },
    optionTextUsuarioGreen: {
        textAlign: 'left',
        fontSize: 18,
        marginRight: 18,
        color: "#79c61e",
    },
    optionTextEmpresa: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 30,
    },
    optionTextEmpresaGreen: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 23,
        color: "#79c61e",
    },
    optionTextAutomovel: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 40,
        marginRight: 60,
    },
    optionTextAutomovelGreen: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 40,
        marginRight: 60,
        color: "#79c61e",
    },
    optionTextCNH: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 35,
    },
    optionTextCNHGreen: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 40,
        color: "#79c61e",
    },
    optionTextTermos: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 8,
    },
    optionTextTermosGreen: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 8,
        color: "#79c61e",
    },
    optionLine: {
        backgroundColor: "#FFF",
        borderLeftColor: "#EEE",
        borderLeftWidth: 3,
        width: 5,
        height: 80,
        marginLeft: 6,
    },
    optionLineGreen: {
        backgroundColor: "#FFF",
        borderLeftColor: "#79c61e",
        borderLeftWidth: 3,
        width: 5,
        height: 80,
        marginLeft: 6,
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
    },
    botaoContinuar: {
        marginHorizontal: 40,
    },
});

export default CadatroMotorista;