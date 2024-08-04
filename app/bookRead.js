import React, {useState}from 'react';
import WheelPicker from 'react-native-wheely';
import { View, Text, TouchableOpacity } from 'react-native';
import TimePicker from '../ui/timePicker';
import Countdown from '../ui/countdown';

//props selectedIndex and setSelectedIndex - state with choosed value

export default function bookRead() {
    const [time, setTime] = useState(30)
    const [stage, setStage] = useState(0)
    return (
        <View>
            {
                (stage == 0) && <TimePicker selectedIndex={time} setSelectedIndex={setTime} goRead={() => setStage(1)}/>
            }
            {
                (stage == 1) && <Countdown time={time} endRead={() => setStage(0)}/>
            }
        </View>
    );
}