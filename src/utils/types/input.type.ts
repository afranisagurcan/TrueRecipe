import { IconButtonProps, ListItemProps, TextInputProps } from "react-native-paper";
import { ButtonProps, StyleProp, ViewStyle } from "react-native";

declare namespace IGroupInput {
  interface InputGroupProps extends TextInputProps {
    label?: string;
    contentContainerStyle?: ViewStyle;
  }

  interface ProfileListProps extends ListItemProps {
    iconName: string;
  }

  interface DetailGroupProps {
    title: string;
    iconName: string;
    iconStyle?: StyleProp<any>;
    textStyle?: StyleProp<any>;
  }

  interface FavoriteGroupProps extends ButtonProps {
    icon:string;
  }
}

export default IGroupInput;
