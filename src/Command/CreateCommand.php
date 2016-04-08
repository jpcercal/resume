<?php

namespace Cekurte\Resume\Command;

use Cekurte\Environment\Environment;
use Cekurte\Resume\Exception\FileNotExistsException;
use Knp\Snappy\Exception\FileAlreadyExistsException;
use Knp\Snappy\Pdf;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Yaml\Exception\ParseException;
use Symfony\Component\Yaml\Parser;

class CreateCommand extends Command
{
    /**
     * {@inheritdoc}
     */
    protected function configure()
    {
        $this
            ->setName('cekurte:resume:create')
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
            ->addOption(
                'debug',
                null,
                InputOption::VALUE_NONE,
                'Used to debug this command'
            )
            ->setHelp(file_get_contents(
                APP_RESOURCES_HELP_PATH . DS . 'CreateCommand.txt'
            ))
        ;
    }

    /**
     * Get the messages given a language.
     *
     * @param  InputInterface $input
     * @return string
     */
    protected function getMessages(InputInterface $input)
    {
        $yaml = new Parser();

        $filename = sprintf(
            APP_RESOURCES_I18N_PATH . DS . 'messages.%s.yml',
            $input->getOption('language')
        );

        if (!file_exists($filename)) {
            $filename = APP_RESOURCES_I18N_PATH . DS . 'messages.en.yml';
        }

        return $yaml->parse(file_get_contents($filename));
    }

    /**
     * Get the input file.
     *
     * @param  InputInterface $input
     * @return string
     *
     * @throws FileNotExistsException
     */
    protected function getInputFile(InputInterface $input)
    {
        $filename = sprintf(
            APP_RESOURCES_RESUME_PATH . DS . '%s.yml',
            $input->getOption('language')
        );

        if (!file_exists($filename)) {
            throw new FileNotExistsException(sprintf(
                'The filename "%s" not exists.',
                $filename
            ));
        }

        return $filename;
    }

    /**
     * Get the output file.
     *
     * @param  InputInterface $input
     * @return string
     */
    protected function getOutputFile(InputInterface $input)
    {
        return sprintf(
            OUTPUT_PATH . DS . 'resume.%s.pdf',
            $input->getOption('language')
        );
    }

    /**
     * Get the output file html file.
     *
     * @param  InputInterface $input
     * @return string
     */
    protected function getOutputHtmlFile(InputInterface $input)
    {
        return sprintf(
            OUTPUT_PATH . DS . 'resume.%s.html',
            $input->getOption('language')
        );
    }

    /**
     * Get the template file.
     *
     * @param  InputInterface $input
     * @return string
     */
    protected function getTemplateFile(InputInterface $input)
    {
        $filename = sprintf(
            '%s.twig',
            $input->getOption('template')
        );

        if (!file_exists(APP_RESOURCES_TWIG_PATH . DS . $filename)) {
            throw new FileNotExistsException(sprintf(
                'The template "%s" not exists.',
                $filename
            ));
        }

        return $filename;
    }

    /**
     * {@inheritdoc}
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        try {
            $twig = $this->getTwigInstance();
            $pdf  = $this->getPdfInstance();
            $yaml = new Parser();

            $inputFile      = $this->getInputFile($input);
            $templateFile   = $this->getTemplateFile($input);
            $outputFile     = $this->getOutputFile($input);
            $outputHtmlFile = $this->getOutputHtmlFile($input);

            $resume = $yaml->parse(file_get_contents($inputFile));

            if ($input->getOption('overwrite') && file_exists($outputFile)) {
                unlink($outputFile);
            }

            if ($input->getOption('overwrite') && $input->getOption('debug') && file_exists($outputHtmlFile)) {
                unlink($outputHtmlFile);
            }

            if (!file_exists(OUTPUT_PATH)) {
                mkdir(OUTPUT_PATH, 0777, true);
            }

            $resume['i18n'] = $this->getMessages($input);
            $resume['base_path'] = APP_RESOURCES_TWIG_PATH . DS . dirname($templateFile) . DS;
            $resume['path_separator'] = DS;

            $html = $twig->render($templateFile, $resume);

            if ($input->getOption('debug')) {
                file_put_contents($outputHtmlFile, $html);
            }

            $pdf->generateFromHtml(
                $html,
                $outputFile
            );

            $output->writeln('<info>Your resume was generated with successfully.</info>');

            $output->writeln(sprintf(
                'Generated file: <comment>%s</comment>',
                $outputFile
            ));
        } catch (FileAlreadyExistsException $e) {
            $output->writeln(sprintf(
                '<error>%s</error>',
                $e->getMessage()
            ));

            $message = 'Note that you can use the '
                . '<comment>--overwrite</comment> '
                . 'option to overwrite an existent resume file.'
            ;

            $output->writeln($message);
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

    /**
     * Get the Twig instance.
     *
     * @return \Twig_Environment
     */
    public function getTwigInstance()
    {
        return new \Twig_Environment(
            new \Twig_Loader_Filesystem(APP_RESOURCES_TWIG_PATH)
        );
    }

    /**
     * Get the Wkhtmltopdf instance.
     *
     * @return Pdf
     */
    public function getPdfInstance()
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
