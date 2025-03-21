import React, {useState}from 'react';
import { View } from 'react-native';
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
    const id = local.id
    const title = local.title
    console.log("Id:",id)
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
                (stage == 1) && <Countdown time={time} endRead={() => setStage(2)} isbn={isbn} title={title} remainingTime={remainingTime} id={id}/>
            }
            {
                (stage === 2) && <Finish oneMoreMoment={oneMoreMoment} time={time} id={id} />
            }          
        </View>
    );
}