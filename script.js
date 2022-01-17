const musicContainer=document.querySelector('.music-container')
const playBtn=document.querySelector('#play')
const prevBtn=document.querySelector('#prev')
const nextBtn=document.querySelector('#next')
const audio=document.querySelector('#audio')
const progress=document.querySelector('.progress')
const progressContainer=document.querySelector('.progress-container')
const title=document.querySelector('#title')
const cover=document.querySelector('#cover')


//song title
const titlen=['"dawn fm"','"sacrifice"','"is there someone else"','"out of time"','"starry eyes"','"less than zero"','"dawn is coming"']
const songs=['music/dawnfm.mp3','music/sacrifice.mp3','music/is there someone else.mp3','music/outoftime.mp3','music/starryeyes.mp3','music/lessthanzero.mp3','music/dawniscomi.mp3']
const pics=['images/dawnfm.jpg','images/sacrifice.jpg','images/isthere.jpg','images/outoftime.png','images/starry.jfif','images/less.jfif','images/dawniscomi.jpg']

//track of songs
let songIndex = 0

//initially load song into DOM

loadSong(songIndex)

function loadSong(index){
    title.innerText=titlen[index]
    audio.src=songs[index]
    cover.src=pics[index]
}

function playSong(){
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')
    audio.play()
}

function pauseSong(){
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    audio.pause()
}



function prevSong(){
    songIndex--
    if (songIndex<0){
        songIndex=songs.length-1
    }
    loadSong(songIndex)

    playSong()
}


function nextSong(){
    songIndex++
    if (songIndex>songs.length-1){
        songIndex=0
    }
    loadSong(songIndex)
    playSong()
}

function updateProgress(e){
    const {duration,currentTime}=e.srcElement
    const progressPercent=(currentTime/duration)*100
    progress.style.width=`${progressPercent}%`
}


function setProgress(e){
    const width=this.clientWidth
    const clickX=e.offsetX
    const duration=audio.duration

    audio.currentTime=(clickX/width)*duration
}
//Event listeners

playBtn.addEventListener('click',()=>{
    const isPlaying=musicContainer.classList.contains('play')
    if(isPlaying){
        pauseSong()
    }
    else{
        playSong()
    }
}
)

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)

audio.addEventListener('timeupdate',updateProgress)

progressContainer.addEventListener('click',setProgress)

audio.addEventListener('ended',nextSong)