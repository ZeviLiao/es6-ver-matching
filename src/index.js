// import { getJsonDoc } from './utils/capability'


// const typeGroup = ['mbkx', 'mbtx', 'jpg', 'mov', 'koding', 'csv']
const typeGroup = ['jpg', 'mov']

// let content = []
let contentTemplate = [
    {
        "type": "cmdCapabilityJson",
        "packageName": "com.nuwarobotics.lib.rms",
        "require": "true",
        "featureList": [] // fArr
    }
    // pTemplate append here
]
let fArr = []
let pArr = []

function readFile() {

    var fs = require('fs');
    const path = require('path');
    var Papa = require('papaparse');
    var file = path.resolve(__dirname, './matching-version/dep-excel-file.csv');
    // When the file is a local file when need to convert to a file Obj.
    //  This step may not be necissary when uploading via UI
    var content = fs.readFileSync(file, "utf8");

    var rows;
    Papa.parse(content, {
        header: true,
        delimiter: ",",
        complete: function (results) {
            //console.log("Finished:", results.data);
            rows = results.data;
            rows.forEach(row => {

                let ext = JSON.parse(row.ext).featureName
                if (typeGroup.includes(ext)) {
                    fArr.push(JSON.parse(row.ext))
                    let pTemplate = {
                        "type": "cmdPackageExist",
                        "packageName": row.dep1,
                        "require": "true"
                    }
                    pArr.push(pTemplate)
                    if (row.dep2) {
                        pTemplate = {
                            "type": "cmdPackageExist",
                            "packageName": row.dep2,
                            "require": "true"
                        }
                        pArr.push(pTemplate)
                    }
                }
            });

            contentTemplate[0]['featureList'] = fArr
            contentTemplate.push(...new Map(pArr.map(v => [v.packageName, v])).values())

            console.log(JSON.stringify(contentTemplate, null, 2))
        }
    });

}

readFile();


// let readyJsonDocs = ['apk', 'files']

// if (typeGroup.includes('apk')) {
//     let content = getJsonDoc('apk')
// }
// else {
//     content = getJsonDoc('files')

//     let inx = content.findIndex(o => o.type === 'cmdCapabilityJson')
//     let cmd = content[inx]
//     let checkedFeature = []

//     const found = cmd.featureList.some(r => {
//         if (typeGroup.indexOf(r.featureName) > -1) {
//             checkedFeature.push(r)
//         }
//     })

//     cmd.featureList = checkedFeature
// }

// console.log(JSON.stringify(content, null, 2))




