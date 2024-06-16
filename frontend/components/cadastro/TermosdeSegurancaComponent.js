import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, } from 'react-native';
import AppBar from '../AppBarComponent';
import { CustomText } from "../CustomTextComponent";
import BotaoComponent from '../BotaoComponent';

const TermosDeSeguranca = ({ route, navigation }) => {
    const { userDetails } = route.params;
    const [updatedUserDetails, setUpdatedUserDetails] = useState(userDetails);
    const selectedOption = route.params;

    const [termosAceitos, setTermosAceitos] = useState(true);

    useEffect(() => {
        return () => {
            selectedOption;
        };
    }, []);

    const handleContinue = () => {
        const newDetails = {
            ...updatedUserDetails,
            termosAceitos, 
        };
        console.log(newDetails);
        navigation.navigate("cadastroMotorista", { userDetails: newDetails, selectedOption: selectedOption });
    };


    return (
        <View style={styles.container}>
            <AppBar texto={"Precisa de Ajuda?"}/>
            <View style={styles.dadosForm}>
                <CustomText style={styles.titulo}>Termos de segurança</CustomText>
                <CustomText style={styles.textoTopico}>1. Relacionamento Contratual</CustomText>
                <CustomText style={styles.texto}>Estes Termos Gerais de Uso (“Termos”) regem Seu acesso e uso, como pessoa física (“Você”), dentro do Brasil, dos aplicativos, sites de Internet, conteúdos e serviços (os “Serviços”) fornecidos pela Uber do Brasil Tecnologia Ltda., sociedade de responsabilidade limitada, estabelecida no Brasil, com sede na Cidade de São Paulo, Estado de São Paulo, na Avenida Brigadeiro Faria Lima, n.º 949, 8º andar, Edifício Faria Lima Plaza, Pinheiros, CEP 05.426-200, inscrita no CNPJ sob o nº 17.895.646/0001-87 (“Uber”) ou qualquer de suas Afiliadas. Para efeitos destes Termos, "Afiliada" é uma entidade que, direta ou indiretamente, controle, esteja sob o controle da Uber ou sob controle... Estes Termos Gerais de Uso (“Termos”) regem Seu acesso e uso, como pessoa física (“Você”), dentro do Brasil, dos aplicativos, sites de Internet, conteúdos e serviços (os “Serviços”) fornecidos pela Uber do Brasil Tecnologia Ltda...</CustomText>
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
        backgroundColor: "#FFF",
    },
    dadosForm: {
        padding: 30,
    },
    titulo: {
        color: "#79c61e",
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 30,
    },
    textoTopico: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    texto: {
        fontSize: 14,
        marginRight: 30, 
    },
    continuar: {
        borderTopWidth: 1.2,
        borderTopColor: "#EEE",
        marginTop: 0,
    },
    botaoContinuar: {
        marginHorizontal: 40,
    },
});

export default TermosDeSeguranca;