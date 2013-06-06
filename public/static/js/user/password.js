var PasswordStrength = {
    Level: ["5", "4", "3", "2", "1"],
    LevelValue: [36, 20, 12, 8, 1],
    Factor: [1, 1, 1, 2],
    KindFactor: [2, 6, 12, 20],
    Regex: [/\d/g, /[a-z]/g, /[A-Z]/g, /[^a-zA-Z0-9]/g]
}
PasswordStrength.StrengthValue = function (pwd) {
    var strengthValue = 0;
    var ComposedKind = 0;
    for (var i = 0; i < this.Regex.length; i++) {
        var chars = pwd.match(this.Regex[i]);
        if (chars != null) {
            strengthValue += chars.length * this.Factor[i];
            ComposedKind++;
        }
    }
    strengthValue += this.KindFactor[ComposedKind - 1];
    return strengthValue;
}
PasswordStrength.StrengthLevel = function (pwd) {
    if (pwd.length < 6) {
        return '1';
    }
    var cf = 0;
    carr = Array();
    for (i = 0; i < pwd.length; i++) {
        carr[i] = pwd[i];
    }
    carr = carr.delRepeat();
    if (carr.length < 2) {
        return '2';
    }
    var value = this.StrengthValue(pwd);
    for (var i = 0; i < this.LevelValue.length; i++) {
        if (value >= this.LevelValue[i])
            return this.Level[i];
    }
}
Array.prototype.delRepeat = function () {
    var newArray = [];
    var provisionalTable = {};
    for (var i = 0, item;
         (item = this[i]) != null; i++) {
        var s = typeof (item) + item;
        if (!provisionalTable[s]) {
            newArray.push(item);
            provisionalTable[s] = true;
        }
    }
    return newArray;
}