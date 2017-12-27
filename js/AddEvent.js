import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  TimePickerAndroid,
  DatePickerAndroid,
  Picker,
} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';

function pad_with_zeroes(number, length) {
    var my_string = '' + number;
    while (my_string.length < length) {
        my_string = '0' + my_string;
    }

    return my_string;
}

export default class AddEventScreen extends Component<{}> {
  constructor(props) {
      super(props);
      this.state = {
        date: '',
        start: '',
        end: '',
        title: '',
        summary: '',
        focusDate: false,
        focusStart: false,
        focusEnd: false,
      };
    }

    async setStartTime() {
      try {
        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: 14,
          minute: 0,
          is24Hour: false, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          hour = pad_with_zeroes(hour, 2);
          minute = pad_with_zeroes(minute, 2);
          this.setState({start: hour+':'+minute+':00'});
        }
        this.setState({focusDate: false});
      } catch ({code, message}) {
        console.warn('Cannot open time picker', message);
      }
    }

    async setEndTime() {
      try {
        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: 14,
          minute: 0,
          is24Hour: false, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          hour = pad_with_zeroes(hour, 2);
          minute = pad_with_zeroes(minute, 2);
          this.setState({end: hour+':'+minute+':00'});
        }
      } catch ({code, message}) {
        console.warn('Cannot open time picker', message);
      }
    }

    async setDate() {
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          // Use `new Date()` for current date.
          // May 25 2020. Month 0 is January.
          date: new Date(2017, 10, 22)
        });
        if (action !== DatePickerAndroid.dismissedAction) {
          month = pad_with_zeroes(month+1, 2);
          day = pad_with_zeroes(day, 2);
          this.setState({date: year+'-'+month+'-'+day});
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message);
      }
    }

  render() {
    const { updateEventsState, events } = this.props.navigation.state.params;
    return (
      <View>
        <TextInput
          style={{height: 40, marginTop: 10}}
          placeholder="Enter day"
          value={this.state.date}
          controlled={true}
          onFocus={() => this.setDate()}
          onChangeText={(text) => this.setState({date: text})}
          focus={this.state.focusDate}
        />
        <TextInput
          style={{height: 40, marginTop: 10}}
          placeholder="Enter start time"
          value={this.state.start}
          controlled={true}
          onFocus={() => this.setStartTime()}
          onChangeText={(text) => this.setState({start: text})}
          focus={this.state.focusStart}
        />
        <TextInput
          style={{height: 40, marginTop: 10}}
          placeholder="Enter end time"
          value={this.state.end}
          controlled={true}
          onFocus={() => this.setEndTime()}
          onChangeText={(text) => this.setState({end: text})}
          focus={this.state.focusEnd}
        />
        <TextInput
          style={{height: 40, marginTop: 10}}
          placeholder="Enter event title"
          onChangeText={(text) => this.setState({title: text})}
        />
        <Picker
          selectedValue={this.state.summary}
          onValueChange={(text) => this.setState({summary: text})}>
          <Picker.Item label="Select a category" value="" />
          <Picker.Item label="Dinner" value="Dinner" />
          <Picker.Item label="Shopping" value="Shopping" />
          <Picker.Item label="Invitations" value="Invitations" />
        </Picker>
        <View style={{
          marginTop: 30
        }}>
          <Button
            title='Submit'
            onPress={() => {
              var event = {
                start: this.state.date+'T'+this.state.start,
                end: this.state.date+'T'+this.state.end,
                title: this.state.title,
                summary: this.state.summary,
                uid: '' + Date.now(),
              }
              events.push(event);
              updateEventsState(events);
              this.props.navigation.navigate('Calendar', {
                events: events,
                updateParentEvents: updateEventsState,
              });
              const resetActions = NavigationActions.reset({
                  index: 1,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Home' }),
                    NavigationActions.navigate({ routeName: 'Calendar',
                    params: {
                      events: events,
                      updateParentEvents: updateEventsState,
                    }
                    })
                  ]
              });
              this.props.navigation.dispatch(resetActions);
            }}
          />
        </View>
      </View>
    );
  }
}
