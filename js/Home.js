import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  Linking,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';

var events = []

let { width } = Dimensions.get('window')

var articles = [{title: '', urlToImage: ''}]

const getNews = (ctx) => {
  var url = 'https://newsapi.org/v2/everything?' +
          'q=thanksgiving+prep&' +
          'from=2017-06-00&' +
          'sortBy=popularity&' +
          'apiKey=f570b216279b400eb35a503c49a87be9';

    var req = new Request(url);

    fetch(req)
    .then(function(response) {
        articles = JSON.parse(response._bodyInit).articles;
        console.warn(articles);
        ctx.forceUpdate();
    })
}

const updateEventsState = (eventState, ctx) => {
  ctx.forceUpdate();
  events = eventState;
}

const getRecentEvents = () => {
  events.sort((a, b) => {
    console.warn(Date.parse(b.start));
    console.warn(Date.parse(a.start));
    return Date.parse(a.start) - Date.parse(b.start);
  });
  return events;
}

export default class HomeScreen extends Component<{}> {
  static navigationOptions = {
      title: 'Home',
  }

  componentDidMount() {
    this.props.navigation.setParams({
        ctx: this,
    });
    getNews(this);
  }

  _renderItem ({item, index}) {
      return (
          <View style={{
            width: 150,
            height: 0,
            marginTop: 20
          }}>
              <Image source={{uri: item.urlToImage}}
               style={{width: 150, height: 100}}></Image>
              <Text style={styles.title}>{ item.title }</Text>
          </View>
      );
  }


  render() {
    return (
      <View style={styles.container}>
        <Carousel
            data={articles}
            renderItem={this._renderItem}
            sliderWidth={width}
            itemWidth={150}
          />
          <Button
            onPress={() => this.props.navigation.navigate('AddEvent', {
              updateEventsState: (s) => updateEventsState(s, this),
              events: events
            })}
            title="Add Event"
          />
        <Text style={styles.welcome}>
          Upcoming events
        </Text>
        <FlatList
          data={getRecentEvents()}
          keyExtractor={(item, index) => item.uid}
          renderItem={({item}) =>
          <View style={{
            height: 50,
            width: width-20,
            flex: 1,
            marginBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#82c2ff',
          }}>
            <Text style={{
              color: '#fff',
            }}>{item.title}
            </Text>
            <Text style={{
              color: '#fff',
            }}>{item.start}
            </Text>
          </View>}
        />
      </View>
    );
  }
}

HomeScreen.navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    headerTitle: `Home`,
    // Render a button on the right side of the header.
    // When pressed switches the screen to edit mode.
    headerRight: (
      <View
        style={{paddingRight: 12}}
      >
        <Button
          transparent
          title={'Calendar'}
          onPress={() =>
            navigation.navigate('Calendar', {
              events: events,
              updateParentEvents: (s) => updateEventsState(s, params.ctx),
            })}
        />
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    marginRight: 10,
  },
});
