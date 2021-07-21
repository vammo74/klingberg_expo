import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const InfoButton = props => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={props.onPress}>
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#00b3b3',
    justifyContent: 'center',
    alignContent: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white',
    elevation: 5,
  },
  text: {
    flex: 1,
    paddingHorizontal: '5%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'serif',
    color: '#fff',
  },
});

export default InfoButton;
