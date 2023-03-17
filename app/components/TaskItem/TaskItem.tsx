import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React, {useCallback, useState, useEffect, useRef} from 'react';
import {styles} from './styles';
import {check} from '../../image';
import {border, green, red, transparent} from '../../colors';
import {cross} from './../../image';
import {gray_lite} from './../../colors';
import {useDispatch} from 'react-redux';
import {
  removeCurrent,
  setCompleted,
  editCurrent,
} from '../../redux/reducers/initState';
import DoubleClick from 'react-native-double-tap';

interface Props {
  data: {id: number; name: string; done: boolean};
  index: number;
}

export default function TaskItem(props: Props) {
  const [done, setDone] = useState(true);
  const [seeInput, setSeeInput] = useState(false);
  const [value, setValue] = useState(props.data.name);
  const ref = useRef<TextInput | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    setDone(props.data.done);
  }, [props.data]);
  const hendlerPress = useCallback(() => {
    setDone(!done);
    dispatch(setCompleted({id: props.data.id, index: props.index}));
  }, [done]);
  const hendlerRemove = useCallback(() => {
    if (seeInput) {
      dispatch(editCurrent({name: value, index: props.index}));
      setSeeInput(false);
    } else {
      console.log(props.data);
      dispatch(removeCurrent({id: props.data.id, index: props.index}));
    }
  }, [seeInput, value]);

  return (
    <DoubleClick
      doubleTap={() => {
        if (!done) {
          setSeeInput(!seeInput);
          ref.current?.focus();
        }
      }}
      delay={200}>
      <View style={styles.container}>
        <View style={styles.textWrapper}>
          <TouchableOpacity
            disabled={seeInput}
            onPress={hendlerPress}
            style={[
              styles.buttonCheck,
              {marginRight: 15, borderColor: done ? green : border},
            ]}>
            <Image
              style={[styles.image, {tintColor: done ? green : transparent}]}
              source={check}
            />
          </TouchableOpacity>
          {seeInput ? (
            <TextInput
              ref={ref}
              value={value}
              onChangeText={s => {
                setValue(s);
              }}
              style={styles.input}
            />
          ) : (
            <Text
              style={[
                styles.text,
                done
                  ? {
                      color: gray_lite,
                      textDecorationLine: 'line-through',
                    }
                  : null,
              ]}>
              {props.data.name}
            </Text>
          )}
        </View>
        {
          <TouchableOpacity
            onPress={hendlerRemove}
            style={[styles.buttonRemove]}>
            <Image
              style={[styles.image, {tintColor: seeInput ? green : red}]}
              source={seeInput ? check : cross}
            />
          </TouchableOpacity>
        }
      </View>
    </DoubleClick>
  );
}
