// components/ui/theme-selector.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, Palette } from "lucide-react";
import Image from "next/image";

// Theme interface
export interface Theme {
  primary: string;
  bg: string;
  bgSolid: string;
  border: string;
  text: string;
  accent: string;
  hover: string;
  gradient: string;
}

// Helper function to generate theme from a base color
export const generateThemeFromColor = (baseColor: string): Theme => {
  return {
    primary: baseColor,
    bg: `${baseColor}1A`, // 10% opacity
    bgSolid: `${baseColor}0D`, // 5% opacity for solid backgrounds
    border: `${baseColor}33`, // 20% opacity
    text: baseColor,
    accent: baseColor,
    hover: baseColor,
    gradient: `linear-gradient(135deg, ${baseColor} 0%, ${baseColor}CC 100%)`,
  };
};

interface ThemeSelectorProps {
  brandColor: string;
  theme: Theme;
  logo?: string;
  name?: string;
  tagline?: string;
  description?: string;
  stats?: {
    label1: string;
    value1: string;
    label2: string;
    value2: string;
    label3: string;
    value3: string;
    label4: string;
    value4: string;
  };
  services?: Array<{ name: string; description: string }>;
  onColorChange: (color: string) => void;
  onThemeChange: (theme: Theme) => void;
}

export function ThemeSelector({
  brandColor,
  theme,
  logo,
  name,
  tagline,
  description,
  stats,
  services,
  onColorChange,
  onThemeChange,
}: ThemeSelectorProps) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    onColorChange(newColor);
    onThemeChange(generateThemeFromColor(newColor));
  };

  const handleThemeChange = (field: string, value: string) => {
    onThemeChange({
      ...theme,
      [field]: value,
    });
  };

  return (
    <Card className="py-6">
      <CardHeader>
        <CardTitle>Theme Configuration</CardTitle>
        <CardDescription>Fine-tune color theme (auto-generated from brand color) and preview the result</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Brand Preview
            </TabsTrigger>
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Advanced Theme Editor
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preview" className="mt-4">
            <div className="border rounded-lg overflow-hidden">
              {/* Preview Header */}
              <div 
                className="p-6 text-white"
                style={{ background: theme.gradient }}
              >
                <div className="flex items-center gap-4">
                  {logo && (
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2">
                      <Image
                        src={logo} 
                        alt={name || "Division"} 
                        className="max-w-full max-h-full object-contain"
                        width={64}
                        height={64}
                      />
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold">{name || "Division Name"}</h1>
                    <p className="text-sm opacity-90">{tagline || "Division tagline goes here"}</p>
                  </div>
                </div>
              </div>
              
              {/* Preview Content */}
              <div className="p-6">
                <div className="grid gap-4 md:grid-cols-2 mb-6">
                  {stats?.label1 && (
                    <div 
                      className="p-4 rounded-lg border"
                      style={{ 
                        backgroundColor: theme.bg,
                        borderColor: theme.border 
                      }}
                    >
                      <div 
                        className="text-2xl font-bold"
                        style={{ color: theme.primary }}
                      >
                        {stats.value1 || "0"}
                      </div>
                      <div className="text-sm text-gray-600">{stats.label1}</div>
                    </div>
                  )}
                  {stats?.label2 && (
                    <div 
                      className="p-4 rounded-lg border"
                      style={{ 
                        backgroundColor: theme.bg,
                        borderColor: theme.border 
                      }}
                    >
                      <div 
                        className="text-2xl font-bold"
                        style={{ color: theme.primary }}
                      >
                        {stats.value2 || "0"}
                      </div>
                      <div className="text-sm text-gray-600">{stats.label2}</div>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <h2 
                    className="text-xl font-semibold mb-3"
                    style={{ color: theme.text }}
                  >
                    About
                  </h2>
                  <p className="text-gray-600">
                    {description || "This is a preview of your division's description."}
                  </p>
                </div>
                
                {services && services.length > 0 && (
                  <div className="mb-6">
                    <h2 
                      className="text-xl font-semibold mb-3"
                      style={{ color: theme.text }}
                    >
                      Services
                    </h2>
                    <div className="grid gap-3 md:grid-cols-2">
                      {services.slice(0, 2).map((service, index) => (
                        service.name && (
                          <div 
                            key={index} 
                            className="p-3 rounded-lg border"
                            style={{ 
                              backgroundColor: theme.bgSolid,
                              borderColor: theme.border 
                            }}
                          >
                            <h3 
                              className="font-medium"
                              style={{ color: theme.accent }}
                            >
                              {service.name}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {service.description || "Service description"}
                            </p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    className="px-6 py-2 rounded-md text-white font-medium transition-colors"
                    style={{ 
                      backgroundColor: isButtonHovered ? theme.hover : theme.primary
                    }}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="editor" className="space-y-4 mt-4">
            <div className="space-y-2 mb-4">
              <Label htmlFor="color">Brand Color (Auto-generates theme)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="color"
                  name="color"
                  type="color"
                  value={brandColor}
                  onChange={handleColorChange}
                  className="w-20 h-10 p-1 border rounded cursor-pointer"
                />
                <Input
                  value={brandColor}
                  onChange={handleColorChange}
                  placeholder="#3b82f6"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Changing this color will automatically update all theme colors below
              </p>
            </div>
            
            <div className="p-4 bg-muted/50 rounded-lg mb-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> Theme colors are auto-generated from your brand color. 
                You can fine-tune individual colors here, but changing the brand color above will reset these values.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(theme).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <Label htmlFor={`theme-${key}`} className="capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </Label>
                  <div className="flex items-center gap-2">
                    {key.includes('gradient') ? (
                      <div 
                        className="w-10 h-10 rounded border border-gray-200" 
                        style={{ background: value }}
                      />
                    ) : (
                      <Input
                        id={`theme-${key}-color`}
                        type="color"
                        value={value.startsWith('#') ? value : '#3b82f6'}
                        onChange={(e) => handleThemeChange(key, e.target.value)}
                        className="w-10 h-10 p-1 border rounded cursor-pointer"
                      />
                    )}
                    <Input
                      id={`theme-${key}`}
                      value={value}
                      onChange={(e) => handleThemeChange(key, e.target.value)}
                      placeholder={`Enter ${key}`}
                      className="flex-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}