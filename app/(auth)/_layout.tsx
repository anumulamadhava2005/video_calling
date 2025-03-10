import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import {View, Text, SafeAreaView} from "react-native";

export default function AuthRoutesLayout() {
    const {isSignedIn} = useAuth();
    if(isSignedIn) {
        return <Redirect href={"/(call)"} />
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <Stack>
                <Stack.Screen
                    name="sign-in"
                    options={{
                        title: "Sign In to get started",
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="sign-up"
                    options={{
                        title: "Sign Up to get started",
                        headerShown: false,
                    }}
                />
            </Stack>
        </SafeAreaView>
    )
}