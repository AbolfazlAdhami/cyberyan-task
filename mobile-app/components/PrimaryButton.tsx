import { Pressable, Text } from "react-native";

export default function PrimaryButton({ title, onPress, loading }: any) {
  return (
    <Pressable onPress={onPress} disabled={loading} className={`p-4 rounded-xl ${loading ? "bg-gray-400" : "bg-black"}`}>
      <Text className="text-white text-center font-semibold">{loading ? "Please wait..." : title}</Text>
    </Pressable>
  );
}
