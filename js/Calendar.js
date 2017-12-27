import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native'
import EventCalendar from 'react-native-events-calendar'

let { width } = Dimensions.get('window')

export default class CalendarScreen extends Component<{}> {
  constructor(props) {
      super(props);
      this.state = {
        events: props.navigation.state.params.events,
      };
  }

  removeEvent(event) {
    this.setState({events: this.state.events.filter(ev => ev.uid !== event.uid)},
    () => {
      this.props.navigation.state.params.updateParentEvents(this.state.events);
    }
  );
  }

  _eventTapped (event) {
  Alert.alert(
    'Remove',
    'Remove this event?',
    [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {text: 'OK', onPress: () => this.removeEvent(event)},
    ],
    { cancelable: false }
  )
  }

  render () {
    const { events } = this.state
    return (
      <View style={styles.container}>
        <EventCalendar
          eventTapped={(e) => this._eventTapped(e)}
          events={events}
          width={width}
          initDate={'2017-11-22'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
