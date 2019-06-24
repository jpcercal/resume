<?php

namespace Jpcercal\Resume\File\Yaml;

use Jpcercal\Resume\Contract\YamlFileInterface;
use Jpcercal\Resume\Contract\YamlParserInterface;
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
