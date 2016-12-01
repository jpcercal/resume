<?php

namespace Cekurte\Resume\File;

use Cekurte\Resume\Contract\FileInterface;
use Cekurte\Resume\Contract\YamlFileInterface;
use Cekurte\Resume\Exception\FileNotExistsException;
use Cekurte\Resume\File\AbstractFile;
use Symfony\Component\Console\Input\InputInterface;

class InputFile extends AbstractFile implements YamlFileInterface
{
    /**
     * @inheritdoc
     */
    public function __construct(InputInterface $input)
    {
        $this->filename = sprintf(
            APP_RESOURCES_RESUME_PATH . DS . '%s.yml',
            $input->getOption('language')
        );

        if (!file_exists($this->filename)) {
            throw new FileNotExistsException(sprintf(
                'The filename "%s" not exists.',
                $this->filename
            ));
        }
    }
}
