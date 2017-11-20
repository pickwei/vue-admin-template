<template>
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
</template>

<script>
export default {
    data () {
        return{
            userName:'vue-admin'
        }
    },
    methods: {
        logout(){
            // this.$store.commit('setHasLogin',false)
            this.$router.push('/login');
            sessionStorage.clear()
        },
    },
    // mounted:function () {
    //     if(sessionStorage['hasLogin']!=='yes'){
    //         this.$router.push('/login');
    //         sessionStorage.clear()
    //     }
    // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
