import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

class DelButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonMarginRight: "5%",
      buttonMarginTop: "5%",
      buttonColor: "#f77474",
      ButtonElevation: 4,
    };
  }
  render() {
    const pressOutHandler = () => {
      this.setState({
        buttonMarginRight: "5%",
        buttonMarginTop: "5%",
        buttonColor: "#f77474",
        ButtonElevation: 4,
      });
    };
    const pressInHandler = () => {
      this.setState({
        buttonMarginRight: 0,
        buttonMarginTop: 0,
        buttonColor: "#f55656",
        ButtonElevation: 0,
      });
    };

    const { title, onPress } = this.props;
    const buttonStyles = StyleSheet.create({
      button: {
        backgroundColor: this.state.buttonColor,
        marginTop: this.state.buttonMarginTop,
        marginRight: this.state.buttonMarginRight,
        elevation: this.state.ButtonElevation,
        borderRadius: 5,

        flex: 1,
      },
    });

    return (
      <Pressable
        onPress={onPress}
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
        style={styles.container}
      >
        <View style={buttonStyles.button}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#790606",
    flex: 0.95,
    marginBottom: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "1%",
    borderTopLeftRadius: 9,
    borderBottomRightRadius: 9,
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    color: "black",
  },
});

export default DelButton;
