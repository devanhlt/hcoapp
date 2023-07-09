// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

import { Platform } from "react-native"
import {
  MontserratAlternates_300Light as montserratAlternatesLight,
  MontserratAlternates_300Light_Italic as montserratAlternatesLightItalic,
  MontserratAlternates_400Regular as montserratAlternatesRegular,
  MontserratAlternates_400Regular_Italic as montserratAlternatesRegularItalic,
  MontserratAlternates_500Medium as montserratAlternatesMedium,
  MontserratAlternates_500Medium_Italic as montserratAlternatesMediumItalic,
  MontserratAlternates_600SemiBold as montserratAlternatesSemiBold,
  MontserratAlternates_600SemiBold_Italic as montserratAlternatesSemiBoldItalic,
  MontserratAlternates_700Bold as montserratAlternatesBold,
  MontserratAlternates_700Bold_Italic as montserratAlternatesBoldItalic
} from "@expo-google-fonts/montserrat-alternates"

export const customFontsToLoad = {
  montserratAlternatesLight,
  montserratAlternatesLightItalic,
  montserratAlternatesRegular,
  montserratAlternatesRegularItalic,
  montserratAlternatesMedium,
  montserratAlternatesMediumItalic,
  montserratAlternatesSemiBold,
  montserratAlternatesSemiBoldItalic,
  montserratAlternatesBold,
  montserratAlternatesBoldItalic,
}

const fonts = {
  montserratAlternates: {
    // Cross-platform Google font.
    light: "montserratAlternatesLight",
    ilight: "montserratAlternatesLightItalic",
    normal: "montserratAlternatesRegular",
    inormal: "montserratAlternatesRegularItalic",
    medium: "montserratAlternatesMedium",
    imedium: "montserratAlternatesMediumItalic",
    semiBold: "montserratAlternatesSemiBold",
    isemiBold: "montserratAlternatesSemiBoldItalic",
    bold: "montserratAlternatesBold",
    ibold: "montserratAlternatesBoldItalic",
  },
  helveticaNeue: {
    // iOS only font.
    thin: "HelveticaNeue-Thin",
    light: "HelveticaNeue-Light",
    normal: "Helvetica Neue",
    medium: "HelveticaNeue-Medium",
  },
  courier: {
    // iOS only font.
    normal: "Courier",
  },
  sansSerif: {
    // Android only font.
    thin: "sans-serif-thin",
    light: "sans-serif-light",
    normal: "sans-serif",
    medium: "sans-serif-medium",
  },
  monospace: {
    // Android only font.
    normal: "monospace",
  },
}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.montserratAlternates,
  /**
   * An alternate font used for perhaps titles and stuff.
   */
  secondary: Platform.select({ ios: fonts.helveticaNeue, android: fonts.sansSerif }),
  /**
   * Lets get fancy with a monospace font!
   */
  code: Platform.select({ ios: fonts.courier, android: fonts.monospace }),
}
