import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";

import MapView from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";

const AroundMeScreen = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    const getPermissionAndLocationAndFetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        let response;
        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync();
          console.log(location);
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
        } else {
          response = await axios.get(
            "https://express-airbnb-api.herokuapp.com/rooms/around"
          );
          // console.log(response.data)
        }

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPermissionAndLocationAndFetchData();
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
      <View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: latitude ? latitude : 48.866667,
            longitude: longitude ? longitude : 2.333333,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          {data.map((airbnb, index) => {
            return (
              <MapView.Marker
                key={airbnb.id}
                coordinate={{
                  latitude: airbnb.location[1],
                  longitude: airbnb.location[0],
                }}
              />
            );
          })}
        </MapView>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("screen").width,
    height: "100%",
  },
});

export default AroundMeScreen;
