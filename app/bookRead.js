import React, {useState}from 'react';
import WheelPicker from 'react-native-wheely';
import { View, Text, TouchableOpacity } from 'react-native';
import TimePicker from '../ui/timePicker';
import Countdown from '../ui/countdown';
import { useLocalSearchParams } from 'expo-router';
import Finish from '../ui/finishReading';

//props selectedIndex and setSelectedIndex - state with choosed value

export default function bookRead() {
    const [time, setTime] = useState(30)
    const [remainingTime, setRemainingTime] = useState(0)
    const [stage, setStage] = useState(0)
    const local = useLocalSearchParams()
    const isbn = local.isbn
    const title = local.title
    const oneMoreMoment = () => {
        setStage(1)
        setRemainingTime(5)
        setTime(time+5)
    }
    return (
        <View>
            {
                (stage == 0) && <TimePicker selectedIndex={time} setSelectedIndex={setTime} goRead={() => setStage(1)}/>
            }
            {
                (stage == 1) && <Countdown time={time} endRead={() => setStage(2)} isbn={isbn} title={title} remainingTime={remainingTime}/>
            }
            {
                (stage === 2) && <Finish oneMoreMoment={oneMoreMoment} time={time} />
            }          
        </View>
    );
}