import {View, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {useCallback, useState, useRef} from 'react';
import {arrow, check} from './../../image';
import {styles} from './styles';
import {NOT_ACTIVE, ACTIVE} from '../../colors';
import {addTask} from '../../redux/reducers/initState';
import DBController, {TASKS} from '../../utils/DBController';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store/store';
import {ID} from './../../utils/DBController';

export default function Input() {
  const [value, setValue] = useState<'' | string>('');
  const allTasks = useSelector((state: RootState) => state.tasks.value);
  const dispatch = useDispatch();
  const ref = useRef<TextInput | null>(null);

  const hendlerPress = useCallback(
    () => {
      dispatch(
        addTask({
          name: value,
          done: false,
        }),
      );
      setValue('');
      ref.current?.blur();
      DBController.insertDB(
        [ID, TASKS],
        [
          allTasks.length,
          JSON.stringify({
            name: value,
            done: false,
          }),
        ],
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, value],
  );

  const checkInput = useCallback((s: string) => {
    setValue(s);
  }, []);
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity>
            <Image
              style={[styles.image, {tintColor: ACTIVE, marginRight: 15}]}
              source={arrow}
            />
          </TouchableOpacity>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={checkInput}
            placeholderTextColor={NOT_ACTIVE}
            placeholder="What needs to be done?"
            style={styles.input}
          />
        </View>
        {value && (
          <TouchableOpacity onPress={hendlerPress}>
            <Image style={[styles.image, {tintColor: ACTIVE}]} source={check} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
