import { Slot } from 'expo-router';
import 'react-native-reanimated'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { tokenCache } from '../cache'
import {RootSiblingParent} from "react-native-root-siblings"
export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error(
      'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
    )
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <RootSiblingParent>
          <Slot />
        </RootSiblingParent>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
