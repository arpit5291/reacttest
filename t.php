<?php
$_COOKIE = 'test';
$writer = new \Zend\Log\Writer\Stream(BP . '/var/log/Logdone.log');
logger = new \Zend\Log\Logger();
logger->addWriter(writer);
logger->info('');
logger->info(print_r($, true));
?>