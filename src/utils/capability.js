import semver from 'semver'

export const getJsonDoc = (docName) => {
    let jsonDoc = null

    if (['apk', 'mbkx', 'mbtx', 'media'].includes(docName)) {
        jsonDoc = require(`../matching-version/dependenciesList-${docName}.json`)
    }
    return jsonDoc
}

export const checkApk = (device) => {
    // "packageName" : "com.nuwarobotics.lib.rms", // apk
    let doc = getJsonDoc('apk')
    let result = capabilityCheck(doc, device.reply)
    // result = { 
    //     packageName: "com.nuwarobotics.lib.rms", //缺少。
    //     featureName: "set_app_install", //缺少。
    //     dependenciesVersion: ">=1.0.0" //版不符。
    // }
    return getType(device.clientId, result)
}

export const checkMbkx = (device) => {
    // "packageName" : "com.nuwarobotics.app.microcoding", // mbkx
    let doc = getJsonDoc('mbkx')
    let result = capabilityCheck(doc, device.reply)
    return getType(device.clientId, result)
}

export const checkMbtx = (device) => {
    // "packageName" : "com.nuwarobotics.app.nuwaplayer", // mbtx
    let doc = getJsonDoc('mbtx')
    let result = capabilityCheck(doc, device.reply)
    return getType(device.clientId, result)

}

export const checkMedia = (device) => {
    // "packageName" : "com.nuwarobotics.app.nuwaplayer", // media
    let doc = getJsonDoc('media')
    let result = capabilityCheck(doc, device.reply)
    return getType(device.clientId, result)
}

// 決定 type, 
function getType(dId, result) {
    let type = -1
    if (result.packageName
        || result.featureName
        || result.dependenciesVersion) {
        if (result.packageName) { // no app
            type = 5
        } else if (result.featureName
            && !result.dependenciesVersion) { // no mr
            type = 2
        } else if (result.featureName
            && result.dependenciesVersion) {  // yes mr but ver.
            type = 1
        }
    }

    return {
        typeCode: type, // -1 is validate.
        deviceId: dId,
        packageName: result.packageName,
        featureName: result.featureName,
        dependenciesVersion: result.dependenciesVersion
    }
}

function capabilityCheck(depType, devMeta) {
    let pkgs = []
    let commands = []
    let versions = []

    let devMetaList = devMeta.filter(o => (o)) // filter null

    // check package.
    depType.forEach(a => {
        if (a.type === 'cmdPackageExist') {
            let _pk = devMetaList.find(
                o => (o.queryCmd === a.type &&
                    o.packageName === a.packageName
                    // && o.value === a.require
                )
            )
            if (!_pk) pkgs.push(a.packageName) // device meta not found.
        }
    });

    let depCmdJsons = depType.filter(o => o.type === 'cmdCapabilityJson')

    depCmdJsons.forEach(dep => { // 

        let flist = dep.featureList

        flist.forEach(ftr => {

            let cmds = devMetaList.find(
                o => (o.queryCmd === dep.type &&
                    o.packageName === dep.packageName
                )
            )
            if (!cmds) commands.push(ftr.featureName)
            else if (cmds.value === 'none') commands.push(ftr.featureName)
            else {

                // check command
                let _cmd = JSON.parse(cmds.value /* cmd json string */)
                    .find(
                        q => q.type === ftr.featureName
                    )
                if (!_cmd) {
                    commands.push(ftr.featureName)
                }

                // got cmd then check version
                if (_cmd) {
                    let _ver = JSON.parse(cmds.value).find(
                        q => q.type === ftr.featureName &&
                            semver.satisfies(
                                q.version,
                                ftr.dependenciesVersion
                            )
                    )
                    if (!_ver) {
                        versions.push(ftr.dependenciesVersion)
                    }
                }
            }

        })
    });

    return {
        packageName: pkgs[0] || null,
        featureName: commands[0] || null,
        dependenciesVersion: versions[0] || null
    }
}