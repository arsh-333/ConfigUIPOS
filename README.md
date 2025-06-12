# JSON-to-UI Framework

A live JSON-to-UI rendering framework for debugging mobile app screens. Edit JSON configuration in real-time and see immediate visual updates in a mobile device simulator.

![Framework Preview](https://via.placeholder.com/800x400?text=JSON+Editor+%7C+Mobile+Preview)

## Features

- **Live JSON Editor** with syntax highlighting and validation
- **Real-time Mobile Preview** with realistic device frame
- **4 Widget Types** supported out of the box
- **Screen Navigation** between multiple app screens
- **Error Validation** with detailed error messages
- **Responsive Design** with clean white background and greyish buttons

## Supported Widget Types

| Widget Type | Description | Use Case |
|-------------|-------------|----------|
| `LABEL-INPUT` | Input field with label and validation | User data entry, forms |
| `BUTTON` | Action button with navigation | Screen transitions, actions |
| `LABEL-LABEL` | Key-value display pairs | Showing user information |
| `PAYMENT_BUTTONS` | Grid of payment options with icons | Payment method selection |

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/json-ui-framework.git
cd json-ui-framework
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5000`

## Project Structure

```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # UI components
│   │   │   ├── JsonEditor.tsx       # JSON editor with validation
│   │   │   ├── MobilePreview.tsx    # Mobile device simulator
│   │   │   └── WidgetRenderer.tsx   # Widget rendering logic
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Application pages
│   │   ├── types/        # TypeScript type definitions
│   │   └── lib/          # Utility functions
├── server/               # Backend Express server
├── shared/               # Shared types and schemas
└── README.md
```

## JSON Schema

### Basic Structure
```json
{
  "app-theme": "THEME_1",
  "logo-url": "http://example.com/logo.png",
  "schemaVersion": "1.0",
  "screens": [...]
}
```

### Screen Object
```json
{
  "id": "unique-screen-id",
  "heading-text": "Screen Title",
  "is_main": true,
  "widgets": [...]
}
```

### Widget Examples

#### LABEL-INPUT Widget
```json
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
}
```

#### BUTTON Widget
```json
{
  "id": "submitBtn",
  "type": "BUTTON",
  "ui-meta": {
    "text": {
      "value": "Submit",
      "type": "VALUE"
    }
  },
  "targets": [
    {
      "target": "NextScreen",
      "type": "NAVIGATION"
    }
  ]
}
```

#### LABEL-LABEL Widget
```json
{
  "id": "ConsumerName",
  "type": "LABEL-LABEL",
  "ui-meta": {
    "text-left": "Consumer Name",
    "text-right": {
      "value": "John Doe",
      "type": "VALUE"
    }
  }
}
```

#### PAYMENT_BUTTONS Widget
```json
{
  "id": "paymentButtons",
  "type": "PAYMENT_BUTTONS",
  "split-payment": true,
  "ui-meta": null
}
```

## Customization

### Adding New Widget Types

1. Update the `Widget` type in `client/src/types/schema.ts`:
```typescript
export interface Widget {
  type: "LABEL-INPUT" | "BUTTON" | "LABEL-LABEL" | "PAYMENT_BUTTONS" | "YOUR_NEW_TYPE";
  // ... other properties
}
```

2. Add rendering logic in `client/src/components/WidgetRenderer.tsx`:
```typescript
case 'YOUR_NEW_TYPE':
  return renderYourNewWidget(widget);
```

### Styling

The framework uses Tailwind CSS for styling. Key design principles:
- White background (`bg-white`)
- Greyish buttons (`bg-gray-500`)
- Clean, minimal interface
- Mobile-first responsive design

## Development

### Available Scripts

- `npm run dev` - Start development server (frontend + backend)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking

### Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express
- **UI Components**: Shadcn/ui
- **State Management**: React Query
- **Routing**: Wouter
- **Validation**: Zod

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Use Cases

- **Mobile App Prototyping**: Quickly visualize app screens from JSON configs
- **API Response Testing**: Test how different API responses render in UI
- **Design System Documentation**: Show component variations
- **Client Demos**: Present app flows without full development
- **QA Testing**: Validate UI rendering across different data sets

## License

MIT License - see LICENSE file for details

## Support

For questions or issues, please open a GitHub issue or contact the development team.