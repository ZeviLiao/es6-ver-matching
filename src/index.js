
import { checkApk, checkMbkx, checkMbtx } from './utils/capability'
import rsp from './matching-version/res.json'

const checkTypes = {
    'apk': checkApk,
    'mbkx': checkMbkx,
    'mbtx': checkMbtx
}

rsp.data.map(d => {
    // console.log(checkApk(d)) // each device for apk.
    let list = []
    
    Object.values(checkTypes).forEach(c => {
        list.push(c(d))
    })

    const maxOfType = list.reduce((prev, current) => (
        (prev.typeCode > current.typeCode) ? prev : current)
    )

    console.log(maxOfType);
})




