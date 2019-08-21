const fetch = require('node-fetch');
const csv=require('csvtojson');

//Here we will read the data from the file given
//@param none
//@return a json array with the parsed data from csv file
async function ReadData() {
    // Async / await usage
    const csvFilePath = './Resources/FlyDataset.csv'
    const jsonArray = await csv().fromFile(csvFilePath)
       .then(json => json);
    return jsonArray;
}

//Here we will get the json from the API the currently weather by Openweather using the url
//@param geographic coordinates
//@return json file
async function askDataApi ( lat, long ){
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=2381d95daa339cd31a070d31b16caa62`)
       .then(res => res.json())
}

//Here we will display one city information
function displayCity ( jsonFile ){
    var delayInMilliseconds = 2000; //2 second
    setTimeout(function() {
        console.log( `City:${ jsonFile.name }`); //Working
        console.log( `Main weather:${ jsonFile.weather[0].main }`); //Working
        console.log( `Description:${ jsonFile.weather[0].description }`);
        console.log( `Temperature:${ jsonFile.main.temp }` );
        console.log( `Max:${ jsonFile.main.temp_max }` ); //Working
        console.log( `Min:${ jsonFile.main.temp_min }` ); //Working
        console.log( "\***********************************************************************************************************"); //Just to divide cities
    }, delayInMilliseconds);

}

//Here we will display all the data to the user
// If we dont have the data save we ask to the API for it, if we have it we just load it again
async function processJson(){
    var jArray = await ReadData(); //The JSON array from reading the .csv file
    const cache = new Map(); //This dictionary will be our cache
    let originJson;
    let destinationJson;
    for(var i = 0; i < jArray.length; i ++){
	  //On this if-else we will check if we already have the information load or not
	  //Origin
	  let auxo = await cache.get( jArray[i].origin );
          if( auxo == undefined )
	  {
	        originJson = await askDataApi( jArray[i].origin_latitude, jArray[i].origin_longitude );
		cache.set( jArray[i].origin, originJson ) ;
		auxo = originJson;
	  }
	  displayCity( auxo );
	  let auxd = await cache.get( jArray[i].destination ); //The json file of the city, in case it exist
	  //Destination
	  if( auxd == undefined )
          {
                destinationJson = await askDataApi( jArray[i].destination_latitude, jArray[i].destination_longitude );
                cache.set( jArray[i].origin, destinationJson );
		auxd = destinationJson;
	  }
          displayCity( auxd );
    }
}

processJson();
