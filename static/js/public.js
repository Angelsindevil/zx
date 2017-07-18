function scrollFun(){
	$(window).scroll(function(){ 
		var height=$(document).scrollTop();
		// if($(".showTop").css("display")=='block'){
			if(height<500){
				$(".showTop").removeClass("fadeIn").addClass("animated fadeOut");
			}
			else if(height>=500){
				$(".showTop").show();
				$(".showTop").removeClass("fadeOut").addClass("animated fadeIn");
			}		
		// }
	})
}
window.onhashchange= matchMenu;
function matchMenu(){
	$("li").removeClass("blue");
	var hash=window.location.hash;
	if(hash.indexOf("contentManage")!=-1){
		$(".contentManage").find("li").eq(1).addClass('blue');
	}//内容管理
	if(hash.indexOf("contentAdd")!=-1){
		$(".contentManage").find("li").eq(2).addClass('blue');
	}//内容新增
	if(hash.indexOf("contentPublish")!=-1){
		$(".contentManage").find("li").eq(3).addClass('blue');
	}//已发布内容
	if(hash.indexOf("articleList")!=-1){
		var array=hash.split("index=");
		var index=array[1];
		var len=$('.articleManage').children("li").length;
		for(var i=1;i<len;i++){
			if(i-1==index){
				$('.articleManage').children("li").eq(i).addClass('blue');
			}
		}
	}//资讯文章

	if(hash.indexOf("instructions")!=-1){
		$(".messageManage").find("li").eq(1).addClass('blue');
	}//批示内容 批示管理员可看
	if(hash.indexOf("mesManage")!=-1){
		$(".messageManage").find("li").eq(2).addClass('blue');
	}//消息管理
	if(hash.indexOf("messageBox")!=-1){
		$(".messageManage").find("li").eq(3).addClass('blue');
	}//系统消息

	if(hash.indexOf("orgManage")!=-1){
		$(".platManage").find("li").eq(1).addClass('blue');
	}//组织信息
	if(hash.indexOf("userManage")!=-1){
		$(".platManage").find("li").eq(2).addClass('blue');
	}//用户管理
	if(hash.indexOf("managementCenter")!=-1){
		$(".platManage").find("li").eq(3).addClass('blue');
	}//批示管理

	if(hash.indexOf("IncludeList")!=-1){
		$(".reporterManage").find("li").eq(1).addClass('blue');
	}//收录管理
	if(hash.indexOf("ReportList")!=-1){
		$(".reporterManage").find("li").eq(2).addClass('blue');
	}//报告列表

	if(hash.indexOf("DataStatistics")!=-1){
		$(".dataManage").find("li").eq(0).addClass('blue');
	}//报告列表	
}
export {matchMenu,scrollFun}
