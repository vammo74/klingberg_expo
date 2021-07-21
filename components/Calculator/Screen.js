import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textOn: true,
      flashColor: 'normal',
    };
    this.changeTextColor = this.changeTextColor.bind(this);
    this.changeInputColor = this.changeInputColor.bind(this);
  }

  changeTextColor(bool) {
    this.setState(() => {
      return {textOn: bool};
    });
  }

  changeInputColor(flag) {
    this.setState(() => {
      return {flashColor: flag};
    });
  }

  componentDidMount() {
    console.log('mount screen');
  }

  componentWillUnmount() {
    console.log('unmount screen');
  }

  render() {
    let screenView;
    if (this.state.flashColor === 'normal') {
      screenView = (
        <Fragment>
          <View style={styles.productScreen}>
            <Text style={this.state.textOn ? styles.text : styles.noText}>
              {this.props.product}
            </Text>
          </View>
          <View style={styles.productScreen}>
            <Text style={this.state.textOn ? styles.text : styles.noText}>
              {this.props.digits}
            </Text>
          </View>
        </Fragment>
      );
    } else {
      screenView = (
        <Fragment>
          <View
            style={
              this.state.flashColor === 'red'
                ? styles.redScreen
                : styles.greenScreen
            }>
            <Text style={styles.text}>{this.props.product}</Text>
          </View>
          <View
            style={
              this.state.flashColor === 'red'
                ? styles.redScreen
                : styles.greenScreen
            }>
            <Text style={styles.text}>{this.props.digits}</Text>
          </View>
        </Fragment>
      );
    }

    return <View style={styles.screenContainer}>{screenView}</View>;
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#ccc',

    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    margin: '2%',
    elevation: 5,
  },
  productScreen: {
    flex: 1,
    backgroundColor: '#ccd4cb',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    margin: '2%',
    elevation: 5,
  },
  redScreen: {
    backgroundColor: 'red',

    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    margin: '2%',
    elevation: 5,
  },
  greenScreen: {
    backgroundColor: 'green',
    flex: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    margin: '2%',
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: 'black',
  },
  noText: {
    textAlign: 'center',
    fontSize: 40,
    color: 'transparent',
  },
});

export default Screen;
