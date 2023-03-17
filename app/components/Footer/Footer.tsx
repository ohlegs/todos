import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo, useState, useCallback} from 'react';
import {styles} from './styles';
import {red, transparent} from '../../colors';
import {sortMode, clearCompleted} from '../../redux/reducers/initState';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';

enum Mode {
  all = 0,
  active = 1,
  complited = 2,
}

export default function Footers() {
  const [mode, setMode] = useState<number>(0);
  const dispatch = useDispatch();
  const allTasks = useSelector((state: RootState) => state.tasks.value);
  useEffect(
    () => {
      dispatch(sortMode(mode));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mode],
  );

  const counter = useMemo(() => {
    return allTasks.filter(item => item.done === true).length;
  }, [allTasks]);

  const clearComplete = useCallback(() => {
    dispatch(clearCompleted());
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text>{counter} items left</Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => setMode(Mode.all)}
          style={[
            styles.button,
            {borderColor: mode === Mode.all ? red : transparent},
          ]}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode(Mode.active)}
          style={[
            styles.button,
            {borderColor: mode === Mode.active ? red : transparent},
          ]}>
          <Text>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setMode(Mode.complited)}
          style={[
            styles.button,
            {borderColor: mode === Mode.complited ? red : transparent},
          ]}>
          <Text>Completed</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={clearComplete}>
        <Text>Clear completed</Text>
      </TouchableOpacity>
    </View>
  );
}
