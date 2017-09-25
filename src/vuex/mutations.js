export const changeSelArr= (state,payload) => {
	state.selectArr.name=payload.selectArr.name;
	state.selectArr.id=payload.selectArr.id;
}
export const changePleObj= (state,payload) => {
	state.peopleObj.value=payload.peopleObj.value;
	state.peopleObj.i=payload.peopleObj.i;
}
export const changeArtObj= (state,payload) => {
	state.articleObj.value=payload.articleObj.value;
	// state.articleObj.radio=payload.articleObj.radio;
	state.articleObj.id=payload.articleObj.id;
	// state.articleObj.flag=payload.articleObj.flag;
}
export const changeSingleObj= (state,payload) => {
	state.singleObj.value=payload.singleObj.value;
	// state.singleObj.radio=payload.singleObj.radio;
	state.singleObj.id=payload.singleObj.id;
	// state.singleObj.flag=payload.singleObj.flag;
}
export const changeOrgState= (state,payload) => {
	state.orgState=payload.orgState;
}
export const changeUserState= (state,payload) => {
	state.userState=payload.userState;
}
export const changeAlertBox= (state,payload) => {
	console.log("flag");
	console.log(payload.flag);
	// state.type=payload.type;
	// state.psObj=payload.psObj;
	state.psBox.title=payload.title;
	state.psBox.type=payload.type;
	state.psBox.psObj=payload.psObj;
	state.psBox.insType=payload.insType;
	state.psBox.instructionId=payload.instructionId;
	state.psBox.flag=payload.flag;
	state.psBox.psType=payload.psType;

}
export const changeClrObj= (state,payload) => {
	state.clrId=payload.clrId;
}
export const changeNewArticle= (state,payload) => {
	state.newArcticle=payload.newArcticle;
}
export const changePsShow= (state,payload) => {
	state.psShow.value=payload.psShow.value;
	state.psShow.id=payload.psShow.id;
}
export const changeUnitVal= (state,payload) => {
	state.unitVal=payload.unitVal;
}
export const changeClearAll= (state,payload) => {
	state.clearAll=payload.clearAll;
}
export const changeUserSource= (state,payload) => {
	state.userSource=payload.userSource;
}
export const changeMesId= (state,payload) => {
	state.mesState.id=payload.mesId;
	state.mesState.method=payload.method;
}
export const changeReporter= (state,payload) => {
	state.reportObj=payload.reportObj;
}
export const changeWord= (state,payload) => {
	state.wordObj=payload.wordObj;
}
export const changeMesInfo= (state,payload) => {
	state.mesObj.title=payload.title;
	state.mesObj.area=payload.area;
	state.mesObj.accept=payload.accept;
	state.mesObj.send=payload.send;
}
export const clearMesInfo= (state,payload) => {
	state.mesObj.title='';
	state.mesObj.area='';
	state.mesObj.accept='';
	state.mesObj.send='';
}
export const changeMesCount= (state,payload) => {
	state.mesCount=payload.mesCount;
}
export const changepsCount= (state,payload) => {
	state.psCount=payload.psCount;
}
export const changeRelease= (state,payload) => {
	state.releaseObj.id=payload.id;
	state.releaseObj.type=payload.type;
	state.releaseObj.event=payload.event;
}
export const changeArtEvent= (state,payload) => {
	state.artEvent=payload;
}
export const changeUserFlag= (state,payload) => {//用户刷新标识
	state.userFlag=payload;
}
export const changeMesFlag= (state,payload) => {//用户刷新标识
	state.mesFlag=payload;
}
export const changeOrgFlag= (state,payload) => {//组织刷新标识
	state.orgFlag=payload;
}
export const changeArtFlag= (state,payload) => {//组织刷新标识
	state.artFlag=payload;
}
export const changepsFlag= (state,payload) => {//批示列表刷新标识
	state.psFlag=payload;
}
export const changepsDetailFlag= (state,payload) => {//批示详情刷新标识
	state.psDetailFlag=payload;
}
export const getNewArt= (state,payload) => {//批示详情刷新标识
	state.artBrush=payload;
}
export const getNewUser= (state,payload) => {//批示详情刷新标识
	state.multiBrush=payload;
}
