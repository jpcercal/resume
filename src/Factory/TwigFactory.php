<?php

namespace Cekurte\Resume\Factory;

use Cekurte\Resume\Contract\FactoryInterface;
use Cekurte\Resume\Twig\Extension\LessExtension;

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
