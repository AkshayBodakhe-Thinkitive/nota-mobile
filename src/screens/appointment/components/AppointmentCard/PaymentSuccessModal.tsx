import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const PaymentSuccessModal: React.FC<SuccessModalProps> = ({ visible, onClose }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Lottie Animation */}
          <LottieView
            source={require("../../../../assets/images/tick_done.json")} // Replace with your success animation JSON
            autoPlay
            loop={false}
            style={styles.lottie}
          />
          <Text style={styles.text}>Payment Successful!</Text>
          
          {/* OK Button */}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  lottie: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  button: {
    marginTop: 15,
    backgroundColor: "#0097F0",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PaymentSuccessModal;
