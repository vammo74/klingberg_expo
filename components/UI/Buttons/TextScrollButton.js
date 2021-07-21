import React, {Component} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';

/*
Use in parent:
<TextScrollButton
    title={title}
    values={[...values]}
    updateValue={(newValue) => {
        updateValue(newValue);
    }}
*/

class TextScrollButton extends Component {
  constructor(props) {
    super(props);
    this.fixDepth = values => {
      if (values.length === 2) {
        values = [...values, 'x'];
        return values;
      } else if (values.length === 1) {
        values = ['x', ...values, 'x'];
        return values;
      } else {
        return values;
      }
    };

    this.values = this.fixDepth(this.props.values);
    this.state = {
      choice: this.values[1],
      choiceBefore: this.values[0],
      choiceAfter: this.values[2],
    };
  }

  render() {
    let myvar;
    const pressHandler = flag => {
      if (flag === 'up') {
        let lastValue = this.values.pop();
        this.values.unshift(lastValue);
        this.setState(state => {
          return {
            choice: this.values[1],
            choiceBefore: this.values[0],
            choiceAfter: this.values[2],
          };
        });
      } else if (flag === 'down') {
        let firstValue = this.values.shift();
        this.values.push(firstValue);
        this.setState(state => {
          return {
            choice: this.values[1],
            choiceBefore: this.values[0],
            choiceAfter: this.values[2],
          };
        });
      } else {
        return;
      }
      if (myvar) {
        clearTimeout(myvar);
      }
      myvar = setTimeout(() => {
        this.props.updateValue(this.state.choice);
      }, 1000);
    };

    return (
      <View style={styles.container}>
        <View style={styles.label}>
          <Text style={styles.labelText}>{this.props.title}</Text>
        </View>
        <Pressable
          style={styles.buttons}
          onPress={() => {
            pressHandler('up');
          }}>
          <Text style={styles.text}>&#9650;</Text>
        </Pressable>
        <View style={styles.blurField}>
          <Text style={styles.text}>{this.state.choiceAfter}</Text>
        </View>
        <View style={styles.focusField}>
          <Text style={styles.textBold}>{this.state.choice}</Text>
        </View>
        <View style={styles.blurField}>
          <Text style={styles.text}>{this.state.choiceBefore}</Text>
        </View>
        <Pressable
          style={styles.buttons}
          onPress={() => {
            pressHandler('down');
          }}>
          <Text style={styles.text}>&#9660;</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignContent: 'center',
    // borderColor: "black",
    //borderStyle: "solid",
    //borderWidth: 1,
  },
  label: {
    padding: 2,
    backgroundColor: '#33d6ff',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: '2%',
    elevation: 3,
    justifyContent: 'center',
    textAlign: 'center',
  },

  buttons: {
    backgroundColor: '#33d6ff',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 4,
    elevation: 3,
  },
  focusField: {
    backgroundColor: '#d1e0e0',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderRadius: 2,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  blurField: {
    backgroundColor: '#a3c2c2',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    marginRight: 1.5,
    marginLeft: 1.5,
  },
  text: {
    textAlign: 'center',
  },
  textBold: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  labelText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default TextScrollButton;
