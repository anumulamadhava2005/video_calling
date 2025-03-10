import {
  Call,
  CallingState,
  StreamCall,
  useStreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import CallRoom from "../../components/Room";
import { generateSlug } from "random-word-slugs";
import Toast from "react-native-root-toast";
import { copySlug } from "@/lib/slugs";

export default function CallScreen() {
  const { id } = useLocalSearchParams();
  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();
  const [slug, setSlug] = useState<string | undefined>(undefined);

  useEffect(() => {
    let slug2: string;
    if (id !== "(call)" && id) {
      slug2 = id.toString();
      const _call = client?.call("default", slug2);
      _call?.join({ create: false }).then(() => {
        setCall(_call);
      });
      setSlug(slug2);
    } else {
      slug2 = generateSlug(3, {
        categories: {
          adjective: ["color", "personality"],
          noun: ["animals", "food"],
        },
      });
      console.log(slug2)
      const _call = client?.call("default", slug2);
      _call?.join({ create: true }).then(() => {
        Toast.show(
          "Call created succesfully\nTap to copy the call id.",
          {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
            shadow: true,
            onPress: async() => {
              copySlug(slug2);
            }
          }
        )
        setCall(_call);
      });
      setSlug(slug2);
    }
  }, [id, client]);

  useEffect(() => {
    //cleanup functions run when the component is unmounted
    if (call?.state.callingState !== CallingState.LEFT) {
      call?.leave();
    }
  }, []);

  if (!call||!slug) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <StreamCall call={call}>
      <CallRoom slug={slug} call={call} setSlug={setSlug} />
    </StreamCall>
  );
}
