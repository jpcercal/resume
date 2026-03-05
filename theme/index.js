const Handlebars = require('handlebars')
const path = require('path')
const postcss = require('postcss')
const tailwindcss = require('@tailwindcss/postcss')
const fs = require('fs')

exports.render = async ({ meta, basics, skills, work }) => {
	// Compile TailwindCSS from input.css
	const inputCssPath = path.join(__dirname, 'input.css')
	const inputCss = fs.readFileSync(inputCssPath, 'utf8')
	const result = await postcss([tailwindcss()]).process(inputCss, {
		from: inputCssPath,
	})
	const compiledCss = result.css

	Handlebars.registerHelper('style', () => new Handlebars.SafeString(compiledCss))

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
