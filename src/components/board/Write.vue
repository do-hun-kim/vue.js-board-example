<template>
	<div>
		<h1 v-if="mode !='edit'">결재 등록</h1>
		<h1 v-else>결재 수정</h1>

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
						<td><input type="text" v-model="title" ref="title" /></td>
					</tr>
					<tr>
						<th>결재자</th>
						<td>
							<select class="selectuser" ref="approvaluserid">
								<option disabled="disabled" selected> 결재자를 선택하세요 </option>
								<option v-for="item in pre" v-bind:key="item.userid">{{item.name}}</option>
							</select>
						</td>
					</tr>
					<tr>
						<th>내용</th>
						<td><textarea v-model="content" ref="content"></textarea></td>
					</tr>
				</table>
			</form>
		</div>
		<div class="btnWrap">
			<a href="javascript:;" @click="fnList" class="btn">목록</a>
			<a v-if="mode !='edit'" href="javascript:;" @click="fnAddProc" class="btnAdd btn">등록</a>
			<a v-else href="javascript:;" @click="fnModProc" class="btnAdd btn">수정</a>
		</div>	
	</div>
</template>

<script>
export default {
	data() { //변수 생성
		return{
			board_code:'news'
			,title:''
			,content:''
			,userid:'9999'
			,name:'admin'
			,approvalname:''
			,approvaluserid:''
			,form:'' //form 전송 데이터
			,id: this.$route.query.id
			,mode: this.$route.query.mode
			,pre:''
		}
	}
	,mounted() { //최초 로딩 시 실행
		if(this.$route.query.mode == 'edit') { 
			this.fnGetView();
		}else{
			this.fnGetPreWrite();
		}
	}
	,methods:{
		fnList(){ //리스트 화면으로 이동 함수
			this.$router.push({path:'./list',query:this.body});
		}
		,fnAddProc() { //등록 프로세스
			if(!this.title) { //제목이 없다면 값을 입력하라고 알려준다.
				alert("제목을 입력해 주세요");
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}
			if(!this.content) { //내용 없다면 값을 입력하라고 알려준다.
				alert("내용을 입력해 주세요");
				this.$refs.content.focus(); //방식으로 선택자를 찾는다.
				return;
			}
			console.log('this.title=== ' + this.title);
			console.log('this.content=== ' + this.content);
			console.log('this.approvaluserid=== ' + this.approvaluserid);
			this.form = { //backend로 전송될 POST 데이터
				board_code:this.board_code
				,title:this.title
				,content:this.content
				,userid:this.userid
				,name:this.name
				,approvaluserid:this.approvaluserid
				,approvalname:this.approvaluserid
			} 

			this.$axios.post('http://localhost:8001/write',this.form)
			.then((res)=>{
				if(res.data == 'success') {
					alert('등록되었습니다.');
					this.fnList();
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
			
		}
		,fnGetView() {
			this.body = { // 데이터 전송
				id:this.id
			}
			this.$axios.get('http://localhost:8001/read',{params:this.body})
			.then((res)=>{
				this.read = res.data;
				this.title = this.read.title;
				this.content = this.read.content.replace(/(\n)/g,'<br/>');
				this.status = this.read.status;
				this.id = this.read.id;
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,fnGetPreWrite() {
			this.$axios.get('http://localhost:8001/prewrite')
			.then((res)=>{
				this.pre = JSON.parse(JSON.stringify(res.data));
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,fnModProc() {
			if(!this.title) {
				alert("제목을 입력해 주세요");
				this.$refs.title.focus(); //방식으로 선택자를 찾는다.
				return;
			}

			if(!this.content) { //내용 없다면 값을 입력하라고 알려준다.
				alert("내용을 입력해 주세요");
				this.$refs.content.focus(); //방식으로 선택자를 찾는다.
				return;
			}
			this.form = {
				title:this.title
				,content:this.content
				,id:this.id
			} 
			
			this.$axios.post('http://localhost:8001/edit',this.form)
			.then((res)=>{
				if(res.data == 'success') {
					alert('수정되었습니다.');
					this.fnView();
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		,fnView() {
			this.$router.push({path:'./read',"query":this.body});
		}	
	}	
}
</script>

<style scoped>
	.tbAdd{border-top:1px solid #888;}
	.tbAdd th, .tbAdd td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbAdd td{padding:10px 10px; box-sizing:border-box;}
	.tbAdd td input{width:100%; min-height:30px; box-sizing:border-box; padding:0 10px;}
	.tbAdd td textarea{width:100%; min-height:300px; padding:10px; box-sizing:border-box;}
	.btnWrap{text-align:center; margin:20px 0 0 0;}
	.btnWrap a{margin:0 10px;}
	.btnAdd {background:#43b984}
	.btnDelete{background:#f00;}
	.approval{float: left;}
	.selectuser{float: left;}
</style>