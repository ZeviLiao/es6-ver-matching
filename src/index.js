import { getJsonDoc } from './utils/capability'
import rsp from './matching-version/res.json'

const checkTypes = {
    'apk': 1,
    'mbkx': 1,
    'mbtx': 1,
    'media': 1
}

rsp.data.map(d => {

    Object.keys(checkTypes).forEach(type => {
        let content = getJsonDoc(type)
        console.log(content)
    })

})








