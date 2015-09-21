angular.module('ns.controllers', [])

.controller('HomeCtrl', function($scope, $q, $ionicPlatform, $timeout, $cordovaFileTransfer,
                                 $cordovaFile, $cordovaNocSonicMedia, $cordovaDevice, $cordovaNativeAudio) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  var isLoading         = false;
  var isSuccessful      = false;

  var fileDeviceDir     = null;

  var fileURL           = "";
  var media             = null;
  var Beat = {};
  var directory        = 'clipdownloads';
  var BeatFile          = null;
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
  Beat.beat_title = "2short";
  Beat.beat_type  = "audio";
  Beat.createdAt  = 2014;
  Beat.discarded  = false;
  Beat.user_id    = "5367c72f952ddbb702ef8c78";

  //non-model-state-attributes
  Beat.progress   = 0;
  Beat.buffer     = null;
  Beat.loaded     = null;


  document.addEventListener('deviceready', function () {

      console.log("[HomeCtrl]  START");
      if($cordovaDevice.getPlatform() == 'iOS'){
           fileDeviceDir =  cordova.file.documentsDirectory;
      }else{
          fileDeviceDir  =  cordova.file.externalRootDirectory;
      }
  });


  $scope.assetsLoaded = true;


  $scope.downloadFile = function() {
    /*var targetPath = fileDeviceDir + Beat.beat_name;
    var trustHosts = true;
    var options = {};
    console.log("[HomeCtrl] downloadFile(0 called...");
    window.resolveLocalFileSystemURL(targetPath, appStart, downloadAsset)*/
    var createdDirectory = null;

     var targetPath = fileDeviceDir + Beat.beat_name;
     var uri = encodeURI(Beat.beat_cdn_url);
             $cordovaFileTransfer.download(uri, targetPath, {}, true)
                .then(
                      function(entry) {
                         var fileURL = entry.toURL();
                         fileURL = fileURL.replace('file://','');
                         BeatFile = fileURL;
                      },
                    function (err) {
                        console.log('[ HomeCtrl  androidSetUp ]window.plugins.NativeAudio.preloadComplex ]error: ' + err);
                        alert("[$cordovaFileTransfer err ] = "+JSON.stringify(err));
                    },
                    function (progress) {
                          $timeout(function () {
                            $scope.downloadProgress = (progress.loaded / progress.total) * 100;
                          })
                        });

  }
function moveFile(fileUri) {
    window.resolveLocalFileSystemURL(
          fileUri,
          function(fileEntry){
                newFileUri  = cordova.file.dataDirectory + "mylocal/";
                oldFileUri  = fileUri;
                fileExt     = "." + oldFileUri.split('.').pop();

                newFileName = guid("car") + fileExt;
                window.resolveLocalFileSystemURL(cordova.file.dataDirectory,
                        function(dirEntry) {
                            // move the file to a new directory and rename it
                            fileEntry.moveTo(dirEntry, newFileName, successCallback, errorCallback);
                        },
                        errorCallback);
          },
          errorCallback);
}

   var mediaStatusCallback = function(status) {
          console.log("[controller.js]--- mediaStatusCallback status = "+status);
  }

  $scope.playAudio = function(){
         // media = $cordovaNocSonicMedia.newMedia( Beat.beat_cdn_url);
          if($cordovaDevice.getPlatform() == 'iOS'){
          media = new NocSonicMedia(Beat.beat_cdn_url, null, null, mediaStatusCallback);
          var iOSPlayOptions = {
            numberOfLoops: 2,
            playAudioWhenScreenIsLocked: false
          }
               media.play(iOSPlayOptions); // iOS only!*/
          }else{
              media = new NocSonicMedia(BeatFile, null, null, mediaStatusCallback);
             media.play();
            // window.plugins.NativeAudio.loop( 'music' );
            /*if( window.plugins && window.plugins.NativeAudio ) {
              // Preload audio resources
              window.plugins.NativeAudio.preloadComplex('music',  Beat.beat_cdn_url, 1, 1, 0, function (msg) {
                   console.log('[ HomeCtrl  START LLOP');
                   window.plugins.NativeAudio.loop( 'music' );
              }, function (msg) {
                   console.log('[ HomeCtrl  androidSetUp ]window.plugins.NativeAudio.preloadComplex ]error: ' + msg);
              });
      }*/
          }
  }



function moveAudioFileDownload(){
          $cordovaFile.createDir(cordova.file.dataDirectory, "audio_junk", false)
            .then(
            function (success) {
                alert(JSON.stringify(success));
                $cordovaFile.moveFile(cordova.file.dataDirectory,   Beat.beat_name , cordova.file.tempDirectory)
                  .then(
                     function (success) {
                        alert(JSON.stringify(success));
                        if ($cordovaDevice.getPlatform() == 'iOS') {
                          $scope.assetsLoaded = true;
                        } else {
                          androidSetUp();
                          $scope.assetsLoaded = true;
                        }
                                // success
                    }, function (error) {
                         alert(JSON.stringify(error));
                     });
              // error
            }, function (error) {
                    alert("ERROR ---123"+JSON.stringify( cordova.file.dataDirectory+"audio_junk") );

                $cordovaFile.moveFile(cordova.file.dataDirectory,   Beat.beat_name , cordova.file.dataDirectory+"audio_junk", Beat.beat_name)
                  .then(
                     function (success) {
                        alert(JSON.stringify(success));
                        if ($cordovaDevice.getPlatform() == 'iOS') {
                          $scope.assetsLoaded = true;
                        } else {
                          androidSetUp();
                          $scope.assetsLoaded = true;
                        }
                                // success
                    }, function (error) {
                         alert("ERROR ---znd"+JSON.stringify(error));
                     });
            });
        // success

}


  $scope.stopAudio = function(){
          if($cordovaDevice.getPlatform() == 'iOS'){
                 media.stop()
          }else{
                media.stop();
                media.release();
          }
  }


  function androidSetUp(){
      if( window.plugins && window.plugins.NativeAudio ) {
        // Preload audio resources
         window.plugins.NativeAudio.preloadComplex('music',  BeatFile.someURL, 1, 1, 0, function (msg) {
            alert(JSON.stringify(msg));
             $scope.assetsLoaded = true;
        }, function (err) {
             console.log('[ HomeCtrl  androidSetUp ]window.plugins.NativeAudio.preloadComplex ]error: ' + err);
                alert(JSON.stringify(err));
        });
      }
  }

  function appStart(fileEntry){
    fileEntry.file(function(file) {
      console.log("[HomeCtrl] appStart..targetPath = " + file.localURL);
      console.log("[HomeCtrl] appStart...name = " + file.name);

     window.resolveLocalFileSystemURL(file.localURL, function(entry) {
       var nativePath = entry.toURL();
      console.log("[" +
        "HomeCtrl] appStart..nativeURL  = " + nativePath);
       BeatFile = {};
       BeatFile.someURL = nativePath;
       androidSetUp();
       $scope.assetsLoaded = true;
     });


    });
  }

  function downloadAsset() {
    var targetPath = fileDeviceDir + Beat.beat_name;
    console.log("[HomeCtrl]   downloadAsset  targetPath = "+targetPath);
    var trustHosts = true;
    var options = {};
    var loc = fileDeviceDir;
    console.log("[HomeCtrl]   downloadAsset  downloadFile ");
    alert(fileDeviceDir);
    $cordovaFileTransfer.download(Beat.beat_cdn_url, targetPath, options, trustHosts)
      .then(
       function (result) {

moveAudioFileDownload();
         /*var extension = Beat.beat_name.split(".").pop();
        var filepart = "2short";
        var filename = filepart + "." + extension;
        console.log("[HomeCtrl]  new filename is " + filename);
         alert(JSON.stringify(result));
        window.resolveLocalFileSystemURL(loc, function (d) {
             alert(JSON.stringify(d));
          window.resolveLocalFileSystemURL(Beat.beat_name, function (fe) {
             alert(JSON.stringify(fe));
            fe.copyTo(d, filename, function (e) {
              console.log("[HomeCtrl] downloadAsset downloadFile called...targetPath =" + targetPath);
              console.log("[HomeCtrl]downloadAsset downloadFile called..Beat.beat_name =" + Beat.beat_name);
              BeatFile = {};
              BeatFile.localURL = e.localPath;
              if ($cordovaDevice.getPlatform() == 'iOS') {
                $scope.assetsLoaded = true;
              } else {
                androidSetUp();
                $scope.assetsLoaded = true;
               }

            }, function (e) {
              console.log('error in coipy');
              console.dir(e);
            });
          }, function (e) {
            console.log("error in inner bullcrap");
            console.dir(e);
          });
        }, function (e) {
          console.log('error in fs');
          console.dir(e);
        }); */

      },
       function (err) {
            console.log("error-- err =",err);
        // Error
      },
      function (progress) {
        $timeout(function () {
          $scope.downloadProgress = (progress.loaded / progress.total) * 100;
        })
      });
  }

});
