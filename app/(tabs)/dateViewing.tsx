import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./NativeStyles";
import { API_URL, Button } from "./index";

interface cardType {
  id: number;
  title: string;
  amount: number;
  type: "income" | "expense";
  transaction_date: string;
}

export default function DateViewing() {
  const [date, setDate] = useState("");

  const [showlist, setShowList] = useState(false);
  const [dateList, setDateList] = useState([]);

  const checkDate = () => /^\d{2}\.\d{2}\.\d{4}$/.test(date);

  const convertDateForBackend = (dateStr: string) => {
    const [day, month, year] = dateStr.split(".");
    return `${year}-${month}-${day}`;
  };

  const convertDateForFrontend = (dateStr: string) => {
    const ymd = dateStr.split("T")[0];
    const [year, month, day] = ymd.split("-");
    return `${day}.${month}.${year}`;
  };

  const confirmDate = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      Alert.alert("Ошибка! Вы не авторизованы!");
      router.push("/");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/transactions/day?date=${convertDateForBackend(date)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setDateList(data);

        Alert.alert(
          "Список доходов / расходов за указанную дату получен успешно!",
        );

        setShowList(true);
        setDate("");
      } else {
        Alert.alert("Ошибка", data.message || "Что-то пошло не так!");
      }
    } catch {
      Alert.alert("Ошибка", "Не удалось подключиться к серверу!");
    }
  };

  return !showlist ? (
    <View style={styles.viewingContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Домашний бюджет</Text>
      </View>
      <View style={styles.viewingForm}>
        <Text style={styles.viewingText}>Укажите дату расходов / доходов</Text>
        <TextInput
          style={
            date.length === 0
              ? styles.input
              : checkDate()
                ? styles.correctInput
                : styles.incorrectInput
          }
          placeholder="__.__.____"
          placeholderTextColor="white"
          value={date}
          onChangeText={setDate}
        />
        <Button
          text="Подтвердить"
          pressFunction={confirmDate}
          blocked={!checkDate()}
        />
        <Button
          text="Назад"
          pressFunction={() => router.push("/choiceViewing")}
          blocked={false}
        />
      </View>
      <StatusBar hidden={true} />
    </View>
  ) : (
    <View style={styles.listContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Домашний бюджет</Text>
      </View>
      <View style={styles.listForm}>
        {dateList ? (
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={styles.dateBudgetList}
          >
            {dateList.map((card: cardType, index) => (
              <View key={card.id} style={styles.cardStyle}>
                <Text style={styles.cardText}>{index + 1}</Text>
                <Text style={styles.cardText}>Наименование: {card.title}</Text>
                <Text style={styles.cardText}>Сумма: {card.amount}</Text>
                <Text style={styles.cardText}>
                  Категория: {card.type === "income" ? "Доход" : "Расход"}
                </Text>
                <Text style={styles.cardText}>
                  Дата: {convertDateForFrontend(card.transaction_date)}
                </Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.viewingText}>
            Нет информации о доходах / расходах за указанную дату!
          </Text>
        )}
        <Button
          text="Назад"
          pressFunction={() => setShowList(false)}
          blocked={false}
        />
      </View>
    </View>
  );
}
