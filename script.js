'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;
if (navigator.geolocation) 
navigator.geolocation.getCurrentPosition(
    function (position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;
         console.log(`https://www.google.com/maps/@${latitude}, ${longitude}`);

         const coords = [latitude, longitude]
          map = L.map('map').setView(coords, 13);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Handling clicks on map
map.on('click', function (mapE) {
   mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
 });
},
    function () {
        alert('Could not get your position')
    }
);

form.addEventListener('submit', function (e) {
    e.defaultPrevented;

    // Clear Inputs fileds

inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value;

// DISPLAY MARKER
console.log(mapEvent);
const {lat, lang} = mapEvent.latlang;
});

L.marker([lat, lang])
    .addTo(map)
    .bindPopup(
        L.popup({
          maxwidth:250, 
          minwidth:100,
          autoclose:false,
          closeOnclick:false,
          className:'running-popup'
            })
            )
    .setPopupContent('Workout')
    .openPopup();
    




inputType.addEventListener('change', function () {
inputElevation.closest('.form__row').classList.toggle('.form__row--hidden');
inputCadence.closest('.form__row').classList.toggle('.form__row--hidden');
});
