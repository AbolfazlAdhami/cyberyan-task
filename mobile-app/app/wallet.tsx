import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import QRCode from "react-native-qrcode-svg";
import { useRouter } from "expo-router";

export default function Wallet() {
  const router = useRouter();
  const { vc, did } = useSelector((state: RootState) => state.wallet);

  return (
    <View className="flex-1 bg-gray-50 p-6 items-center">
      <Text className="text-lg font-bold mb-4">Your DID</Text>
      <Text className="text-xs text-gray-600 mb-6 text-center">{did}</Text>

      {vc && (
        <View className="bg-white p-6 rounded-2xl shadow-md">
          <QRCode value={JSON.stringify(vc)} size={180} />
        </View>
      )}

      <TouchableOpacity className="bg-purple-600 p-4 rounded-xl my-8 w-full text-center" onPress={() => router.push("/audit")}>
        <Text className="text-white text-center">Audit</Text>
      </TouchableOpacity>
    </View>
  );
}
