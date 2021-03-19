<template>
	<div>
		<h1>결재 조회</h1>

		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>제목</th>
						<td>{{title}}</td>
					</tr>
					<tr>
						<th>결재자</th>
						<td>{{approval_name}}</td>
					</tr>
					<tr>
						<th>내용</th>
						<td class="txt_cont" v-html="content"></td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap">
			<a href="javascript:;" @click="fnList" class="btn">목록</a>
			<a v-if="read.status == 0" href="javascript:;" @click="fnMod" class="btnAdd btn">수정</a>
			<a v-if="read.status == 0" href="javascript:;" @click="fnApploval" class="btnAdd btn">승인</a>
			<a v-if="read.status == 0" href="javascript:;" @click="fnReject" class="btnAdd btn">반려</a>
			
		</div>	
	</div>
</template>

<script>
export default {
	data() {
		return {
			body:this.$route.query
			,title:''
			,content:''
			,read:''
			,num:this.$route.query.num
			,status:''
			,id:this.$route.query.id
			,mode:''
			,approval_name:''
		}
	}
	,mounted() {
		this.fnGetView();
	}
	,methods:{
		fnGetView() {
			this.$axios.get('http://localhost:8001/read',{params:this.body})
			.then((res)=>{
				this.read = res.data;
				this.title = this.read.title;
				this.content = this.read.content.replace(/(\n)/g,'<br/>');
				this.status = this.read.status;
				this.approval_name = this.read.approval_name;

			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,fnList(){
			delete this.body.num;
			this.$router.push({path:'./list',query:this.body});
		},fnMod() {
			this.form = { //backend로 전송될 POST 데이터
				id:this.id 
				,mode:'edit'
			} 
			console.log(this.form)
			this.$router.push({path:'./write',query:this.form}); //등록화면으로 이동하면서 파라미터를 넘겨준다.
		},fnApploval() {
			this.form = { //backend로 전송될 POST 데이터
				id:this.id 
				,status: 3000
			} 
			this.$axios.post('http://localhost:8001/complete',this.form)
			.then((res)=>{
				if(res.data == 'success') {
					alert('결재 승인 되었습니다..');
					this.fnReqList();
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		},fnReject() {
			this.form = { //backend로 전송될 POST 데이터
				id:this.id 
				,status: 9000
			} 
			this.$axios.post('http://localhost:8001/complete',this.form)
			.then((res)=>{
				if(res.data == 'success') {
					alert('결재 반려 되었습니다.');
					this.fnReqList();
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		},fnReqList() {//조회 페이지 이동
            //this.body.id = id; // 결재자 정보
                this.$router.push({path:'./request',query:this.body}); //추가한 상세페이지 라우터
		}
	}
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0; }
	.tbAdd td{padding:10px 10px; box-sizing:border-box; text-align:left;}
	.tbAdd td.txt_cont{height:300px; vertical-align:top;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
</style>