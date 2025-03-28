import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

interface CameraComponentProps {
  lupa: boolean;
  setLupa: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CameraComponent: React.FC<CameraComponentProps> = ({ lupa, setLupa }) => {
  const device = useCameraDevice('back');

  if (!device) {
    return <Text>Kameraa ei löytynyt</Text>;
  }

  return (
    <>
      {lupa ? (
        <>
          <Camera style={styles.camera} device={device} isActive={true} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setLupa(false)}
          >
            <Text style={styles.buttonText}>Sulje Kamera</Text>
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
