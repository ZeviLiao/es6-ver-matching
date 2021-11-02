
import {checkApk, checkMbkx, checkMbtx} from './utils/capability'
import rsp from './matching-version/res.json'
import semver from 'semver'


rsp.data.map(d => {
    // console.log(d)
    let ret = checkApk(d)  // each device for apk.
    console.log(ret)
    // checkMbkx(d.reply)  // each device for apk.
    // checkMbkx(d.reply)  // each device for apk.
})
// checkApk()




