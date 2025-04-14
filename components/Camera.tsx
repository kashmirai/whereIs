import React, { useRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

interface CameraComponentProps {
  kamera: boolean;
  setKamera: React.Dispatch<React.SetStateAction<boolean>>;
  kuvanTiedot:  string ;
  setKuvanTiedot: React.Dispatch<React.SetStateAction< string >>
}

export const CameraComponent: React.FC<CameraComponentProps> = ({ kamera, setKamera, kuvanTiedot, setKuvanTiedot }) => {

    const camera = useRef<Camera>(null);
    const device = useCameraDevice('back');
    if (!device) {
      return <Text>Ladataan...</Text>;
    }

    const otaKuva = async () => {
        const kuva = await camera.current?.takePhoto();
        setKuvanTiedot(kuva?.path || "");
        CameraRoll.saveAsset(`file://${kuva?.path}`, { type: 'photo' })
        setKamera(false);
    };

  return (
    <>
      {kamera ? (
        <View style={styles.fullscreenContainer}>
          <Camera style={styles.camera} device={device} isActive={true} ref={camera} photo={true} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setKamera(false)}
          >
            <Text style={styles.buttonText}>Sulje Kamera</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.captureButton} onPress={otaKuva}>
          </TouchableOpacity>

        </View>
      ) : (
        <Text>Kamera on pois päältä</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fullscreenContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    padding: 30,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
});
