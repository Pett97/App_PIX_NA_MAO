import * as React from 'react';
import { View } from 'react-native';
import { Switch, Text } from 'react-native-paper';

import StyleSwitch from './SwitchStyle';

interface MySwitchProps {
  firstText: string;
  secondText: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const MySwitch = ({
  firstText,
  secondText,
  value,
  onValueChange,
}: MySwitchProps) => {
  return (
    <View style={StyleSwitch.container}>
      <Text variant="titleSmall">{firstText}</Text>
      <Switch value={value} onValueChange={onValueChange} />
      <Text variant="titleSmall">{secondText}</Text>
    </View>
  );
};

export default MySwitch;
