export const changeSelArr=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeSelArr',{"selectArr":payload.selectArr});
        resolve("ok");
    })
}
export const changePleObj=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changePleObj',{"peopleObj":payload.peopleObj});
        resolve("ok");
    })
}
export const changeArtObj=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeArtObj',{"articleObj":payload.articleObj});
        resolve("ok");
    })
}
export const changeUserState=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeUserState',{"userState":payload.userState});
        resolve("ok");
    })
}
export const changeOrgState=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeOrgState',{"orgState":payload.orgState});
        resolve("ok");
    })
}
export const changeAlertBox=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeAlertBox',{"type":payload.type,"psObj":payload.psObj,"title":payload.title,"instructionId":payload.instructionId});
        resolve("ok");
    })
}
export const changeClrObj=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeClrObj',{"clrId":payload.clrId});
        resolve("ok");
    })
}
export const changeNewArticle=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeNewArticle',{"newArcticle":payload.newArcticle});
        resolve("ok");
    })
}
export const changePsShow=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changePsShow',{"psShow":payload.psShow});
        resolve("ok");
    })
}
export const changeClearAll=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeClearAll',{"clearAll":payload.clearAll});
        resolve("ok");
    })
}
export const changeUnitVal=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeUnitVal',{"unitVal":payload.unitVal});
        resolve("ok");
    })
}
export const changeUserSource=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeUserSource',{"userSource":payload.userSource});
        resolve("ok");
    })
}
export const changeMesId=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeMesId',{"mesId":payload.mesId});
        resolve("ok");
    })
}
export const changeReporter=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeReporter',{"reportObj":payload.reportObj});
        resolve("ok");
    })
}
export const changeWord=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeWord',{"wordObj":payload.wordObj});
        resolve("ok");
    })
}
export const changeMesInfo=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeMesInfo',{'mesObj':payload.mesObj});
        resolve("ok");
    })
}
export const clearMesInfo=(store)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('clearMesInfo');
        resolve("ok");
    })
}
export const changeMesCount=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeMesCount',{'mesCount':payload.mesCount});
        resolve("ok");
    })
}
export const changeRelease=(store,payload)=>{//传入一个store参数 和store拥有相同的属性和方法，传入另一个参数msg，最终在mutations中赋值给state中的变量subjectid
    return new Promise(function(resolve, reject) {
        store.commit('changeRelease',{'id':payload.id,'type':payload.type});
        resolve("ok");
    })
}