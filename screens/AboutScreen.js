import * as React from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, View, Image } from 'react-native';
import Constants from 'expo-constants';
import { MonoText } from '../components/StyledText';


export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/splash.png')}
      />
      <MonoText style={styles.text}>
        {`
      Lucas Boulle 081170012 \n
      David Conde 081170002 \n
      Rodrigo Candido 081170031 \n
      Filipe Marques 081170007 \n
      `}
      </MonoText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1
  },
  text: {
    fontSize: 18,
    marginTop: 0,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  }
});