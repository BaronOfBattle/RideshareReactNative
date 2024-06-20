import React, { useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { UserContext } from "../UserContext";
import Constants from 'expo-constants';
import AppBar from '../AppBarComponent';
import { CustomText } from '../CustomTextComponent';
import BotaoComponent from '../BotaoComponent';
import DadosAutomovel from './CadastroDadosAutomovel';
import TermosDeSeguranca from './TermosdeSegurancaComponent';

const apiUrl = Constants.manifest2.extra.expoClient.extra.apiUrl;

export function CadatroMotorista({ route, navigation }) {
    const { setUser } = useContext(UserContext);

    const [userDetails, setUpdatedUserDetails] = useState({
        ...route.params.userDetails,
        fotoPerfil: { data: "", status: 'Etapa pendente' },
        dadosEmpresa: { data: "", status: 'Etapa pendente' },
        dadosAutomovel: { data: "", status: 'Etapa pendente' },
        termosDeSeguranca: { data: "", status: 'Etapa pendente' },
        cadastroCNH: { data: "", status: 'Etapa pendente' },
    });

    const options = ['fotoPerfil', 'dadosEmpresa'];
    const [selectedOption, setSelectedOption] = useState("fotoPerfil");

    if (userDetails.categoria !== 0) {
        options.push('dadosAutomovel', 'cadastroCNH');
    }
    options.push('termosDeSeguranca');

    const handleOptionPress = (option) => {
        const optionIndex = options.indexOf(option);
        if (optionIndex === 0 || userDetails[options[optionIndex - 1]].status === 'Etapa concluída') {
            setSelectedOption(option);
            navigation.navigate(option, { userDetails: userDetails });
        } else {
            alert('Por favor, conclua a etapa anterior antes de continuar.');
        }
    };





    useFocusEffect(
        useCallback(() => {
            if (route.params?.userDetails) {
                setUpdatedUserDetails(prevDetails => {
                    const newDetails = { ...prevDetails };

                    options.forEach(option => {
                        if (route.params.userDetails[option] && Object.keys(route.params.userDetails[option]).length > 0) {
                            newDetails[option] = {
                                ...newDetails[option],
                                data: route.params.userDetails[option].data,
                                status: route.params.userDetails[option].status === 'Etapa concluída' ? 'Etapa concluída' : newDetails[option].status,
                            };
                        }
                    });

                    return newDetails;
                });
            }
        }, [route.params?.userDetails])
    );


    useFocusEffect(
        useCallback(() => {
            if (route.params?.selectedOption) {
                setSelectedOption(route.params.selectedOption);
            }
        }, [route.params?.selectedOption])
    );


    const handleContinue = async () => {
        const formData = new FormData();
        formData.append('fotoPerfil', {
            uri: userDetails.fotoPerfil.data,
            type: 'image/jpeg',
            name: 'fotoPerfil.jpg'
        });
        if (userDetails.dadosAutomovel.data?.fotoDocumento) {
            formData.append('fotoDocumento', {
                uri: userDetails.dadosAutomovel.data.fotoDocumento,
                type: 'image/jpeg',
                name: 'fotoDocumento.jpg'
            });
        }

        if (userDetails.cadastroCNH.data?.fotoCNH) {
            formData.append('fotoCNH', {
                uri: userDetails.cadastroCNH.data.fotoCNH,
                type: 'image/jpeg',
                name: 'fotoCNH.jpg'
            });
        }


        const userData = {
            "fullName": userDetails.nome,
            "email": userDetails.email,
            "dataNasc": userDetails.dataNascimento,
            "pronoum": userDetails.pronome,
            "password": userDetails.senha,
            "userCategory": userDetails.categoria,
            "registrationCNH": userDetails.cadastroCNH.data.registroCNH,
            "cpf": userDetails.cadastroCNH.data.cpf,
            "profilePictureAddress": userDetails.fotoPerfil.data,
            "cnhPictureAddress": userDetails.cadastroCNH.data.fotoCNH,
        };
        const confirmarSenha = {
            "confirmarSenha": userDetails.confirmarSenha,
        };

        const vehicleData = {
            "type": userDetails.dadosAutomovel.data.tipoAutomovel,
            "brand": userDetails.dadosAutomovel.data.marca,
            "model": userDetails.dadosAutomovel.data.modelo,
            "plate": userDetails.dadosAutomovel.data.placa,
            "color": userDetails.dadosAutomovel.data.cor,
            "documentPictureAddress": userDetails.dadosAutomovel.data.fotoDocumento,
        };

        const companyData = {
            "name": userDetails.dadosEmpresa.data.nomeEmpresa,
            "position": userDetails.dadosEmpresa.data.cargo,
            "code": userDetails.dadosEmpresa.data.codigo,
        };

        const addressData = {
            "street": userDetails.dadosEmpresa.data.dadosEndereco.rua,
            "city": userDetails.dadosEmpresa.data.dadosEndereco.cidade,
            "state": userDetails.dadosEmpresa.data.dadosEndereco.estado,
            "country": userDetails.dadosEmpresa.data.dadosEndereco.pais,
            "cep": userDetails.dadosEmpresa.data.dadosEndereco.cep,
            "number": userDetails.dadosEmpresa.data.dadosEndereco.numero
        };

        formData.append('userData', JSON.stringify(userData));
        formData.append('confirmarSenha', JSON.stringify(confirmarSenha));
        formData.append('vehicleData', JSON.stringify(vehicleData));
        formData.append('addressData', JSON.stringify(addressData));
        formData.append('companyData', JSON.stringify(companyData));


        try {
            const response = await axios({
                method: 'post',
                url: `${apiUrl}user/cadastro`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const userData = await response.data;
            if (response.status === 201) {
                setUser(userData);
                navigation.navigate("bemVindo");
            } else {
                console.error('Falha no cadastro:', response.status);
            }
        } catch (error) {
            if (error.response) {
                console.error('Dados da resposta:', error.response.data);
                console.error('Status da resposta:', error.response.status);
                console.error('Cabeçalhos da resposta:', error.response.headers);
            } else if (error.request) {
                console.error('Erro no pedido:', error.request);
            } else {
                console.error('Erro:', error.message);
            }
            console.error('Configuração do pedido:', error.config);
        }
    };


    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"} />
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
                                <CustomText style={options.slice(0, options.indexOf(selectedOption) + 1).includes('fotoPerfil') ? styles.optionTextUsuarioGreen : styles.optionTextUsuario}>Perfil de Usuário</CustomText>
                                <CustomText style={userDetails['fotoPerfil'].status === 'Etapa concluída' ? styles.textoMenorGreen : styles.textoMenor}>
                                    {userDetails['fotoPerfil'].status}
                                </CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleOptionPress('dadosEmpresa')}>
                                <CustomText style={options.slice(0, options.indexOf(selectedOption) + 1).includes('dadosEmpresa') ? styles.optionTextEmpresaGreen : styles.optionTextEmpresa}>Dados da empresa</CustomText>
                                <CustomText style={userDetails['dadosEmpresa'].status === 'Etapa concluída' ? styles.textoMenorGreen : styles.textoMenor}>
                                    {userDetails['dadosEmpresa'].status}
                                </CustomText>
                            </TouchableOpacity>
                            {userDetails.categoria !== 0 &&
                                <>
                                    <TouchableOpacity onPress={() => handleOptionPress('dadosAutomovel')}>
                                        <CustomText style={options.slice(0, options.indexOf(selectedOption) + 1).includes('dadosAutomovel') ? styles.optionTextAutomovelGreen : styles.optionTextAutomovel}>Automóvel</CustomText>
                                        <CustomText style={userDetails['dadosAutomovel'].status === 'Etapa concluída' ? styles.textoMenorGreen : styles.textoMenor}>
                                            {userDetails['dadosAutomovel'].status}
                                        </CustomText>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleOptionPress('cadastroCNH')}>
                                        <CustomText style={options.slice(0, options.indexOf(selectedOption) + 1).includes('cadastroCNH') ? styles.optionTextCNHGreen : styles.optionTextCNH}>Carteira Nacional de Habilitação (CNH)</CustomText>
                                        <CustomText style={userDetails['cadastroCNH'].status === 'Etapa concluída' ? styles.textoMenorGreen : styles.textoMenor}>
                                            {userDetails['cadastroCNH'].status}
                                        </CustomText>
                                    </TouchableOpacity>
                                </>
                            }
                            <TouchableOpacity onPress={() => handleOptionPress('termosDeSeguranca')}>
                                <CustomText style={options.slice(0, options.indexOf(selectedOption) + 1).includes('termosDeSeguranca') ? ((userDetails.categoria !== 0) ? styles.optionTextTermosGreen : styles.optionTextTermosPassageiroGreen) : ((userDetails.categoria !== 0) ? styles.optionTextTermos : styles.optionTextTermosPassageiro)}>Termos de uso e segurança</CustomText>
                                <CustomText style={userDetails["termosDeSeguranca"].status === 'Etapa concluída' ? styles.textoMenorGreen : styles.textoMenor}>
                                    {userDetails['termosDeSeguranca'].status}
                                </CustomText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            {userDetails["termosDeSeguranca"].status === 'Etapa concluída' && <View style={styles.continuar}>
                <BotaoComponent
                    texto={"CONTINUAR"}
                    onPress={handleContinue}
                    estilo={styles.botaoContinuar}
                />
            </View>}
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
    textoMenorGreen: {
        textAlign: 'left',
        marginRight: 50,
        color: "#79c61e"
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
    optionTextTermosPassageiro: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 35,
    },
    optionTextTermosPassageiroGreen: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 35,
        color: "#79c61e",
    },
    optionTextTermos: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 12,
    },
    optionTextTermosGreen: {
        textAlign: 'left',
        fontSize: 18,
        marginTop: 12,
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