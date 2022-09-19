import { Button, HStack, Icon, Image } from "native-base";
import React, { useState } from "react";
import { View, Platform, Alert } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export function ImageUpload() {
  const [image, setImage] = useState<string>("");
  const [uploading, setUploading] = useState(false);

  const onSelectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image.path);
      const imageUri = Platform.OS === "ios" ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const submitImage = async () => {
    const uploadUri = image;
    let filename = uploadUri?.substring(uploadUri?.lastIndexOf("/") + 1);

    setUploading(true);

    try {
      await storage().ref(filename).putFile(uploadUri);

      setUploading(false);
      Alert.alert("Imagem salva", "Você salvou uma imagem");
    } catch (error) {
      console.log(error);
    }

    setImage("");
  };

  return (
    <View>
      <HStack alignItems="center" space={4}>
        {image != "" ? (
          <Image
            borderRadius={100}
            alt="Alternate Text"
            size="sm"
            source={{ uri: image }}
          />
        ) : (
          <Image
            borderRadius={100}
            source={{
              uri: "https://png.pngtree.com/png-vector/20190120/ourlarge/pngtree-gallery-vector-icon-png-image_470660.jpg",
            }}
            alt="Alternate Text"
            size="sm"
          />
        )}
        <Button
          size="sm"
          onPress={onSelectImage}
          leftIcon={
            <Icon as={Ionicons} name="cloud-upload-outline" size="sm" />
          }
        >
          Carregar...
        </Button>
        <Button
          size="sm"
          onPress={submitImage}
          rightIcon={
            <Icon
              as={<AntDesign name="arrowright" size={24} color="black" />}
              name="cloud-upload-outline"
              size="sm"
            />
          }
        >
          Salvar imagem
        </Button>
      </HStack>
    </View>
  );
}
