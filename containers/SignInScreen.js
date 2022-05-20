import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import logo from "../assets/logoAirbnb.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(email);
  // console.log(password);
  const [error, setError] = useState("");
  const signIn = async () => {
    try {
      if (email === "") {
        setError("Remplissez le champ email");
      } else if (password === "") {
        setError("Remplissez le champ password");
      } else {
        setError("");
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        // console.log(response.data.token);
        const userToken = response.data.token;
        if (userToken) {
          alert("You are connected !");
        }
        setToken(userToken);
      }
    } catch (error) {
      // console.log(error.response.data);
      if (error.response.data.error === "Unauthorized") {
        setError("Email and Password not found !");
      }
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.head}>
          <Image source={logo} style={styles.logoAirbnb} />
          <Text style={styles.signinText}>Sign in</Text>
        </View>
        <View style={styles.userContainer}>
          <TextInput
            style={styles.email}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />

          <TextInput
            style={styles.password}
            placeholder="password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
        </View>

        <View style={styles.footSignIn}>
          {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
          <TouchableOpacity
            style={styles.buttonSignIn}
            onPress={async () => {
              signIn();
            }}
          >
            <Text style={{ fontSize: 20 }}>Sign in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  head: {
    alignItems: "center",
    marginBottom: 60,
    marginTop: 100,
  },
  logoAirbnb: {
    width: 110,
    height: 110,
    marginBottom: 15,
  },
  signinText: {
    fontSize: 25,
    color: "grey",
    fontWeight: "500",
  },

  userContainer: {
    marginBottom: 100,
    marginTop: 50,
  },
  email: {
    padding: 10,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
  },
  password: {
    padding: 10,
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: 300,
  },

  buttonSignIn: {
    borderWidth: 2,
    borderColor: "red",
    borderRadius: 30,
    padding: 15,
    paddingLeft: 60,
    paddingRight: 60,
    marginTop: 60,
    alignItems: "center",
    marginBottom: 20,
  },

  footSignIn: {
    marginBottom: 30,
    alignItems: "center",
  },
});
