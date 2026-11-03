import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#d0d2d3",
    paddingTop:62,
  },
  logo: {
    height: 34,
    width: 134,
  },
  form:{
    gap: 10,
    width:"100%",
    marginTop: 42,
    padding:24,
  },
  content:{
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 24,
    paddingTop: 32,
    padding: 24
  },
  header: {
    width: "100%",
    flexDirection: "row",
    gap: 12,
    borderBottomColor:"#e4e6ec",
    borderBottomWidth: 1,
    paddingBottom: 12
  },
  btnLimpar: {
    marginLeft: "auto",
  },
  textLimpar: {
    fontSize: 12,
    fontWeight: 700,
    color: "#828282"
  }
});
