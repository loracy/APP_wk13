import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { List, Button } from 'react-native-elements';

import Panel from './components/Panel';
import albums from './json/albums.json';

class App extends Component {
   state = { albums: [] };
   componentWillMount() {
    this.setState({ albums });
    // console.log(this.state);
  }
    render() {
    return (
  <ScrollView 
    style={{ }}
  >
    <List>
          {this.state.albums.map((album) => (
            <Panel
              style={{position: 'absolute'}}
              key={album.title}
              avatar={{ uri: album.image }}
              title={album.title}
              subtitle={album.artist}
            />
          ))}
    </List>
  </ScrollView>
      );
  }
}

export default App;
