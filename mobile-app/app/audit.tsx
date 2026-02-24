import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { api } from "@/services/api";
import { setAuditHash } from "../store/wallet.slice";

export default function Audit() {
  const dispatch = useDispatch();
  const { vc, auditHash, token } = useSelector((state: RootState) => state.wallet);

  const fetchAudit = async () => {
    if (!vc) return;
    try {
      const res = await api.get(`/audit/${vc.id}`, { headers: { Authorization: `Bearer ${token}` } });
      dispatch(setAuditHash(res.data.hash));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <TouchableOpacity className="bg-purple-600 p-4 rounded-xl" onPress={fetchAudit}>
        <Text className="text-white text-center font-bold">Generate Audit Hash</Text>
      </TouchableOpacity>

      {auditHash && <Text className="mt-6 text-lg font-bold text-gray-700 text-center">{auditHash}</Text>}
    </View>
  );
}
