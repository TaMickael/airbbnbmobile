import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import logo from "../assets/logoAirbnb.png";
import { useState } from "react";
import axios from "axios";

const SignUpScreen = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUp = async () => {
    try {
      if (email === "") {
        setError("Enter an Email or invalid");
      } else if (username === "") {
        setError("Enter an Username");
      } else if (password !== confirmPassword) {
        setError("The password is different");
      } else {
        setError("");
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
          }
        );
        console.log(response.data.token);
        const userToken = response.data.token;
        setToken(userToken);
      }
    } catch (error) {
      // console.log(error.response.data);
      if (error.response.data) {
        setError(error.response.data.error);
      }
    }
  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.containerSignUp}>
        <View style={styles.head}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.textSignUp}>Sign up</Text>
        </View>

        <View style={styles.middle}>
          <Text>email: </Text>
          <TextInput
            style={styles.email}
            placeholder="email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />
          <Text>Username:</Text>
          <TextInput
            style={styles.username}
            placeholder="username"
            onChangeText={(text) => {
              setUsername(text);
            }}
            value={username}
          />
          <Text>Description</Text>
          <TextInput
            style={styles.description}
            placeholder="Describe yourself in a few words"
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />
          <Text>Password: </Text>
          <TextInput
            style={styles.password}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <Text>Confirm password:</Text>
          <TextInput
            style={styles.confirmPassword}
            placeholder="confirm password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={confirmPassword}
          />
        </View>
        {error ? (
          <Text style={{ color: "red", marginTop: 30 }}>{error}</Text>
        ) : null}
        <View style={styles.footSignUp}>
          <TouchableOpacity
            style={styles.buttonSignUp}
            onPress={async () => {
              signUp();
            }}
          >
            <Text style={{ fontSize: 20, color: "grey", fontWeight: "500" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text>Already have an account? Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  containerSignUp: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },

  logo: {
    width: 110,
    height: 110,
    marginBottom: 20,
  },
  textSignUp: {
    fontSize: 25,
    fontWeight: "600",
    color: "grey",
  },

  head: {
    alignItems: "center",
  },

  email: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: 300,
    padding: 10,
  },
  username: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: 300,
    padding: 10,
  },
  description: {
    borderColor: "#FFBAC0",
    borderWidth: 2,
    padding: 50,
    marginTop: 20,
  },
  password: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: 300,
    padding: 10,
  },
  confirmPassword: {
    borderBottomColor: "#FFBAC0",
    borderBottomWidth: 2,
    width: 300,
    padding: 10,
  },
  buttonSignUp: {
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
  footSignUp: {
    alignItems: "center",
    marginBottom: 30,
  },
});

export default SignUpScreen;
