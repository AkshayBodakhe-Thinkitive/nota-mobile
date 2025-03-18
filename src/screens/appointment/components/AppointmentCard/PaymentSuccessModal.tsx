import React, { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { colors } from "../../../../assets/colors";
import SmallButton from "../../../../components/SmallButton/SmallButton";

// interface SuccessModalProps {
//   visible:()=>{};
//   onClose: () => void;
// }

const PaymentSuccessModal = ({ onClose, setVisible }) => {

    const handleOnClose = () => {
        setVisible(false)
        onClose()
        console.log("DONEEEE");
    }
    return (
        <Modal visible={true} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    {/* Lottie Animation */}
                    <LottieView
                        source={require("../../../../assets/images/tick_done.json")}
                        autoPlay
                        loop={false}
                        style={styles.lottie}
                    />
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
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: 300,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    lottie: {
        width: 400,
        height: 400,
        marginTop: -50
    },
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: -50,
        marginBottom: 32,
        width: '30%'
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default PaymentSuccessModal;
