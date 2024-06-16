import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 

export function BottomBar({ navigation }) {
    return (
        <View style={styles.bottomBar}>
            <View style={styles.navigationContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('anunciarViagem')}>
                    <Icon name="directions-car" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
                    <Icon name="person" size={30} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                    <Icon name="chat" size={30} color="#000" />
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
