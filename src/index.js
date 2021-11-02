
import { checkApk, checkMbkx, checkMbtx } from './utils/capability'
import rsp from './matching-version/res.json'
import semver from 'semver'

rsp.data.map(d => {
    // console.log(d)
    // each device for apk.
    // console.log(checkApk(d))
    let list = []
    //same device.clientId
    list.push(checkApk(d))
    list.push(checkMbkx(d))
    list.push(checkMbkx(d))

    const max = list.reduce((prev, current) => (
        (prev.typeCode > current.typeCode) ? prev : current)
    )

    console.log(max);
})




