import * as React from 'react';
import { Appbar } from 'react-native-paper';

const MyTopBar = () => (
  <Appbar.Header>
    <Appbar.Content title="top bar" />
    <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
);

export default MyTopBar;



