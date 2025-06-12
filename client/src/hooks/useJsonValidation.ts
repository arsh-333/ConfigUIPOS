import { useState, useCallback } from 'react';
import { AppConfig, ValidationError } from '@/types/schema';

export function useJsonValidation() {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [error, setError] = useState<ValidationError | null>(null);
  const [isValid, setIsValid] = useState(false);

  const validateJson = useCallback((jsonString: string): boolean => {
    try {
      if (!jsonString.trim()) {
        setConfig(null);
        setError(null);
        setIsValid(false);
        return false;
      }

      const parsed = JSON.parse(jsonString);
      
      // Basic schema validation
      if (!parsed.screens || !Array.isArray(parsed.screens)) {
        throw new Error('Invalid schema: screens array is required');
      }

      if (parsed.screens.length === 0) {
        throw new Error('At least one screen is required');
      }

      // Validate each screen has required fields
      for (const screen of parsed.screens) {
        if (!screen.id || typeof screen.id !== 'string') {
          throw new Error(`Screen missing required 'id' field`);
        }
        if (!screen.widgets || !Array.isArray(screen.widgets)) {
          throw new Error(`Screen '${screen.id}' missing widgets array`);
        }
      }

      // Validate widget types
      const validWidgetTypes = ['LABEL-INPUT', 'BUTTON', 'LABEL-LABEL', 'PAYMENT_BUTTONS'];
      for (const screen of parsed.screens) {
        for (const widget of screen.widgets) {
          if (!validWidgetTypes.includes(widget.type)) {
            throw new Error(`Invalid widget type '${widget.type}' in screen '${screen.id}'`);
          }
        }
      }

      setConfig(parsed as AppConfig);
      setError(null);
      setIsValid(true);
      return true;
    } catch (err) {
      const error = err as Error;
      setError({
        message: error.message,
      });
      setConfig(null);
      setIsValid(false);
      return false;
    }
  }, []);

  return {
    config,
    error,
    isValid,
    validateJson,
  };
}
