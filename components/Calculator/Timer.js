import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {useInterval} from '../helpers/useInterval';

let colorModifier = 1;

const Timer = props => {
  const timer = useRef();
  const [timerHeight, setTimerHeight] = useState(0);
  const [timerState, setTimerState] = useState(true);
  const [timerRate, setTimerRate] = useState(5);
  useEffect(() => {
    console.log('mount timer');
    return () => {
      console.log('unmount timer');
    };
  }, []);
  useEffect(() => {
    if (props.timerFlag === 'start') {
      setTimerState(true);
      setTimerHeight(0);
    } else if (props.timerFlag === 'stop') {
      setTimerState(false);
      setTimerHeight(0);
    } else {
      setTimerState(true);
      setTimerHeight(0);
      if (timerHeight < 0) {
        setTimerHeight(0);
      }
    }
  }, [props.timerFlag]);

  useEffect(() => {
    setTimerRate(props.timerRate);
  }, [props.timerRate]);

  useInterval(() => {
    if (timerState) {
      if (timerHeight <= 100) {
        setTimerHeight(timerHeight + 1);
      } else {
        setTimerHeight(0);
        props.onOutOfTime();
        setTimerState(false);
      }
    }
  }, 2 * (10 - timerRate) * (101 - props.level ** 2));

  colorModifier = timerHeight;
  if (colorModifier <= 0) {
    colorModifier = 1;
  }
  const timerFillStyles = StyleSheet.create({
    timerFill: {
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: '#000',
      backgroundColor: `rgb(${255 * (colorModifier / 100)}, 0, ${
        200 * (1 / (colorModifier + 1))
      })`,
      height: timerHeight + '%',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.timer}>
        <View style={timerFillStyles.timerFill} ref={timer} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-end',
    elevation: 5,
  },
  timer: {
    width: '90%',
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: '#dae0db',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
export default Timer;
