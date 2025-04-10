import { useState, useEffect } from 'react';
import { useCameraPermission } from 'react-native-vision-camera';

export const useCamera = () => {
  const [kamera, setKamera] = useState(false); 
  const [kuvanTiedot, setKuvanTiedot] = useState<string>(''); 
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const { requestPermission, hasPermission: cameraPermission } = useCameraPermission();

  useEffect(() => {
    const checkPermission = async () => {
      const permission = cameraPermission;
      setHasPermission(permission);
    };

    checkPermission();
  }, [cameraPermission]);

  const kaynnistaKamera = () => {
    requestPermission();
    setKamera(true); 
  };

  return {
    kamera,
    setKamera,
    kuvanTiedot,
    setKuvanTiedot,
    hasPermission,
    kaynnistaKamera,
  };
};
