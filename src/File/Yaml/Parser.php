<?php

namespace Cekurte\Resume\File\Yaml;

use Cekurte\Resume\Contract\YamlFileInterface;
use Cekurte\Resume\Contract\YamlParserInterface;
use Symfony\Component\Yaml\Parser as SymfonyParser;

class Parser implements YamlParserInterface
{
    /**
     * @var string
     */
    private $filename;

    /**
     * @inheritdoc
     */
    public function __construct(YamlFileInterface $file)
    {
        $this->filename = $file->getFilename();
    }

    /**
     * @inheritdoc
     */
    public function getContent()
    {
        return file_get_contents($this->filename);
    }

    /**
     * @inheritdoc
     */
    public function getContentParsed()
    {
        return (new SymfonyParser())->parse($this->getContent());
    }
}
