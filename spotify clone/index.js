console.log('Welcome to spotify');
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let progressbar=document.getElementById
('progressbar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Tera Yaar Hoon Main-Arijit Singh", filePath: "songs/1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Shayad-Arijit Singh", filePath: "songs/2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "Love me Like You Do- Ellie Goulding", filePath: "songs/3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Main Hoon Hero Tera-Armaan Malik", filePath: "songs/4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "Raatan Lambiyan-Jubin Nautiyal", filePath: "songs/5.mp3", coverPath: "covers/cover5.jpg"},
    {songName: "Mann Bharryaa 2.0-B.Parak", filePath: "songs/6.mp3", coverPath: "covers/cover6.jpg"},
    {songName: "Khairiyat-Arijit Singh", filePath: "songs/7.mp3", coverPath: "covers/cover7.jpg"},
    {songName: "Tum Mere-Darshan Raval", filePath: "songs/8.mp3", coverPath: "covers/cover8.jpg"},
    {songName: "Apna Bana Le-Arijit Singh", filePath: "songs/.mp3", coverPath: "covers/cover9.jpg"},
    
]
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
// handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0; 
    }
})
// listen to events
audioElement.addEventListener('timeupdate',()=>{
    
    // update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressbar.value=progress;
})
progressbar.addEventListener('change',()=>{
    audioElement.currentTime=progressbar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=8){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})