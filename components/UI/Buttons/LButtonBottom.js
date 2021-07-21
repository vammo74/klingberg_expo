import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

class LButtonBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonMarginRight: "5%",
      buttonColor: "#00e673",
    };
    this.pressOutHandler = () => {
      this.setState({
        buttonMarginRight: "5%",
        buttonColor: "#00e673",
      });
    };
    this.pressInHandler = () => {
      this.setState({
        buttonMarginRight: 0,
        buttonColor: "#00cc66",
      });
    };
  }
  render() {
    const { title, onPress, onPressIn, onPressOut } = this.props;
    const buttonStyles = StyleSheet.create({
      button: {
        backgroundColor: this.state.buttonColor,
        marginRight: this.state.buttonMarginRight,
        elevation: this.state.ButtonElevation,
        borderBottomRightRadius: 5,

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
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 5,
    backgroundColor: "#006633",
    flex: 1,
    marginBottom: "1%",
    marginRight: "1%",
    marginLeft: "5%",
    marginTop: "1%",
    borderBottomRightRadius: 9,
    zIndex: -1,
  },
  text: {
    color: "white",
  },
});

export default LButtonBottom;
