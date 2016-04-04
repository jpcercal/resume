<?php

define('DS', DIRECTORY_SEPARATOR);

define('ROOT_PATH', realpath(__DIR__));

define('APP_PATH', realpath(ROOT_PATH . DS . 'src'));
define('VENDOR_PATH', realpath(ROOT_PATH . DS . 'vendor'));
define('OUTPUT_PATH', ROOT_PATH . DS . 'output');

define('APP_RESOURCES_PATH', realpath(APP_PATH . DS . 'Resources'));

define('APP_RESOURCES_TWIG_PATH', realpath(APP_RESOURCES_PATH . DS . 'template'));
define('APP_RESOURCES_RESUME_PATH', realpath(APP_RESOURCES_PATH . DS . 'resume'));
define('APP_RESOURCES_I18N_PATH', realpath(APP_RESOURCES_PATH . DS . 'i18n'));
define('APP_RESOURCES_HELP_PATH', realpath(APP_RESOURCES_PATH . DS . 'help'));
