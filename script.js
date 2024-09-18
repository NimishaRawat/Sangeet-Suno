console.log("welcome to sangeet");

//Initialize the variable
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let timeStamp = document.getElementsByClassName('timestamp');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Desi Girl", filePath: "songs/1.mp3", coverPath: "covers/1.png" },
    {songName: "Tumhare hi rahenge hum", filePath: "songs/2.mp3", coverPath: "covers/2.png" },
    {songName: "Jeene laga hoon", filePath: "songs/3.mp3", coverPath: "covers/3.png" },
    {songName: "Kabira", filePath: "songs/4.mp3", coverPath: "covers/4.png" },
    {songName: "Apna bana le", filePath: "songs/5.mp3", coverPath: "covers/5.png" },
    {songName: "Tum kya mile", filePath: "songs/6.mp3", coverPath: "covers/6.png" },
    {songName: "Baby", filePath: "songs/7.mp3", coverPath: "covers/7.png" }
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime==0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//Listen to events

audioElement.addEventListener('timeupdate',()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', ()=>{
    //when we seek
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})
 
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
       // console.log(e.target);
        if(audioElement.paused ){
            makeAllPlays();  
            songIndex = parseInt(e.target.id);
            audioElement.src = `songs/${songIndex}.mp3`;
            masterSongName.innerHTML = songs[songIndex-1].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }else{
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;
        }
    })   
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex >= 7){
        songIndex = 1;
    }else{
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerHTML = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex <= 1){
        songIndex = 7;
    }else{
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex}.mp3`;
    masterSongName.innerHTML = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})