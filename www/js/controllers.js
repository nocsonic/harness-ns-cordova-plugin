angular.module('ns.controllers', [])

.controller('HomeCtrl', function($scope, $q, $ionicPlatform, $timeout, $cordovaFileTransfer,  $cordovaFile, $cordovaMedia) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  var isLoading         = false;
  var isSuccessful      = false;
  var fileURL           = "";
  var media             = null;
  var Beat = {};
  Beat.id = "539b888ee4b005c39d6c630c";
  Beat.beat_blklst_points = 0;
  Beat.beat_cdn_url = "https://s3-us-west-2.amazonaws.com/nocsonic.s3/nocsonic.audio/community/rap/2short.mp3";
  Beat.beat_format = "mp3";
  Beat.beat_genre = "54171213e4b01927d54d3515";
  Beat.beat_liner_notes = "gangsta funky beat flowing on the regular";
  Beat.beat_name = "2short.mp3";
  Beat.beat_path = "nocsonic.audio/community/rap/2short.mp3";
  Beat.beat_play_points = 0;
  Beat.beat_rank_points = 0;
  Beat.beat_size = 551604;
  Beat.beat_tag_list= "548741efe4b080185011734d";
  Beat.beat_title = "funkybeat";
  Beat.beat_type  = "audio";
  Beat.createdAt  = 2014;
  Beat.discarded  = false;
  Beat.user_id    = "5367c72f952ddbb702ef8c78";

  //non-model-state-attributes
  Beat.progress   = 0;
  Beat.buffer     = null;
  Beat.loaded     = null;



  console.log("[HomeCtrl]  START");


  $scope.playAudio = function(){
          media =$cordovaMedia.newMedia( Beat.beat_cdn_url)
          var iOSPlayOptions = {
            numberOfLoops: 2,
            playAudioWhenScreenIsLocked: false
          }
          media.play(iOSPlayOptions); // iOS only!*/
  }

  $scope.stopAudio = function(){
     if(media){
       media.stop();
     }
  }

})
