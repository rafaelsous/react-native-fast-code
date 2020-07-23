import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useValue, translateZ } from "react-native-redash";
import Animated, {
  interpolate,
  divide,
  sub,
  Extrapolate,
  asin,
  multiply,
  cos,
} from "react-native-reanimated";
import MaskedView from "@react-native-community/masked-view";

import { ITEM_HEIGHT, VISIBLE_ITEMS } from "../components/Constants";
import GestureHandler from "../components/GestureHandler";

const { width } = Dimensions.get("window");

const perspective = 600;
const RADIUS_REL = VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * ITEM_HEIGHT;

interface Props {
  values: { value: number; label: string }[];
  defaultValue: number;
}

const Picker: React.FC<Props> = ({ values, defaultValue }) => {
  const translateY = useValue(0);

  const maskElement = (
    <Animated.View style={{ transform: [{ translateY }] }}>
      {values.map((item, index) => {
        const y = interpolate(
          divide(sub(translateY, ITEM_HEIGHT * 2), -ITEM_HEIGHT),
          {
            inputRange: [index - RADIUS_REL, index, index + RADIUS_REL],
            outputRange: [-1, 0, 1],
            extrapolate: Extrapolate.CLAMP,
          }
        );

        const rotateX = asin(y);
        const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);

        return (
          <Animated.View
            key={item.value}
            style={[
              styles.item,
              {
                transform: [
                  { perspective },
                  { rotateX },
                  translateZ(perspective, z),
                ],
              },
            ]}
          >
            <Text style={styles.label}>{item.label}</Text>
          </Animated.View>
        );
      })}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <MaskedView {...{ maskElement }}>
        <View style={{ height: ITEM_HEIGHT * 2, backgroundColor: "grey" }} />
        <View style={{ height: ITEM_HEIGHT, backgroundColor: "white" }} />
        <View style={{ height: ITEM_HEIGHT * 2, backgroundColor: "grey" }} />
      </MaskedView>

      <View style={StyleSheet.absoluteFill}>
        <View
          style={{
            height: ITEM_HEIGHT,
            top: ITEM_HEIGHT * 2,
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: "grey",
          }}
        />

        <GestureHandler max={values.length} {...{ translateY }} />
      </View>
      {/*<GestureHandler
          max={values.length}
          value={translateY}
          {...{ defaultValue }}
        />*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 0.61 * width,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: "hidden",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
  },
  label: {
    fontFamily: "SFProText-Semibold",
    fontSize: 24,
    lineHeight: ITEM_HEIGHT,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
  },
});

export default Picker;
