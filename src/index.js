import { getJsonDoc } from './utils/capability'
// import rsp from './matching-version/res.json'

const checkTypes = {
    'apk': 1,
    'mbkx': 0,
    'mbtx': 0,
    'media': 1,
    
}
let cmdTemplate = []
let fArr = []
let pArr = []

Object.keys(checkTypes).forEach(type => {
    if (checkTypes[type] === 1) {
        let content = getJsonDoc(type)
        content.forEach(element => {
            // console.log(element.type)
            if (element.type === 'cmdCapabilityJson') {
                // console.log(element.featureList)
                fArr = fArr.concat(element.featureList)
            }
            if (element.type === 'cmdPackageExist') {
                // console.log(element)
                pArr.push(element)
            }
        });
    }
})

console.log(fArr)
fArr.sort(function (a, b) {
    var nameA = a.dependenciesVersion; // ignore upper and lowercase
    var nameB = b.dependenciesVersion; // ignore upper and lowercase
    if (nameA < nameB) {
        return -1;
    }
    if (nameA > nameB) {
        return 1;
    }

    // names must be equal
    return 0;
});
console.log(fArr)

cmdTemplate.push({
    "type": "cmdCapabilityJson",
    "packageName": "com.nuwarobotics.lib.rms",
    "require": "true",
    "featureList": [...new Map(fArr.map(v => [v.featureName, v])).values()]
})
cmdTemplate.push(...pArr)

console.log(JSON.stringify(cmdTemplate, null, 4))
// console.log(cmdTemplate)








