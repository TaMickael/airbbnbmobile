import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Button,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import { AirbnbRating } from "@rneui/themed";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 500,
          }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item) => String(item._id)}
            renderItem={({ item }) => {
              // console.log(item.photos[0].url);
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Room", { id: item._id });
                  }}
                >
                  <View style={styles.containerImages}>
                    <Image
                      source={{ uri: item.photos[0].url }}
                      style={styles.images}
                    />
                    <View style={styles.prices}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                        }}
                      >
                        {item.price}$
                      </Text>
                    </View>
                    <View style={styles.title}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontSize: 20,
                          top: 20,
                          width: 285,
                        }}
                      >
                        {item.title}
                      </Text>
                      <View style={styles.user}>
                        <Image
                          source={{ uri: item.user.account.photo.url }}
                          style={styles.userImage}
                        />
                      </View>
                    </View>
                    <View style={styles.ratingReviews}>
                      <View style={styles.rating}>
                        <AirbnbRating
                          count={5}
                          reviews={[
                            "Very Bad",
                            "Bad",
                            "Good",
                            "Very Good",
                            "Excellent",
                          ]}
                          defaultRating={5}
                          size={15}
                        />
                        <View
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: 200,
                          }}
                        >
                          <Text
                            style={{
                              color: "lightgrey",
                            }}
                          >
                            {item.reviews} reviews
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  containerImages: {
    // borderWidth: 2,
    // borderColor: "red",
    paddingBottom: 20,
  },
  images: {
    width: 380,
    height: 280,
    position: "relative",
  },
  prices: {
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    top: 220,
    height: 40,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    width: 300,
    height: 70,
    flexDirection: "row",
  },
  user: {
    marginLeft: 20,
    top: 20,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  rating: {
    width: 200,
    bottom: 25,
    right: 25,
    height: 70,
  },
});

export default HomeScreen;
