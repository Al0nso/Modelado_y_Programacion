alert('Soy un codigo JavaScript');
console.log('Hola mundo');
for(let index = 0; index < 100; index++){
	console.log('Adios mundo');
}

//$.get("Modelado_y_Programacion/PrimerPeriodo/Tarea01/Resourses/FlyDataset.cvs",function(result){

var pathCVS = "../Resourses/FlyDataset.csv";

Papa.parse(pathCVS, {
	download: true,
	console.log("Succed");
})


