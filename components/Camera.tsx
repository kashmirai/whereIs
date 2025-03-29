import React, { useRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useItems } from '../context/ItemsContext';

interface CameraComponentProps {
  lupa: boolean;
  setLupa: React.Dispatch<React.SetStateAction<boolean>>;
  kuvanTiedot:  string ;
  setKuvanTiedot: React.Dispatch<React.SetStateAction< string >>
}

export const CameraComponent: React.FC<CameraComponentProps> = ({ lupa, setLupa, kuvanTiedot, setKuvanTiedot }) => {

    const camera = useRef<Camera>(null);
    const {addItem} = useItems();

    const otaKuva = async () => {

        const kuva = await camera.current?.takePhoto();
        console.log('Kuva otettu', kuva?.path);
        setKuvanTiedot(kuva?.path || "");
        CameraRoll.saveAsset(`file://${kuva?.path}`, { type: 'photo' })
        setLupa(false);
        
    };

  const device = useCameraDevice('back');
  

  if (!device) {
    return <Text>Kameraa ei löytynyt</Text>;
  }

  return (
    <>
      {lupa ? (
        <>
          <Camera style={styles.camera} device={device} isActive={true} ref={camera} photo={true} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setLupa(false)}
          >
            <Text style={styles.buttonText}>Sulje Kamera</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Button title='ota kuva' onPress={otaKuva}/>
          </TouchableOpacity>

        </>
      ) : (
        <Text>Kamera on pois päältä</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 30,
    left: '50%',
    transform: [{ translateX: -50 }],
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
});
