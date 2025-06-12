import { useState, useEffect } from 'react';
import { JsonEditor } from '@/components/JsonEditor';
import { MobilePreview } from '@/components/MobilePreview';
import { useJsonValidation } from '@/hooks/useJsonValidation';

const SAMPLE_JSON = {
  "app-theme": "THEME_1",
  "logo-url": "http://www.dummy-image-url.com/1.png",
  "schemaVersion": "1.0",
  "screens": [
    {
      "id": "s0",
      "heading-text": "Gujarat Urja Vikas Nigam Ltd",
      "is_main": true,
      "widgets": [
        {
          "id": "ConsumerCode",
          "type": "LABEL-INPUT",
          "ui-meta": {
            "label-text": "Consumer ID",
            "input-hint": "Enter valid Consumer ID",
            "input-constraints": {
              "input-type": "string",
              "minLen": 5,
              "maxLen": 12,
              "input-error-message": "Invalid Consumer Code"
            }
          }
        },
        {
          "id": "fetchBtn",
          "type": "BUTTON",
          "ui-meta": {
            "text": {
              "value": "Submit",
              "type": "VALUE"
            }
          },
          "targets": [
            {
              "target": "ConsDetails",
              "type": "NAVIGATION"
            }
          ]
        }
      ]
    },
    {
      "id": "ConsDetails",
      "heading-text": "Consumer Details",
      "is_main": false,
      "widgets": [
        {
          "id": "ConsumerName",
          "type": "LABEL-LABEL",
          "ui-meta": {
            "text-left": "Consumer Name",
            "text-right": {
              "value": "YASMINABANU ANVARHUSENBHAI KHALIFA",
              "type": "VALUE"
            }
          }
        },
        {
          "id": "LastBillDate",
          "type": "LABEL-LABEL",
          "ui-meta": {
            "text-left": "Last Bill Date",
            "text-right": {
              "value": "2025-03-02",
              "type": "VALUE"
            }
          }
        },
        {
          "id": "CycleNo",
          "type": "LABEL-LABEL",
          "ui-meta": {
            "text-left": "Cycle No.",
            "text-right": {
              "value": "4",
              "type": "VALUE"
            }
          }
        },
        {
          "id": "LastBillAmount",
          "type": "LABEL-LABEL",
          "ui-meta": {
            "text-left": "Last Bill Amount",
            "text-right": {
              "value": "2735.73",
              "type": "VALUE"
            }
          }
        },
        {
          "id": "AmountToBePaid",
          "type": "LABEL-INPUT",
          "ui-meta": {
            "label-text": "Amount to be Paid",
            "input-hint": "2735.73",
            "input-constraints": {
              "input-type": "number",
              "input-error-message": "Please enter valid amount"
            }
          }
        },
        {
          "id": "paymentButtons",
          "type": "PAYMENT_BUTTONS",
          "split-payment": true,
          "ui-meta": null
        }
      ]
    }
  ]
};

export default function JsonFramework() {
  const [jsonText, setJsonText] = useState('');
  const { config, error, isValid, validateJson } = useJsonValidation();

  useEffect(() => {
    const initialJson = JSON.stringify(SAMPLE_JSON, null, 2);
    setJsonText(initialJson);
    validateJson(initialJson);
  }, [validateJson]);

  const handleJsonChange = (newJsonText: string) => {
    setJsonText(newJsonText);
    // Debounced validation happens in the hook
    const timeoutId = setTimeout(() => {
      validateJson(newJsonText);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">JSON Screen Framework</h1>
              <span className="text-sm text-gray-500">Live Preview & Debug Tool</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-5 gap-6">
          {/* JSON Editor Panel */}
          <div className="lg:col-span-3">
            <JsonEditor
              value={jsonText}
              onChange={handleJsonChange}
              onValidate={validateJson}
              error={error}
              isValid={isValid}
            />
          </div>

          {/* Mobile Preview Panel */}
          <div className="lg:col-span-2">
            <MobilePreview config={config} />
          </div>
        </div>
      </div>
    </div>
  );
}
