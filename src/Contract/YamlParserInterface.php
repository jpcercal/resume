<?php

namespace Jpcercal\Resume\Contract;

use Jpcercal\Resume\Contract\YamlFileInterface;
use Jpcercal\Resume\Exception\FileNotExistsException;
use Symfony\Component\Yaml\Exception\ParseException;

interface YamlParserInterface
{
    /**
     * Get the content of file.
     *
     * @return string
     */
    public function getContent();

    /**
     * Get the content parsed.
     *
     * @return array
     *
     * @throws ParseException
     */
    public function getContentParsed();
}
