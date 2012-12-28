<?php if (isset($provinces)): ?>
    <select id="province" name="province_id" onChange="changeCity()">
        <?php foreach ($provinces as $p): ?>
            <option value="<?= $p['serialId'] ?>"><?= $p['provinceName'] ?></option>
        <?php endforeach; ?>
    </select>
<?php endif; ?>

<?php if (isset($citys)): ?>
    <select id="city" name="city_id">
        <?php foreach ($citys as $c): ?>
            <option value="<?= $c['serialId'] ?>"><?= $p['cityName'] ?></option>
        <?php endforeach; ?>
    </select>
<?php endif; ?>

<?php if (isset($district)): ?>
    <select id="city" name="city_id">
        <?php foreach ($district as $d): ?>
            <option value="<?= $d['serialId'] ?>"><?= $d['districtName'] ?></option>
        <?php endforeach; ?>
    </select>
<?php endif; ?>