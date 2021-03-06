import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface State {
  cameraType: string;
  hasPermissionToCamera: boolean | undefined;
}

export class CameraScreen extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      cameraType: "back",
      hasPermissionToCamera: undefined,
    };
  }

  public async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasPermissionToCamera: status === "granted",
    });
  }

  public render() {
    if (this.state.hasPermissionToCamera === undefined) {
      return <Text>Getting permission to access the camera.</Text>;
    }

    if (this.state.hasPermissionToCamera === false) {
      return <Text>No access to the camera.</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={this.state.cameraType}>
          <View
            style={{
              backgroundColor: "transparent",
              flex: 1,
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              onPress={() => this.toggleCameraType()}
              style={{
                alignItems: "center",
                alignSelf: "flex-end",
                flex: 0.1,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                {" "}
                Flip{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
  }

  private toggleCameraType() {
    this.setState({
      cameraType: this.state.cameraType === "back" ? "front" : "back",
    });
  }
}
