import { promises as fs } from 'fs'
import * as theme from 'jsonresume-theme-local'
import puppeteer from 'puppeteer'
import { render } from 'resumed'

const resume = JSON.parse(await fs.readFile('resume.json', 'utf-8'))
const html = await render(resume, theme)

const browser = await puppeteer.launch()
const page = await browser.newPage()

await page.setContent(html, { waitUntil: 'networkidle0' })
await page.pdf({ 
    path: 'resume.pdf', 
    format: 'a4', 
    printBackground: false, 
    margin: {
        top: '40px',
        right: '25px',
        bottom: '20px',
        left: '35px'
    }
})
await page.screenshot({
    path: 'resume-preview.pdf.png', 
    type: 'png',
    clip: {
        x: 0,
        y: 0,
        width: 830,
        height: 280
    }
})

const templateJson = `
<html>
    <head>
        <style>
            code {
                font-family: "Source Code Pro", monospace;
            }
        </style>
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    </head>
    <body>
        <code>
        ${JSON.stringify(resume, null, 2)}
        </code>
    </body>
</html>
`

console.log(templateJson)

await page.setContent(templateJson, { waitUntil: 'networkidle0' })
await page.screenshot({
    path: 'resume-preview.json.png', 
    type: 'png',
    clip: {
        x: 0,
        y: 0,
        width: 830,
        height: 72
    }
})
await browser.close()
