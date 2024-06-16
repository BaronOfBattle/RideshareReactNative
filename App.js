import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import AppBar from './components/AppBarComponent';
import LoginComponent from './components/LoginComponent';
import CadastroComponent from './components/cadastro/CadastroComponent';
import { ConfirmarEmailComponent } from './components/cadastro/CadastroConfirmarEmailComponent';
import SelecionarCategoria from './components/cadastro/CadastroSelecionarCategoriaComponent';
import FotoPerfil from './components/cadastro/CadastroFotoPerfil';
import DadosEmpresa from './components/cadastro/CadastroDadosEmpresa';
import DadosAutomovel from './components/cadastro/CadastroDadosAutomovel';
import CadastroCNH from './components/cadastro/CadastroCNHComponent';
import TermosDeSeguranca from './components/cadastro/TermosdeSegurancaComponent';
import CadatroMotorista from './components/cadastro/CadastroMotoristaComponent';
import BemVindo from './components/BemVindoComponent';
import { Perfil } from './components/PerfilComponent';
import SolicitarViagem from './components/SolicitarViagemComponent';
import SolicitarCarona from './components/SolicitarCaronaComponent';
import AnunciarViagem from './components/AnunciarViagemComponent';
import AcompanharViagem from './components/AcompanharViagem';
import AvaliarPassageiros from './components/AvaliarPassageirosComponent';
import AvaliarMotorista from './components/AvaliarMotoristaComponent';
import ResumoViagem from './components/ResumoViagemComponent';
import Chat from './components/ChatComponent';
import Inicio from './components/InicioComponent';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Poppins': require('./assets/fonts/Poppins-Bold.ttf'),
      });
      setFontsLoaded(true);
      console.log("Carregou a fonte!");
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <AppBar />
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginComponent} />
          <Stack.Screen name="Cadastro" component={CadastroComponent} />
          <Stack.Screen name="ConfirmarEmail" component={ConfirmarEmailComponent} />
          <Stack.Screen name="selecCategoria" component={SelecionarCategoria} />
          <Stack.Screen name="fotoPerfil" component={FotoPerfil} />
          <Stack.Screen name="dadosEmpresa" component={DadosEmpresa} />
          <Stack.Screen name="dadosAutomovel" component={DadosAutomovel} />
          <Stack.Screen name="cadastroCNH" component={CadastroCNH} />
          <Stack.Screen name="termosDeSeguranca" component={TermosDeSeguranca} />
          <Stack.Screen name="cadastroMotorista" component={CadatroMotorista} />
          <Stack.Screen name="bemVindo" component={BemVindo} />
          <Stack.Screen name="Perfil" component={Perfil} />
          <Stack.Screen name="solicitarViagem" component={SolicitarViagem} />
          <Stack.Screen name="solicitarCarona" component={SolicitarCarona} />
          <Stack.Screen name="anunciarViagem" component={AnunciarViagem} />
          <Stack.Screen name="acompanharViagem" component={AcompanharViagem} />
          <Stack.Screen name="resumoViagem" component={ResumoViagem} />
          <Stack.Screen name="avaliar" component={AvaliarPassageiros} />
          <Stack.Screen name="avaliarMotorista" component={AvaliarMotorista} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Inicio" component={Inicio} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}