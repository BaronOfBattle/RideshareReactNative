import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useRoute } from '@react-navigation/native';

export function BottomBar({ navigation }) {
    const route = useRoute();

    const getColor = (screenName) => {
        return route.name === screenName ? '#79c61e' : '#000';
    };

    return (
        <View style={styles.bottomBar}>
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Inicio')}>
                    <Icon name="home" size={30} color={getColor('Inicio')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('anunciarViagem')}>
                    <Icon name="directions-car" size={30} color={getColor('anunciarViagem')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                    <Icon name="person" size={30} color={getColor('Perfil')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                    <Icon name="chat" size={30} color={getColor('Chat')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    bottomBar: {
        position: 'absolute', 
        marginHorizontal: 15, 
        bottom: 0, 
        marginBottom: 10, 
        zIndex: 1, 
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF', 
        borderWidth: 1.2,
        borderColor: "#EEE",
        borderRadius: 15, 
    },
    navigationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%', 
    },
    bottomBarAjuda: {
        color: "#79c61e",
    },
});

export default BottomBar;
