import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Picker from "./Picker";

const start = 1900;
const values = new Array(new Date().getFullYear() - start + 1)
  .fill(0)
  .map((_, index) => {
    const value = start + index;
    return { value, label: `${value}` };
  })
  .reverse();

const PickerDemo: React.FC = () => {
  const defaultValue = 1990 - start;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What year were you born?</Text>
      <Picker {...{ values, defaultValue }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginBottom: 31,
    fontFamily: "SFProText-Semibold",
    fontSize: 24,
    color: "white",
  },
});

export default PickerDemo;
