FROM php:7.3-cli

ENV XDEBUG_VERSION=2.7.0

RUN pecl install xdebug-${XDEBUG_VERSION} \
    && docker-php-ext-enable xdebug

RUN apt-get update

RUN curl -L https://cs.sensiolabs.org/download/php-cs-fixer-v2.phar -o php-cs-fixer && chmod +x php-cs-fixer && mv php-cs-fixer /usr/local/bin/php-cs-fixer
