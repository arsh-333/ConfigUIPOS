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
        type="text"
        className="w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={meta['input-hint'] || ''}
        minLength={constraints.minLen}
        maxLength={constraints.maxLen}
        onChange={(e) => onInputChange(e.target.value)}
      />
      {constraints['input-error-message'] && (
        <div className="text-sm text-red-600 hidden" data-error-msg>
          {constraints['input-error-message']}
        </div>
      )}
    </div>
  );
}

function renderButton(widget: Widget, onClick: () => void) {
  const meta = widget['ui-meta'] || {};
  const text = meta.text || {};
  const buttonText = text.value || 'Button';

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
  const rightText = rightValue.value || '';

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100" data-widget-id={widget.id}>
      <span className="text-sm font-medium text-gray-700">{leftText}</span>
      <span className="text-sm text-gray-900">{rightText}</span>
    </div>
  );
}

function renderPaymentButtons(widget: Widget) {
  return (
    <div className="space-y-3 pt-4" data-widget-id={widget.id}>
      <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-medium transition-colors duration-200">
        Pay Full Amount
      </Button>
      {widget['split-payment'] && (
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors duration-200">
          Pay Partial Amount
        </Button>
      )}
      <Button className="w-full bg-gray-500 hover:bg-gray-600 text-white font-medium transition-colors duration-200">
        View Receipt
      </Button>
    </div>
  );
}
