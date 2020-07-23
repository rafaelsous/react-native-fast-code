import React from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useCode,
  set,
  block,
  Clock,
  Value,
  Easing,
  startClock,
  cond,
  eq,
  add,
  timing,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { usePanGestureHandler, snapPoint } from "react-native-redash";

import { ITEM_HEIGHT } from "../Constants";

interface WithSnapToIntervalParams {
  value: Animated.Node<number>;
  velocity: Animated.Node<number>;
  state: Animated.Node<State>;
  snapPoints: number[];
}

const withSnapToInterval = ({
  value,
  velocity,
  state: gestureState,
  snapPoints,
}: WithSnapToIntervalParams) => {
  const clock = new Clock();

  const offset = new Value(0);

  const state = {
    position: new Value(0),
    finished: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    easing: Easing.bezier(0.25, 1, 0.5, 1),
    duration: 1000,
  };

  return block([
    startClock(clock),
    cond(eq(gestureState, State.BEGAN), [
      set(offset, state.position),
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
    ]),
    cond(eq(gestureState, State.ACTIVE), [
      set(state.position, add(offset, value)),
      set(config.toValue, snapPoint(state.position, velocity, snapPoints)),
    ]),
    cond(eq(gestureState, State.END), [timing(clock, state, config)]),
    state.position,
  ]);
};

interface Props {
  translateY: Animated.Value<number>;
  max: number;
}

const GestureHandler: React.FC<Props> = ({ translateY, max }) => {
  const {
    gestureHandler,
    translation,
    velocity,
    state,
  } = usePanGestureHandler();

  const snapPoints = new Array(max).fill(0).map((_, i) => -i * ITEM_HEIGHT);

  useCode(
    () =>
      set(
        translateY,
        withSnapToInterval({
          value: translation.y,
          velocity: velocity.y,
          state,
          snapPoints,
        })
      ),
    []
  );

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={StyleSheet.absoluteFill} />
    </PanGestureHandler>
  );
};

export default GestureHandler;
