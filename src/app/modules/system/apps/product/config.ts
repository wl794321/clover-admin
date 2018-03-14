import * as _ from 'lodash';

var category_source = [
	{label: "测试1", value: "1"},
	{label: "测试2", value: "2"}
]
export const ProductConfig = {
	resource:"product",
	module:"product",
	valueField:"_id",
	labelField:"name",
	addable:false,
	name:"产品管理",
	listHide:["introduction","bar_code","pic","category_id1","test1_1","test1_2","test1_3","test2_1","test2_2","test2_3"],
	modalListShow:["name","price","serial_number"],
	fields : {
		name:{
			label:"product.Product Name",
			widget:"text",
			sortabld:true,
			searchable:true,
			width:400,
			titleabled :true,
			require:true
		},
		price:{
			label:"product.Product Price",
			widget:"number",
			sortabld:true,
			require:true,
			width:100
		},
		category_id:{
		    label:"类别",
			widget:"select",
			searchable:true,
			populateable:true,
			dataSource:"product.category",
			multiple:false,
			require:true,
			get_display:function(item){
				if(item["category_id"])
					return item["category_id"].name
				return ""
			}
		},
		category_id1:{
		    label:"测试联动",
			widget:"select",
			searchable:true,
			populateable:true,
			dataSource:category_source,
			multiple:false,
			require:true,
			value:"1",
			chain:{
				"1":"test1_1,test1_2,test1_3",
				"2":"test2_1,test2_2,test2_3",
			},
		},
		test1_1:{
			label:"测试1-1",
			widget:"select",
			dataSource:"product.category",
			queryParams:{name:"手机"},
			require:true
		},
		test1_2:{
			label:"测试1-2",
			widget:"text",
			require:true
		},
		test1_3:{
			label:"测试1-3",
			widget:"text",
			require:true
		},
		test2_1:{
			label:"测试2-1",
			widget:"select",
			dataSource:"product.category",
			queryParams:{name:"服装"},
			require:true
		},
		test2_2:{
			label:"测试2-2",
			widget:"text",
			require:true
		},
		test2_3:{
			label:"测试2-3",
			widget:"datetime",
			require:true
		},
		measuring_unit:{
			label:"计量单位",
			widget:"text",
			require:true
		},
		model:{
			label:"模型",
			widget:"text",
			searchable:true,
			require:true
		},
		producing_area:{
			label:"产地",
			widget:"text",
			require:true
		},
		serial_number:{
			label:"序列号",
			widget:"text",
			require:true
		},
		bar_code:{
			label:"条形码",
			widget:"text",
			require:true,
			addable: true,
            editable: false
		},
		tags:{
			label:"标签",
			searchable:true,
			widget:"select",
			dataSource:"product.tag",
			populateable:true,
			multiple:true,
			require:true,
			get_display:function(item){
				if(item["tags"].length>0){
					let names = _.map(item["tags"],(tag)=>{
						return tag.name
					})
					return names.join("、")
				}
				return "";
			}
		},
		creation_on:{
			label:"创建时间",
			widget:"datetime",
			sortabld:true,
			require:true
		},
		pic:{
			label:"产品图",
			widget:"uploader",
			require:false
		},
		introduction:{
			label:"介绍",
			widget:"textarea",
			require:true
		}

	},
	filters:[
		{
			label:"按分类",
			key:"category_id",
			dataSource:"product.category"
		},
		{
			label:"按标签",
			key:"tags",
			dataSource:"product.tag",
			get_display:function(item){
				return item.name+"("+item.count+")";
			}
		}
	]
}


export const CategoryConfig = {
	resource:"category",
	module:"category",
	name:"产品分类管理",
	fields : {
		name:{
			label:"名称",
			sortabld:true,
			widget:"text",
			titleabled :true,
			require:true
		}
	}
}


export const TagConfig = {
	resource:"tag",
	module:"tag",
	name:"产品标签管理",
	fields : {
		name:{
			label:"名称",
			sortabld:true,
			widget:"text",
			titleabled :true,
			require:true
		},
		count:{
			label:"产品数量",
			sortabld:true,
			widget:"text",
			titleabled :false,
			require:false,
			addable: false,
            editable: false

		}
	}
}