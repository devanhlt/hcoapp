import * as React from "react"
import { useState } from "react"
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Icon } from "../components"
import { debounce } from "lodash"

export interface SearchBarProps extends TextInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle
  onChangeText?: (text: string) => void
  placeHolder?: string
  activeSearch?: boolean
}

/**
 * Describe your component here
 */
export const SearchBar = observer(function SearchBar(props: SearchBarProps) {
  const { style, value, onChangeText, placeHolder, activeSearch = true, ...rest } = props
  const [text, setText] = useState(value)

  const styles = StyleSheet.create({
    clearIcon: {
      justifyContent: "center",
    },
    containerClearIcon: {
      alignItems: "center",
      alignSelf: "center",
      backgroundColor: colors.palette.greyBA,
      borderRadius: 12,
      height: 24,
      justifyContent: "center",
      marginEnd: 6,
      paddingTop: 0.1,
      width: 24,
    },
    searchIcon: {
      alignSelf: "center",
      paddingStart: spacing.xs,
    },
    searchInput: {
      alignSelf: "center",
      flex: 1,
      fontSize: 16,
      padding: spacing.xs,
    },
    searchMainView: {
      alignItems: "center",
      backgroundColor: colors.palette.deviderGrey2,
      borderRadius: 20,
      flexDirection: "row",
    },
    searchMasterView: {
      backgroundColor: colors.palette.white,
      padding: spacing.xs,
    },
  })

  const onClearText = () => {
    setText("")
    onTextChanged("")
  }

  const textChange = (value) => {
    setText(value)
    onTextChanged(value)
  }

  const onSearch = () => {
    onTextChanged(text)
  }

  const onTextChanged = debounce(
    (text) => {
      onChangeText(text || "")
    },
    600,
    { leading: false, trailing: true },
  )

  return (
    <View style={styles.searchMasterView}>
      <View style={styles.searchMainView}>
        <TouchableOpacity onPress={onSearch}>
          <Icon icon="search" size={18} style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          editable={activeSearch}
          value={text}
          style={[styles.searchInput, style]}
          placeholder={placeHolder}
          placeholderTextColor={colors.palette.greyBA}
          onChangeText={textChange}
          onSubmitEditing={onSearch}
          {...rest}
        />
        <TouchableOpacity onPress={onClearText}>
          <View style={styles.containerClearIcon}>
            <Icon icon="x" size={16} style={styles.clearIcon} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
})
