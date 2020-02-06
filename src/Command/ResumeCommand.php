<?php

namespace Jpcercal\Resume\Command;

use Jpcercal\Resume\Exception\FileNotExistsException;
use Jpcercal\Resume\Factory\TwigFactory;
use Jpcercal\Resume\File\I18nFile;
use Jpcercal\Resume\File\InputFile;
use Jpcercal\Resume\File\OutputFile;
use Jpcercal\Resume\File\TemplateFile;
use Jpcercal\Resume\File\Yaml\Parser;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Yaml\Exception\ParseException;

class ResumeCommand extends Command
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('jpcercal:resume')
            ->setDescription('Create a new Resume given a yaml source file.')
            ->addOption(
                'overwrite',
                null,
                InputOption::VALUE_NONE,
                'Overwrite an existent file (if it exists)'
            )
            ->addOption(
                'template',
                null,
                InputOption::VALUE_REQUIRED,
                'Template that will be used to create the resume',
                'default'
            )
            ->addOption(
                'language',
                null,
                InputOption::VALUE_REQUIRED,
                'The language that will be used to create the resume',
                'en'
            )
            ->setHelp(file_get_contents(
                APP_RESOURCES_HELP_PATH . DS . 'CreateCommand.txt'
            ))
        ;
    }

    /*
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            $twig = TwigFactory::create();

            $outputFilename = (new OutputFile($input))->getFilename();

            if ($input->getOption('overwrite') && file_exists($outputFilename)) {
                unlink($outputFilename);
            }

            if (!file_exists(OUTPUT_PATH)) {
                mkdir(OUTPUT_PATH, 0777, true);
            }

            $resume = (new Parser(new InputFile($input)))->getContentParsed();

            $resume['language'] = $input->getOption('language');

            $resume['i18n'] = (new Parser(new I18nFile($input)))->getContentParsed();

            $htmlContent = $twig->render((new TemplateFile($input))->getFilename(), $resume);

            file_put_contents($outputFilename, $htmlContent);

            $output->writeln('<info>Your output html file was generated with successfully.</info>');

            $output->writeln(sprintf(
                'Generated file: <comment>%s</comment>',
                $outputFilename
            ));
        } catch (FileNotExistsException $e) {
            $output->writeln(sprintf(
                '<error>%s</error>',
                $e->getMessage()
            ));
        } catch (ParseException $e) {
            $output->writeln(sprintf(
                '<error>Unable to parse the YAML string: %s</error>',
                $e->getMessage()
            ));
        }
    }
}
