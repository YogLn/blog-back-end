const service = require('../services/label.services');

const verifyLabelExists = async (ctx, next) => {
	// 1.取出要添加啊的标签
	const { labels } = ctx.request.body
	
	// 2.判断标签是否存在于数据库
	const newLabels = []
	for (const name of labels) {
		const labelResult = await service.getLabelByName(name)
		const label = { name }
		if(!labelResult) {
			// 创建标签数据
			const res = await service.create(name)
			label.id = res.insertId
		} else {
			label.id = labelResult.id
		}
		newLabels.push(label)
	}
	ctx.labels = newLabels
	console.log(newLabels)
	await next()
}

module.exports = {
	verifyLabelExists
}