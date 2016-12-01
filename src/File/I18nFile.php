<?php

namespace Cekurte\Resume\File;

use Cekurte\Resume\Contract\YamlFileInterface;
use Cekurte\Resume\File\AbstractFile;
use Symfony\Component\Console\Input\InputInterface;

class I18nFile extends AbstractFile implements YamlFileInterface
{
    /**
     * @inheritdoc
     */
    public function __construct(InputInterface $input)
    {
        $this->filename = sprintf(
            APP_RESOURCES_I18N_PATH . DS . 'messages.%s.yml',
            $input->getOption('language')
        );

        if (!file_exists($this->filename)) {
            $this->filename = APP_RESOURCES_I18N_PATH . DS . 'messages.en.yml';
        }
    }
}
