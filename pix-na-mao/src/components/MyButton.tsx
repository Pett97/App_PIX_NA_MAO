import * as React from 'react';
import { Button } from 'react-native-paper';

const MyButton = () => (
  <Button icon="camera" mode="contained" onPress={() => console.log('2222')}>
    Press me
  </Button>
);

export default MyButton;