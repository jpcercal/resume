<?php

namespace Jpcercal\Resume\Factory;

use Jpcercal\Resume\Contract\FactoryInterface;
use Jpcercal\Resume\Twig\Extension\LessExtension;

class TwigFactory implements FactoryInterface
{
    /**
     * @inheritdoc
     */
    public static function create()
    {
        $twig = new \Twig_Environment(
            new \Twig_Loader_Filesystem(APP_RESOURCES_TWIG_PATH)
        );

        $twig->addExtension(new LessExtension());

        return $twig;
    }
}
