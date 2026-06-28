import { router } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import { styles } from "./NativeStyles";
import { Button } from "./index";

export default function ChoiceViewing() {
  return (
    <View style={styles.viewingContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Домашний бюджет</Text>
      </View>
      <View style={styles.viewingForm}>
        <Text style={styles.viewingText}>Информация о доходах / расходах</Text>
        <Button
          text="Указать дату"
          pressFunction={() => router.push("/dateViewing")}
          blocked={false}
        />
        <Button
          text="Указать период"
          pressFunction={() => router.push("/periodViewing")}
          blocked={false}
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
