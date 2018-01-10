import * as _ from 'lodash';

var gender_source = [
	{label: "男", value: "1"},
	{label: "女", value: "2"},
]

var hobby_source = [
	{label: "摄影", value: "摄影"},
	{label: "瑜伽", value: "瑜伽"},
	{label: "编程", value: "编程"},
	{label: "健身", value: "健身"}
]


export const UserInfoConfig = {
	resource:"users",
	module:"userInfo",
	valueField:"_id",
	labelField:"username",
	addable:false,
	name:"用户管理",
	listHide:["password_hash","avatar"],
	fields : {
		username:{
			label:"用户名",
			widget:"text",
			sortabld:true,
			searchable:true,
			width:400,
			titleabled :true,
			require:true
		},
		password_hash:{
			label:"密码",
			widget:"password",
			sortabld:false,
			require:true,
			width:100,
			editable: false
		},
		realname:{
			label:"真实姓名",
			widget:"text",
			sortabld:true,
			searchable:true,
			require:true
		},
		gender:{
			label:"性别",
			widget:"radio",
			dataSource:gender_source,
			require:true,
			get_display:function(item){
				if(item.gender=="1")
					return "男"
				else if(item.gender=="2")
					return "女"
				else
					return "";
			}
		},
		hobby:{
			label:"兴趣爱好",
			widget:"checkbox",
			dataSource:hobby_source,
			require:true,
		},
		email:{
			label:"Email",
			widget:"text",
			require:true
		},
		creation_on:{
			label:"创建时间",
			widget:"datetime",
			require:true,
			addable: false,
            editable: false
		},
		avatar:{
			label:"用户头像",
			widget:"uploader",
			require:true
		},
		department_id:{
			label:"所在部门",
			widget:"select",
			dataSource:"account.department",
			populateable:true,
			require:true,
			get_display:function(item){
				if(item["department_id"])
					return item["department_id"].name
				return ""
			}
		},
		role_id:{
			label:"所属角色",
			widget:"select",
			populateable:true,
			dataSource:"account.userRole",
			require:true,
			get_display:function(item){
				if(item["role_id"])
					return item["role_id"].name
				return ""
			}
		}
	},
	filters:[
		{
			label:"按部门",
			tree:true,
			key:"department_id",
			dataSource:"account.department"
		},
		{
			label:"所属角色",
			key:"role_id",
			dataSource:"account.userRole"
		}
	]
}

export const DepartmentConfig = {
	resource:"departments",
	module:"department",
	name:"部门管理",
	treeable:true,
	listHide:["lft","rgt","depth"],
	actions:["edit","addChild","delete"],
	fields : {
		name:{
			label:"名称",
			widget:"text",
			titleabled :true,
			require:true
		},
		lft:{
			label:"lft",
			widget:"number",
			require:true,
			addable:false,
			editable:false
		},
		rgt:{
			label:"rgt",
			widget:"number",
			require:true,
			addable:false,
			editable:false
		},
		depth:{
			label:"depth",
			widget:"number",
			require:true,
			addable:false,
			editable:false
		},
		leader:{
			label:"负责人",
			widget:"select",
			populateable:true,
			dataSource:"account.userInfo",
			require:true,
			get_display:function(item){
				return item["leader"]?item["leader"]["realname"]:""
			}
		},
		description:{
			label:"描述",
			widget:"textarea",
			require:false
		}
	}
}



export const UserRoleConfig = {
	resource:"userRoles",
	module:"userRole",
	name:"用户角色管理",
	treeable:false,
	actions:["edit","authorize","delete"],
	fields : {
		name:{
			label:"名称",
			widget:"text",
			titleabled :true,
			require:true
		},
		description:{
			label:"描述",
			widget:"textarea",
			require:false
		}
	}
}


export const AuthNodeConfig = {
	resource:"authNodes",
	module:"authNode"
}

export const AuthorizeConfig = {
	resource:"authorize",
	module:"authorize"
}





