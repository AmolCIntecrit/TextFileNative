import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useEffect, useState } from "react";
import * as FileSystem from "expo-file-system";

export default function Index() {
  const [uri, setURI] = useState<string>("");
  const [data, setData] = useState<string>("");

  const handleClick = async () => {
    const res: DocumentPicker.DocumentPickerResult =
      await DocumentPicker.getDocumentAsync({});
    if (res.assets) {
      const currURI = res.assets[0].uri;
      setURI(currURI);
    }
  };

  useEffect(() => {
    const readFile = async () => {
      const text = await FileSystem.readAsStringAsync(uri);
      setData(text);
    };
    if (uri.length > 0) {
      readFile();
    }
  }, [uri]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar style="inverted" />

      {data.length > 0 ? (
        <Text>{data}</Text>
      ) : (
        <View>
          <TouchableOpacity onPress={handleClick}>
            <Text>Click here to add file</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
