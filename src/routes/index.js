import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/board/Main'; //메인페이지 호출
import List from '@/components/board/List'; //게시판 리스트 컴포넌트 호출
import Read from '@/components/board/Read'; //게시판 조회 컴포넌트 호출
import Write from '@/components/board/Write'; //게시판 리스트 컴포넌트 호출

Vue.use(Router); //vue 라우터 사용

export default new Router({ //라우터 연결
    routes: [{
            path: '',
            name: Main,
            component: Main
        },
        {
            path: '/board/list',
            name: List,
            component: List
        }, {
            path: '/board/read',
            name: Read,
            component: Read
        }, {
            path: '/board/write',
            name: Write,
            component: Write
        }

    ]
})