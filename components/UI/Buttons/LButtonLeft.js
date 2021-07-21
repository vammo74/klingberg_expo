import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

class LButtonTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonMarginTop: "5%",
      buttonColor: "#00e673",
    };
    this.pressOutHandler = () => {
      this.setState({
        buttonMarginTop: "5%",
        buttonColor: "#00e673",
      });
    };
    this.pressInHandler = () => {
      this.setState({
        buttonMarginTop: 0,
        buttonColor: "#00cc66",
      });
    };
  }
  render() {
    const { title, onPress, onPressIn, onPressOut } = this.props;
    const buttonStyles = StyleSheet.create({
      button: {
        backgroundColor: this.state.buttonColor,
        marginTop: this.state.buttonMarginTop,
        elevation: this.state.ButtonElevation,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,

        flex: 1,
      },
    });

    return (
      <Pressable
        onPress={onPress}
        onPressIn={() => {
          this.pressInHandler();
          onPressIn();
        }}
        onPressOut={() => {
          this.pressOutHandler();
          onPressOut();
        }}
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
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: "#006633",
    flex: 1,
    marginBottom: "1%",
    marginLeft: "1%",
    marginRight: "-6.5%",
    marginTop: "1%",
    justifyContent: "center",
    borderTopLeftRadius: 9,
  },
  text: {
    color: "black",
    textAlign: "center",
    fontSize: 30,
    marginRight: "-100%",
  },
});

export default LButtonTop;
