<?php

namespace Jpcercal\Resume\Factory;

use Cekurte\Environment\Environment;
use Jpcercal\Resume\Contract\FactoryInterface;
use Knp\Snappy\Pdf;

class PdfFactory implements FactoryInterface
{
    /**
     * @inheritdoc
     */
    public static function create()
    {
        $pdf = new Pdf(Environment::get('WKHTMLTOPDF_BIN'));

        $pdf->setOption(
            'margin-top',
            Environment::get('WKHTMLTOPDF_OPTION_MARGIN_TOP')
        );

        $pdf->setOption(
            'margin-right',
            Environment::get('WKHTMLTOPDF_OPTION_MARGIN_RIGHT')
        );

        $pdf->setOption(
            'margin-bottom',
            Environment::get('WKHTMLTOPDF_OPTION_MARGIN_BOTTOM')
        );

        $pdf->setOption(
            'margin-left',
            Environment::get('WKHTMLTOPDF_OPTION_MARGIN_LEFT')
        );

        return $pdf;
    }
}
