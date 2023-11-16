import { ToastConfig } from "react-native-styled-toast/dist/Toast"
import { color } from "./color"
import { Dimensions } from "react-native"
import { spacing } from "./spacing"

export const TOAST_OFFSET =
  (Dimensions.get("window").height ? Dimensions.get("window").height : 812) * 0.8
export const TOAST_DEFAULT: ToastConfig = {
  message: "",
  toastStyles: {
    borderWidth: 0,
    bg: color.palette.black,
    alignSelf: "center",
    width: 0.9,
    borderRadius: 16,
  },
  iconColor: "white",
  iconFamily: "FontAwesome5",
  iconName: "dot-circle",
  color: color.palette.white,
  hideCloseIcon: true,
  hideAccent: true,
}
export const TOAST_SUCCESS: ToastConfig = {
  message: "",
  toastStyles: {
    borderWidth: 0,
    bg: "#1890FF",
    alignSelf: "center",
    width: 0.9,
    borderRadius: 16,
  },
  iconColor: "white",
  iconFamily: "FontAwesome5",
  iconName: "check-circle",
  color: color.palette.white,
  hideCloseIcon: true,
  hideAccent: true,
  hideIcon: true,
}
export const TOAST_ERROR: ToastConfig = {
  message: "",
  toastStyles: {
    borderWidth: 0,
    bg: color.palette.red,
    alignSelf: "center",
    width: 0.9,
    borderRadius: 12,
  },
  iconColor: "white",
  iconFamily: "FontAwesome5",
  iconName: "times-circle",
  color: color.palette.white,
  hideCloseIcon: true,
  hideAccent: true,
  hideIcon: true,
}

export type ToastType = "DEFAULT" | "SUCCESS" | "ERROR"

export const toastErrorConfig = (message: string, duration?: number) =>
  toastConfig({
    message: message,
    type: "ERROR",
    duration: duration,
  })

export const toastSuccessConfig = (message: string, duration?: number) =>
  toastConfig({
    message: message,
    type: "SUCCESS",
    duration: duration,
  })

export const toastConfig = ({
  type,
  message,
  icon,
  duration = 1500,
}: {
  type: ToastType
  message: string
  icon?: string
  duration?: number
}) => {
  switch (type) {
    case "DEFAULT":
      return {
        ...TOAST_DEFAULT,
        duration: duration,
        message: message,
        icon: icon || "dot-circle",
      }
    case "SUCCESS":
      return {
        ...TOAST_SUCCESS,
        duration: duration,
        message: message,
        icon: icon || "check-circle",
      }
    case "ERROR":
      return {
        ...TOAST_ERROR,
        duration: duration,
        message: message,
        icon: icon || "times-circle",
      }
  }
}
