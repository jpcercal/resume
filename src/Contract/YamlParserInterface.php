<?php

namespace Cekurte\Resume\Contract;

use Cekurte\Resume\Contract\YamlFileInterface;
use Cekurte\Resume\Exception\FileNotExistsException;
use Symfony\Component\Yaml\Exception\ParseException;

interface YamlParserInterface
{
    /**
     * Constructor.
     *
     * @param  YamlFileInterface $file
     *
     * @throws FileNotExistsException
     */
    // public function __construct(YamlFileInterface $file);

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
