import * as React from "react";
import { Searchbar } from "react-native-paper";

interface MySearchBarProps {
  placeholder: string;
  value: string;
  search:(text:string)=>void
}

const MySearchBar = ({ placeholder, value, search }: MySearchBarProps) => {
  return (
    <Searchbar placeholder={placeholder} onChangeText={search} value={value} />
  );
};

export default MySearchBar;
