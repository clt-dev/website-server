const express = require('express');
const EmailUtils = require('../utils/EmailUtils');
const Response = require('../utils/ResponseUtils');
const router = express.Router();

router.post('/api/inquiry/submit', async (req,res) => {
	let requiredParams = ['service', 'contact', 'message'];
	requiredParams.forEach(param => {
		if (typeof req.body[param] !== 'string' || !req.body[param].length) {
			return res.send(Response.clientError('Unable to send inquiry. All fields required.', []));
		}
	});

	try {
		await EmailUtils.sendInquiryEmail(req.body);
		res.send(Response.success('success', {}));
	} catch (err) {
		console.log(err);
		return res.send(Response.serverError('Error while trying to create inquiry.', {err}));
	}
});

module.exports = router;