(function() {
      function SongPlayer($rootScope, Fixtures) {
          var SongPlayer = {};
          
          
              /**
 * @desc albumPicasso
 * @type {Object}
 */
          
          
          var currentAlbum = Fixtures.getAlbum();
          
         /**
 * @desc Buzz object audio file
 * @type {Object}
 */
         
          var currentBuzzObject = null;
         
         /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */ 
         
         
          var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
              
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
              
            SongPlayer.currentSong = song;
          };
         
         
         
         /**
 * @function playSong
 * @desc Plays the clicked song and allows the pause button to appear
 * @param {Object} song
 */
         
         
         
          var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;  
          };
          
          var stopSong = function(song) {
              currentBuzzObject.stop();
              song.playing = null;
          }
         
   
          
            /**
 * @function getSongIndex
 * @desc returns the index of song object in songs array
 * @param {Object} song
 */
          
          
          var getSongIndex = function(song) {
                return currentAlbum.songs.indexOf(song);
          };
          
          
            /**
 * @desc one of the song objects in songs array
 * @type {Object}
 */
         
         
          SongPlayer.currentSong = null;
          
          
           /**
 * @desc Current playback time (in seconds) of currently playing song
 * @type {Number}
 */
          SongPlayer.currentTime = null;
          
          SongPlayer.volume = null;
         
          SongPlayer.play = function(song) {
              song = song || SongPlayer.currentSong;
              if (SongPlayer.currentSong !== song) {
                    setSong(song);
                    playSong(song);
              } else if (SongPlayer.currentSong === song) {
                    if (currentBuzzObject.isPaused()) {
                        currentBuzzObject.play();
                    }
              }              

          };
         
          SongPlayer.pause = function(song) {
              song = song || SongPlayer.currentSong;
              stopSong(song);
          };
         
              
          
          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
              
            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
          };
          

          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
              
            if (currentSongIndex >= currentAlbum.songs.length) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
          };
          
          /**
 * @function setCurrentTime
 * @desc Set current time (in seconds) of currently playing song
 * @param {Number} time
 */
          SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
          };
          
          SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
          };
          
              
          return SongPlayer;
     }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
    
})();