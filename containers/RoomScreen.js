import React from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";

// import * as Location from "expo-location";

import { FontAwesome } from "@expo/vector-icons";
import MapView from "react-native-maps";

const RoomScreen = () => {
  const { params } = useRoute();
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [description, setDescription] = useState(false);

  const stars = (nbEtoile) => {
    const array = [];
    for (let i = 0; i < 5; i++) {
      if (i < nbEtoile) {
        array.push(
          <FontAwesome name="star" size={15} color="#FFB100" key={i} />
        );
      } else {
        array.push(<FontAwesome name="star" size={15} color="gray" key={i} />);
      }
    }
    return array;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
        );
        // console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
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
    data && (
      <View style={styles.container}>
        {console.log(data.location[1])}

        <ImageBackground
          style={styles.imageBack}
          source={{ uri: data.photos[0].url }}
        >
          <View style={styles.priceContainer}>
            <Text style={styles.price}>{data.price} $</Text>
          </View>
        </ImageBackground>

        <View style={styles.titleContainer}>
          <View style={styles.title}>
            <Text numberOfLines={1} style={{ fontSize: 23 }}>
              {data.title}
            </Text>
          </View>

          <View>
            <Image
              style={styles.imageUser}
              source={{ uri: data.user.account.photo.url }}
            />
          </View>
        </View>

        <View style={styles.stars}>
          {stars(data.ratingValue)}
          <Text style={{ marginLeft: 5, color: "lightgrey" }}>
            {data.reviews} reviews
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            setDescription(!description);
          }}
        >
          <View style={styles.description}>
            <Text numberOfLines={description ? null : 3}>
              {data.description}
            </Text>
          </View>
          {/* <Text style={{ top: 15, right: 162, color: "grey" }}>
            {description ? "less ▲" : "more ▼"}
          </Text> */}
        </TouchableOpacity>

        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 48.856614,
              longitude: 2.3522219,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <MapView.Marker
              coordinate={{
                latitude: data.location[1],
                longitude: data.location[0],
              }}
            />
          </MapView>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center,",
    alignItems: "center",
  },
  imageBack: {
    width: "100%",
    height: 280,
    justifyContent: "flex-end",
  },
  priceContainer: {
    backgroundColor: "black",
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    bottom: 20,
  },
  price: {
    color: "white",
    fontSize: "20",
  },
  titleContainer: {
    flexDirection: "row",
    width: "80%",
    top: 15,
  },
  title: {
    right: 30,
    width: 300,
    height: 30,
  },

  stars: {
    flexDirection: "row",
    right: 120,
    bottom: 20,
  },
  imageUser: {
    width: 70,
    height: 70,
    borderRadius: 50,
    right: 10,
  },
  description: {
    top: 10,
    width: "90%",
  },

  map: {
    width: Dimensions.get("screen").width,
    top: 40,
    height: 230,
  },
});

export default RoomScreen;
