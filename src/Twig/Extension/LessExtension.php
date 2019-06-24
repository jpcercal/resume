<?php

namespace Jpcercal\Resume\Twig\Extension;

use Jpcercal\Resume\Exception\FileNotExistsException;

class LessExtension extends \Twig_Extension
{
    /**
     * @inheritdoc
     */
    public function getFunctions()
    {
        return [
            'less' => new \Twig_Function_Method($this, 'less', ['needs_environment' => true]),
        ];
    }

    /**
     * @inheritdoc
     */
    public function getName()
    {
        return 'jpcercal_resume_less_extension';
    }

    /**
     * Get the base path.
     *
     * @return string
     */
    protected function getBasePath()
    {
        return APP_RESOURCES_TWIG_PATH . DS;
    }

    /**
     * Compile a less file.
     *
     * @param  \Twig_Environment $twig
     * @param  string            $filename
     *
     * @return string
     */
    public function less(\Twig_Environment $twig, $filename)
    {
        $templateFilename = $twig->getCompiler()->getFilename();

        $basePath = $this->getBasePath()
            . substr($templateFilename, 0, strrpos($templateFilename, '/'))
        ;

        $lessFilename = realpath($basePath . DS . $filename);

        if ($lessFilename === false) {
            throw new FileNotExistsException(sprintf(
                'The less file "%s" not exists.',
                $filename
            ));
        }

        $less = new \lessc();

        return sprintf(
            '<style type="text/css">%s</style>',
            $less->compileFile($lessFilename)
        );
    }
}
