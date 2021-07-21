import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

class IButtonTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonMarginTop: '5%',
      buttonMarginBottom: '-1%',
      buttonMarginRight: '5%',
      buttonColor: '#5f785d',
    };
    this.pressOutHandler = () => {
      if (this.props.started) {
        this.setState(() => {
          return {
            buttonMarginTop: '5%',
            buttonMarginRight: '5%',
            buttonMarginBottom: '-1%',
            buttonColor: '#664040',
          };
        });
      } else {
        this.setState(() => {
          return {
            buttonMarginTop: '5%',
            buttonMarginRight: '5%',
            buttonMarginBottom: '-1%',
            buttonColor: '#5f785d',
          };
        });
      }
    };
    this.pressInHandler = () => {
      if (this.props.started) {
        this.setState(() => {
          return {
            buttonMarginTop: 0,
            buttonMarginBottom: '-1%',
            buttonMarginRight: 0,
            buttonColor: '#664040',
          };
        });
      } else {
        this.setState(() => {
          return {
            buttonMarginTop: 0,
            buttonMarginBottom: '-1%',
            buttonMarginRight: 0,
            buttonColor: '#4f654e',
          };
        });
      }
    };
  }

  render() {
    const {title, onPress, onPressIn, onPressOut, started} = this.props;
    const buttonStyles = StyleSheet.create({
      button: {
        backgroundColor: this.state.buttonColor,
        marginTop: this.state.buttonMarginTop,
        marginBottom: this.state.buttonMarginBottom,
        marginRight: this.state.buttonMarginRight,
        elevation: this.state.ButtonElevation,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,

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
        started={started}>
        <View style={buttonStyles.button}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 9,
    backgroundColor: '#2d3a2c',
    flex: 1,
    marginTop: '1%',
    marginRight: '1%',
    marginLeft: '1%',
    marginBottom: 0,
    alignSelf: 'center',
  },
  text: {
    transform: [
      {
        rotate: '90deg',
      },
    ],
    textAlign: 'right',
    fontSize: 30,
    color: 'white',
  },
});

export default IButtonTop;
