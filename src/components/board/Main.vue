<template>
	<div>
	<router-link to="/board/list"><img alt="Vue logo" src="../../assets/main.jpg" width="380"></router-link>
	</div>
</template>

<script>
export default {
	data() { //변수생성
		return{
		
		}
	}
	,mounted() { //페이지 시작하면은 자동 함수 실행
	
	}
	, methods:{
		fnList() {
			this.$router.push("./list");
		}
	}
}
</script>

<style scoped>
	.Vue logo{padding-top:40px;}
</style>