"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Component separator for spacing between major sections
function ComponentSeparator({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn("w-full py-20 flex items-center justify-center", className)}
      {...props}
    >
      <div className="flex items-center justify-center space-x-4">
        {/* Left line */}
        <div className="w-24 h-0.5 bg-gradient-to-r from-transparent to-primary/20" />
        
        {/* Right line */}
        <div className="w-24 h-0.5 bg-gradient-to-l from-transparent to-primary/20" />
      </div>
    </div>
  )
}

export { ComponentSeparator }