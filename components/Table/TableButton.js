import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

class TableButton extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      buttonState: 'normal',
    };

    this.activateCell = this.activateCell.bind(this);
  }

  activateCell(flag) {
    this.setState(() => {
      return {buttonState: flag};
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    const pressInHandler = () => {
      this.activateCell('inpressed');
    };

    const pressOutHandler = () => {
      this.activateCell('outpressed');
    };

    let buttonForm;
    if (this.state.buttonState === 'inpressed') {
      buttonForm = (
        <View style={styles.inpressed}>
          <Text style={styles.blackText}>{this.props.title}</Text>
        </View>
      );
    } else if (this.state.buttonState === 'activated') {
      buttonForm = (
        <View style={styles.activated}>
          <Text style={styles.whiteText}>{this.props.title}</Text>
        </View>
      );
    } else if (this.state.buttonState === 'outpressed') {
      buttonForm = (
        <View style={styles.outpressed}>
          <Text style={styles.whiteText}>{this.props.title}</Text>
        </View>
      );
    } else {
      buttonForm = (
        <View style={styles.button}>
          <Text style={styles.blackText}>{this.props.title}</Text>
        </View>
      );
    }

    return (
      <Pressable
        style={styles.container}
        buttonFunction={this.props.buttonFunction}
        id={this.props.id}
        onPress={this.props.onPress}
        onPressIn={!this.props.disabled && pressInHandler}
        onPressOut={!this.props.disabled && pressOutHandler}
        disabled={this.props.disabled}>
        {buttonForm}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#5a235c',
    flex: 1,
    margin: '0.25%',
    borderRadius: 3,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  button: {
    backgroundColor: '#9377a6',
    marginTop: '7%',
    marginRight: '7%',
    borderRadius: 3,
    elevation: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activated: {
    backgroundColor: '#7121a6',
    marginTop: '7%',
    marginRight: '7%',
    borderRadius: 3,
    elevation: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inpressed: {
    backgroundColor: '#9377a6',
    marginTop: 0,
    marginRight: 0,
    borderRadius: 3,
    elevation: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outpressed: {
    backgroundColor: '#7121a6',
    marginTop: '7%',
    marginRight: '7%',
    borderRadius: 3,
    elevation: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    textAlign: 'center',
    color: 'white',
  },
  blackText: {
    textAlign: 'center',
    color: 'black',
  },
});

export default TableButton;
