import { View, ActivityIndicator, Modal } from "react-native";
import { useSelector } from "react-redux";

const Loader = ({ routes, navigation }) => {
  const loading = useSelector((state) => state.loading);
  return (
    <Modal
      transparent={true}
      animationType={"none"}
      visible={loading}
      onRequestClose={() => {}}
      className="relative w-screen h-screen"
    >
      <View className="absolute bg-gray-400 opacity-50 w-screen h-screen flex justify-center items-center"></View>
      <View className="flex-1 justify-center items-center z-50 scale-150">
        <ActivityIndicator className size="large" color="#0000ff" />
      </View>
    </Modal>
  );
};

export default Loader;
