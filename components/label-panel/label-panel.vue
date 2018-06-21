<template>
<div class="label-panel">
		<ul>
			<li v-for="(item, index) in catagory" :key="index">
				<strong>{{ item.name }}</strong>
				<span v-for="(subItem, i) in item.subCategories" :key="i" @mouseover.stop.prevent="showPopover(subItem,i)" @click.stop.prevent="selectLabel(subItem, -1, index)">
					{{ subItem.name }} 
				</span>
			</li>
			<li v-if="tipList.length != 0" class="tip-wrap">
				<span v-for="(tip, tipIndex) in tipList" :key="tipIndex" @click.stop.prevent="selectLabel(tip, tipIndex, 0)">{{ tip.name }}</span>
			</li>
		</ul>
		<p class="select-result" v-if="labels.length != 0">
			<strong>当前条件：</strong>
			<span v-for="(label, index) in labels" :key="index" @click.stop.prevent="deleteLabel(index)">{{label}}<i class="iconfont icon-chahao"></i></span>
			<em @click.stop.prevent="deleteAllLabel"> <i class="iconfont icon-lajitong"></i>清空全部</em>
		</p>
</div>
</template>

<script type="text/ecmascript-6">
import Tip from '~/components/tip/tip'
export default {
	props: {
		catagory: {
			type: Array,
			default() {
				return []
			}
		},
		keywords: {
			type: String,
			default: ''
		}
	},
	created() {
		/*this.$watch('keywords', (newValue, oldValue)=> {
			if(newValue) this.clear();
		})*/
	},
	data() {
		return {
			tipList: [],
			labels: [],
			jsonLabels: {
				languages: '',
				gender: '',
				styles: ''
			}
			/*jsonLabels: {
				languages: [],
				gender: [],
				styles: []
				多选
			}*/
		}
	},
	watch: {
		keywords(newValue, oldValue) {
			if(newValue) {
				this.clear()
				this.$emit('clearLabels')
			};
		},
		labels(newValue, oldValue) {
			/*if(this.keywords) return;*/
			//this.$emit('switchLabels', this.jsonLabels)
		}
	},
	methods: {
		showPopover(item) {
			if(!item.subCategories) {
				if(this.tipList.length) this.tipList = []
				return;
			};
			this.tipList = item.subCategories;
		},
		hidePopover() {
			this.tipList = []
		},
		selectLabel(item, i, j) {
			if(item.subCategories) return;
			let index = this._findIndex(this.labels, item.name)
			if(index === -1) {

				let key = this._normalJsonLabels(j)
				let val = this.jsonLabels[key]
				if(val) {
					let labelIndex = this._findIndex(this.labels,val)
					this.labels.splice(labelIndex,1)
				}
				this.jsonLabels[key] = item.name
				this.labels.push(item.name)
				/*
				多选逻辑
				this.labels.push(item.name)
				let key = this._normalJsonLabels(j)
				this.jsonLabels[key].push(item.name)*/
			}
			else {
				//您已经选择了这个类别
				this.$alert('您已经选择了这个类别', '',{
					confirmButtonText: '确定',
					type: 'warning '
				})
			}
			if(i >= 0) this.tipList = []
			this.$emit('switchLabels', this.jsonLabels)
		},
		deleteLabel(index) {
			this.$confirm('此操作将删除分类, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	console.log(123)
	        	let values = Object.values(this.jsonLabels)
	        	let keys = Object.keys(this.jsonLabels)
	        	let i = this._findIndex(values, this.labels[index]);
	        	this.jsonLabels[keys[i]] = '';
	        	this.labels.splice(index, 1);
	        	this.$emit('switchLabels', this.jsonLabels)
	        	//console.log(values, keys, this.lables, index)
	        	//console.log(this.labels, this.jsonLabels, "123456")

	          this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        })
		},
		deleteAllLabel() {
			this.$confirm('此操作将删除分类, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	this.clear();
	        	this.$emit('switchLabels', this.jsonLabels)
	          this.$message({
	            type: 'success',
	            message: '删除成功!'
	          });
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        })
		},
		clear() {
			this.labels = [];
        	this.jsonLabels = {
				languages: '',
				gender: '',
				styles: ''
			}
		},
		_normalJsonLabels(index) {
			switch(index) {
				case 0:
				return 'languages';
				case 1:
				return 'gender';
				case 2:
				return 'styles';
			}
		},
		_findIndex(list, val) {
			return list.findIndex(item => {
				return item === val
			})
		}
	},
	components: {
		Tip
	}
}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
@import "~assets/scss/variable";
.label-panel {
	padding: 15px 15px 30px;
	border: 1px solid #f8f8f8;
	position: relative;
	> ul {
		li {
			display: flex;
			height: 40px;
			line-height: 40px;
			&.tip-wrap {
				width: 100%;
				display: flex;
				justify-content: space-between;
				box-shadow: 2px 2px 4px rgba(0,0,0,0.1);
				padding: 0 1em;
				position: absolute;
				top: 50px;
				background: #fff;
				span {
					width: auto;
				}
			}
			strong {
				display: block;
				width: 6em;
				text-align: center;
				box-sizing: content-box;
				padding-right: 20px;
			}
			span {
				display: block;
				width: 6em;
				text-align: center;
				box-sizing: content-box;
				padding-right: 20px;
				cursor: pointer;
				&.active, &:hover {
					color: #ffa302;
				}

			}
		}
	}
	.select-result {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 30px;
		background: #f3f3f3;
		line-height: 30px;
		padding: 0 15px;
		strong {
			padding-right: 15px;
		}
			span {
				display: inline-block;
				font-size: 12px;
				line-height: 1em;
				padding: 4px 8px;
				border: 1px solid #bdbdbd;
				margin-right: 10px;
				i {
					font-size: 12px;
					opacity: 0.5;
				}
			}
			em {
				.iconfont {
					color: red;
				}
			}
	}
}   
</style>