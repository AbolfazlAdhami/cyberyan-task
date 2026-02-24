import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setWalletData } from "../store/wallet.slice";
import { api } from "@/services/api";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    const res = await api.post("/register", {
      name,
      email,
      passportImage: "passport.jpg",
      selfieImage: "selfie.jpg",
    });

    dispatch(setWalletData(res.data));
    router.push("/");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Name</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />

      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
