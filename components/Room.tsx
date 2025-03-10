import { copySlug, formatSlug } from "@/lib/slugs";
import { Call, CallContent } from "@stream-io/video-react-native-sdk";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function CallToom({ slug, call,setSlug }: { slug: string, call: Call, setSlug: any }) {
    const router = useRouter();
  return (
    <View style={{flex:1}}>
        <View
            style={{
                position: 'absolute',
                top: 10,
                left: 10,
                padding: 10,
                borderRadius: 5,
                zIndex: 100,
            }}
        >
            <RoomId slug={slug} />
        </View>
      <GestureHandlerRootView>
        <CallContent onHangupCallHandler={() => [call.leave(), router.back()]}/>
      </GestureHandlerRootView>
    </View>
  );
}

const RoomId = ({slug}: {slug: string | null}) => {
    return (
        <TouchableOpacity
            onPress={() => copySlug(slug)}
            style={{
                backgroundColor: 'rgba(0,0,0.5',
                padding: 10,
                borderRadius: 5,
            }}
        >
            <Text style={{color: 'white'}}>
                Call Id: {formatSlug(slug)}
            </Text>

        </TouchableOpacity>
    )
}
