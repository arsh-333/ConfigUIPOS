import { Widget, Screen } from '@/types/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WidgetRendererProps {
  widget: Widget;
  onNavigate: (screenId: string) => void;
  onInputChange?: (widgetId: string, value: string) => void;
}

export function WidgetRenderer({ widget, onNavigate, onInputChange }: WidgetRendererProps) {
  if (widget.hidden) return null;

  const handleButtonClick = () => {
    if (widget.targets) {
      widget.targets.forEach(target => {
        if (target.type === 'NAVIGATION' && target.target) {
          onNavigate(target.target);
        }
      });
    }
  };

  const handleInputChange = (value: string) => {
    if (onInputChange) {
      onInputChange(widget.id, value);
    }
  };

  switch (widget.type) {
    case 'LABEL-INPUT':
      return renderLabelInput(widget, handleInputChange);
    case 'BUTTON':
      return renderButton(widget, handleButtonClick);
    case 'LABEL-LABEL':
      return renderLabelLabel(widget);
    case 'PAYMENT_BUTTONS':
      return renderPaymentButtons(widget);
    default:
      return (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
          Unsupported widget type: {widget.type}
        </div>
      );
  }
}

function renderLabelInput(widget: Widget, onInputChange: (value: string) => void) {
  const meta = widget['ui-meta'] || {};
  const constraints = meta['input-constraints'] || {};

  return (
    <div className="space-y-2" data-widget-id={widget.id}>
      <Label className="text-sm font-medium text-gray-700">
        {meta['label-text'] || 'Input'}
      </Label>
      <Input
        type={(constraints as any)['input-type'] === 'number' ? 'number' : 'text'}
        className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent border-2 border-gray-300 rounded-lg p-3"
        placeholder={meta['input-hint'] || ''}
        minLength={(constraints as any).minLen}
        maxLength={(constraints as any).maxLen}
        onChange={(e) => onInputChange(e.target.value)}
      />
      {(constraints as any)['input-error-message'] && (
        <div className="text-sm text-red-600 hidden" data-error-msg>
          {(constraints as any)['input-error-message']}
        </div>
      )}
    </div>
  );
}

function renderButton(widget: Widget, onClick: () => void) {
  const meta = widget['ui-meta'] || {};
  const text = meta.text || {};
  const buttonText = (text as any)?.value || 'Button';

  return (
    <Button
      className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      onClick={onClick}
      data-widget-id={widget.id}
    >
      {buttonText}
    </Button>
  );
}

function renderLabelLabel(widget: Widget) {
  const meta = widget['ui-meta'] || {};
  const leftText = meta['text-left'] || '';
  const rightValue = meta['text-right'] || {};
  const rightText = rightValue?.value || '';

  return (
    <div className="flex justify-between items-start py-3" data-widget-id={widget.id}>
      <span className="text-sm font-medium text-gray-700 min-w-0 flex-shrink-0 mr-4">{leftText}</span>
      <span className="text-sm text-gray-900 text-right min-w-0 break-words">{rightText}</span>
    </div>
  );
}

function renderPaymentButtons(widget: Widget) {
  return (
    <div className="pt-4" data-widget-id={widget.id}>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded mb-2 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="2" y="6" width="16" height="3" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">CARD</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-gray-600 rounded mb-2 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <rect x="2" y="2" width="16" height="16" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
              <rect x="4" y="4" width="3" height="3" fill="currentColor"/>
              <rect x="13" y="4" width="3" height="3" fill="currentColor"/>
              <rect x="4" y="13" width="3" height="3" fill="currentColor"/>
              <rect x="8" y="8" width="4" height="4" fill="currentColor"/>
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">QR</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-green-500 rounded mb-2 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <rect x="3" y="6" width="14" height="8" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
              <circle cx="6" r="1" cy="10"/>
              <circle cx="10" r="1" cy="10"/>
              <circle cx="14" r="1" cy="10"/>
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">CASH</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
          <div className="w-8 h-8 bg-blue-400 rounded mb-2 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <rect x="2" y="4" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1" fill="none"/>
              <line x1="2" y1="7" x2="18" y2="7" stroke="currentColor" strokeWidth="1"/>
              <line x1="2" y1="10" x2="10" y2="10" stroke="currentColor" strokeWidth="1"/>
              <line x1="2" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1"/>
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-700">CHEQUE</span>
        </div>
      </div>
    </div>
  );
}
