import dep_apk from './matching-version/dependenciesList-apk.json'
import dep_mbkx from "./matching-version/dependenciesList-mbkx.json";
import dep_mbtx from "./matching-version/dependenciesList-mbtx.json";
import { saveBlockList, filterBlock } from './utils/libs'
import rsp from './matching-version/res.json'
import semver from 'semver'


// let a = rsp.data
//     .map(o => ({
//         clientId: o.clientId,
//         types: o.reply
//             .filter(p => p
//                 && p.result === 'success'
//                 && p.packageName.endsWith('.rms')
//                 && p.queryCmd.endsWith('Exist'))
//             .map(q => ({
//                 type: q.queryCmd,
//                 value: q.value
//                     //&& typeof JSON.parse(q.value)
//                         // .filter(o => o.type === 'set_app_install')
//             }))
//     }))


let fileTypeList = { dep_mbkx/*, dep_apk, dep_mbkx, dep_mbtx*/ } // 

const varToString = varObj => Object.keys(varObj)[0]
Object.keys(fileTypeList)
    .forEach(ftypeName => {
        checkV(fileTypeList[ftypeName], ftypeName)
    });

function checkV(depType, depName) {
    let b = rsp.data
        .forEach(dev => {
            let pk = []
            let cmd = []
            let ver = []

            let lib = dev.reply.filter(
                o => (o  // filter null
                    //&& o.result === 'success'
                ) // online
            )

            // multi
            depType.forEach(a => {
                if (a.type === 'cmdPackageExist') {
                    let _pk = lib.find(
                        o => (o.packageName === a.packageName
                            && o.queryCmd === a.type
                            // && o.value === a.require
                        )
                    )
                    // pk.push(!!_pk)
                    if (!_pk) {
                        pk.push(a)
                    }
                    // console.log(_pk)
                }
            });


            // multi
            let cmdJsons = depType.filter(o => o.type === 'cmdCapabilityJson')

            cmdJsons.forEach(apk => {
                let cmds = lib.find(
                    o => (o.queryCmd === apk.type &&
                        o.packageName === apk.packageName)
                )
                if (!cmds) {
                    cmd.push('robot pkg not exit')
                }
                else if (cmds.value === 'none') {
                    cmd.push('robot no result')
                }
                else {
                    let flist = apk.featureList
                    flist.forEach(a => {
                        // check command
                        let _cmd = JSON.parse(cmds.value).find(
                            q => q.type === a.featureName
                        )
                        if (!_cmd) {
                            cmd.push(`no cmd: ${a.featureName}`)
                        }

                        // check version
                        if (_cmd) {
                            let _ver = JSON.parse(cmds.value).find(
                                q => q.type === a.featureName &&
                                    semver.satisfies(
                                        q.version,
                                        a.dependenciesVersion
                                    )
                            )
                            if (!_ver) {
                                ver.push(`the cmd: ${a.featureName} must ${a.dependenciesVersion}`)
                            }
                        }
                        // cmd.push(!!_cmd)
                        // ver.push(!!_ver)

                    });
                }
            });

            console.log(
                {
                    depName: depName,
                    clientId: dev.clientId,
                    // pk: pk.length > 0 && pk.every(v => v === true),
                    // cmd: cmd.length > 0 && cmd.every(v => v === true),
                    // ver: ver.length > 0 && ver.every(v => v === true)
                    pk,
                    cmd,
                    ver
                }
            )
        })
}





// .map(o => ({
//     clientId: o.clientId,
//     types: o.reply
//         .filter(p => p
//             && p.result === 'success'
//             && p.packageName.endsWith('.rms')
//             && p.queryCmd.endsWith('Json'))
//         .map(q => ({
//             type: q.queryCmd,
//             value: JSON.parse(q.value)
//         }))
// }))

// b.forEach(o => {
//     if (o.types.length > 0) {
//         o.types.forEach(p => {
//             let a = p.value.find(q => q.type === 'set_app_install')
//             console.log(a)
//         })
//     }
// })

console.log(
    // JSON.stringify(a)
    // JSON.stringify(b)
)



