<template>
	<header>
		<h1><router-link to="/"><img alt="Vue logo" src="../../assets/logo.png" width="120"></router-link></h1>
		<div class="menuWrap">
			<ul class="menu">
				<li><router-link to="/board/list">결재 게시판</router-link></li>
				<li>결재 요청 확인(사용자 선택 --->)</li>
				<li><select class="selectuser" ref="approvalname" @change="onChange($event)">
								<option disabled="disabled" selected> 결재자를 선택하세요 </option>
								<option v-for="item in pre" v-bind:key="item.userid">{{item.name}}</option>
							</select></li>
			</ul>
		</div>
	</header>
</template>

<script>
export default {
	data() { //변수 생성
		return{
			pre:'',
			body:''
		}
	}
	,mounted() { //최초 로딩 시 실행
		this.fnGetPreWrite()
	},methods:{
			fnGetPreWrite() {
			this.$axios.get('http://localhost:8001/prewrite')
			.then((res)=>{
				this.pre = JSON.parse(JSON.stringify(res.data));
			})
			.catch((err)=>{
				console.log(err);
			})
			}, onChange(event) {
				console.log('12222');
				this.body = { // 데이터 전송
					username: event.target.value
				} 
				console.log(event.target.value);
			this.$router.push({path:'/board/request',query:this.body});
		}
	}
}
</script>

<style scoped>
header{width:100%; text-align:center; position:relative; height:150px; border-bottom:1px solid #35495e}
header h1{position:absolute; top:0; left:100px;}
header ul.menu:after{display:block; clear:both; content:'';}
header ul.menu{position:absolute; top:20px; right:50px;}
header ul.menu li{float:left; padding:10px 20px; list-style:none;}

a{text-decoration:none; color:#333;}
</style>