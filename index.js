let apiKey = "ae76d0efed32d9f29c4d54a5738b80ca";
let city = "brno";
const proxy = `https://cors-anywhere.herokuapp.com/`; 
// const api = 

let tempDescription = document.querySelector('.temp-description');
let tempValue = document.querySelector('.temp-value'); 
let locationCity = document.querySelector('#location');
let weatherIcon = document.querySelector('#weather-icon');



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
                // console.log(index);
                
                // let card = document.querySelector("#card"+index);
            
                let temp = document.querySelector("#temp-card"+index);
                temp.textContent = calculate(data.list[index].main.temp);
            
            
            }
            
            if (data.cod === "200"){
                console.log(data);

                let iconCode = data.list[0].weather[0].icon;

                tempValue.textContent = calculate(data.list[0].main.temp);
                tempDescription.textContent = capitalize(data.list[0].weather[0].description);
                locationCity.textContent = data.city.name;
                weatherIcon.src = "http://openweathermap.org/img/w/" + iconCode + ".png";

                data.list.forEach(populateCards);
            } 
            else {
                alert("Błąd");
                }


        });
      }


  }); 



  