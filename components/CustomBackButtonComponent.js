import { useEffect } from 'react';
import { BackHandler } from 'react-native';

export function useCustomBackButton(navigation) {
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);
}