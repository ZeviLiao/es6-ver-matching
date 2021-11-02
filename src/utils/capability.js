

const getJsonDoc = (docName) =>{

    if (docName === 'apk'){
        let json = require('../matching-version/dependenciesList-apk.json')
        console.log(json)
    }
}





export const checkApk = () =>{
    // "packageName" : "com.nuwarobotics.lib.rms", // apk

    getJsonDoc('apk')

}

export const checkMbkx = () =>{
    // "packageName" : "com.nuwarobotics.app.microcoding", // mbkx

    
}

export const checkMbtx = () =>{
    // "packageName" : "com.nuwarobotics.app.nuwaplayer", // mbtx
    
}