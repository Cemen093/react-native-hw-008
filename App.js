import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import { Camera } from 'expo-camera';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);


  const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null)
      setImage(data.uri);
    }
  }

  const flipImage = () => {
      setType(
          type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back)
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
      <SafeAreaView style={styles.container}>

          {image ?

              <View style={styles.imageContainer}>
                  <Image source={{uri: image}} style={{flex:1}}/>
                  <View style={styles.buttonsContainer}>
                      <TouchableOpacity style={styles.button} onPress={() => {setImage(null)}}>
                          <Text style={styles.buttonText}>"Clear"</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={() => {} }>
                          <Text style={styles.buttonText}>"Send"</Text>
                      </TouchableOpacity>
                  </View>
              </View>
              :
              <View style={styles.cameraContainer}>
                  <Camera
                      ref={ref => setCamera(ref)}
                      style={styles.fixedRatio}
                      type={type}
                      ratio={'1:1'} />
                  <View style={styles.buttonsContainer}>
                      <TouchableOpacity style={styles.button} onPress={flipImage}>
                          <Text style={styles.buttonText}>"Flip Image"</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.button} onPress={takePicture}>
                          <Text style={styles.buttonText}>"Take Picture"</Text>
                      </TouchableOpacity>
                  </View>
              </View>

          }
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
        flexDirection: "column",
    },
    cameraContainer: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 4,
    },
    fixedRatio:{
        flex: 1,
        aspectRatio: 1
    },
    button: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },

})