import * as React from 'react';
import { Button } from 'react-native-paper';

interface MyButtonProps {
  title:string;
  icon: string;
  mode?: "text" | "outlined" | "contained";
  action: () => void;
}

const MyButton = ({title,icon,mode = "contained",action}:MyButtonProps) => (
  <Button icon={icon} mode={mode} onPress={action}>
    {title}
  </Button>
);

export default MyButton;
