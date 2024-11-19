import { textColors, theme } from "@/src/themes/root";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  productCardContainer: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    borderRadius: 4,
    padding: 4,
    gap: 4,
    elevation: 2,
  },

  productContainer: {
    flexDirection: "row",
    gap: 10,
  },
  productDetails: {
    gap: 2,
  },
  productName: {
    fontWeight: "700",
    fontSize: 18,
  },
  productDescription: {
    flexWrap: "wrap",
    width: 260,
    fontWeight: "300",
    color: textColors.gray,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.blue[400],
  },
  productButton: {
    width: "100%",
    padding: 8,
    backgroundColor: theme.colors.red[400],
    borderRadius: 4,
  },
  productButtonText: {
    color: textColors.secondary,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
  },
  productButtonIcon: {
    marginRight: 8,
  },
  productButtonContainer:{
    flexDirection:"row",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 2,
  },
});
