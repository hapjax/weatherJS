let apiKey = "ae76d0efed32d9f29c4d54a5738b80ca";
let city = "brno";
const proxy = `https://cors-anywhere.herokuapp.com/`; 
// const api = 

let tempDescription = document.querySelector('.temp-description');
let tempValue = document.querySelector('.temp-value'); 
let locationCity = document.querySelector('#location');
let weatherIcon = document.querySelector('#weather-icon');
let maxTemp = document.querySelector('#max-temp');
let minTemp = document.querySelector('#min-temp');
let pressure = document.querySelector('#pressure');
let humidity = document.querySelector('#humidity');




// Capitalize first letter in string
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s[0].toUpperCase() + s.slice(1)
}
  
// funkcja konwertujaca K na C
 function calculate(kelvin) {
    // zaokraglaj wynik w gore
    return Math.ceil(kelvin - 272.15);
}



// wybieram przycisk z drzewa DOM
let button = document.querySelector('button');

button.addEventListener("click", function(){
    console.log("ckick");

    let inputValue = document.querySelector('input').value;
    let api = `${proxy}http://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}`;

    if (inputValue.trim() !== '') {
        fetch(api)
          .then(response =>{
            return response.json();
        })
        // data - nasz json
        .then(data => {

            function populateCards(item, index, arr) {
                let timestamp = new Date(data.list[index].dt * 1000);
                let hours = timestamp.getHours();
                let minutes = timestamp.getMinutes();
                let day = timestamp.getDate();
                let month = timestamp.getMonth();
                let year = timestamp.getFullYear();

                let iconCode = data.list[index].weather[0].icon;
                
                let time = document.querySelector("#time-card"+index);
                let date = document.querySelector("#date-card"+index);
                let icon = document.querySelector("#icon-card"+index);
                let temp = document.querySelector("#temp-card"+index);
                let description = document.querySelector("#description-card"+index);
                let wind = document.querySelector("#wind-card"+index);
                
                
                time.textContent = hours+':'+(minutes<10?'0':'')+minutes;

                date.textContent = (day<10?'0':'')+day+'.'+(month<10?'0':'')+month+'.'+year;

                icon.src = "http://openweathermap.org/img/w/" + iconCode + ".png";

                temp.textContent = calculate(data.list[index].main.temp);
                
                description.textContent = capitalize(data.list[index].weather[0].description);

                wind.textContent = data.list[index].wind.speed;
            
            
            }
            
            if (data.cod === "200"){
                console.log(data);

                let iconCode = data.list[0].weather[0].icon;
                
                maxTemp.textContent = calculate(data.list[0].main.temp_max);
                minTemp.textContent = calculate(data.list[0].main.temp_min);

                tempValue.textContent = calculate(data.list[0].main.temp);
                tempDescription.textContent = capitalize(data.list[0].weather[0].description);
                locationCity.textContent = data.city.name;
                weatherIcon.src = "http://openweathermap.org/img/w/" + iconCode + ".png";

                pressure.textContent = Math.floor(data.list[0].main.pressure);
                humidity.textContent = data.list[0].main.humidity;

                data.list.forEach(populateCards);
            } 
            else {
                alert("Błąd");
                }


        });
      }


  }); 



  