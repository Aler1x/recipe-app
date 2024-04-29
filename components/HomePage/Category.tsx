import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import Text from "../Text";

type CategoryProps = {
  id: number;
  name: string;
  categoryImage?: string;
}

const Category = ({ id, name, categoryImage }: CategoryProps) => {
  const { width } = Dimensions.get('window');

  const styles = StyleSheet.create({
    image: {
      borderRadius: 16,
      overflow: "hidden",
      shadowColor: "rgba(0, 0, 0, 0.25)",
      shadowOffset: {
        width: 0,
        height: 4
      },
      shadowRadius: 4,
      shadowOpacity: 0.25,
      elevation: 4,
      height: width * 0.3,
      aspectRatio: 1,
      marginRight: 10, // for spacing between categories (gap)
    },
    innerShadow: {
      height: '100%',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-end',
      padding: 10,
    },
    label: {
      color: 'white',
      fontFamily: 'TurbotaBold',
      fontSize: 16,
    }
  });

  return (
    <ImageBackground
      source={{ uri: categoryImage }}
      style={styles.image}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.55)"]}
        style={styles.innerShadow}
      >
        <Text style={styles.label}>{name}</Text>
      </LinearGradient>
    </ImageBackground>
  )
}

export default Category
