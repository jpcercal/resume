<?php

namespace Jpcercal\Resume\File;

use Jpcercal\Resume\Contract\FileInterface;
use Jpcercal\Resume\Exception\FileNotExistsException;
use Jpcercal\Resume\File\AbstractFile;
use Symfony\Component\Console\Input\InputInterface;

class TemplateFile extends AbstractFile implements FileInterface
{
    /**
     * @inheritdoc
     */
    public function __construct(InputInterface $input)
    {
        $this->filename = sprintf(
            '%s/index.twig',
            $input->getOption('template')
        );

        if (!file_exists(APP_RESOURCES_TWIG_PATH . DS . $this->filename)) {
            throw new FileNotExistsException(sprintf(
                'The template "%s" not exists.',
                $this->filename
            ));
        }
    }
}
