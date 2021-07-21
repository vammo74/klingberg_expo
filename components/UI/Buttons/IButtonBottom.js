import React, { Component } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

class IButtonBottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonMarginRight: "5%",
      buttonColor: "#5f785d",
    };
    this.pressOutHandler = () => {
      if (this.props.started) {
        this.setState(() => {
          return {
            buttonMarginRight: "5%",
            buttonColor: "#664040",
          }
        });
      } else {
        this.setState(() => {
          return {
            buttonMarginRight: "5%",
            buttonColor: "#5f785d",
          }
        });
      }
    };
    this.pressInHandler = () => {
      if (this.props.started) {
        this.setState(() => {
          return {
            buttonMarginRight: "5%",
            buttonColor: "#664040",
          }
        });
      } else {
        this.setState(() => {
          return {
            buttonMarginRight: 0,
            buttonColor: "#4f654e",
          }
        });
      }
    };
  }
  render() {
    const { title, onPress, onPressIn, onPressOut, started } = this.props;
    const buttonStyles = StyleSheet.create({
      button: {
        backgroundColor: this.state.buttonColor,
        marginRight: this.state.buttonMarginRight,
        borderBottomLeftRadius: 5,
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
        started={started}
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
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "#2d3a2c",
    flex: 1,
    marginTop: 0,
    marginRight: "1%",
    marginLeft: "1%",
    marginBottom: "1%",
    alignSelf: "center",
    borderBottomRightRadius: 9,
  },
  text: {
    transform: [
      {
        rotate: "90deg",
      },
    ],
    textAlign: "left",
    marginTop: 3,
    fontSize: 30,
    color: "white",
  },
});

export default IButtonBottom;
