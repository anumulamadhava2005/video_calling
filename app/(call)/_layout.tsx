import { Redirect, Tabs } from "expo-router";
import { SafeAreaView, StatusBar, View } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  LogLevel,
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";

const apiKey = process.env.EXPO_PUBLIC_GET_STREAM_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing GetStream API Key. Please set EXPO_PUBLIC_GET_STREAM_API_KEY in your .env"
  );
}

export default function CallRoutesLayout() {
  const { isSignedIn } = useAuth();
  const {user: clerkUser} = useUser();
  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  const user: User = {
    id: clerkUser?.id!,
    name: clerkUser?.fullName!,
    image: clerkUser?.imageUrl,
    type: 'authenticated',
  }

  const tokenProvider = async () => {
    const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/generateUserToken`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: clerkUser?.id,
                name: clerkUser?.fullName,
                image: clerkUser?.imageUrl,
                email: clerkUser?.primaryEmailAddress?.toString(),
            }),
        }
    );
    const data = await response.json();
    return data.token;
  }
  console.log(
    clerkUser?.id,
    clerkUser?.fullName,
    clerkUser?.imageUrl,
    clerkUser?.primaryEmailAddress?.toString(),)

  const client = StreamVideoClient.getOrCreateInstance({
    apiKey: apiKey as string,
    user,
    tokenProvider,
    options: {
        logger: (LogLevel: LogLevel, message: string, ...args: unknown[]) => {}
    }
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StreamVideo client={client}>
        <StatusBar barStyle={"dark-content"}/>
        <Tabs
          screenOptions={({ route }) => ({
            header: () => null,
            tabBarStyle: {
              display: route.name === "[id]" ? "none" : "flex",
            },
            tabBarLabelStyle: {
              zIndex: 100,
              paddingBottom: 5,
            },
            unmountOnBlur: true, // Ensures unmounting the screen when it's not active
          })}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "All Calls",
              tabBarIcon: ({ color }) => (
                <Ionicons name="call-outline" size={24} color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="[id]"
            options={{
              title: "start new call",
              header: () => null,
              tabBarIcon: ({ color }) => {
                return (
                  <FontAwesome
                    name="plus-circle"
                    size={30}
                    color="black"
                    style={{ zIndex: 200 }}
                  />
                );
              },
            }}
          />
          <Tabs.Screen
            name="join"
            options={{
              title: "Join Call",
              headerTitle: "Enter the room Id",
              tabBarIcon: ({ color }) => (
                <Ionicons name="enter-outline" size={24} color={color} />
              ),
            }}
          />
        </Tabs>
      </StreamVideo>
    </SafeAreaView>
  );
}
