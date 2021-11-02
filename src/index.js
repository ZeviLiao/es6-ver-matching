
import { checkApk, checkMbkx, checkMbtx } from './utils/capability'
import rsp from './matching-version/res.json'
import semver from 'semver'


rsp.data.map(d => {
    // console.log(d)
    // each device for apk.
    // console.log(checkApk(d))
    console.log(checkMbkx(d))
    console.log(checkMbkx(d))
})




