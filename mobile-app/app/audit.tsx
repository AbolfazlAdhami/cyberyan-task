import React from "react";
import { View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { api } from "@/services/api";
import { setAuditHash } from "../store/wallet.slice";

export default function Audit() {
  const dispatch = useDispatch();
  const { vc, auditHash } = useSelector((state: RootState) => state.wallet);

  const fetchAudit = async () => {
    if (!vc) return;
    const res = await api.get(`/audit/${vc.id}`);
    dispatch(setAuditHash(res.data.hash));
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Generate Audit Hash" onPress={fetchAudit} />
      {auditHash && <Text>{auditHash}</Text>}
    </View>
  );
}
