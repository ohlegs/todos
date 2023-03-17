import {ScrollView, Text, View} from 'react-native';
import React, {useState, useEffect, useMemo, useCallback} from 'react';
import TaskItem from '../TaskItem/TaskItem';
import type {RootState} from '../../redux/store/store';
import {useSelector, useDispatch} from 'react-redux';
import {addTask} from '../../redux/reducers/initState';
import DBController from '../../utils/DBController';
export default function List() {
  const [data, setData] = useState([]);
  const allTasks = useSelector((state: RootState) => state.tasks.value);
  const sortMode = useSelector((state: RootState) => state.tasks.sortMode);
  const task = useMemo(() => {
    if (sortMode === 1) {
      return allTasks?.map((item, index) => (
        <TaskItem key={index} data={item} index={index} />
      ));
    }
    if (sortMode === 2) {
      return;
    }
    return allTasks?.map((item, index) => (
      <TaskItem key={index} data={item} index={index} />
    ));
  }, [sortMode]);
  useEffect(() => {
    DBController.checkDB(setData);
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    data.forEach(item => {
      dispatch(addTask({id: item.id, ...JSON.parse(item.tasks)}));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <ScrollView>
      {allTasks?.map((item, index) => {
        if (sortMode.payload === 0) {
          return <TaskItem key={index} data={item} index={index} />;
        }
        if (sortMode.payload === 1 && item.done === false) {
          return <TaskItem key={index} data={item} index={index} />;
        }
        if (sortMode.payload === 2 && item.done === true) {
          return <TaskItem key={index} data={item} index={index} />;
        }
      })}
    </ScrollView>
  );
}
