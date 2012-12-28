 <!-- Header -->
        <div class="navbar navbar-fixed-top" id="header" >
            <div class="navbar-inner" >
                <a class="brand logo" href="/" title="首页"><img src="/themes/huaban/images/logo2.png" /></a>
                <ul class="nav large">
                    <li>
                        <a href="http://www.baileyu.com/service/category">路线</a>
                    </li>
                    <li style="position: relative;">
                        <a href="http://www.baileyu.com/order/lists/my">
                            <span class="badge badge-warning" id="order-count" style="position: absolute; right: -2px; top: 4px;">1</span>
                            活动
                        </a>
                    </li>
                    <li>
                        <a href="http://www.baileyu.com/service/lists">俱乐部</a>
                    </li>
                    <li>
                        <a href="http://www.baileyu.com/service/lists">故事</a>
                    </li>
                    <li>
                        <a href="http://www.baileyu.com/service/lists">品牌</a>
                    </li>
                    <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">个人设置<b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a href="dd">aaaaa</a></li>
                            <li><a href="dd">bbbbbbb</a></li>
                            <li><a href="dd">cccccc</a></li>
                            <li><a href="dd">ddddddddd</a></li>
                            <li><a href="dd">eeeeeeeee</a></li>
                        </ul>
                    </li>
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">按钮 <b class="caret"></b></a>
        <ul class="dropdown-menu">
          <li><a href="#buttonGroups">按钮组</a></li>
          <li><a href="#buttonDropdowns">下拉按钮</a></li>
        </ul>
      </li>
      <li class="dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown" href="#">导航 <b class="caret"></b></a>
        <ul class="dropdown-menu">
          <li><a href="#navs">导航，标签页，胶囊链接</a></li>
          <li><a href="#navbar">导航条</a></li>
          <li><a href="#breadcrumbs">面包屑导航栏</a></li>
          <li><a href="#pagination">分页</a></li>
        </ul>
      </li>
                </ul>

                <div class="pull-right" style="padding-right: 15px; padding-top: 4px">
                        <?php if (Yii::app()->user->id): ?>
                            <?= Yii::app()->user->name ?>，下午好！<a href="<?= $this->createUrl('zone/logout') ?>">个人资料</a>&nbsp;<a href="<?= $this->createUrl('site/logout') ?>">登出</a>
                        <?php else: ?>
                            <a href="<?= $this->createUrl('user/register') ?>" class="btn btn-danger">立即注册</a>&nbsp;&nbsp;<a href="<?= $this->createUrl('user/login') ?>" class="btn">登陆</a>
                        <?php endif; ?>
                </div>

            </div>
            <div class="header-transparent"></div>
        </div>
        <!-- /Header -->

<div class="container-fluid">
  <div class="row-fluid">
    <div class="span2">
      <!--Sidebar content-->
    </div>
    <div class="span10">
     <?php echo $content; ?>
    </div>
  </div>
</div>



            <?php if (Yii::app()->user->hasFlash('success')): ?>
                <div class="alert alert-success" id="flash_message" style="margin: 10px"><a class="close" data-dismiss="alert" href="#">&times;</a><?php echo Yii::app()->user->getFlash('success'); ?></div>
                <script>setTimeout('closeFlashBox("flash_message",400)', 1500); </script>
            <?php elseif (Yii::app()->user->hasFlash('notice')): ?>
                <div class="alert alert-block" id="flash_message" style="margin: 10px"><a class="close" data-dismiss="alert" href="#">&times;</a><?php echo Yii::app()->user->getFlash('notice'); ?></div>
                <script>setTimeout('closeFlashBox("flash_message",400)', 3000); </script>
            <?php elseif (Yii::app()->user->hasFlash('error')): ?>
                <div class="alert alert-error" id="flash_message" style="margin: 10px"> <a class="close" data-dismiss="alert" href="#">&times;</a><h4 class="alert-heading">登陆失败!</h4><?php echo Yii::app()->user->getFlash('error'); ?></div>
                <script>setTimeout('closeFlashBox("flash_message",400)', 3000); </script>
            <?php endif; ?>


        <div id="footer">
            Copyright &copy; <?php echo date('Y'); ?> by My Company.<br/>
            All Rights Reserved.<br/>
            <?php echo Yii::powered(); ?>
        </div>
    </body>