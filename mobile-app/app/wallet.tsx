import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import QRCode from "react-native-qrcode-svg";
import { useRouter } from "expo-router";

export default function Wallet() {
  const router = useRouter();
  const { did, vc } = useSelector((state: RootState) => state.wallet);

  return (
    <View style={{ padding: 20 }}>
      <Text>DID:</Text>
      <Text>{did}</Text>

      {vc && <QRCode value={JSON.stringify(vc)} size={200} />}

      <Button title="Go to Audit" onPress={() => router.push("/audit")} />
    </View>
  );
}
