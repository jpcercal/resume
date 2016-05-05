<?php

namespace Cekurte\Resume\File;

use Cekurte\Resume\Contract\FileInterface;
use Cekurte\Resume\File\AbstractFile;
use Symfony\Component\Console\Input\InputInterface;

class DebugFile extends AbstractFile implements FileInterface
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
