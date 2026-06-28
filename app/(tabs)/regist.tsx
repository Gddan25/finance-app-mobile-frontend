import { router } from "expo-router";
import { Fragment, useState } from "react";
import { Alert, StatusBar, Text, TextInput, View } from "react-native";
import { styles } from "./NativeStyles";
import { API_URL, Button } from "./index";

export default function RegistScreen() {
  const [pressContinueButton, setPressContinueButton] = useState(false);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkName = () => name.length > 1;

  const checkSurname = () => surname.length > 1;

  const checkEmail = () =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const checkPassword = () => password.length > 7 && password.length < 17;

  const checkConfirmPassword = () =>
    confirmPassword === password && confirmPassword.length > 0;

  const blockContinueButton = !(checkName() && checkSurname() && checkEmail());
  const blockRegButton = !(checkPassword() && checkConfirmPassword());

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: name,
          last_name: surname,
          email: email,
          password: password,
          password_confirm: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Регистрация прошла успешно!");

        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        Alert.alert("Ошибка", data.message || "Что-то пошло не так!");
      }
    } catch {
      Alert.alert("Ошибка! Не удалось подключиться к серверу!");
    }
  };

  return (
    <View style={styles.registContainer}>
      <View style={styles.navbar}>
        <Text style={styles.navText}>Домашний бюджет</Text>
      </View>
      <View style={styles.registForm}>
        <Text style={styles.registText}>Форма регистрации</Text>
        {!pressContinueButton ? (
          <Fragment>
            <TextInput
              style={
                name.length === 0
                  ? styles.input
                  : checkName()
                    ? styles.correctInput
                    : styles.incorrectInput
              }
              placeholder="Введите имя"
              placeholderTextColor="white"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={
                surname.length === 0
                  ? styles.input
                  : checkSurname()
                    ? styles.correctInput
                    : styles.incorrectInput
              }
              placeholder="Введите фамилию"
              placeholderTextColor="white"
              value={surname}
              onChangeText={setSurname}
            />
            <TextInput
              style={
                email.length === 0
                  ? styles.input
                  : checkEmail()
                    ? styles.correctInput
                    : styles.incorrectInput
              }
              placeholder="Введите почту"
              placeholderTextColor="white"
              value={email}
              onChangeText={setEmail}
            />
            <Button
              text="Продолжить"
              pressFunction={() => setPressContinueButton(true)}
              blocked={blockContinueButton}
            />
            <Button
              text="Форма входа"
              pressFunction={() => router.push("/")}
              blocked={false}
            />
          </Fragment>
        ) : (
          <Fragment>
            <TextInput
              style={
                password.length === 0
                  ? styles.input
                  : checkPassword()
                    ? styles.correctInput
                    : styles.incorrectInput
              }
              placeholder="Введите пароль"
              placeholderTextColor="white"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TextInput
              style={
                confirmPassword.length === 0
                  ? styles.input
                  : checkConfirmPassword()
                    ? styles.correctInput
                    : styles.incorrectInput
              }
              placeholder="Подтвердите пароль"
              placeholderTextColor="white"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />
            <Button
              text="Зарегистрироваться"
              pressFunction={handleRegister}
              blocked={blockRegButton}
            />
            <Button
              text="Назад"
              pressFunction={() => setPressContinueButton(false)}
              blocked={false}
            />
            <Button
              text="Форма входа"
              pressFunction={() => router.push("/")}
              blocked={false}
            />
          </Fragment>
        )}
      </View>
      <StatusBar hidden={true} />
    </View>
  );
}
