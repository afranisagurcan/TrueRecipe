import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container:{
    marginTop:70,
  },
  headerBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#a0d1d7",
    borderRadius: 15,
    padding: 25,
    alignSelf: "center"
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 22,
    fontStyle: "italic",
    color: "#084149"
  },
  inputArea: {
    margin: 20,
    width: "90%",
    borderRadius: 15
  },
  inputHeader: {
    fontSize: 20,
    fontWeight: "bold"
  },
  inputText: {
    backgroundColor: "#dcd8d8",
    color: "black",
    fontSize: 20,
    padding: 15,
    borderRadius: 15
  },
  inputArea2: {
    margin: 20,
    borderRadius: 15,
    flex: 2,
    flexDirection: "row"
  },
  inputHeader2: {
    fontSize: 20,
    paddingBottom: 15,
    fontWeight: "bold"
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#a0d1d7",
    borderRadius: 15,
    padding: 15,
    alignSelf: "center"
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    fontStyle: "italic",
    color: "#084149",
    paddingTop: 3
  }

});
