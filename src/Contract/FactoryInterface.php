<?php

namespace Cekurte\Resume\Contract;

use Cekurte\Resume\Exception\ApplicationException;

interface FactoryInterface
{
    /**
     * Create a new instance of a class.
     *
     * @static
     *
     * @return mixed
     *
     * @throws ApplicationException
     */
    public static function create();
}
