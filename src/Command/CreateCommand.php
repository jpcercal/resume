<?php

namespace Cekurte\Resume\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CreateCommand extends Command
{
    protected function configure()
    {
        $this
            ->setName('cekurte:resume:create')
            ->setDescription('Create a new Resume given a markdown source file.')
            ->setHelp(<<<EOT
The <info>cekurte:resume:create</info> command create a new resume given a markdown source file:

<info>php app/console cekurte:resume:create</info>
EOT
            );
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        // $extra = new \ParsedownExtra();

        // $output->writeln($extra->text(file_get_contents(
        //     __DIR__ . '/../Resources/markdown/resume.md'
        // )));

        $output->writeln(\Michelf\MarkdownExtra::defaultTransform(file_get_contents(
            __DIR__ . '/../Resources/markdown/resume.md'
        )));
    }
}
