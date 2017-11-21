<template>
    <div id='main'>
        <div class="wrapper">
        <!-- 最上部导航条 header -->
            <header class="main-header">
                <!-- Logo -->
                <a href="#" class="logo">
                    <!-- mini logo for sidebar mini 50x50 pixels -->
                    <span class="logo-mini"><b>V</b>ue-admin</span>
                    <!-- logo for regular state and mobile devices -->
                    <span class="logo-lg"><b>V</b>ue-admin</span>
                </a>
                <!-- Header Navbar: style can be found in header.less -->
                <nav class="navbar navbar-static-top">
                    <!-- Sidebar toggle button-->
                    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span class="sr-only">Toggle navigation</span>
                    </a>
                    <div class="navbar-custom-menu">
                        <ul class="nav navbar-nav">
                            <li class="user user-menu">
                                <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                                    <div @click="lockScreen" class="lock-screen-btn-con">
                                        <Tooltip content="锁屏" placement="bottom">
                                            <Icon type="locked" :size="23"></Icon>
                                        </Tooltip>
                                    </div>
                                </a>
                            </li>
                            <li class="user user-menu">
                                <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                                    <div @click="handleFullScreen" v-if="showFullScreenBtn" class="full-screen-btn-con">
                                        <Tooltip :content="isFullScreen ? '退出全屏' : '全屏'" placement="bottom">
                                            <Icon :type="isFullScreen ? 'arrow-shrink' : 'arrow-expand'" :size="23"></Icon>
                                        </Tooltip>
                                    </div>
                                </a>
                            </li>
                            <!-- User Account: style can be found in dropdown.less -->
                            <li class="user user-menu">
                                <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">
                                    <img src="../assets/img/user2-160x160.jpg" class="user-image" alt="用户头像">
                                    <span class="hidden-xs VP_loginName">{{userName}}</span>
                                </a>
                            </li>
                            <!-- Control Sidebar Toggle Button -->
                            <li @click='logout()'>
                                <a href="#" data-toggle="control-sidebar" title="退出登录"><i class="fa fa-sign-in"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <!-- 左侧菜单栏面板 -->
            <aside class="main-sidebar">
                <!-- sidebar: style can be found in sidebar.less -->
                <section class="sidebar">
                    <!-- Sidebar user panel -->
                    <div class="user-panel">
                        <div class="pull-left image">
                            <img src="../assets/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                        </div>
                        <div class="pull-left info">
                            <!-- <p>魏朋君</p> -->
                            <p class="VP_loginName">{{userName}}</p>
                            <a href="javascript:void(0)"><i class="fa fa-circle text-success"></i> 在线</a>
                        </div>
                    </div>
                    <!-- /.search form -->
                    <!-- sidebar menu: : style can be found in sidebar.less -->
                    <!-- 左侧菜单管理面板 -->
                    <ul class="sidebar-menu" data-widget="tree">
                        <li class="treeview menu-open" >
                            <a href="javascript:void(0)">
                                <i class="fa  fa-user-circle"></i> <span>用户管理</span>
                                <span class="pull-right-container">
                                    <i class="fa fa-angle-left pull-right"></i>
                                </span>
                            </a>
                            <ul class="treeview-menu">
                                <router-link to="/home/user"  tag="li">
                                    <a href="javascript:void(0)"><i class="fa fa-user-circle"></i>用户资料</a>
                                </router-link>
                            </ul>
                        </li>
                    </ul>
                </section>
                <!-- /.sidebar -->
            </aside>
            <!--右侧 内容主面板 -->
            <div class="content-wrapper">
                <!-- 中间标题导航 -->
                <transition name="fade">  
                    <router-view></router-view>  
                </transition>  
            </div>
            <!-- /.content-wrapper -->
            <footer class="main-footer">
                <div class="pull-right hidden-xs">
                    <b>Version</b> 1.0.0
                </div>
                <strong>Copyright &copy; 2017-2020 <a href="http://xxx.com">vue-admin</a>.</strong> All rights reserved.
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return{
            userName:'vue-admin',
            showFullScreenBtn: window.navigator.userAgent.indexOf('MSIE') < 0,
            isFullScreen: false,
        }
    },
    methods: {
        logout(){
            // this.$store.commit('setHasLogin',false)
            this.$router.push('/login');
            sessionStorage.clear()
        },
        handleFullScreen () {
            let main = document.getElementById('app');
            if (this.isFullScreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (main.requestFullscreen) {
                    main.requestFullscreen();
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen();
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen();
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen();
                }
            }
        },
        lockScreen () {
            let lockScreenBack = document.getElementById('lock_screen_back');
            lockScreenBack.style.transition = 'all 3s';
            lockScreenBack.style.zIndex = 10000;
            lockScreenBack.style.boxShadow = '0 0 0 ' + this.lockScreenSize + 'px #667aa6 inset';
            this.showUnlock = true;
            this.$store.commit('lock');
            Cookies.set('last_page_name', this.$route.name); // 本地存储锁屏之前打开的页面以便解锁后打开
            setTimeout(() => {
                lockScreenBack.style.transition = 'all 0s';
                this.$router.push({
                    name: 'locking'
                });
            }, 800);
        }
    },
    mounted:function () {
        // if(sessionStorage['hasLogin']!=='yes'){
        //     this.$router.push('/login');
        //     sessionStorage.clear()
        // }
        // 全屏相关
        document.addEventListener('fullscreenchange', () => {
            this.isFullScreen = !this.isFullScreen;
        });
        document.addEventListener('mozfullscreenchange', () => {
            this.isFullScreen = !this.isFullScreen;
        });
        document.addEventListener('webkitfullscreenchange', () => {
            this.isFullScreen = !this.isFullScreen;
        });
        document.addEventListener('msfullscreenchange', () => {
            this.isFullScreen = !this.isFullScreen;
        });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.full-screen-btn-con{
                display: inline-block;
                width: 30px;
                text-align: center;
                cursor: pointer;
}
.lock-screen-btn-con{
    display: inline-block;
    width: 30px;
    text-align: center;
    cursor: pointer;
}
.full-screen-btn-con i,.lock-screen-btn-con i{
    vertical-align: middle;
}
</style>
