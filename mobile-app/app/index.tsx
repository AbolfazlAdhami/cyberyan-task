import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import { setWalletData } from "../store/wallet.slice";
import { api } from "../services/api";
import * as ImagePicker from "expo-image-picker";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passport, setPassport] = useState<string | null>(null);
  const [selfie, setSelfie] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async (setImage: any) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (!passport || !selfie) {
      Alert.alert("Error", "Please upload both images");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/register", {
        name,
        email,
        passportImage: passport,
        selfieImage: selfie,
      });

      dispatch(setWalletData(res.data));
      router.push("/wallet");
    } catch (err: any) {
      console.log(err);
      Alert.alert("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6 justify-center">
      <Text className="text-2xl font-bold mb-6 text-center">Register Identity</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} className="border border-gray-300 rounded-xl p-4 mb-4" />

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} className="border border-gray-300 rounded-xl p-4 mb-4" />

      <TouchableOpacity className="bg-blue-500 p-4 rounded-xl mb-3" onPress={() => pickImage(setPassport)}>
        <Text className="text-white text-center">Upload Passport</Text>
      </TouchableOpacity>

      {passport && <Image source={{ uri: passport }} className="h-24 w-24 mb-4 self-center rounded-lg" />}

      <TouchableOpacity className="bg-green-500 p-4 rounded-xl mb-3" onPress={() => pickImage(setSelfie)}>
        <Text className="text-white text-center">Upload Selfie</Text>
      </TouchableOpacity>

      {selfie && <Image source={{ uri: selfie }} className="h-24 w-24 mb-4 self-center rounded-lg" />}

      <TouchableOpacity className="bg-black p-4 rounded-xl" onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : <Text className="text-white text-center font-semibold">Register</Text>}
      </TouchableOpacity>
    </View>
  );
}
