import { useAuth } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

export default function IndexScreen() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { signOut } = useAuth();
  return (
    <View>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => setDialogOpen(true)}
      >
        <MaterialCommunityIcons name="exit-run" size={20} color="blue" />
      </TouchableOpacity>

      <Dialog.Container visible={dialogOpen}>
        <Dialog.Title>SignOut</Dialog.Title>
        <Dialog.Description>
          Are you sure you want to sign out ?
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={() => setDialogOpen(false)} />
        <Dialog.Button
          label="Sign Out"
          onPress={async () => {
            await signOut();
            setDialogOpen(false);
          }}
        />
      </Dialog.Container>
      <Text>Index Screen</Text>
    </View>
  );
}
