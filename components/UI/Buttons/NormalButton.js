import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

class NormalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonMarginRight: "5%",
      buttonMarginTop: "5%",
      buttonColor: "#e4bce6",
      ButtonElevation: 4,
    };
  }
  render() {
    const pressOutHandler = () => {
      this.setState({
        buttonMarginRight: "5%",
        buttonMarginTop: "5%",
        buttonColor: "#e4bce6",
        ButtonElevation: 4,
      });
    };
    const pressInHandler = () => {
      this.setState({
        buttonMarginRight: 0,
        buttonMarginTop: 0,
        buttonColor: "#daa3dc",
        ButtonElevation: 0,
      });
    };

    const { title, onPress, flex } = this.props;
    const buttonStyles = StyleSheet.create({
      button: {
        backgroundColor: this.state.buttonColor,
        marginTop: this.state.buttonMarginTop,
        marginRight: this.state.buttonMarginRight,
        elevation: this.state.ButtonElevation,
        borderRadius: 5,
        alignContent: "center",
        justifyContent: "center",

        flex: 1,
      },
    });
    const containerStyles = [styles.container];
    if (this.props.flex) {
      containerStyles.push({ flex: this.props.flex });
    }

    return (
      <Pressable
        onPress={onPress}
        onPressIn={pressInHandler}
        onPressOut={pressOutHandler}
        style={containerStyles}
        flex={flex}
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
    backgroundColor: "#5a235c",
    flex: 1,
    marginBottom: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    marginTop: "1%",
    borderTopLeftRadius: 9,
    borderBottomRightRadius: 9,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    color: "black",
  },
});

export default NormalButton;
