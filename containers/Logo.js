import { Image } from "react-native";

const Logo = () => {
  return (
    <Image
      style={{ width: 40, height: 40 }}
      source={require("../assets/logo.jpeg")}
    />
  );
};

export default Logo;
