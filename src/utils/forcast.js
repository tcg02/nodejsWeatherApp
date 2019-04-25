// const request = require('request');

// const forcast = ({latitude,longitude}, callback)=>{
    
//     const url = 'https://api.darksky.net/forecast/0be512f2475ba8935c83da74c00d6bb6/'+latitude+','+longitude+'?lang=en' 

//     request({url,json:true},(error,{body})=>{
//         if(error){
//             callback('Unable to connect to weather service!')
//         }else if(body.error){
//             callback('Unable to find location!')
//         }else{
//             const currently = body.currently
//             const daily = body.daily.data[0]
//             const forcastdetail = `${daily.summary} It is currently ${currently.temperature} degree out. There is ${currently.precipProbability}% chance of rain.`            
//             callback(undefined,forcastdetail)
//         }
//     })
// }



const https = require('https')

const forcastCore = ({latitude,longitude}, callback) =>{
    const url = 'https://api.darksky.net/forecast/0be512f2475ba8935c83da74c00d6bb6/'+latitude+','+longitude+'?lang=en' 
    
    const request = https.request(url, (response)=>{

        let data = ""

        response.on('data',(chunk)=>{
            data = data + chunk.toString()
        })

        response.on('end',()=>{
            const body = JSON.parse(data)
            if(body.error){
                callback('Unable to find location!')
            }
            else{
                const currently = body.currently
                const daily = body.daily.data[0]
                const forcastdetail = `${daily.summary} It is currently ${currently.temperature} degree out. There is ${currently.precipProbability}% chance of rain.`            
                callback(undefined,forcastdetail)
            }            
        })

    })

    request.on('error', (error)=>{
        callback('Unable to connect to weather service!')
    })

    request.end()
}


module.exports = forcastCore