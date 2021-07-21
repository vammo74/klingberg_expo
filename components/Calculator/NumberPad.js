import React, {useRef, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import LButtonTop from '../UI/Buttons/LButtonTop';
import LButtonBottom from '../UI/Buttons/LButtonBottom';
import LButtonLeft from '../UI/Buttons/LButtonLeft';
import IButtonTop from '../UI/Buttons/IButtonTop';
import IButtonBottom from '../UI/Buttons/IButtonBottom';
import NormalButton from '../UI/Buttons/NormalButton';
import DelButton from '../UI/Buttons/DelButton';

const NumberPad = props => {
  const LBBRef = useRef(null);
  const LBTRef = useRef(null);
  const LBLRef = useRef(null);
  const IBTRef = useRef(null);
  const IBBRef = useRef(null);

  const pressInLinkedHandler = linkedButtons => {
    for (let button of linkedButtons) {
      button.current.pressInHandler();
    }
  };
  const pressOutLinkedHandler = linkedButtons => {
    for (let button of linkedButtons) {
      button.current.pressOutHandler();
    }
  };
  const pressHandler = digit => {
    props.onEnteredDigit(digit);
  };
  const deleteHandler = () => {
    props.onDelete();
  };
  const enterHandler = () => {
    props.onEnter();
  };

  useEffect(() => {
    console.log('mount numberpad');
    return () => {
      console.log('unmount numberpad');
    };
  }, []);

  useEffect(() => {
    pressOutLinkedHandler([IBBRef]);
    pressOutLinkedHandler([IBTRef]);
  }, [props.started]);

  return (
    <View style={styles.mainGrid}>
      <View style={styles.buttonRow}>
        <NormalButton
          onPress={() => {
            pressHandler(7);
          }}
          title="7"
        />
        <NormalButton
          onPress={() => {
            pressHandler(8);
          }}
          title="8"
        />
        <NormalButton
          onPress={() => {
            pressHandler(9);
          }}
          title="9"
        />
        <IButtonTop
          ref={IBTRef}
          title={!props.started ? 'G' : 'ST'}
          onPressIn={() => {
            pressInLinkedHandler([IBBRef]);
          }}
          onPressOut={() => {
            pressOutLinkedHandler([IBBRef]);
          }}
          onPress={props.onStart}
          started={props.started}
        />
      </View>
      <View style={styles.buttonRow}>
        <NormalButton
          onPress={() => {
            pressHandler(4);
          }}
          title="4"
        />
        <NormalButton
          onPress={() => {
            pressHandler(5);
          }}
          title="5"
        />
        <NormalButton
          onPress={() => {
            pressHandler(6);
          }}
          title="6"
        />
        <IButtonBottom
          ref={IBBRef}
          title={!props.started ? 'O' : 'OP'}
          onPress={props.onStart}
          onPressIn={() => {
            pressInLinkedHandler([IBTRef]);
          }}
          onPressOut={() => {
            pressOutLinkedHandler([IBTRef]);
          }}
          started={props.started}
        />
      </View>
      <View style={styles.buttonRow}>
        <NormalButton
          onPress={() => {
            pressHandler(1);
          }}
          title="1"
        />
        <NormalButton
          onPress={() => {
            pressHandler(2);
          }}
          title="2"
        />
        <NormalButton
          onPress={() => {
            pressHandler(3);
          }}
          title="3"
        />
        <LButtonTop
          ref={LBTRef}
          onPress={enterHandler}
          onPressIn={() => {
            pressInLinkedHandler([LBBRef, LBLRef]);
          }}
          onPressOut={() => {
            pressOutLinkedHandler([LBBRef, LBLRef]);
          }}
          title=""
        />
      </View>
      <View buttonFunction="lastRow" style={styles.lastButtonRow}>
        <DelButton onPress={deleteHandler} title="del" />
        <NormalButton
          flex={0.93}
          onPress={() => {
            pressHandler(0);
          }}
          title="0"
        />
        <LButtonLeft
          ref={LBLRef}
          onPress={enterHandler}
          onPressIn={() => {
            pressInLinkedHandler([LBTRef, LBBRef]);
          }}
          onPressOut={() => {
            pressOutLinkedHandler([LBTRef, LBBRef]);
          }}
          title="enter"
        />
        <LButtonBottom
          ref={LBBRef}
          onPress={enterHandler}
          onPressIn={() => {
            pressInLinkedHandler([LBTRef, LBLRef]);
          }}
          onPressOut={() => {
            pressOutLinkedHandler([LBTRef, LBLRef]);
          }}
          title=""
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainGrid: {
    flex: 4,
    flexDirection: 'column',
    backgroundColor: '#8d8e96',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastButtonRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
});

export default NumberPad;
