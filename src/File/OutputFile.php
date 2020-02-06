<?php

namespace Jpcercal\Resume\File;

use Jpcercal\Resume\Contract\FileInterface;
use Jpcercal\Resume\File\AbstractFile;
use Symfony\Component\Console\Input\InputInterface;

class OutputFile extends AbstractFile implements FileInterface
{
    /**
     * @inheritdoc
     */
    public function __construct(InputInterface $input)
    {
        $this->filename = sprintf(
            OUTPUT_PATH . DS . 'resume.%s.html',
            $input->getOption('language')
        );
    }
}
