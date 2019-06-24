<?php

namespace Jpcercal\Resume\File;

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
