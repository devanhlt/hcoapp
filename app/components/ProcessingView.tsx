import React from "react"
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native"
import { colors } from "../theme"
import { Text } from "./Text"

const ProcessingView = ({ label = undefined, isLoading = false }) => {
  return (
    <>
      {isLoading && (
        <Modal visible={isLoading} transparent>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: colors.palette.overlay50,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <View
              style={{
                backgroundColor: colors.palette.overlay50,
                borderRadius: 12,
                padding: 12,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size={"small"} color={colors.palette.white} />
              {label && (
                <Text
                  weight="normal"
                  size="xl"
                  style={{ color: colors.palette.white, marginTop: 12 }}
                >
                  {label}
                </Text>
              )}
            </View>
          </View>
        </Modal>
      )}
    </>
  )
}
export default ProcessingView
