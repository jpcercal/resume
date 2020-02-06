# Resume

An application that I can use to create my personal resume, feel free to modify this project for your own purposes, but don't forget to give me a star **=)**.

This project requires PHP 7.3+ to run. In order to see all dependencies check the [composer.json](https://github.com/jpcercal/resume/blob/master/composer.json) file.

## Installation

The source files is [PSR-2](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md) compatible.
Autoloading is [PSR-4](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-4-autoloader.md) compatible.

```shell
git clone https://github.com/jpcercal/resume.git
cd resume/
docker-compose run --rm composer composer install

export RESUME_LANG=en
# or export RESUME_LANG=pt_BR

docker-compose run --rm php php app/console jpcercal:resume --language="${RESUME_LANG}" --overwrite
docker-compose run --rm -T athenapdf athenapdf "resume.${RESUME_LANG}.html" "resume.${RESUME_LANG}.pdf"
```
