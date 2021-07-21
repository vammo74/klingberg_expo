import React, {PureComponent} from 'react';

import {StyleSheet, View} from 'react-native';

import TableButton from './TableButton';
import TableCell from './TableCell';

class Table extends PureComponent {
  constructor(props) {
    super(props);
    this.crossover = 0;

    this.horizontalColorMemory = [];
    this.verticalColorMemory = [];
    this.excluded = [];
    this.cellRefs = [];
    this.updateTableLevel = this.updateTableLevel.bind(this);
  }
  updateTableLevel(level) {
    for (let cell of this.cellRefs) {
      if (this.excluded.includes(cell.props.id)) {
        cell.activateCell('normal');
      }
    }
    let _id = 0;
    let temp = [];
    for (let x = 10 - level; x < 9; x++) {
      for (let y = 1; y < level; y += 1) {
        _id = x.toString() + y.toString();
        temp.push(parseInt(_id, 10));
      }
    }
    for (let cell of this.cellRefs) {
      if (temp.includes(cell.props.id)) {
        cell.activateCell('excluded');
      }
    }
    this.excluded = [...temp];
  }

  componentDidMount() {
    console.log('mount table');
    this.updateTableLevel(this.props.level);
  }

  componentWillUnmount() {
    console.log('unmount table');
  }

  render() {
    const generateTable = () => {
      let tableData = [];
      let rowData;
      let _key;
      let _value;
      let _function;
      let _id = 0;
      let Obj;

      for (let x = 9; x >= 0; x--) {
        rowData = [];
        for (let y = 0; y < 10; y++) {
          _key = x.toString() + y.toString();
          _value = (x + 1) * (y + 1);
          if (x === 0 && y !== 0) {
            _function = 'vertical';
          } else if (y === 0 && x !== 0) {
            _function = 'horizontal';
          } else if (x === 0 && y === 0) {
            _function = 'dummy';
          } else {
            _function = 'body';
          }
          Obj = {
            key: _key,
            value: _value,
            function: _function,
            id: _id,
          };
          rowData.push(Obj);
          _id += 1;
        }
        tableData.push(rowData);
      }
      return tableData;
    };
    const tableData = generateTable();

    const verticalColorHandler = value => {
      if (this.crossover) {
        if (!this.excluded.includes(this.cellRefs[this.crossover].props.id)) {
          this.cellRefs[this.crossover].activateCell('activated');
        }
      }
      if (this.verticalColorMemory[0]) {
        this.cellRefs[this.verticalColorMemory[0]].activateCell('normal');
      }
      for (let n of this.verticalColorMemory.slice(1)) {
        if (!this.horizontalColorMemory.includes(n)) {
          if (!this.excluded.includes(this.cellRefs[n].props.id)) {
            this.cellRefs[n].activateCell('normal');
          }
        }
      }
      let index = 89 + parseInt(value, 10);
      this.verticalColorMemory = [index];
      for (let x = index - 10; x > index - 100; x -= 10) {
        if (!this.excluded.includes(this.cellRefs[x].props.id)) {
          this.cellRefs[x].activateCell('activated');
        }
        this.verticalColorMemory.push(x);
        for (let n of this.verticalColorMemory) {
          for (let x of this.horizontalColorMemory) {
            if (x === n) {
              if (!this.excluded.includes(this.cellRefs[x].props.id)) {
                this.cellRefs[x].activateCell('crossed');
              }
              this.crossover = x;
            }
          }
        }
      }
    };

    const horizontalColorHandler = value => {
      if (this.crossover) {
        if (!this.excluded.includes(this.cellRefs[this.crossover].props.id)) {
          this.cellRefs[this.crossover].activateCell('activated');
        }
      }
      if (this.horizontalColorMemory[0] >= 0) {
        this.cellRefs[this.horizontalColorMemory[0]].activateCell('normal');
      }
      for (let n of this.horizontalColorMemory.slice(1)) {
        if (!this.verticalColorMemory.includes(n)) {
          if (!this.excluded.includes(this.cellRefs[n].props.id)) {
            this.cellRefs[n].activateCell('normal');
          }
        }
      }

      let index = (10 - parseInt(value, 10)) * 10;
      this.horizontalColorMemory = [index];
      for (let x = index + 1; x < index + 10; x++) {
        if (!this.excluded.includes(this.cellRefs[x].props.id)) {
          this.cellRefs[x].activateCell('activated');
        }
        this.horizontalColorMemory.push(x);
        for (let n of this.horizontalColorMemory) {
          for (let x of this.verticalColorMemory) {
            if (x === n) {
              if (!this.excluded.includes(this.cellRefs[x].props.id)) {
                this.cellRefs[x].activateCell('crossed');
              }
              this.crossover = x;
            }
          }
        }
      }
    };
    return (
      <View className="tableBody" style={styles.tableBody}>
        {tableData.map(data => {
          return (
            <View className="tableRow" style={styles.tableRow} key={data[0].id}>
              {data.map(obj => {
                if (obj.function === 'vertical') {
                  return (
                    <TableButton
                      onPress={() => verticalColorHandler(obj.value)}
                      key={obj.key}
                      id={obj.id}
                      ref={el => {
                        this.cellRefs[obj.id] = el;
                        return true;
                      }}
                      buttonFunction={obj.type}
                      title={obj.value.toString()}
                    />
                  );
                } else if (obj.function === 'horizontal') {
                  return (
                    <TableButton
                      onPress={() => horizontalColorHandler(obj.value)}
                      key={obj.key}
                      id={obj.id}
                      ref={el => {
                        this.cellRefs[obj.id] = el;
                        return true;
                      }}
                      buttonFunction={obj.type}
                      title={obj.value.toString()}
                    />
                  );
                } else if (obj.function === 'dummy') {
                  return (
                    <TableButton
                      disabled={true}
                      key={obj.key}
                      id={obj.id}
                      ref={el => {
                        this.cellRefs[obj.id] = el;
                        return true;
                      }}
                      buttonFunction={obj.type}
                      title={obj.value.toString()}
                    />
                  );
                } else {
                  return (
                    <TableCell
                      key={obj.key}
                      id={obj.id}
                      buttonFunction={obj.type}
                      ref={el => {
                        this.cellRefs[obj.id] = el;
                        return true;
                      }}
                      title={obj.value.toString()}
                    />
                  );
                }
              })}
            </View>
          );
        })}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  tableBody: {
    flex: 1,
    flexDirection: 'column',
    height: '50%',
    width: '90%',
    elevation: 5,
  },
  tableRow: {
    alignSelf: 'flex-start',
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  buttonBody: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
});

export default Table;
