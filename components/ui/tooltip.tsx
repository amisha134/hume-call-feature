"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/utils";

const TooltipProvider = TooltipPrimitive.Provider;

interface TooltipProps extends Omit<React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>, "content"> {
  content?: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipProps>(
  ({ className, sideOffset = 4, content, children, ...props }, ref) => (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        {content && (
          <TooltipPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
              "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
              className
            )}
            {...props}
          >
            {content}
          </TooltipPrimitive.Content>
        )}
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
);
Tooltip.displayName = "Tooltip";

export { Tooltip, TooltipProvider };
