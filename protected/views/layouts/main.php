<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="en" />
        <link rel="stylesheet" type="text/css" href="/static/google-bootstrap/css/bootstrap.css?v=1.1" />
        <link rel="stylesheet" type="text/css" href="/static/css/global.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/main.css" />
        <link rel="stylesheet" type="text/css" href="/static/css/routes.css" />
        <script type="text/javascript" src="/static/js/jquery-1.7.1.min.js"></script>
        <script type="text/javascript" src="/static/js/jquery.form.js"></script>
        <script type="text/javascript" src="/static/artDialog4.1.5/jquery.artDialog.source.js?skin=default"></script>
        <script type="text/javascript" src="/static/js/global.js?v=<?= time() ?>"></script>
        <title><?php echo CHtml::encode($this->pageTitle); ?></title>
    </head>

    <body>

        <div id="header">
            <div class="w980">
                <div id="logo"><a href="/" title="<?= Yii::app()->name ?>"><img src="/static/images/logo.png" style="border-width: 0;vertical-align: middle"></a></div>
                <div id="header_nav">
                    <ul>
                        <li><a href="<?= $this->createUrl('site/index') ?>" <?= $this->id == 'site' ? 'class="active"' : null; ?>>首页</a></li>
                        <li><a href="<?= $this->createUrl('activitie/index') ?>" <?= $this->id == 'activitie' ? 'class="active"' : null; ?>>活动</a></li>
                        <li><a href="<?= $this->createUrl('routes/index') ?>" <?= $this->id == 'routes' ? 'class="active"' : null; ?>>路线</a></li>
                        <li><a href="<?= $this->createUrl('article/index') ?>" <?= $this->id == 'article' ? 'class="active"' : null; ?>>故事</a></li>
                        <li style="width: 70px"><a href="<?= $this->createUrl('club/index') ?>" <?= $this->id == 'club' ? 'class="active"' : null; ?>>俱乐部</a></li>
                        <li><a href="<?= $this->createUrl('brand/index') ?>" <?= $this->id == 'brand' ? 'class="active"' : null; ?>>品牌</a></li>
                        <li><a href="<?= $this->createUrl('bbs/index') ?>" <?= $this->id == 'bbs' ? 'class="active"' : null; ?>>论坛</a></li>
                    </ul>
                </div>
                <div id="header_search"></div>
                <div id="header_links">
                    <?php if (Yii::app()->user->id): ?>
                        <?= Yii::app()->user->name ?>，下午好！<a href="<?= $this->createUrl('site/logout') ?>">登出</a>
                    <?php else: ?>
                        <a href="<?= $this->createUrl('user/register') ?>" class="btn btn-danger">快速注册</a>&nbsp;&nbsp;<a href="javascript:userLogin()" class="btn">登录</a>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <div class="container">
            <?php echo $content; ?>

            <?php if (Yii::app()->user->hasFlash('success')): ?>
                <div class="flash-success" id="flash_message" style="margin: 10px"><?php echo Yii::app()->user->getFlash('success'); ?></div>
                <script>setTimeout('closeFlashBox("flash_message",400)', 1500); </script>
            <?php elseif (Yii::app()->user->hasFlash('notice')): ?>
                <div class="flash-error" id="flash_message" style="margin: 10px"><?php echo Yii::app()->user->getFlash('notice'); ?></div>
                <script>setTimeout('closeFlashBox("flash_message",400)', 3000); </script>
            <?php elseif (Yii::app()->user->hasFlash('error')): ?>
                <div class="flash-error" id="flash_message" style="margin: 10px"><?php echo Yii::app()->user->getFlash('error'); ?></div>
                <script>setTimeout('closeFlashBox("flash_message",400)', 3000); </script>
            <?php endif; ?>

        </div>

        <div id="footer" class="container">
            Copyright &copy; <?php echo date('Y'); ?> by My Company.<br/>
            All Rights Reserved.<br/>
            <?php echo Yii::powered(); ?>
        </div>

    </body>
</html>
