const getLowerCaseMap = (str) => {
	const regex = /[a-z]/gm;
	const array = str.match(regex)
	const letterMap = {}
	for (item of array) {
		letterMap[item] = letterMap[item] ? letterMap[item] + 1 : 1
	}
	const validLetterMap = {}
	Object.entries(letterMap).forEach(([key, value]) => {
		if (value > 1) {
			validLetterMap[key] = value
		}
	});
	return validLetterMap
}

const mountFinalString = (strList) => {
	return strList.join('/')
}

const mountOrderedStrings = (strList) => {
	return strList.map(structure => {
		const letterPart = new Array(structure.count).fill(structure.letter).join('')
		const string = `${structure.greater}:${letterPart}`
		return string
	}).sort()
}

class StringStructure {
	greater = '';
	letter = '';
	count = 0;
}

const getStringsStructure = (s1LetterMap, s2LetterMap) => {
	const strs = [];
	Object.entries(s1LetterMap).forEach(([key, value]) => {
		const s2Value = s2LetterMap[key];
		const str = new StringStructure()
		str.count = value
		str.greater = '1'
		str.letter = key

		if (s2Value) {
			str.count = value > s2Value ? value : s2Value
			str.greater = value === s2Value ? `=` : s2Value > value ? '2' : '1'
			delete s2LetterMap[key]
		}

		strs.push(str)
	});

	Object.entries(s2LetterMap).forEach(([key, value]) => {
		const s1Value = s1LetterMap[key];
		const str = new StringStructure()
		str.count = value
		str.greater = '2'
		str.letter = key

		if (s1Value) {
			str.count = value > s1Value ? value : s1Value
			str.greater = value === s1Value ? `=` : s1Value > value ? '1' : '2'
		}

		strs.push(str)
	});

	return strs;
}

const mix = (s1, s2) => {
	const s1LetterMap = getLowerCaseMap(s1)
	const s2LetterMap = getLowerCaseMap(s2)
	const strList = getStringsStructure(s1LetterMap, s2LetterMap)
	const orderedList = mountOrderedStrings(strList)
	return mountFinalString(orderedList)
}


console.log(mix('teyeessyskkk', 'xeellrekk'))