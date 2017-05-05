const fs = require('fs'),
	sourceData = require('./source-data.js');

var mapping = sourceData.mapping,
	mappingValue = sourceData.mappingValue;
// Unicode汉字数：0x9fff-0x4e00 + 1 = 20992
// 可转换拼音总汉字数
console.log('TotalCount:' + sourceData.mapping.length);
var obj = {}, objMulti= {};
for(var i = 0, len = mapping.length; i !== len; ++i){
	var names = mappingValue[i].split(',');
	for(var j=0, nameLen = names.length;j < nameLen; j++){
		if(j === 0) {
			if(obj[names[0]]) {
				obj[names[0]] += mapping[i];
			} else {
				obj[names[0]] = mapping[i];
			}
		}

		if(objMulti[names[j]]) {
			objMulti[names[j]]+= mapping[i];
		} else {
			objMulti[names[j]] = mapping[i];
		}
	}
}

fs.writeFileSync('sourceData.js', JSON.stringify({mapping: mapping, mappingValue: mappingValue}));

fs.writeFileSync('../pinyin_dict.js', JSON.stringify(obj));
fs.writeFileSync('../pinyin_dict_multi.js', JSON.stringify(objMulti));