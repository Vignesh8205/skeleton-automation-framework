import * as winston from 'winston';
import * as path from 'path';

/**
 * Logger - Centralized logging utility
 * Uses Winston for structured logging
 */
export class Logger {
    private logger: winston.Logger;

    constructor() {
        const logFormat = winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.errors({ stack: true }),
            winston.format.splat(),
            winston.format.json(),
            winston.format.printf(({ timestamp, level, message, ...meta }) => {
                return `${timestamp} [${level.toUpperCase()}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
                    }`;
            })
        );

        this.logger = winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: logFormat,
            transports: [
                // Console transport
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }),
                // File transport - All logs
                new winston.transports.File({
                    filename: path.join('reports', 'logs', 'test-execution.log'),
                    maxsize: 5242880, // 5MB
                    maxFiles: 5
                }),
                // File transport - Error logs only
                new winston.transports.File({
                    filename: path.join('reports', 'logs', 'errors.log'),
                    level: 'error',
                    maxsize: 5242880,
                    maxFiles: 5
                })
            ]
        });
    }

    /**
     * Log info message
     */
    info(message: string, meta?: any): void {
        this.logger.info(message, meta);
    }

    /**
     * Log error message
     */
    error(message: string, meta?: any): void {
        this.logger.error(message, meta);
    }

    /**
     * Log warning message
     */
    warn(message: string, meta?: any): void {
        this.logger.warn(message, meta);
    }

    /**
     * Log debug message
     */
    debug(message: string, meta?: any): void {
        this.logger.debug(message, meta);
    }

    /**
     * Log step execution
     */
    step(stepName: string): void {
        this.logger.info(`STEP: ${stepName}`);
    }

    /**
     * Log scenario start
     */
    scenarioStart(scenarioName: string): void {
        this.logger.info(`\n${'='.repeat(80)}`);
        this.logger.info(`SCENARIO START: ${scenarioName}`);
        this.logger.info(`${'='.repeat(80)}\n`);
    }

    /**
     * Log scenario end
     */
    scenarioEnd(scenarioName: string, status: string): void {
        this.logger.info(`\n${'='.repeat(80)}`);
        this.logger.info(`SCENARIO END: ${scenarioName} - ${status}`);
        this.logger.info(`${'='.repeat(80)}\n`);
    }
}
