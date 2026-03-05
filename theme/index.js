const Handlebars = require('handlebars')
const path = require('path')
const sass = require('sass')
const fs = require('fs')

exports.render = ({ meta, basics, skills, work }) => {
	Handlebars.registerHelper('style', () => new Handlebars.SafeString(
		sass
			.compile(path.join(__dirname, 'style.scss'))
			.css
	))

	Handlebars.registerHelper('compilePhoneNumber', (telephoneNumber) => new Handlebars
		.SafeString(telephoneNumber
			.replace(/ /g, '')
			.replace(/-/g, '')
			.replace(/\(/g, '')
			.replace(/\)/g, '')
		))

	Handlebars.registerHelper('compileWorkPeriod', (startDate, endDate) => endDate
		? `${new Date(startDate).getFullYear()} - ${new Date(endDate).getFullYear()}`
		: `${new Date(startDate).getFullYear()} - Present`
	)

	const template = Handlebars.compile(fs.readFileSync(path.join(__dirname, 'template.hbs'), 'utf8'))
	return template({ meta, basics, skills, work })
}
