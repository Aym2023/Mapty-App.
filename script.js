'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


class workout  {
     date = new Date();
     id = (new  Date.now() + '' .slice(-10) );

    constructor (coords, distance, duration) {
      this.coords = coords; // [lat, lng]
       this.distance = distance; // in k.m
       this.duration = duration; // in min
    }
}

class running extends workout {
    type ='running';
    constructor (coords, distance, duration, cadence) {
        super (coords, distance, duration);
        this.cadence = cadence;
        this.type = 'cyclying';
        this.calcPace();

        // min/kg
        calcPace () {
         this.pace = this.duration / this.distance;
         return this.pace
        }
    }
}

class cyclying extends workout {
    type ='cyclying';
    constructor (coords, distance, duration, elevationGain) {
        super (coords, distance, duration);
        this.elevationGain = elevationGain;
        this.type = 'cyclying';
        this.calcSpeed();

        // kg/ hr
        calcSpeed () {
        this.speed = this.distance / (this.duration/ 60);
        return this.speed
        }
    }
}


const run1 = new running ([39, -12], 5.2, 24, 178 );
const cyclying1 = new cyclying ([39, -12], 27, 95, 523 );
console.log(run1, cyclying1);
// /////////////////////////////////////

// Application Architecture

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');



class app  {
    #map;
    #mapEvent;
    #workout = [];

constructor () { 
this._getposition();
form.addEventListener('submit', this._newWorkout.bind(this))
inputType.addEventListener('change', this._toggleElevationField.bind(this) )}

_getposition () {
if (navigator.geolocation) 
navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
    alert('Could not get your position')
}
);
}
_loadMap (position) {
        const {latitude} = position.coords;
        const {longitude} = position.coords;
         console.log(`https://www.google.com/maps/@${latitude}, ${longitude}`);

         const coords = [latitude, longitude]
          this.#map = L.map('map').setView(coords, 13);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution:
     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.#map);

// Handling clicks on map
this.#map.on('click', this._showForm.bind(this) );
}

_showForm (mapE) {
   this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();

}

_toggleElevationField () {
inputElevation.closest('.form__row').classList.toggle('.form__row--hidden');
inputCadence.closest('.form__row').classList.toggle('.form__row--hidden');
}

_newWorkout () {
        e.preventdefault();
        const validInput = (...inputs) => inputs.every(inpt => Number.isFinite(inpt));
        const allPositive = (...inpts) => inputs.evey(inpt => inpt > 0);

// Get data from form
const type = inputType.value;
const distance = +inputDistance.value;
const duration = +inputDuration.value;
const {lat, lang} = mapEvent.latlang;
let workout;


//  If workout running, create running object.
if (type === 'running') {
    const cadence = +inputCadence.value;

    //  Check if data valid
if (
    !validInput (distance, duration, cadence) ||
    !allPositive (distance, duration, cadence)
    ) {
return alert (' inputs have to be positive number');

 workout = new running([lat, lang] , distance, duration, cadence);

}
};

//  If workout cyclying, create cyclying object.
if (type === 'cyclying') {
    const elevation = +inputElevation.value;

        //  Check if data valid
if (
    !validInput(distance, duration, elevation) ||
    !allPositive (distance, duration)

    ) {
return alert (' inputs have to be positive number');

workout = new cyclying ([lat, lang] , distance, duration, elevation);
}

}

// Add new object on workout array 
this.#workout.push(workout);


// Render workout on map as marker
this.renderWorkoutMarker(workout);


// Render workout on list

     // Hide form and Clear Inputs fileds
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value;

    const app = new App ();

    renderWorkoutMarker (workout) {
        L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(
            L.popup({
              maxwidth:250, 
              minwidth:100,
              autoclose:false,
              closeOnclick:false,
              className:`${type}-popup`,
                })
                )
        .setPopupContent('Workout')
        .openPopup();
        
    }
    }
    
    }