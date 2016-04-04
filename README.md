# Resume

An application that I can use to create My Resume, you can feel free to modify this project for your purposes, but don't forget to give me a star **=)**.

This project requires PHP 5.6+ to run and was tested in OSX only. To see all dependencies check the [composer.json](https://github.com/jpcercal/resume/blob/master/composer.json) file.

## Installation

The source files is [PSR-2](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md) compatible.
Autoloading is [PSR-4](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-4-autoloader.md) compatible.

```shell
git clone git@github.com:jpcercal/resume.git
cd resume/
composer install
cp .env.example .env
mkdir output
chmod -Rf 777 output/
```

Now you must configure the environment variable according your platform.

```shell
nano .env
```

# External Dependencies

To run this project you must install the [wkhtmltopdf](http://wkhtmltopdf.org/) tool, and put the executable path in your `.env` file.

## Documentation

To create a resume you should copy an existing resume file.

```shell
cp src/Resources/yaml/en.yml.example src/Resources/yaml/en.yml
```

Note that you can replace "en.yml" by your language "pt_BR.yml" for example.

Now, you must edit the content of file "src/Resources/resume/your-language.yml".

When you want to create a output pdf file, run this command:

```shell
php app/console cekurte:resume:create --language=pt_BR
```

In the "--language" you must type the language of your source resume file.

Check the complete documentation to see all available options running the command:

```shell
php app/console cekurte:resume:create --help
```

An example of output can be found here: [My Resume in pt_BR](https://github.com/jpcercal/resume/blob/master/output/resume.pt_BR.pdf).

## Todo

1. Cover all statements with PHPunit tests.

Contributing
------------

1. Give me a star **=)**
2. Fork it
3. Create your feature branch (`git checkout -b my-new-feature`)
4. Make your changes
5. Run the phpcs, to check the syntax pattern described by PSR-2 pattern (`vendor/bin/phpcs --standard=PSR2 src/`)
6. Commit your changes (`git commit -am 'Added some feature'`)
7. Push to the branch (`git push origin my-new-feature`)
8. Create new Pull Request
