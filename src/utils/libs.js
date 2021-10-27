


export function saveBlockList(script) {
    let dependenList = dependenciesList[0].featureList;
    if (script) {
        let curentBlockList = this.stringToXml(
            script
        ).getElementsByTagName("block");
        let blockTypeList = [];
        Array.from(curentBlockList).forEach((item) => {
            let type = item.getAttribute("type");
            let typeIndex = dependenList.findIndex((dep) => {
                return dep.featureName === type;
            });
            blockTypeList.push({
                featureName: type,
                dependenciesVersion:
                    dependenList[typeIndex].dependenciesVersion,
                i18n: dependenList[typeIndex].i18n,
            });
        });
        return blockTypeList
    }
}


export function filterBlock(device) {
    let dependenList = this.currentBlockList;
    let robotBlockList = [];
    let currentLang = Cookie.get("langCode") || "zh-TW";
    if (device.errorTipsType && device.errorTipsType.length > 0) {
        let errorTipsType = device.errorTipsType.filter((item) => {
            return item.queryCmd === "cmdCapabilityJson";
        });
        if (errorTipsType[0].value !== "none") {
            robotBlockList = JSON.parse(errorTipsType[0].value);
        }
        if (robotBlockList.length > 0) {
            let notDepList = dependenList.filter((dep) => {
                return (
                    !robotBlockList.some((robot) => {
                        return dep.featureName === robot.type;
                    }) ||
                    !robotBlockList.some((robot) => {
                        return semver.satisfies(
                            robot.version,
                            dep.dependenciesVersion
                        );
                    })
                );
            });
            console.log(notDepList, "notDepList");
            let notBlock = notDepList.map((block) => {
                return block.i18n[currentLang];
                // return block.featureName; 
            });
            if (notBlock.length > 0) {
                // return notBlock
                return this.$t("play_robot.need_update_block_version", {
                    block: [...notBlock],
                });
            } else {
                return false;
            }
        } else {
            return this.$t("play_robot.need_update_app_version");
        }
    } else {
        return false;
    }
}