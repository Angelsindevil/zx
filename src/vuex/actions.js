export const changeSelArr=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeSelArr',{"selectArr":payload.selectArr});
        resolve("ok");
    })
}
export const changePleObj=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changePleObj',{"peopleObj":payload.peopleObj});
        resolve("ok");
    })
}
export const changeArtObj=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeArtObj',{"articleObj":payload.articleObj});
        resolve("ok");
    })
}
export const changeSingleObj=(store,payload)=>{//批示人弹窗单选数据
    return new Promise(function(resolve, reject) {
        store.commit('changeSingleObj',{"singleObj":payload.singleObj});
        resolve("ok");
    })
}
export const changeUserState=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeUserState',{"userState":payload.userState});
        resolve("ok");
    })
}
export const changeOrgState=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeOrgState',{"orgState":payload.orgState});
        resolve("ok");
    })
}
export const changeAlertBox=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        console.log("flag1");
        console.log(payload.flag);
        store.commit('changeAlertBox',{"type":payload.type,"psObj":payload.psObj,"title":payload.title,"instructionId":payload.instructionId,'insType':payload.insType,'flag':payload.flag});
        resolve("ok");
    })
}
export const changeClrObj=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeClrObj',{"clrId":payload.clrId});
        resolve("ok");
    })
}
export const changeNewArticle=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeNewArticle',{"newArcticle":payload.newArcticle});
        resolve("ok");
    })
}
export const changePsShow=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changePsShow',{"psShow":payload.psShow});
        resolve("ok");
    })
}
export const changeClearAll=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeClearAll',{"clearAll":payload.clearAll});
        resolve("ok");
    })
}
export const changeUnitVal=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeUnitVal',{"unitVal":payload.unitVal});
        resolve("ok");
    })
}
export const changeUserSource=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeUserSource',{"userSource":payload.userSource});
        resolve("ok");
    })
}
export const changeMesId=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeMesId',{"mesId":payload.mesId,"method":payload.method});
        resolve("ok");
    })
}
export const changeReporter=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeReporter',{"reportObj":payload.reportObj});
        resolve("ok");
    })
}
export const changeWord=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeWord',{"wordObj":payload.wordObj});
        resolve("ok");
    })
}
export const changeMesInfo=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeMesInfo',{'mesObj':payload.mesObj});
        resolve("ok");
    })
}
export const clearMesInfo=(store)=>{
    return new Promise(function(resolve, reject) {
        store.commit('clearMesInfo');
        resolve("ok");
    })
}
export const changeMesCount=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeMesCount',{'mesCount':payload.mesCount});
        resolve("ok");
    })
}
export const changepsCount=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changepsCount',{'psCount':payload.psCount});
        resolve("ok");
    })
}
export const changeRelease=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeRelease',{'id':payload.id,'type':payload.type,'event':payload.event});
        resolve("ok");
    })
}
export const changeArtEvent=(store,payload)=>{
    return new Promise(function(resolve, reject) {
        store.commit('changeArtEvent',payload);
        resolve("ok");
    })
}
export const changeUserFlag=(store,flag)=>{//用户管理刷新标识
    return new Promise(function(resolve, reject) {
        store.commit('changeUserFlag',flag);
        resolve("ok");
    })
}
export const changeMesFlag=(store,flag)=>{//消息管理刷新标识
    return new Promise(function(resolve, reject) {
        store.commit('changeMesFlag',flag);
        resolve("ok");
    })
}
export const changeOrgFlag=(store,flag)=>{//用户管理刷新标识
    return new Promise(function(resolve, reject) {
        store.commit('changeOrgFlag',flag);
        resolve("ok");
    })
}
export const changeArtFlag=(store,flag)=>{//用户管理刷新标识
    return new Promise(function(resolve, reject) {
        store.commit('changeArtFlag',flag);
        resolve("ok");
    })
}
export const changepsFlag=(store,flag)=>{//用户管理刷新标识
    return new Promise(function(resolve, reject) {
        store.commit('changepsFlag',flag);
        resolve("ok");
    })
}
export const changepsDetailFlag=(store,flag)=>{//用户管理刷新标识
    return new Promise(function(resolve, reject) {
        store.commit('changepsDetailFlag',flag);
        resolve("ok");
    })
}
export const getNewArt=(store,flag)=>{//用户管理刷新标识
    return new Promise(function(resolve, reject) {
        store.commit('getNewArt',flag);
        resolve("ok");
    })
}
export const getNewUser=(store,flag)=>{//用户管理刷新标识
    return new Promise(function(resolve, reject) {
        store.commit('getNewUser',flag);
        resolve("ok");
    })
}