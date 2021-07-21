import React, {Component, createRef} from 'react';
import {StyleSheet, View} from 'react-native';

import NumberPad from './NumberPad';
import Screen from './Screen';
import ScoreTracker from './ScoreTracker';
import Timer from './Timer';
import InfoButton from '../UI/Buttons/InfoButton';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      levelAttempts: true,
      started: false,
      product: '',
      products: [
        '5 × 9',
        '5 × 8',
        '4 × 7',
        '2 × 2',
        '2 × 3',
        '2 × 4',
        '2 × 5',
        '2 × 6',
        '2 × 7',
        '2 × 8',
        '2 × 9',
        '2 × 10',
        '3 × 3',
        '3 × 4',
        '3 × 5',
        '3 × 6',
        '3 × 7',
        '3 × 8',
        '3 × 9',
        '4 × 4',
        '4 × 5',
        '4 × 6',
        '4 × 8',
        '4 × 9',
        '4 × 10',
        '5 × 5',
        '5 × 6',
        '5 × 7',
        '5 × 10',
        '6 × 6',
        '6 × 7',
        '6 × 8',
        '6 × 9',
        '6 × 10',
        '7 × 7',
        '7 × 8',
        '7 × 9',
        '7 × 10',
        '8 × 8',
        '8 × 9',
        '8 × 10',
        '9 × 9',
        '9 × 10',
        '10 × 10',
      ],
      digits: '',
      timerFlag: 'stop',
      timerRate: 5,
    };

    this.scoreTrackerRef = createRef();
    this.screenRef = createRef();
    this.passStats = this.passStats.bind(this);
    this.readStats = this.readStats.bind(this);
  }

  passStats() {
    let statsJson = {
      products: this.state.products,
      levelAttempts: this.state.levelAttempts,
    };
    this.props.onPassStats(statsJson);
  }

  readStats() {
    this.props.readStats();
    setTimeout(() => {
      let statsJson = {...this.props.savedStats};
      this.setState({products: statsJson.products});
      this.setState({levelAttempts: statsJson.levelAttempts});
    }, 250);
  }

  componentDidMount() {
    console.log('mount Calculator');
  }

  componentWillUnmount() {
    console.log('unmount Calculator');
  }

  _generateProducts = () => {
    const newProducts = [];
    for (let n = 2; n < 11; n++) {
      for (let m = 2; m < 11; m++) {
        if (
          !newProducts.includes(n + ' × ' + m) &&
          !newProducts.includes(m + ' × ' + n)
        ) {
          newProducts.push(n + ' × ' + m);
        }
      }
    }
    return newProducts;
  };

  generateProduct = () => {
    let productsArray = [...this.state.products];
    if (productsArray.length < 1) {
      productsArray = this._generateProducts();
      this.props.onIncrementLevel('up');
    }
    if (productsArray.length >= 50) {
      productsArray = this._generateProducts();

      this.props.onIncrementLevel('down');
    }
    const randomIndex = Math.floor(Math.random() * productsArray.length);
    const newProduct = productsArray.splice(randomIndex, 1);
    this.setState({product: newProduct[0], products: [...productsArray]});
  };

  startHandler = () => {
    this.setState({
      digits: '',
      started: true,
      timerFlag: 'start',
    });
    this.generateProduct();
    this.updateTracker();
    this.screenRef.current.changeTextColor(true);
  };

  stopHandler = () => {
    this.setState({
      digits: '',
      started: false,
      timerFlag: 'stop',
      products: [this.state.product, ...this.state.products],
    });
    this.screenRef.current.changeTextColor(false);
    this.updateTracker();
  };

  checkProductHandler = answer => {
    const numbers = this.state.product.split(' × ');
    const result = parseInt(numbers[0], 10) * parseInt(numbers[1], 10);
    if (parseInt(answer, 10) === result) {
      this.setState({digits: ''});
      this.screenRef.current.changeInputColor('green');
      setTimeout(() => {
        this.screenRef.current.changeInputColor('normal');
      }, 250);
      this.generateProduct();
      this.updateTracker();
      if (this.state.timerFlag === 'reset-on') {
        this.setState({timerFlag: 'reset-off'});
      } else {
        this.setState({timerFlag: 'reset-on'});
      }
    } else {
      this.screenRef.current.changeInputColor('red');
      this.setState({
        products: [this.state.product, ...this.state.products],
      });
      if (this.state.products.length >= 50) {
        this.generateProduct();
      }
      if (this.state.timerFlag === 'reset-on') {
        this.setState({timerFlag: 'reset-off'});
      } else {
        this.setState({timerFlag: 'reset-on'});
      }
      this.updateTracker();
      setTimeout(() => {
        this.screenRef.current.changeInputColor('normal');
        this.setState({digits: ''});
      }, 250);
    }
  };

  deleteHandler = () => {
    if (this.state.digits.length > 0 && this.state.started) {
      this.setState(state => {
        return {digits: state.digits.slice(0, -1)};
      });
    } else {
      this.setState({digits: ''});
    }
  };

  enterHandler = () => {
    if (this.state.digits.length > 0 && this.state.started) {
      this.checkProductHandler(this.state.digits);
      this.setState({started: true});
    }
    if (
      this.state.digits.length === 3 &&
      !this.state.started &&
      this.state.digits.slice(0, 2) === '13' &&
      this.state.digits[2] !== '0'
    ) {
      this.props.onUpdateLevel(this.state.digits[2]);
      let products = this._generateProducts();
      this.setState({
        digits: '',
        products: products,
      });
    }
    if (
      this.state.digits.length === 3 &&
      !this.state.started &&
      this.state.digits.slice(0, 2) === '77' &&
      this.state.digits[2] !== '0'
    ) {
      let products = this._generateProducts();
      this.setState({
        digits: '',
        products: products,
        timerRate: this.state.digits[2],
      });
    }
    if (!this.state.started) {
      this.setState({digits: ''});
    }
  };

  enteredDigitsHandler = newDigit => {
    if (this.state.digits.length < 3) {
      this.setState(state => {
        return {digits: state.digits + newDigit};
      });
    }
  };

  updateTracker = () => {
    let barFillHeight =
      Math.round((this.state.products.length / 50) * 85) + '%';
    let warningLevel = this.state.products.length;
    if (warningLevel === 44) {
      this.scoreTrackerRef.current.changeTrackerColor('#4da6ff');
    }
    if (warningLevel === 47) {
      this.scoreTrackerRef.current.changeTrackerColor('#cc99ff');
    }
    if (warningLevel === 48) {
      this.scoreTrackerRef.current.changeTrackerColor('#ff9980');
    }
    if (warningLevel === 49) {
      this.scoreTrackerRef.current.changeTrackerColor('#ff3333');
    }

    this.scoreTrackerRef.current.changeHeight(barFillHeight.toString());
  };

  outOfTimeHandler = () => {
    if (this.state.levelAttempts) {
      this.setState({levelAttempts: false});
    } else {
      this.setState({levelAttempts: true});
      this.props.onIncrementLevel('down');
    }
  };
  render() {
    return (
      <View className="calculator" style={styles.calculator}>
        <Screen
          ref={this.screenRef}
          product={this.state.product}
          digits={this.state.digits}
          key="screen"
        />
        <View style={styles.calculatorBody}>
          <View style={styles.information}>
            <View style={styles.trackers}>
              <ScoreTracker
                style={styles.scoreTracker}
                ref={this.scoreTrackerRef}
                level={this.props.level}
              />
              <Timer
                style={styles.timer}
                timerFlag={this.state.timerFlag}
                level={this.props.level}
                onOutOfTime={this.outOfTimeHandler}
                timerRate={this.state.timerRate}
              />
            </View>
            <View style={styles.infoButton}>
              <InfoButton onPress={this.props.onGetInfo} title="info" />
            </View>
          </View>
          <NumberPad
            style={styles.numberPad}
            digits={this.state.digits}
            onEnteredDigit={this.enteredDigitsHandler}
            onDelete={this.deleteHandler}
            onEnter={this.enterHandler}
            onStart={!this.state.started ? this.startHandler : this.stopHandler}
            started={this.state.started}
            onOutOfTime={this.outOfTimeHandler}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calculator: {
    flex: 1.2,
    backgroundColor: '#8d8e96',
    alignItems: 'center',
    justifyContent: 'center',
    height: '47%',

    width: '90%',
    marginBottom: '3%',
  },
  information: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 0,
    marginRight: '2%',
  },
  trackers: {
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: '10%',
  },
  infoButton: {
    flex: 1,
  },
  calculatorBody: {
    flex: 1,
    flexDirection: 'row',
  },
  tempButtons: {
    flexDirection: 'row',
  },
});

export default Calculator;
