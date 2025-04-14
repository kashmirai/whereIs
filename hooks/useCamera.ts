import { useState } from 'react';
import { useCameraPermission } from 'react-native-vision-camera';

export const useCamera = () => {
  const [kamera, setKamera] = useState<boolean>(false); 
  const [kuvanTiedot, setKuvanTiedot] = useState<string>(''); 
  const { requestPermission, hasPermission } = useCameraPermission();

  const kaynnistaKamera = async () => {
    const granted = await requestPermission();
    if (granted) {
      setKamera(true); 
    } else {
      console.warn("Kameralupaa ei myönnetty");
    }
  };

  return {kamera, setKamera, kuvanTiedot, setKuvanTiedot, hasPermission, kaynnistaKamera};
};
