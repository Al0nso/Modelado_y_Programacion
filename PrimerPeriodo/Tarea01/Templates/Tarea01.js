const csvtojsonV1 = require("csvtojson/v1");
const csvFilePath = '../Resourses/FlyDataset.csv'
const csv = require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */ 
})
 
// Async / await usage
const jsonArray=await csv().fromFile(csvFilePath);
