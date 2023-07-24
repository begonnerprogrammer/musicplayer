const play=document.getElementById('play');
const music=document.querySelector('audio');
const img=document.querySelector('img');
const artist=document.getElementById('artist');
const title=document.getElementById('title');
const prev=document.getElementById('prev');
const next=document.getElementById('next');
let progress=document.getElementById('progress');
let total_duration=document.getElementById('duration');
let current_time=document.getElementById('current-time');
const progress_div=document.getElementById('progress-div');
const songs=[{
    name:'Song-1',
    title:'CJ-Whoopty-remix',
    artist:'CJ-Whoopty',
    img:'img-1'
},
{
    name:'Song-2',
    title:'Lion Roar',
    artist:'Alex&Rus',
    img:'img-2'
},
{
    name:'Song-3',
    title:'Fearless',
    artist:'Lost Sky',
    img:'img-3'
}
]

let isplaying=false;

// for play functionality
function playmusic(){
    isplaying=true;
    music.play();
    play.classList.replace('fa-play','fa-pause');
    img.classList.add('anime')
}
// for pause functionality
function pausemusic(){
    isplaying=false;
    music.play();
    music.pause();
    play.classList.replace('fa-pause','fa-play');
    img.classList.remove('anime')
};

play.addEventListener('click',function(){
    if(isplaying){
        pausemusic()
    }
    else{
     playmusic()
    }
})


// changing the music data
function loadSong(songs){
title.textContent=songs.title;
artist.textContent=songs.artist;
music.src="audios/"+songs.name+".mp3";
img.src="images/"+songs.img+".jpg";
}
songindex=0;
const nextSong=()=>{
    songindex=(songindex+1)%songs.length;
    loadSong(songs[songindex]);
    playmusic();
}


const prevSong=()=>{
    songindex=(songindex-1+songs.length)%songs.length;
    loadSong(songs[songindex]);
    playmusic();
}

// progress js works

music.addEventListener('timeupdate',(event)=>{
    const {currentTime,duration}=event.srcElement;
    let progress_time=(currentTime/duration)*100;
    progress.style.width=`${progress_time}%`;
    // music duration update
    let min_duration=Math.floor(duration/60);
    let sec_duration=Math.floor(duration%60);

    let tot_duration=`${min_duration}:${sec_duration}`
    if(duration){
    total_duration.textContent=`${tot_duration}`;
}

// current duration update
let min_currenttime=Math.floor(currentTime/60);
let sec_currenttime=Math.floor(currentTime%60);


if(sec_currenttime<10){
    sec_currenttime=`0${sec_currenttime}`
}
let tot_currenttime=`${min_currenttime}:${sec_currenttime}`
current_time.textContent=`${tot_currenttime}`;

});
// progress onclick
progress_div.addEventListener('click',(event)=>{
    const {duration}=music;
let move_progress=(event.offsetX/event.srcElement.clientWidth)*duration;
music.currentTime=move_progress;
})

//  call next song after ending
music.addEventListener('ended',nextSong)

next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);

