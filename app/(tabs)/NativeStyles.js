import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  enterContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 70,
    backgroundColor: "black",
  },

  registContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 35,
    backgroundColor: "black",
  },

  accountContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    backgroundColor: "black",
  },

  addingContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    backgroundColor: "black",
  },

  viewingContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 70,
    backgroundColor: "black",
  },

  listContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    backgroundColor: "black",
  },

  changingPasswordContainer: {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 40,
    backgroundColor: "black",
  },

  navText: {
    fontSize: 27,
    fontWeight: "medium",
    fontFamily: "Roboto Flex",
    color: "white",
    textTransform: "uppercase",
    textShadow: "0 4px 8px rgba(0,0,0,0.3)",
  },

  enterText: {
    fontSize: 30,
    fontFamily: "Roboto Flex",
    color: "white",
  },

  registText: {
    fontSize: 25,
    fontFamily: "Roboto Flex",
    color: "white",
  },

  accountText: {
    fontSize: 25,
    fontFamily: "Roboto Flex",
    color: "white",
  },

  addingText: {
    fontSize: 20,
    fontFamily: "Roboto Flex",
    color: "white",
  },

  greetingText: {
    fontSize: 16,
    fontFamily: "Roboto Flex",
    color: "white",
    bottom: 5,
  },

  viewingText: {
    fontSize: 23,
    fontFamily: "Roboto Flex",
    color: "white",
  },

  changingPasswordText: {
    fontSize: 25,
    fontFamily: "Roboto Flex",
    color: "white",
  },

  cardText: {
    fontSize: 12,
    fontFamily: "Roboto Flex",
    color: "white",
  },

  input: {
    color: "white",
    borderColor: "#ff9900",
    borderWidth: 2,
    padding: 15,
    borderRadius: 10,
    width: "80%",
  },

  button: {
    experimental_backgroundImage:
      "linear-gradient(145deg, rgba(255, 165, 0, 0.95), #ff9800, #e65100)",
    padding: 20,
    borderRadius: 10,
  },

  buttonBlocked: {
    opacity: 0.7,
  },

  buttonText: {
    fontSize: 17,
    color: "white",
    fontFamily: "Roboto Flex",
  },

  correctInput: {
    color: "white",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#09ae5c",
    padding: 15,
    borderRadius: 10,
    width: "80%",
  },

  incorrectInput: {
    color: "white",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#cc180b",
    padding: 15,
    borderRadius: 10,
    width: "80%",
  },

  navbar: {
    width: "100%",
    height: "20%",
    experimental_backgroundImage:
      "linear-gradient(145deg, rgba(255, 165, 0, 0.95), #ff9800, #e65100)",
    shadowColor: "#e65100",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    boxShadow: "inset 0 2px 5px rgba(255,255,255,0.3)",
    borderBottomWidth: 2,
    borderBottomColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 20,
    paddingBottom: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  enterForm: {
    width: "90%",
    height: "60%",
    padding: 20,
    borderRadius: 30,
    backgroundColor: "rgba(41, 22, 10, 0.7)",
    borderWidth: 4,
    borderColor: "#ff9900",
    boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
    shadowColor: "#e65100",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    gap: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  registForm: {
    width: "90%",
    height: "70%",
    padding: 20,
    borderRadius: 30,
    backgroundColor: "rgba(26, 14, 6, 0.7)",
    borderWidth: 4,
    borderColor: "#ff9900",
    boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
    shadowColor: "#e65100",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    gap: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  accountForm: {
    width: "90%",
    height: "70%",
    padding: 20,
    borderRadius: 30,
    backgroundColor: "rgba(41, 22, 10, 0.7)",
    borderWidth: 4,
    borderColor: "#ff9900",
    boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
    shadowColor: "#e65100",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    gap: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  addingForm: {
    width: "90%",
    height: "75%",
    padding: 20,
    borderRadius: 30,
    backgroundColor: "rgba(41, 22, 10, 0.7)",
    borderWidth: 4,
    borderColor: "#ff9900",
    boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
    shadowColor: "#e65100",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    gap: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  viewingForm: {
    width: "90%",
    height: "60%",
    padding: 20,
    borderRadius: 30,
    backgroundColor: "rgba(41, 22, 10, 0.7)",
    borderWidth: 4,
    borderColor: "#ff9900",
    boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
    shadowColor: "#e65100",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    gap: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  listForm: {
    width: "90%",
    height: "75%",
    padding: 20,
    borderRadius: 30,
    backgroundColor: "rgba(41, 22, 10, 0.7)",
    borderWidth: 4,
    borderColor: "#ff9900",
    boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
    shadowColor: "#e65100",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    gap: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  changingPasswordForm: {
    width: "90%",
    height: "70%",
    padding: 20,
    borderRadius: 30,
    backgroundColor: "rgba(41, 22, 10, 0.7)",
    borderWidth: 4,
    borderColor: "#ff9900",
    boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)",
    shadowColor: "#e65100",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    gap: 45,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  dateBudgetList: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 7,
  },

  cardStyle: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    experimental_backgroundImage:
      "linear-gradient(145deg, rgba(255, 165, 0, 0.95), #ff9800, #e65100)",
    borderRadius: 10,
    padding: 5,
  },
});
