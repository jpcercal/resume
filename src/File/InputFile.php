<?php

namespace Jpcercal\Resume\File;

use Jpcercal\Resume\Contract\FileInterface;
use Jpcercal\Resume\Contract\YamlFileInterface;
use Jpcercal\Resume\Exception\FileNotExistsException;
use Jpcercal\Resume\File\AbstractFile;
use Symfony\Component\Console\Input\InputInterface;

class InputFile extends AbstractFile implements YamlFileInterface
{
    /**
     * @inheritdoc
     */
    public function __construct(InputInterface $input)
    {
        $this->filename = APP_RESOURCES_RESUME_PATH . DS . 'resume.yml';

        if (!file_exists($this->filename)) {
            throw new FileNotExistsException(sprintf(
                'The filename "%s" not exists.',
                $this->filename
            ));
        }
    }
}
