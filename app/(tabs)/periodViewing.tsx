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

export default function PeriodViewing() {
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");

  const [showlist, setShowList] = useState(false);
  const [periodList, setPeriodList] = useState([]);

  const checkDate = (date: string) => /^\d{2}\.\d{2}\.\d{4}$/.test(date);

  const convertDateForBackend = (dateStr: string) => {
    const [day, month, year] = dateStr.split(".");
    return `${year}-${month}-${day}`;
  };

  const convertDateForFrontend = (dateStr: string) => {
    const ymd = dateStr.split("T")[0];
    const [year, month, day] = ymd.split("-");
    return `${day}.${month}.${year}`;
  };

  const confirmPeriod = async () => {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      Alert.alert("Ошибка! Вы не авторизованы!");
      router.push("/");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/transactions/period?from=${convertDateForBackend(firstDate)}&to=${convertDateForBackend(secondDate)}`,
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
        setPeriodList(data);

        Alert.alert(
          "Список доходов / расходов за указанный период получен успешно!",
        );

        setShowList(true);
        setFirstDate("");
        setSecondDate("");
      } else {
        Alert.alert("Ошибка", data.message || "Что-то пошло не так!");
      }
    } catch {
      Alert.alert("Ошибка", "Не удалось подключиться к серверу!");
    }
  };

  return !showlist ? (
    <View style={[styles.viewingContainer, { gap: 35 }]}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Домашний бюджет</Text>
      </View>
      <View style={[styles.viewingForm, { height: "70%" }]}>
        <Text style={styles.viewingText}>
          Укажите период расходов / доходов
        </Text>
        <TextInput
          style={
            firstDate.length === 0
              ? styles.input
              : checkDate(firstDate)
                ? styles.correctInput
                : styles.incorrectInput
          }
          placeholder="C __.__.____"
          placeholderTextColor="white"
          value={firstDate}
          onChangeText={setFirstDate}
        />
        <TextInput
          style={
            secondDate.length === 0
              ? styles.input
              : checkDate(secondDate)
                ? styles.correctInput
                : styles.incorrectInput
          }
          placeholder="По __.__.____"
          placeholderTextColor="white"
          value={secondDate}
          onChangeText={setSecondDate}
        />
        <Button
          text="Подтвердить"
          pressFunction={confirmPeriod}
          blocked={!(checkDate(firstDate) && checkDate(secondDate))}
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
        {periodList ? (
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={styles.dateBudgetList}
          >
            {periodList.map((card: cardType, index) => (
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
            Нет информации о доходах / расходах за указанный период!
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
