import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { ValidationError } from '@/types/schema';

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onValidate: (json: string) => boolean;
  error: ValidationError | null;
  isValid: boolean;
}

export function JsonEditor({ value, onChange, onValidate, error, isValid }: JsonEditorProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleValidate = () => {
    onValidate(localValue);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">
                JSON Configuration
              </CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Edit the JSON to see live updates in the preview
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={handleValidate}
                variant="outline"
                size="sm"
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Validate JSON
              </Button>
              <div className="text-sm">
                {isValid && (
                  <span className="text-green-600 font-medium flex items-center">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Valid
                  </span>
                )}
                {error && (
                  <span className="text-red-600 font-medium flex items-center">
                    <XCircle className="w-4 h-4 mr-1" />
                    Invalid
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Textarea
            value={localValue}
            onChange={(e) => handleChange(e.target.value)}
            className="font-mono text-sm min-h-96 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste your JSON configuration here..."
          />
        </CardContent>
        
        {error && (
          <div className="p-4 bg-red-50 border-t border-red-200">
            <Alert className="border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-700">
                <strong>JSON Validation Error:</strong> {error.message}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </Card>

      <Card className="shadow-lg border-gray-200">
        <CardHeader className="border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Supported Widget Types
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900">LABEL-INPUT</div>
              <div className="text-blue-700 mt-1">Input field with label and validation</div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900">BUTTON</div>
              <div className="text-green-700 mt-1">Action button with navigation</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium text-purple-900">LABEL-LABEL</div>
              <div className="text-purple-700 mt-1">Key-value display pairs</div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="font-medium text-orange-900">PAYMENT_BUTTONS</div>
              <div className="text-orange-700 mt-1">Payment action buttons</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
