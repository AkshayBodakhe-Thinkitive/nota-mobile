// Toast.js
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

interface ToastProps {
    visible: boolean;
    message: string;
    duration?: number;
    onHide?: () => void;
  }

const Toast = ({ visible, message, duration = 3000, onHide }:ToastProps) => {
  const [show, setShow] = useState(visible);
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setShow(false);
          if (onHide) {
            onHide();
          }
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, opacity, onHide]);

  if (!show) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.toast, { opacity }]}>
        <Text style={styles.message}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  toast: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
  },
  message: {
    color: 'white',
    fontSize: 16,
  },
});

export default Toast;
