import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AppConfig, Screen } from '@/types/schema';
import { WidgetRenderer } from './WidgetRenderer';

interface MobilePreviewProps {
  config: AppConfig | null;
}

export function MobilePreview({ config }: MobilePreviewProps) {
  const [currentScreenId, setCurrentScreenId] = useState<string>('');
  const [currentScreen, setCurrentScreen] = useState<Screen | null>(null);

  useEffect(() => {
    if (config && config.screens.length > 0) {
      // Find main screen or use first screen
      const mainScreen = config.screens.find(s => s.is_main) || config.screens[0];
      setCurrentScreenId(mainScreen.id);
      setCurrentScreen(mainScreen);
    } else {
      setCurrentScreenId('');
      setCurrentScreen(null);
    }
  }, [config]);

  const handleScreenChange = (screenId: string) => {
    if (config) {
      const screen = config.screens.find(s => s.id === screenId);
      if (screen) {
        setCurrentScreenId(screenId);
        setCurrentScreen(screen);
      }
    }
  };

  const handleNavigate = (screenId: string) => {
    if (config) {
      const screen = config.screens.find(s => s.id === screenId);
      if (screen) {
        setCurrentScreenId(screenId);
        setCurrentScreen(screen);
      }
    }
  };

  const handleGoBack = () => {
    if (config) {
      const mainScreen = config.screens.find(s => s.is_main) || config.screens[0];
      setCurrentScreenId(mainScreen.id);
      setCurrentScreen(mainScreen);
    }
  };

  const isMainScreen = currentScreen && config ? 
    (config.screens.find(s => s.is_main) || config.screens[0])?.id === currentScreen.id : 
    true;

  if (!config) {
    return (
      <div className="sticky top-6">
        <Card className="shadow-lg border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Live Preview</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center">
              <div className="w-80 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-6 bg-gray-50 flex justify-between items-center px-4 text-xs font-semibold text-gray-800">
                    <span>9:41</span>
                    <span>100%</span>
                  </div>
                  
                  {/* Content */}
                  <div className="h-full flex items-center justify-center text-gray-500 -mt-6">
                    <div className="text-center">
                      <div className="text-4xl mb-4">📱</div>
                      <div className="text-lg font-medium">No Configuration</div>
                      <div className="text-sm mt-2">Paste your JSON to see the preview</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="sticky top-6">
      <Card className="shadow-lg border-gray-200">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-semibold text-gray-900">Live Preview</CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Screen:</span>
              <Select value={currentScreenId} onValueChange={handleScreenChange}>
                <SelectTrigger className="w-48 text-sm">
                  <SelectValue placeholder="Select Screen" />
                </SelectTrigger>
                <SelectContent>
                  {config.screens.map(screen => (
                    <SelectItem key={screen.id} value={screen.id}>
                      {screen.id} - {screen['heading-text'] || 'Untitled'}
                      {screen.is_main && ' (Main)'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-center">
            {/* Mobile Frame */}
            <div className="w-80 h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                {/* Status Bar */}
                <div className="h-6 bg-gray-50 flex justify-between items-center px-4 text-xs font-semibold text-gray-800">
                  <span>9:41</span>
                  <span>100%</span>
                </div>
                
                {/* App Content */}
                <div className="flex-1 bg-white h-full -mt-6 pt-6">
                  {currentScreen && (
                    <div className="h-full flex flex-col">
                      {/* Header */}
                      <div className="bg-white border-b border-gray-200 p-4 flex items-center shadow-sm">
                        {!isMainScreen && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleGoBack}
                            className="mr-3 p-1 h-8 w-8"
                          >
                            <ArrowLeft className="h-4 w-4 text-gray-600" />
                          </Button>
                        )}
                        <h1 className="text-lg font-medium text-gray-900 truncate">
                          {currentScreen['heading-text'] || 'Screen'}
                        </h1>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {currentScreen.widgets.map(widget => (
                          <WidgetRenderer
                            key={widget.id}
                            widget={widget}
                            onNavigate={handleNavigate}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
