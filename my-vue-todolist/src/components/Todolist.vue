<template>
	<div class="todolist">
		<input id="inputItem" v-on:keyup.enter="addItem" v-model="item"/>
		<ul>
			<li v-for="item in items">{{item}}</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	export default {
		name:"todolist",
		data () {
			return {
				item:"",
				items:[]
			}
		},
		methods:{
			addItem () {
				this.items.push(this.item);
				this.item="";
			}
		}
	}
</script>