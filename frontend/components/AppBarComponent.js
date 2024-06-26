import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { UserContext } from './UserContext';
import { CustomText } from './CustomTextComponent';

export function AppBar({ texto, imgPerfil, menu }) {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.appBar}>
      <Image
        source={require("../logo.png")}
        style={{ height: 25, width: 150 }}
      />
      <CustomText style={styles.appBarAjuda}>{texto}</CustomText>
      <View style={{ flexDirection: 'row', }}>
        {imgPerfil &&
          <Image
            source={{ uri: `${user.profilePictureAddress}`}}
            style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: "#EEE" }}
          />
        }
        {menu &&
          <View style={{ flexDirection: 'column', marginLeft: 20, }}>
            <View style={{ width: 24, height: 5, backgroundColor: "#000", marginVertical: 3, borderRadius: 13, }}></View>
            <View style={{ width: 28, height: 5, backgroundColor: "#000", marginVertical: 3, borderRadius: 13, }}></View>
            <View style={{ width: 20, height: 5, backgroundColor: "#000", marginVertical: 3, borderRadius: 13, }}></View>
          </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    borderBottomWidth: 1.2,
    borderBottomColor: "#EEE",
    flexDirection: "row",
    justifyContent: 'space-between',
    padding: 30,
    paddingTop: 50,
    paddingBottom: 15,
  },
  appBarAjuda: {
    color: "#79c61e",
    marginLeft: 80
  },

});


export default AppBar;