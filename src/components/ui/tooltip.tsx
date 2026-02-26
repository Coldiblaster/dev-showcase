"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

function TooltipProvider({
  children,
  delayDuration: _delayDuration = 300,
}: {
  children: React.ReactNode;
  delayDuration?: number;
}) {
  return <>{children}</>;
}

function Tooltip({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const contentId = React.useId().replace(/:/g, "");
  const triggerRef = React.useRef<HTMLElement>(null);
  const delayRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = React.useCallback(() => {
    delayRef.current = setTimeout(() => setOpen(true), 300);
  }, []);

  const hide = React.useCallback(() => {
    if (delayRef.current) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    setOpen(false);
  }, []);

  React.useEffect(
    () => () => {
      if (delayRef.current) clearTimeout(delayRef.current);
    },
    [],
  );

  const childArray = React.Children.toArray(children);
  const trigger = childArray.find(
    (c): c is React.ReactElement =>
      React.isValidElement(c) &&
      (c.type as React.FC)?.displayName === "TooltipTrigger",
  );
  const content = childArray.find(
    (c): c is React.ReactElement =>
      React.isValidElement(c) &&
      (c.type as React.FC)?.displayName === "TooltipContent",
  );

  return (
    <>
      {trigger &&
        React.cloneElement(
          trigger as React.ReactElement<Record<string, unknown>>,
          {
            innerRef: triggerRef,
            open,
            contentId,
            onMouseEnter: show,
            onMouseLeave: hide,
            onFocus: show,
            onBlur: hide,
          },
        )}
      {content &&
        React.cloneElement(
          content as React.ReactElement<Record<string, unknown>>,
          {
            open,
            contentId,
            triggerRef,
          },
        )}
    </>
  );
}
Tooltip.displayName = "Tooltip";

const TooltipTrigger = React.forwardRef<
  HTMLElement,
  React.PropsWithChildren<{
    asChild?: boolean;
    className?: string;
  }>
>(function TooltipTrigger({ children, asChild, ...props }, ref) {
  const {
    innerRef,
    open,
    contentId,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
  } = props as Record<string, unknown> as {
    innerRef?: React.RefObject<HTMLElement | null>;
    open: boolean;
    contentId: string;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onFocus: () => void;
    onBlur: () => void;
  };

  const setRef = (node: HTMLElement | null) => {
    if (innerRef) innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref && ref instanceof Object)
      (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  };

  const triggerProps = {
    ref: setRef,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    "aria-describedby": open ? contentId : undefined,
  };

  const child = React.Children.only(children);
  if (asChild && React.isValidElement(child)) {
    return React.cloneElement(
      child as React.ReactElement<Record<string, unknown>>,
      triggerProps,
    );
  }
  return (
    <span {...triggerProps} tabIndex={0}>
      {children}
    </span>
  );
}) as React.ForwardRefExoticComponent<
  React.PropsWithChildren<{ asChild?: boolean; className?: string }> &
    React.RefAttributes<HTMLElement>
> & { displayName: string };
TooltipTrigger.displayName = "TooltipTrigger";

type TooltipContentProps = React.ComponentPropsWithoutRef<"div"> & {
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  open?: boolean;
  contentId?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
};

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent(
    {
      className,
      side = "top",
      sideOffset = 6,
      children,
      open,
      contentId,
      triggerRef,
      ...rest
    },
    ref,
  ) {
    const [pos, setPos] = React.useState({ top: 0, left: 0 });
    const trigger = triggerRef;

    React.useEffect(() => {
      if (!open || !trigger?.current) return;
      const el = trigger.current;
      const rect = el.getBoundingClientRect();
      const m = sideOffset;
      if (side === "top") {
        setPos({ top: rect.top - m, left: rect.left + rect.width / 2 });
      } else if (side === "bottom") {
        setPos({ top: rect.bottom + m, left: rect.left + rect.width / 2 });
      } else if (side === "left") {
        setPos({ top: rect.top + rect.height / 2, left: rect.left - m });
      } else {
        setPos({ top: rect.top + rect.height / 2, left: rect.right + m });
      }
    }, [open, trigger, side, sideOffset]);

    if (!open) return null;

    const transforms: Record<string, string> = {
      top: "translate(-50%, calc(-100% - 6px))",
      bottom: "translate(-50%, 6px)",
      left: "translate(calc(-100% - 6px), -50%)",
      right: "translate(6px, -50%)",
    };

    const content = (
      <div
        ref={ref}
        id={contentId}
        role="tooltip"
        className={cn(
          "fixed z-50 max-w-xs rounded-md border border-border bg-popover px-3 py-2 text-sm text-popover-foreground shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          className,
        )}
        style={{
          left: pos.left,
          top: pos.top,
          transform: transforms[side] ?? transforms.top,
        }}
        {...rest}
      >
        {children}
      </div>
    );

    if (typeof document !== "undefined") {
      return createPortal(content, document.body);
    }
    return content;
  },
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
