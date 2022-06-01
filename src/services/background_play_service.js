import React, { useEffect } from 'react';
import BackgroundService from 'react-native-background-actions';
import SoundPlayer from 'react-native-sound-player'
import { Button, View } from 'react-native';
import MusicControl, {Command} from 'react-native-music-control'
import AsyncStorage from '@react-native-async-storage/async-storage';

    const options = {
        taskName: 'Sihala Fm',
        taskTitle: 'Sihala FM',
        taskDesc: 'Sihala FM is running in background',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'sihalafm://',
        parameters: {
            delay: 1000,
        },
    };

class BackgroundPlayService extends React.Component{

    mainTask = async (taskDataArguments) => {
        const { delay } = taskDataArguments;
        await new Promise( async (resolve) => {
            this.playRadio();
        });
    }

    start = () => {
        BackgroundService.start(this.mainTask, options);
    }

    stop = () => {
        BackgroundService.stop();
        SoundPlayer.pause();
        MusicControl.updatePlayback({
            state: MusicControl.STATE_PAUSED,
        })
        this.stopMusicControll();
    }

    startMusicControll(){
        MusicControl.enableControl('closeNotification', true, { when: 'never' })
        MusicControl.enableBackgroundMode(true);
        MusicControl.setNowPlaying({
            title: 'Sihala FM',
            artwork: 'https://sihalafm.lk/assets/img/business-4/Logo.jpg',
            artist: 'Live Stream',
            album: 'Thriller',
            genre: 'Post-disco, Rhythm and Blues, Funk, Dance-pop',
            duration: 0,
            description: '',
            color: 0xffffff,
            colorized: true,
            date: '2022-05-30',
            rating: 84,
            notificationIcon: '@mipmap/ic_launcher',
            isLiveStream: true, 
        });
        MusicControl.enableControl('play', true); 
        MusicControl.enableControl('pause', true);
        MusicControl.enableControl('stop', true);
    }

    stopMusicControll(){
        MusicControl.resetNowPlaying()
    }

    async playRadio(){
        try {
            AsyncStorage.getItem('streaming_url', (err, url)=>{
                SoundPlayer.playUrl(url);
                MusicControl.updatePlayback({
                    state: MusicControl.STATE_PLAYING,
                });
                this.startMusicControll();
            })
        } catch (e) {
            console.log(`cannot play the sound file`, e);
        }
    }

}

const ExportService = new BackgroundPlayService;
export default ExportService;
 