import React,{Component} from "react";
import { View, SafeAreaView,Text } from "react-native";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
} from "stream-chat-expo";

const chatClient = new StreamChat('f8wwud5et5jd');
const userToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoic29saXRhcnktYnJlYWQtNCJ9.whVvSiepZQ_1VnCEdQcDwHtTxkYlpeR-G6TOKnPzFj8';

const user = {
  id: 'Tarun',
  name: 'Tarun',
  image:
    'https://getstream.io/random_png/?id=solitary-bread-4&amp;name=Solitary+bread',
};

chatClient.setUser(user, userToken);

class ChannelScreen extends React.Component {
  render() {
    const channel = chatClient.channel("messaging", "solitary-bread-4");
    channel.watch();

    return (
      <SafeAreaView>
        <Chat client={chatClient}>
          <Channel channel={channel}>
            <View style={{ display: "flex", height: "100%" }}>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </SafeAreaView>
    );
  }
}

export default class App extends Component {
  render() {
    return <ChannelScreen/>
  }
}