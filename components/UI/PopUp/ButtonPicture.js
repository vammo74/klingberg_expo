import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

const ButtonPicture = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.redButton}>
        <Text style={styles.whiteButtonText}> stop </Text>
      </View>
      <View style={styles.greenButton}>
        <Text style={styles.whiteButtonText}> enter </Text>
      </View>
      <View style={styles.pinkButton}>
        <Text style={styles.blackButtonText}> {props.combo[0]} </Text>
      </View>
      <View style={styles.pinkButton}>
        <Text style={styles.blackButtonText}> {props.combo[1]} </Text>
      </View>
      <View style={styles.pinkButton}>
        <Text style={styles.blackButtonText}> {props.combo[2]} </Text>
      </View>
      <View style={styles.greenButton}>
        <Text style={styles.whiteButtonText}> enter </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 5,
  },
  greenButton: {
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "green",
    margin: "1%",
  },
  redButton: {
    textAlign: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "black",
    backgroundColor: "brown",
    margin: "1%",
  },
  pinkButton: {
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "black",
    backgroundColor: "pink",
    margin: "1%",
  },
  blackButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  whiteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ButtonPicture;
