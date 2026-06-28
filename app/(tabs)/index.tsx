import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./NativeStyles";

//export const API_URL = "http://192.168.1.50:8080";
export const API_URL = "http://10.54.13.3:8080";

export function Button({
  text,
  pressFunction,
  blocked,
}: {
  text: string;
  pressFunction: () => void;
  blocked: boolean;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: 1.2,
      useNativeDriver: true,
      duration: 200,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      useNativeDriver: true,
      duration: 200,
    }).start();
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={pressFunction}
      disabled={blocked}
    >
      <Animated.View
        style={[
          styles.button,
          blocked && styles.buttonBlocked,
          { transform: [{ scale: scale }] },
        ]}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
}

export default function EnterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const blockCheckButton = !(email.length > 0 && password.length > 0);

  const handleEnter = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));

        Alert.alert(
          "Добро пожаловать, " +
            data.user.first_name +
            " " +
            data.user.last_name +
            "!",
        );
        router.push("/account");
      } else {
        Alert.alert("Ошибка", data.message || "Неверный email или пароль!");
      }
    } catch {
      Alert.alert("Ошибка! Не удалось подключиться к серверу!");
    }
  };

  return (
    <View style={styles.enterContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Домашний бюджет</Text>
      </View>
      <View style={styles.enterForm}>
        <Text style={styles.enterText}>Вход</Text>
        <TextInput
          style={styles.input}
          placeholder="Введите почту"
          placeholderTextColor="white"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Введите пароль"
          placeholderTextColor="white"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button
          text="Войти"
          pressFunction={handleEnter}
          blocked={blockCheckButton}
        />
        <Button
          text="Регистрация"
          pressFunction={() => router.push("/regist")}
          blocked={false}
        />
      </View>
      <StatusBar hidden={true} />
    </View>
  );
}
