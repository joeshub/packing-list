import { AppRegistry } from "react-native"
import RootComponent from "../app/root-component"
import { YellowBox } from "react-native"

// To get rid of react-navigation yellowbox until they fix
// https://github.com/react-navigation/react-navigation/issues/3956
YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated", "Module RCTImageLoader"])

AppRegistry.registerComponent("PackingList", () => RootComponent)
