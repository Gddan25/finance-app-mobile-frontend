import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StatusBar, Text, View } from "react-native";
import { styles } from "./NativeStyles";
import { Button } from "./index";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export default function AccountScreen() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const greetingUser = async () => {
      try {
        const userData = await AsyncStorage.getItem("user");

        if (userData) {
          setUser(JSON.parse(userData));
        } else {
          router.push("/");
        }
      } catch {
        Alert.alert("Пользователь не найден!");
      }
    };

    greetingUser();
  }, []);

  const handleExit = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    router.push("/");
  };

  return (
    <View style={styles.accountContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Домашний бюджет</Text>
      </View>
      <View style={styles.accountForm}>
        <Text style={styles.accountText}>Выберите операцию</Text>
        <Button
          text="Добавить доход / расход"
          pressFunction={() => router.push("/adding")}
          blocked={false}
        />
        <Button
          text="Ваши доходы / расходы"
          pressFunction={() => router.push("/choiceViewing")}
          blocked={false}
        />
        <Button
          text="Сменить пароль"
          pressFunction={() => router.push("/changingPassword")}
          blocked={false}
        />
        <Button text="Выйти" pressFunction={handleExit} blocked={false} />
      </View>
      <Text style={styles.greetingText}>
        Добро пожаловать, {user?.first_name} {user?.last_name}!
      </Text>
      <StatusBar hidden={true} />
    </View>
  );
}
