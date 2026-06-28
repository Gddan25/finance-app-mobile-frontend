import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StatusBar, Text, TextInput, View } from "react-native";
import { styles } from "./NativeStyles";
import { API_URL, Button } from "./index";

export default function Adding() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sum, setSum] = useState("");

  const checkDate = () => /^\d{2}\.\d{2}\.\d{4}$/.test(date);

  const checkName = () => name.length > 0;

  const checkCategory = () => category === "доход" || category === "расход";

  const checkSum = () => parseFloat(sum) > 0;

  const blockConfirmButton = !(
    checkDate() &&
    checkName() &&
    checkCategory() &&
    checkSum()
  );

  const convertDateForBackend = (dateStr: string) => {
    const [day, month, year] = dateStr.split(".");
    return `${year}-${month}-${day}`;
  };

  const createCard = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      Alert.alert("Ошибка! Вы не авторизованы!");
      router.push("/");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/transactions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: name,
          amount: parseFloat(sum),
          transaction_type: category === "доход" ? "income" : "expense",
          transaction_date: convertDateForBackend(date),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Карточка успешно создана!");

        setDate("");
        setName("");
        setCategory("");
        setSum("");
      } else {
        Alert.alert("Ошибка", data.message || "Что-то пошло не так!");
      }
    } catch {
      Alert.alert("Ошибка создания карточки!");
    }
  };

  return (
    <View style={styles.addingContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Домашний бюджет</Text>
      </View>
      <View style={styles.addingForm}>
        <Text style={styles.addingText}>Карточка дохода / расхода</Text>
        <TextInput
          style={
            date.length === 0
              ? styles.input
              : checkDate()
                ? styles.correctInput
                : styles.incorrectInput
          }
          placeholder="Введите дату __.__.____"
          placeholderTextColor="white"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={
            name.length === 0
              ? styles.input
              : checkName()
                ? styles.correctInput
                : styles.incorrectInput
          }
          placeholder="Введите наименование"
          placeholderTextColor="white"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={
            category.length === 0
              ? styles.input
              : checkCategory()
                ? styles.correctInput
                : styles.incorrectInput
          }
          placeholder="Введите категорию (доход / расход)"
          placeholderTextColor="white"
          value={category}
          onChangeText={setCategory}
        />
        <TextInput
          style={
            sum.length === 0
              ? styles.input
              : checkSum()
                ? styles.correctInput
                : styles.incorrectInput
          }
          placeholder="Введите сумму в рублях"
          placeholderTextColor="white"
          value={sum}
          onChangeText={setSum}
        />
        <Button
          text="Подтвердить"
          pressFunction={createCard}
          blocked={blockConfirmButton}
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
