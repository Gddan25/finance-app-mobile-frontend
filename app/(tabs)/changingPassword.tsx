import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StatusBar, Text, TextInput, View } from "react-native";
import { styles } from "./NativeStyles";
import { API_URL, Button } from "./index";

export default function ChangingPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const checkNewPassword = () => newPassword.length > 7;
  const checkConfirmNewPassword = () => newPassword === confirmNewPassword;

  const handleChangingPassword = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      Alert.alert("Ошибка! Вы не авторизованы!");
      router.push("/");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          new_password: newPassword,
          confirm_password: confirmNewPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Пароль успешно обновлён!");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        Alert.alert("Ошибка", data.message || "Что-то пошло не так!");
      }
    } catch {
      Alert.alert("Ошибка! Не удалось подключиться к серверу!");
    }
  };

  return (
    <View style={styles.changingPasswordContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Домашний бюджет</Text>
      </View>
      <View style={styles.changingPasswordForm}>
        <Text style={styles.changingPasswordText}>Смена пароля</Text>
        <TextInput
          style={
            newPassword.length === 0
              ? styles.input
              : checkNewPassword()
                ? styles.correctInput
                : styles.incorrectInput
          }
          placeholder="Введите новый пароль"
          placeholderTextColor="white"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={
            confirmNewPassword.length === 0
              ? styles.input
              : checkConfirmNewPassword()
                ? styles.correctInput
                : styles.incorrectInput
          }
          placeholder="Подтвердите пароль"
          placeholderTextColor="white"
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          secureTextEntry={true}
        />
        <Button
          text="Подтвердить"
          pressFunction={handleChangingPassword}
          blocked={!checkConfirmNewPassword()}
        />
        <Button
          text="Назад"
          pressFunction={() => router.push("/account")}
          blocked={false}
        />
      </View>
      <StatusBar hidden={true} />
    </View>
  );
}
