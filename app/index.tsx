import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

  const removeData = () => {
    setData("");
    setURI("");
  };

  useEffect(() => {
    const readFile = async () => {
      const text = await FileSystem.readAsStringAsync(uri, {
        encoding: "utf8",
      });
      setData(text);
    };
    if (uri.length > 0) {
      readFile();
    }
  }, [uri]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.data}>
        {data.length > 0 ? (
          <ScrollView>
            <Text style={{ textAlign: "center" }}>Data</Text>
            <Text style={{ textAlign: "center" }}>{data}</Text>
          </ScrollView>
        ) : (
          <Text>Please choose a file</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleClick}>
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Add new File
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={data ? styles.button : styles.buttonDisabled}
          disabled={data ? false : true}
          onPress={removeData}
        >
          <Text
            style={{
              color: "#ffffff",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Remove current file
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    margin: 10,
    top: 25,
    maxHeight:'100%'
  },
  data: {
    justifyContent: "center",
    flex: 8,
    alignItems: "center",
    maxHeight:"80%",
    overflow:'scroll'
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems:'center'
  },
  button: {
    backgroundColor: "#fa8101",
    borderRadius: 13,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 150,
  },
  buttonDisabled: {
    backgroundColor: "#a35400",
    borderRadius: 13,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    width: 150,
  },
});
