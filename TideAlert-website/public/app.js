const firebaseConfig={
    apiKey: "AIzaSyA69eyrrZa7JYToEDzq6CwBoy5gOmFX5dU",
    authDomain: "tidealert-4d45a.firebaseapp.com",
    databaseURL: "https://tidealert-4d45a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "tidealert-4d45a",
    storageBucket: "tidealert-4d45a.appspot.com",
    messagingSenderId: "744565656433",
    appId: "1:744565656433:web:f8520bb49985bffd6404d0"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();
// Create a storage reference from our storage service
var storageRef = storage.ref();

const databaseFloat = database.ref('test/float');
const databaseInt = database.ref('test/int');

const heightcm=15;
const heightm=0.15;

const height_warning=20; //if water height reaches 20 cm, then send out warning

databaseFloat.on('value', (snapshot) => {
  const data= snapshot.val();
  document.getElementById("reading-float").innerHTML = heightm-data;
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});

// Attach an asynchronous callback to read the data
databaseInt.on('value', (snapshot) => {
  const data= snapshot.val();
  document.getElementById("reading-int").innerHTML = heightcm-data;
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
});



var imgRef = storageRef.child('data/photo.jpg');

firebase.auth().signInAnonymously().then(function() {

  imgRef.getDownloadURL().then(function(url){
    // `url` is the download URL for 'data/photo.jpg'
    document.querySelector('img').src = url;
    
  }).catch(function(error) {
    console.error(error);
  });
});

imgRef.getMetadata()
  .then((metadata) => {
    console.log(metadata);
    date = new Date(metadata.timeCreated);
    console.log(date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
    console.log(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    var time = (date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    var writtenDate = (date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate());
    document.getElementById("date-time").innerHTML = time + " at " + writtenDate;
  })
  .catch((error)=> {
    console.error(error);
  });