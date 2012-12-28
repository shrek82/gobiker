<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title><?=CHtml::encode($this->pageTitle); ?></title>
    </head>
    <body>
        <!-- 导航栏   navbar+navbar-inverse 为整体黑色导航================================================== -->
        <div class="navbar">
            <div class="navbar-inner">
                <div class="container" style="width:980px">
                    <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </a>
                    <a class="brand" href="/">骑趣</a>
                    <div class="nav-collapse">
                        <ul class="nav">
                            <li <?= $this->id == 'site' ? 'class="active"' : null; ?>><a href="<?= $this->createUrl('site/index') ?>" >首页</a></li>
                            <li <?= $this->id == 'place' ? 'class="active"' : null; ?>><a href="<?= $this->createUrl('place/index') ?>" >目的地</a></li>
                            <li <?= $this->id == 'activitie' ? 'class="active"' : null; ?>><a href="<?= $this->createUrl('activitie/index') ?>" >活动</a></li>
                            <li <?= $this->id == 'routes' ? 'class="active"' : null; ?>><a href="<?= $this->createUrl('routes/index') ?>" >路线</a></li>
                            <li <?= $this->id == 'article' ? 'class="active"' : null; ?>><a href="<?= $this->createUrl('article/index') ?>" >故事</a></li>
                            <li <?= $this->id == 'club' ? 'class="active"' : null; ?>><a href="<?= $this->createUrl('club/index') ?>" >俱乐部</a></li>
                            <li class="dropdown">
                                <a href="<?= $this->createUrl('bbs/index') ?>" class="dropdown-toggle" data-toggle="dropdown">论坛 <b class="caret"></b></a>
                                <ul class="dropdown-menu">
                                    <li><a href="<?= $this->createUrl('forum/index') ?>">论坛首页</a></li>
                                    <li><a href="#">Another action</a></li>
                                    <li><a href="#">Something else here</a></li>
                                    <li class="divider"></li>
                                    <li><a href="<?= $this->createUrl('upload/index') ?>">上传图片</a></li>
                                </ul>
                            </li>
                        </ul>
                        <ul class="nav pull-right">
                            <?php if (Yii::app()->user->id): ?>
                                <li style=" line-height: 40px"><?= Yii::app()->user->name ?>，下午好！</li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">个人主页 <b class="caret"></b></a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#">个人主页</a></li>
                                        <li><a href="#">编辑资料</a></li>
                                        <li><a href="<?= $this->createUrl('site/logout') ?>">登出</a></li>
                                        <li class="divider"></li>
                                        <li class="dropdown-submenu">
                                            <a tabindex="-1" href="#">More options</a>
                                            <ul class="dropdown-menu">
                                                <li><a href="#">Action</a></li>
                                                <li><a href="#">Another action</a></li>
                                                <li><a href="#">Something</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            <?php else: ?>
                                <li><button onclick="window.location.href='<?= $this->createUrl('user/register') ?>'" class="btn btn-danger">立即注册</button>&nbsp;&nbsp;<button onclick="window.location.href='<?= $this->createUrl('user/login') ?>'" class="btn">登陆</button></li>
                            <?php endif; ?>
                        </ul>
                    </div><!-- /.nav-collapse -->
                </div>
            </div><!-- /navbar-inner -->
        </div><!-- /navbar -->
        <div class="container" id="main_container">
            <?php echo $content; ?>
            <div class="clear"></div>
        </div>

        <div class="qyer_footer">
            <div class="qyer_footerBox">
                <ul class="qyer_footer_about">
                    <li>
                        <dl>
                            <dt>关于我们</dt>
                            <dd style="margin: 0"><a href="http://www.qyer.com/htmlpages/about.html" target="_blank" rel="nofollow" data-bn-ipg="1101">穷游简介</a></dd>
                            <dd><a href="http://www.qyer.com/htmlpages/contact.html" target="_blank" rel="nofollow" data-bn-ipg="1102">联系我们</a></dd>
                            <dd><a href="http://www.qyer.com/partner/" target="_blank" rel="nofollow" data-bn-ipg="1119">合作伙伴</a></dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>加入穷游</dt>
                            <dd><a href="http://www.qyer.com/job" target="_blank" rel="nofollow" data-bn-ipg="1103">招聘职位</a></dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>网站条款</dt>
                            <dd><a href="http://www.qyer.com/htmlpages/member.html" target="_blank" rel="nofollow" data-bn-ipg="1104">会员条款</a></dd>
                            <dd><a href="http://www.qyer.com/htmlpages/copyright.html" target="_blank" rel="nofollow" data-bn-ipg="1105">版权声明</a></dd>
                            <dd><a href="http://www.qyer.com/htmlpages/exemption.html" target="_blank" rel="nofollow" data-bn-ipg="1106">免责声明</a></dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>帮助中心</dt>
                            <dd><a href="http://bbs.qyer.com/faq.php" target="_blank" rel="nofollow" data-bn-ipg="1107">使用帮助</a></dd>
                            <dd><a href="http://www.qyer.com/htmlpages/bbsguide.html" target="_blank" rel="nofollow" data-bn-ipg="1108">社区指南</a></dd>
                            <dd><a href="http://www.surveygizmo.com/s3/465989/289a6cfbafa6" target="_blank" rel="nofollow" data-bn-ipg="1109">建议和投诉</a></dd>
                            <dd><a href="http://www.qyer.com/sitemap.html" target="_blank" data-bn-ipg="1110">网站地图</a></dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dt>关注我们</dt>
                            <dd class="qyer_footer_attention"><img src="http://static.qyer.com/images/common/icon_attention.png" alt="" width="80" height="50" border="0" usemap="#Map_go2att">
                                <map name="Map_go2att" id="Map_go2att">
                                    <area shape="rect" coords="0,0,20,20" href="http://t.sina.com.cn/go2eu" target="_blank" rel="nofollow" alt="穷游网@新浪微博" title="穷游网@新浪微博" onclick="_gaq.push(['_trackEvent','outlink','buttomlink','weibo',1]);" data-bn-ipg="1111">
                                    <area shape="rect" coords="30,0,50,20" href="http://www.flickr.com/photos/go2eu" target="_blank" rel="nofollow" alt="穷游网@flickr" title="穷游网@flickr" onclick="_gaq.push(['_trackEvent','outlink','buttomlink','flickr',1]);" data-bn-ipg="1112">
                                    <area shape="rect" coords="60,0,80,20" href="http://page.renren.com/600986584" target="_blank" rel="nofollow" alt="穷游网@人人" title="穷游网@人人" onclick="_gaq.push(['_trackEvent','outlink','buttomlink','renren',1]);" data-bn-ipg="1113">
                                    <area shape="rect" coords="0,30,20,50" href="http://site.douban.com/go2eu" target="_blank" rel="nofollow" alt="穷游网@豆瓣" title="穷游网@豆瓣" onclick="_gaq.push(['_trackEvent','outlink','buttomlink','douban',1]);" data-bn-ipg="1114">
                                    <area shape="rect" coords="30,30,50,50" href="http://www.facebook.com/#!/qiongyou" target="_blank" rel="nofollow" alt="穷游网@facebook" title="穷游网@facebook" onclick="_gaq.push(['_trackEvent','outlink','buttomlink','facebook',1]);" data-bn-ipg="1115">
                                    <area shape="rect" coords="60,30,82,50" href="http://twitter.com/go2eucom" target="_blank" rel="nofollow" alt="穷游网@twitter" title="穷游网@twitter" onclick="_gaq.push(['_trackEvent','outlink','buttomlink','twitter',1]);" data-bn-ipg="1116">
                                </map>
                            </dd>
                        </dl>
                    </li>
                </ul>
                <div class="qyer_footer_appStore"><a href="http://itunes.apple.com/cn/artist/qyer/id492202235" target="_blank" rel="nofollow" data-bn-ipg="1117"><img src="http://static.qyer.com/images/common/appstore.png" width="118" height="39" alt="穷游网@App Store" title="穷游网@App Store"></a></div>
                <div class="qyer_footer_copyright"><a href="http://www.qyer.com/" rel="nofollow" data-bn-ipg="1118"><img src="http://static.qyer.com/images/common/foot_logo.png" width="100" height="30" alt="穷游网"></a>
                    <p>2004-2012 © 骑趣网™ gobiker.cn All rights reserved. Version v3.14&nbsp;&nbsp;<a href="http://www.miibeian.gov.cn/" target="_blank" rel="nofollow">京ICP备12003524号</a></p>
                    <p>骑趣网为旅行者提供原创实用的出境游旅行指南和旅游攻略、旅行社区和问答交流平台，并提供签证、保险、机票、酒店预订、租车等服务。</p>
                </div>
            </div>
        </div>
</html>


