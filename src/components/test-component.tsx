"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Heart, Star } from "lucide-react";

export const TestComponent = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Project Setup Test
          </h1>
          <p className="text-muted-foreground text-lg">
            Verifying React, Tailwind, and color scheme integration
          </p>
        </div>

        {/* Color Scheme Display */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Color Scheme Preview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-16 bg-primary rounded-lg"></div>
                <p className="text-sm text-muted-foreground">Primary (#FF6B35)</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-foreground rounded-lg"></div>
                <p className="text-sm text-muted-foreground">Charcoal (#2D3748)</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-secondary rounded-lg border"></div>
                <p className="text-sm text-muted-foreground">Secondary (#F7FAFC)</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-16 bg-success rounded-lg"></div>
                <p className="text-sm text-muted-foreground">Success (#48BB78)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Button Tests */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Interactive Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="default" 
                className="transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Heart className="w-4 h-4 mr-2" />
                Primary Button
              </Button>
              
              <Button 
                variant="outline" 
                className="transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <Star className="w-4 h-4 mr-2" />
                Outline Button
              </Button>
              
              <Button 
                variant="secondary" 
                className="transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Secondary Button
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Typography Test */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Typography & Font Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-foreground">
                Heading 1 - Inter Font
              </h1>
              <h2 className="text-2xl font-semibold text-foreground">
                Heading 2 - Inter Font
              </h2>
              <h3 className="text-xl font-medium text-foreground">
                Heading 3 - Inter Font
              </h3>
              <p className="text-lg text-muted-foreground">
                Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p className="text-sm text-muted-foreground">
                Small text - Additional details and information display correctly.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Status Indicators */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Setup Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-foreground">React Client Component</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-foreground">Tailwind CSS Styling</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-foreground">Color Scheme Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-foreground">Lucide Icons</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-foreground">Shadcn/UI Components</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-foreground">Inter Font Loading</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};