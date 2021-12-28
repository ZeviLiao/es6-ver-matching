import { getJsonDoc } from './utils/capability'



const typeGroup = ['mbkx', 'mbtx', 'jpg', 'mov', 'koding', 'csv']

let content = []
let fArr = []
let pArr = []

let readyJsonDocs = ['apk', 'files']

if (typeGroup.includes('apk')) {
    let content = getJsonDoc('apk')
}
else {
    content = getJsonDoc('files')

    let inx = content.findIndex(o => o.type === 'cmdCapabilityJson')
    let cmd = content[inx]
    let checkedFeature = []

    const found = cmd.featureList.some(r => {
        if (typeGroup.indexOf(r.featureName) > -1) {
            checkedFeature.push(r)
        }
    })

    cmd.featureList = checkedFeature
}

console.log(JSON.stringify(content, null, 2))




