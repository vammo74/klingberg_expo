import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

class TableCell extends PureComponent {
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
    const {title, id, buttonFunction} = this.props;

    let buttonForm;
    if (this.state.buttonState === 'excluded') {
      buttonForm = (
        <View style={styles.excluded}>
          <Text style={{color: 'transparent'}}>{title}</Text>
        </View>
      );
    } else if (this.state.buttonState === 'activated') {
      buttonForm = (
        <View style={styles.activated}>
          <Text style={styles.whiteText}>{title}</Text>
        </View>
      );
    } else if (this.state.buttonState === 'crossed') {
      buttonForm = (
        <View style={styles.crossed}>
          <Text style={styles.whiteText}>{title}</Text>
        </View>
      );
    } else {
      buttonForm = (
        <View style={styles.button}>
          <Text style={styles.blackText}>{title}</Text>
        </View>
      );
    }

    return (
      <Pressable
        style={styles.container}
        buttonFunction={buttonFunction}
        id={id}>
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
  },
  button: {
    backgroundColor: '#d7b7ed',
    marginTop: 0,
    marginRight: 0,
    elevation: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activated: {
    backgroundColor: '#7121a6',
    marginTop: '4%',
    marginRight: '4%',
    elevation: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossed: {
    backgroundColor: '#580c7a',
    marginTop: '6%',
    marginRight: '6%',
    elevation: 4,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  excluded: {
    backgroundColor: 'black',
    marginTop: 0,
    marginRight: 0,
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

export default TableCell;
