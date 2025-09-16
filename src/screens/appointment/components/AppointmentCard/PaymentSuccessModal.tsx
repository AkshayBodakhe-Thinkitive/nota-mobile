import React, {useEffect, useRef} from 'react';
import {Modal, View, Text, StyleSheet, Animated, Easing} from 'react-native';
import {colors} from '../../../../assets/colors';
import SmallButton from '../../../../components/SmallButton/SmallButton';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface PaymentSuccessModalProps {
  onClose: () => void;
  setVisible: (visible: boolean) => void;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  onClose,
  setVisible,
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animation sequence
    Animated.sequence([
      // Scale up with bounce effect
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
      // Fade in
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleOnClose = () => {
    setVisible(false);
    onClose();
  };

  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Success Animation */}
          <Animated.View
            style={[
              styles.animationContainer,
              {
                transform: [{scale: scaleAnim}],
                opacity: opacityAnim,
              },
            ]}>
            <View style={styles.checkmarkCircle}>
              <Icon name="check" size={60} color="white" />
            </View>
            <Text style={styles.successText}>Payment Successful!</Text>
          </Animated.View>

          {/* OK Button */}
          <SmallButton
            title="OK"
            containerStyle={styles.button}
            onPress={handleOnClose}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
  },
  animationContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  checkmarkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50', // Material Design Green
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#4CAF50',
    textAlign: 'center',
    width: 300,
    //    borderWidth:1
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 20,
    width: '50%',
  },
});

export default PaymentSuccessModal;
