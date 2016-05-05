<?php

namespace Cekurte\Resume\Twig\Extension;

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
        return 'cekurte_resume_less_extension';
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
        return $twig->getCompiler()->getFilename();

        return 'compiling...' . $filename;
    }
}
