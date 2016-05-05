<?php

namespace Cekurte\Resume\File;

abstract class AbstractFile
{
    /**
     * @var string
     */
    protected $filename;

    /**
     * @inheritdoc
     */
    public function getFilename()
    {
        return $this->filename;
    }
}
