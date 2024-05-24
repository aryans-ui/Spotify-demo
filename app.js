const music = new Audio('vande.mp3');

// create Array 

const songs = [
    {
        id:'1',
        songName:` Gangland <br>
        <div class="subtitle">Mankirt Aulakh</div>`,
        poster: "img/1.jpg"
    },
    {
        id:'2',
        songName:` Alan Walker-Fade <br>
        <div class="subtitle">Alan Walker</div>`,
        poster: "img/2.jpg"
    },
    // all object type 
    {
        id:"3",
        songName: `Attention <br><div class="subtitle"> Charile  puth</div>`,
        poster: "img/3.jpg",
    },
    {
        id:"4",
        songName: `Ghosted - Love Again <br><div class="subtitle">Dua Lipa</div>`,
        poster: "img/4.jpg",
    },
    {
        id:"5",
        songName: `Nindra <br><div class="subtitle">Ikka</div>`,
        poster: "img/5.jpg",
    },
    {
        id:"6",
        songName: `I am Mess <br><div class="subtitle">Bebe Rexha</div>`,
        poster: "img/6.jpg",
    },
    {
        id:"7",
        songName: `Bam Akhanda <br><div class="subtitle">Akhanda</div>`,
        poster: "img/7.jpg",
    },
    {
        id:"8",
        songName: `Shree Hari Strotam <br><div class="subtitle">G.Gayatri Devi</div>`,
        poster: "img/8.jpg",
    },
    {
        id:"9",
        songName: `Punjabiyan di<br><div class="subtitle">Guru Randhawa , Bohemia</div>`,
        poster: "img/9.jpg",
    },
    {
        id:"10",
        songName: `How long <br><div class="subtitle">Charlie Puth</div>`,
        poster: "img/10.jpg",
    },
    {
        id:"11",
        songName: `Lagdi Lahore Di <br><div class="subtitle">Street Dancer 3D</div>`,
        poster: "img/11.jpg",
    },
    {
        id:"12",
        songName: `See you again <br><div class="subtitle">Wiz khalifa</div>`,
        poster: "img/12.jpg",
    },
    {
        id:"13",
        songName: `Jailer - Hukum  <br><div class="subtitle">Anirudh Ravichandra</div>`,
        poster: "img/13.jpg",
    },
    {
        id:"14",
        songName: `Ram Siya Ram <br><div class="subtitle">Sanchet,Parampara</div>`,
        poster: "img/14.jpg",
    },
    {
        id:"15",
        songName: `KGF-Falak Tu <br><div class="subtitle">Suchetha Basrur</div>`,
        poster: "img/15.jpg",

    },
    {
        id:"16",
        songName: `Pushpa-Saami Saami<br><div class="subtitle">Sunidhi Chouhan </div>`,
        poster: "img/16.jpg",
        
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
} )


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
            element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `audio/${index}.mp3`;
        poster_master_play.src =`img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})



let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src =`img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    
})
next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
        }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src =`img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    
})


let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})
// Get a reference to the "Download" button
const downloadButton = document.getElementById('download_music');

// Add a click event listener to the "Download" button
downloadButton.addEventListener('click', () => {
    // Create an anchor element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = `audio/${index}.mp3`; // Replace with the path to your audio file
    downloadLink.download = `${index}.mp3`; // Specify the filename for the downloaded file

    // Trigger a click event on the anchor element to initiate the download
    downloadLink.click();
});


// Get a reference to the "PLAY" button
const playButton = document.querySelector('.buttons button');

// Initialize an audio player


// Variable to track the playing status
let isPlaying = false;

// Add a click event listener to the "PLAY" button
playButton.addEventListener('click', () => {
    if (!isPlaying) {
        // If not playing, start playing
        music.src = `audio/7.mp3`; // Replace with the path to your audio file
        music.play();
        playButton.textContent = 'PAUSE';
        wave.classList.add('active2'); // Change the button text to "PAUSE"
    } else {
        // If playing, pause
        music.pause();
        playButton.textContent = 'PLAY'; // Change the button text to "PLAY"
        wave.classList.remove('active2');
    }

    // Toggle the playing status
    isPlaying = !isPlaying;
});

// Add an event listener to track when the audio has ended
music.addEventListener('ended', () => {
    // Reset the button to "PLAY" when the audio ends
    playButton.textContent = 'PLAY';
    isPlaying = false;
    wave.classList.remove('active2');
});
