import { getJsonDoc } from './utils/capability'
// import rsp from './matching-version/res.json'

export function extJsonName(extsArr) {
    let extNames = []
    extsArr.forEach(ext => {
        let ftype = ext

        if (/(jpg|jpeg|png|gif|mp3|m4a|wav|mp4|mov|avi)/i.test(ext)) {
            ftype = 'media'
        }

        if (ftype) extNames.push(ftype)
    });
    return extNames
}


// const typeGroup = extJsonName(['apk', 'mbkx', 'mbtx', 'avi'])
const typeGroup = extJsonName(['apk'])

let cmdTemplate = []
let fArr = []
let pArr = []

let readyJsonDocs = ['apk', 'mbkx', 'mbtx', 'media']

typeGroup.forEach(type => {
    if (readyJsonDocs.includes(type)) {
        let content = getJsonDoc(type)
        content.forEach(element => {
            if (element.type === 'cmdCapabilityJson') {
                fArr = fArr.concat(element.featureList)
            }
            if (element.type === 'cmdPackageExist') {
                pArr.push(element)
            }
        });
    }
})

fArr.sort(function (a, b) {
    var nameA = a.dependenciesVersion; // ignore upper and lowercase
    var nameB = b.dependenciesVersion; // ignore upper and lowercase
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;

    // names must be equal
    return 0;
});

cmdTemplate.push({
    "type": "cmdCapabilityJson",
    "packageName": "com.nuwarobotics.lib.rms",
    "require": "true",
    "featureList": [...new Map(fArr.map(v => [v.featureName, v])).values()]
})

cmdTemplate.push(...new Map(pArr.map(v => [v.packageName, v])).values())

console.log(JSON.stringify(cmdTemplate, null, 4))
// console.log(cmdTemplate)
